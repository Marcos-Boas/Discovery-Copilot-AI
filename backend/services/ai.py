import os
import json
from google import genai
from google.genai import types
from google.genai.errors import APIError
from datetime import datetime
from backend.models import (
    CanonicalBrief, OpportunityInfo, CustomerInfo, BusinessContextInfo,
    ScenarioInfo, ScopeInfo, DiscoveryPlanInfo, HistoryEntry
)

# Inicializa o SDK oficial do Gemini.
# Se GEMINI_API_KEY não estiver no ambiente, chamadas falharão.
def get_genai_client():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        # Se não houver chave, retorna None para tratamento amigável de fallback/teste
        return None
    return genai.Client(api_key=api_key)

def generate_initial_brief(raw_text: str, source_name: str) -> CanonicalBrief:
    """
    Recebe um texto bruto de briefing (e-mail, RFP, atas) e extrai o Canonical Brief inicial estruturado.
    """
    client = get_genai_client()
    
    if not client:
        # Fallback de teste local se não houver chave API cadastrada
        print("Aviso: GEMINI_API_KEY não configurada. Gerando Canonical Brief fictício para testes.")
        return CanonicalBrief(
            opportunity=OpportunityInfo(id="OPP-001", title="Oportunidade Mock", source=source_name),
            customer=CustomerInfo(name="Cliente Exemplo S/A"),
            business_context=BusinessContextInfo(problems=["Necessidade de teste (Sem chave Gemini)"]),
            current_scenario=ScenarioInfo(description="Modo de demonstração sem integração real com IA"),
            desired_scenario=ScenarioInfo(description="Executar integração com LLM configurando GEMINI_API_KEY"),
            scope=ScopeInfo(included=["Setup da aplicação"]),
            discovery_plan=DiscoveryPlanInfo(methodology="Simulação local"),
            history=[HistoryEntry(version=1, author="Sistema (Mock)", changes_summary="Inicialização offline sem API Key")]
        )

    prompt = f"""
    Você é o assistente inteligente de Pré-Vendas (Discovery Copilot).
    Sua tarefa é analisar o seguinte texto bruto (briefing, e-mail comercial, RFP ou ata) e extrair os dados estruturados de acordo com o modelo de negócios do produto.
    
    Preencha o máximo de informações possíveis com precisão. Caso um campo não esteja mencionado no texto, deixe-o vazio (lista vazia ou string em branco), não invente dados.
    A oportunidade gerada deve ter um título adequado e auto-explicativo.

    Texto Bruto de Entrada:
    ---
    {raw_text}
    ---
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=CanonicalBrief,
                temperature=0.1
            ),
        )
        # O SDK do Gemini retorna o JSON estruturado direto no texto
        brief_data = json.loads(response.text)
        
        # Garante metadados iniciais corretos
        brief_data["opportunity"]["source"] = source_name
        brief_data["opportunity"]["status"] = "Inicial"
        brief_data["context_version"] = 1
        brief_data["history"] = [
            HistoryEntry(
                version=1,
                date=datetime.utcnow(),
                author="IA Copilot",
                changes_summary="Leitura e interpretação inicial de oportunidade a partir do documento bruto."
            ).model_dump()
        ]
        
        return CanonicalBrief(**brief_data)
        
    except Exception as e:
        print(f"Erro na chamada da API do Gemini: {e}")
        raise e

def enrich_brief(brief: CanonicalBrief, kb_context: str) -> CanonicalBrief:
    """
    Enriquece um Canonical Brief existente integrando artigos relevantes da Knowledge Base,
    identificando riscos, premissas, lacunas (gaps), perguntas de discovery, resumo executivo e o plano de discovery.
    """
    client = get_genai_client()
    
    if not client:
        # Fallback de enriquecimento fictício
        brief.opportunity.status = "Enriquecido"
        brief.context_version += 1
        brief.history.append(
            HistoryEntry(
                version=brief.context_version,
                date=datetime.utcnow(),
                author="Sistema (Mock)",
                changes_summary="Enriquecimento fictício (Chave API não configurada)."
            )
        )
        return brief

    prompt = f"""
    Você é o Discovery Copilot AI. Sua tarefa é analisar o Canonical Brief atual de uma oportunidade e os artigos de conhecimento oficiais da nossa Knowledge Base para:
    1. Identificar riscos (Técnicos, Comerciais, Operacionais, Negócio) e sugerir ações de mitigação.
    2. Levantar premissas importantes (assumptions) adotadas na análise.
    3. Detectar lacunas de informação (missing_information/gaps) cruciais para a qualificação da oportunidade.
    4. Gerar perguntas contextualizadas (Questions) para a reunião de discovery (técnicas, comerciais, etc.) direcionadas a stakeholders específicos.
    5. Redigir um Resumo Executivo (executive_summary) profissional, sintetizando o entendimento da oportunidade.
    6. Desenhar um Plano de Discovery (discovery_plan) com passos, dinâmica e métricas de sucesso.
    7. Atualizar a lista de tecnologias sugeridas e o nível de confiança (Baixo, Médio, Alto).

    Abaixo estão as informações para análise.

    --- CANONICAL BRIEF ATUAL ---
    {brief.model_dump_json(indent=2)}

    --- CONTEXTO DE KNOWLEDGE BASE OFICIAL ---
    {kb_context}
    ---

    Instruções críticas:
    - Baseie-se prioritariamente no conhecimento corporativo fornecido pela Knowledge Base.
    - Se a KB apresentar soluções padrões para o segmento do cliente, inclua-as no plano e tecnologias.
    - Mantenha a rastreabilidade: não remova históricos anteriores e incremente a versão do contexto.
    - Explicite premissas e riscos com transparência.
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=CanonicalBrief,
                temperature=0.2
            ),
        )
        
        brief_data = json.loads(response.text)
        
        # Atualiza metadados e versionamento do histórico
        new_version = brief.context_version + 1
        brief_data["context_version"] = new_version
        brief_data["opportunity"]["status"] = "Enriquecido"
        
        # Reconstrói a lista de histórico acumulando o histórico anterior
        old_history = [entry.model_dump() for entry in brief.history]
        new_entry = HistoryEntry(
            version=new_version,
            date=datetime.utcnow(),
            author="IA Copilot",
            changes_summary="Enriquecimento inteligente executado. Análise de lacunas, perguntas de discovery, riscos e premissas gerados com suporte da Knowledge Base."
        ).model_dump()
        
        brief_data["history"] = old_history + [new_entry]
        
        return CanonicalBrief(**brief_data)
        
    except Exception as e:
        print(f"Erro na chamada da API de enriquecimento: {e}")
        raise e
