from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class OpportunityInfo(BaseModel):
    id: str = Field(..., description="Identificador único da oportunidade")
    title: str = Field(..., description="Título da oportunidade")
    source: str = Field(..., description="Origem da oportunidade (ex: CRM, Email)")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Data de criação do contexto")
    status: str = Field("Inicial", description="Status do contexto (Inicial, Enriquecido, Validado, Consolidado, Encerrado)")

class CustomerInfo(BaseModel):
    name: str = Field(..., description="Nome do cliente")
    segment: Optional[str] = Field(None, description="Segmento de atuação do cliente")
    contact_person: Optional[str] = Field(None, description="Ponto de contato principal no cliente")

class Stakeholder(BaseModel):
    name: str = Field(..., description="Nome do stakeholder")
    role: str = Field(..., description="Papel do stakeholder na oportunidade")
    contact: Optional[str] = Field(None, description="Informações de contato")

class BusinessContextInfo(BaseModel):
    problems: List[str] = Field(default_factory=list, description="Lista de dores ou problemas de negócio identificados")
    objectives: List[str] = Field(default_factory=list, description="Objetivos estratégicos do cliente")
    motivations: List[str] = Field(default_factory=list, description="Motivações para iniciar o projeto")

class ScenarioInfo(BaseModel):
    description: str = Field("", description="Descrição geral da situação")
    key_points: List[str] = Field(default_factory=list, description="Pontos chave identificados")

class ScopeInfo(BaseModel):
    included: List[str] = Field(default_factory=list, description="Itens inclusos no escopo da oportunidade")
    excluded: List[str] = Field(default_factory=list, description="Itens explicitamente fora do escopo")

class RiskInfo(BaseModel):
    id: str = Field(..., description="Identificador do risco (ex: RSK-01)")
    description: str = Field(..., description="Descrição do risco")
    category: str = Field(..., description="Categoria do risco (Técnico, Comercial, Operacional, Negócio)")
    impact: str = Field(..., description="Impacto do risco (Alto, Médio, Baixo)")
    probability: str = Field(..., description="Probabilidade de ocorrência (Alta, Média, Baixa)")
    mitigation: Optional[str] = Field(None, description="Ações propostas para mitigação")

class AssumptionInfo(BaseModel):
    id: str = Field(..., description="Identificador da premissa (ex: ASM-01)")
    description: str = Field(..., description="Descrição da premissa assumida")
    impact: str = Field("Médio", description="Impacto da premissa no projeto (Alto, Médio, Baixo)")

class GapInfo(BaseModel):
    id: str = Field(..., description="Identificador da lacuna (ex: GAP-01)")
    description: str = Field(..., description="Descrição da informação ausente")
    area: str = Field(..., description="Área da lacuna (Técnica, Comercial, Escopo, Processo)")
    priority: str = Field(..., description="Prioridade para sanar a lacuna (Alta, Média, Baixa)")

class QuestionInfo(BaseModel):
    id: str = Field(..., description="Identificador da pergunta (ex: QST-01)")
    question: str = Field(..., description="Texto da pergunta sugerida")
    type: str = Field(..., description="Tipo de pergunta (Obrigatória, Complementar, Técnica, Comercial, Contexto)")
    target_role: Optional[str] = Field(None, description="Papel do stakeholder alvo desta pergunta")
    context: Optional[str] = Field(None, description="Contexto ou justificativa para a pergunta")

class DiscoveryPlanInfo(BaseModel):
    steps: List[str] = Field(default_factory=list, description="Passos sugeridos para a reunião de discovery")
    methodology: str = Field("", description="Metodologia ou dinâmica de condução proposta")
    validation_metrics: List[str] = Field(default_factory=list, description="Métricas para validação do discovery")

class ReferenceInfo(BaseModel):
    id: str = Field(..., description="Identificador da referência (ex: REF-01)")
    type: str = Field(..., description="Tipo do documento de origem (Email, PDF, CRM)")
    source: str = Field(..., description="Nome do arquivo ou link de origem")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Data de ingestão")

class HistoryEntry(BaseModel):
    version: int = Field(..., description="Número da versão do contexto")
    date: datetime = Field(default_factory=datetime.utcnow, description="Data da alteração")
    author: str = Field(..., description="Autor da alteração (IA, Analista)")
    changes_summary: str = Field(..., description="Resumo das modificações realizadas nesta versão")

class CanonicalBrief(BaseModel):
    version: str = Field("2.0.0", description="Versão estrutural do modelo de dados")
    context_version: int = Field(0, description="Versão sequencial da oportunidade (v0, v1, v2...)")
    opportunity: OpportunityInfo
    customer: CustomerInfo
    stakeholders: List[Stakeholder] = Field(default_factory=list)
    business_context: BusinessContextInfo
    current_scenario: ScenarioInfo
    desired_scenario: ScenarioInfo
    scope: ScopeInfo
    technologies: List[str] = Field(default_factory=list, description="Lista de tecnologias envolvidas na oportunidade")
    constraints: List[str] = Field(default_factory=list, description="Restrições técnicas ou de negócio")
    assumptions: List[AssumptionInfo] = Field(default_factory=list)
    risks: List[RiskInfo] = Field(default_factory=list)
    missing_information: List[GapInfo] = Field(default_factory=list)
    questions: List[QuestionInfo] = Field(default_factory=list)
    executive_summary: str = Field("", description="Resumo executivo consolidado da oportunidade")
    discovery_plan: DiscoveryPlanInfo
    references: List[ReferenceInfo] = Field(default_factory=list)
    history: List[HistoryEntry] = Field(default_factory=list)
    confidence_level: str = Field("Baixo", description="Nível de confiança atual (Baixo, Médio, Alto)")
