import os
import uuid
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from fastapi.staticfiles import StaticFiles
from backend.models import CanonicalBrief, HistoryEntry
from backend.services.ai import generate_initial_brief, enrich_brief
from backend.services.kb import search_kb, init_kb_db

app = FastAPI(title="Discovery Copilot AI API", version="2.0.0")

# Habilita CORS para permitir chamadas do frontend em Vanilla JS rodando localmente
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite requisições de qualquer origem local para desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "opportunities")
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Inicializa o banco de dados de KB no startup do app
init_kb_db()

# Serve a pasta site contendo a UI estática do copiloto
SITE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "site")
if os.path.exists(SITE_DIR):
    app.mount("/site", StaticFiles(directory=SITE_DIR, html=True), name="site")


class OpportunityCreateRequest(BaseModel):
    raw_text: str
    source: str = "Manual Upload"

class OpportunitySummary(BaseModel):
    id: str
    title: str
    customer_name: str
    status: str
    created_at: datetime
    context_version: int

def save_brief(brief: CanonicalBrief):
    file_path = os.path.join(DATA_DIR, f"{brief.opportunity.id}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(brief.model_dump_json(indent=2))

def load_brief(opp_id: str) -> CanonicalBrief:
    file_path = os.path.join(DATA_DIR, f"{opp_id}.json")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Oportunidade não encontrada.")
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return CanonicalBrief(**data)

@app.post("/api/opportunities", response_model=CanonicalBrief)
async def create_opportunity(req: OpportunityCreateRequest):
    """
    Cria uma nova oportunidade processando um texto bruto inicial e gerando o Canonical Brief estruturado.
    """
    if not req.raw_text.strip():
        raise HTTPException(status_code=400, detail="O briefing fornecido está vazio.")
    
    # Gera ID único para a oportunidade
    opp_id = f"OPP-{uuid.uuid4().hex[:6].upper()}"
    
    try:
        # Chama a IA para fazer a extração estruturada
        brief = generate_initial_brief(req.raw_text, req.source)
        brief.opportunity.id = opp_id
        
        # Salva o arquivo local
        save_brief(brief)
        return brief
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar briefing: {str(e)}")

@app.get("/api/opportunities", response_model=List[OpportunitySummary])
async def list_opportunities():
    """
    Lista todas as oportunidades cadastradas localmente.
    """
    summaries = []
    for file_name in os.listdir(DATA_DIR):
        if file_name.endswith(".json"):
            try:
                opp_id = file_name.replace(".json", "")
                brief = load_brief(opp_id)
                summaries.append(
                    OpportunitySummary(
                        id=brief.opportunity.id,
                        title=brief.opportunity.title,
                        customer_name=brief.customer.name or "Sem Nome de Cliente",
                        status=brief.opportunity.status,
                        created_at=brief.opportunity.created_at,
                        context_version=brief.context_version
                    )
                )
            except Exception:
                continue
    # Ordena por data de criação decrescente
    summaries.sort(key=lambda x: x.created_at, reverse=True)
    return summaries

@app.get("/api/opportunities/{opp_id}", response_model=CanonicalBrief)
async def get_opportunity(opp_id: str):
    """
    Recupera os dados completos do Canonical Brief de uma oportunidade.
    """
    return load_brief(opp_id)

@app.post("/api/opportunities/{opp_id}/enrich", response_model=CanonicalBrief)
async def enrich_opportunity(opp_id: str):
    """
    Consulta a base de conhecimento e enriquece o Canonical Brief com análises de riscos,
    lacunas, premissas, perguntas e plano de discovery.
    """
    brief = load_brief(opp_id)
    
    try:
        # Busca artigos na KB relevantes com base nas tecnologias ou segmentos mencionados no brief
        search_terms = []
        if brief.customer.segment:
            search_terms.append(brief.customer.segment)
        if brief.technologies:
            search_terms.extend(brief.technologies)
        
        query = " OR ".join(search_terms) if search_terms else ""
        # Recupera os artigos oficiais para alimentar o contexto do prompt
        kb_context = search_kb(query)
        
        # Executa o enriquecimento inteligente via IA
        enriched = enrich_brief(brief, kb_context)
        save_brief(enriched)
        return enriched
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao enriquecer oportunidade: {str(e)}")

@app.put("/api/opportunities/{opp_id}/validate", response_model=CanonicalBrief)
async def validate_opportunity(opp_id: str, updated_brief: CanonicalBrief):
    """
    Recebe modificações manuais do analista, atualiza a oportunidade,
    muda o status para "Validado" e registra uma entrada no histórico.
    """
    # Carrega a versão antiga para validar existência
    old_brief = load_brief(opp_id)
    
    # Incrementa versão e status
    updated_brief.context_version = old_brief.context_version + 1
    updated_brief.opportunity.status = "Validado"
    
    # Registra no histórico
    new_history_entry = HistoryEntry(
        version=updated_brief.context_version,
        date=datetime.utcnow(),
        author="Analista (Validação)",
        changes_summary="Canonical Brief validado e corrigido manualmente pelo Analista de Pré-Vendas."
    )
    updated_brief.history.append(new_history_entry)
    
    save_brief(updated_brief)
    return updated_brief

@app.get("/api/kb")
async def get_kb_articles(q: Optional[str] = ""):
    """
    Rota auxiliar para consulta direta de artigos da Knowledge Base.
    """
    articles_text = search_kb(q)
    return {"kb_context": articles_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
