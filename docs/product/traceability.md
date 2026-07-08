# Traceability Matrix

## Discovery Copilot AI

| Campo | Valor |
|--------|--------|
| **Documento** | Traceability Matrix |
| **Arquivo** | traceability.md |
| **Produto** | Discovery Copilot AI |
| **Versão** | 1.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-07-06 (sync @docs) |

---

# Objetivo

Este documento estabelece a Matriz de Rastreabilidade bidirecional do Discovery Copilot AI. 

Seu objetivo é mapear a relação de dependência desde os objetivos estratégicos de negócio até os requisitos granulares e regras aplicadas, garantindo que não haja requisitos sem justificativa de negócio (under-delivery) e que nenhuma regra ou capacidade seja esquecida durante a implementação técnica (over-delivery).

---

# Matriz de Rastreabilidade Funcional (Vertical)

Esta tabela conecta os objetivos de negócio e as histórias de usuário (US) às capacidades funcionais (CF), requisitos funcionais específicos (RF) e às regras de negócio (BR) aplicáveis.

| História de Usuário (US) | Capacidade (CF) | Requisito Funcional (RF) | Regras de Negócio Associadas (BR) |
|---|---|---|---|
| **US-001** (Enviar Oportunidade / Obter Canonical Brief) | **CF-01** (Interpretar Oportunidade) | **RF-001** (Upload de Briefing)<br>**RF-002** (Extração de Fatos) | BR-010 (ID Obrigatório)<br>BR-011 (Leitura Inicial)<br>BR-100 (Não alucinação) |
| | **CF-02** (Consolidar Canonical Brief) | **RF-003** (Normalização)<br>**RF-004** (Origem/Rastreabilidade)<br>**RF-005** (Controle Histórico) | BR-012 (Padronização)<br>BR-013 (Evolução Contínua)<br>BR-014 (Atualização)<br>BR-040 a BR-044 (Canonical Brief SSOT) |
| **US-002** (Classificação Automática de IA) | **CF-03** (Classificar Oportunidade) | **RF-006** (Classificação)<br>**RF-007** (Indicação Confiança)<br>**RF-008** (Validação Humana) | BR-020 (Classificação Obrigatória)<br>BR-021 (Grau Confiança)<br>BR-022 (Baixa Confiança)<br>BR-102 (Indicação de Incerteza) |
| **US-003** (Mapear Gaps e Perguntas) | **CF-05** (Detectar Lacunas) | **RF-010** (Mapeamento de Gaps) | BR-052 (Perguntas Focadas em Gaps) |
| | **CF-06** (Gerar Perguntas) | **RF-011** (Geração/Priorização) | BR-050 (Contextualização)<br>BR-051 (Priorização Perguntas)<br>BR-052 (Foco em Lacunas) |
| **US-004** (Mapear Premissas e Riscos) | **CF-07** (Gerar Premissas) | **RF-012** (Formulador de Premissas) | BR-060 (Premissas Explícitas)<br>BR-061 (Premissas não Fatos) |
| | **CF-08** (Identificar Riscos) | **RF-013** (Levantamento de Riscos) | BR-070 (Categoria do Risco)<br>BR-071 (Dependências de Risco) |
| **US-005** (Visualizar Resumo Executivo) | **CF-09** (Produzir Executive Summary) | **RF-014** (Resumo Executivo) | BR-004 (Explicabilidade)<br>BR-101 (Limitações do Sumário) |
| **US-006** (Exportar e Editar Discovery Plan) | **CF-10** (Produzir Discovery Plan) | **RF-015** (Geração Discovery Plan)<br>**RF-016** (Edição Manual) | BR-002 (Decisão Humana)<br>BR-080 (Revisão Obrigatória)<br>BR-081 (Correções do Analista)<br>BR-082 (Captura de Feedback) |
| *Interno* (Enriquecimento Corporativo) | **CF-04** (Consultar Knowledge Base) | **RF-009** (Busca na KB) | BR-005 (Conhecimento Oficial)<br>BR-030 (Fonte Aprovada)<br>BR-031 (Limitação de KB)<br>BR-032 (Integridade de KB) |

---

# Matriz de Rastreabilidade Não Funcional (Qualidade)

Esta tabela vincula os Requisitos Não Funcionais (RNF) às diretrizes e restrições comportamentais do sistema definidas no AI Behavior e regras gerais de governança.

| Requisito Não Funcional (RNF) | Padrão Não Funcional (NFR) | Diretriz do AI Behavior Relacionada | Regra de Governança Aplicável |
|---|---|---|---|
| **RNF-001** (Independência de LLM) | NFR-18 (Portabilidade) | Diretrizes Gerais de Evolução | BR-091 (Versionamento estrutural) |
| **RNF-002** (Segurança RBAC) | NFR-07 (Segurança) | - | BR-090 (Auditoria geral) |
| **RNF-003** (Privacidade de Dados) | NFR-08 (Privacidade) | - | BR-090 (Auditoria) |
| **RNF-004** (Explicabilidade) | NFR-03 (Explicabilidade) | AI-02 (Transparência), AI-03 (Explicabilidade) | BR-004 (Explicabilidade) |
| **RNF-005** (Auditoria de Contexto) | NFR-04, NFR-19 | AI-05 (Consistência) | BR-042 (Histórico do Brief), BR-092 |
| **RNF-006** (Tempo de Resposta) | NFR-09 (Desempenho) | - | - |
| **RNF-007** (Escalabilidade Contexto) | NFR-10 (Escalabilidade) | AI-06 (Contexto Único) | BR-040 (Fonte Única de Contexto) |
| **RNF-008** (Disponibilidade) | NFR-11 (Disponibilidade) | - | - |
| **RNF-009** (Resiliência de API) | NFR-12 (Resiliência) | Tratamento de Incerteza/Erro | BR-101 (Limitações do Sistema) |
| **RNF-010** (Usabilidade do Plan) | NFR-14 (Usabilidade) | - | BR-080 (Revisão Obrigatória) |

---

# Diretrizes de Evolução

* **Manutenção de IDs:** Sempre que novos requisitos funcionais (RF) ou não funcionais (RNF) forem criados no `requirements-catalog.md`, esta matriz deve ser imediatamente atualizada pelo `@product` para refletir os novos mapeamentos.
* **Consistência:** A engenharia técnica, ao formular os Planos de Implementação Ativos em `technical-context-lite.md`, deve referenciar diretamente os IDs de requisitos funcionais (`RF-xxx`) e regras de negócio (`BR-xxx`) mapeados nesta matriz para garantir que o código implementado atenda ao planejado.
* **Critério de Pronto (DoD):** Nenhuma feature técnica é considerada finalizada (Feito) no checklist de engenharia sem que sua cobertura de teste passe pelos critérios de aceitação e regras mapeados nas linhas desta matriz.

---

# Status de Implementação (Sync 2026-07-06)

> Atualizado por `@docs` via engenharia reversa do código em `backend/` e `site/copilot/`. Legenda: ✅ Implementado · ⚠️ Parcial · ❌ Não implementado · 🐛 Bug conhecido

| RF | Status | Evidência no código |
|---|---|---|
| RF-001 | ⚠️ | Apenas colagem de texto via modal; `pypdf`/`python-docx` não usados |
| RF-002 | ✅ | `generate_initial_brief()` com Gemini 2.5 Flash; e2e validado 2026-07-06 |
| RF-003 | ⚠️ | Schema Pydantic normaliza; deduplicação limitada ao prompt LLM |
| RF-004 | ❌ | Campo `references[]` no model; não populado na extração |
| RF-005 | ✅ | `context_version`, `history[]` em create/enrich/validate |
| RF-006 | ⚠️ | `technologies[]`, `customer.segment` extraídos; sem classificador dedicado |
| RF-007 | ⚠️ | Campo `confidence_level` existe; sem lógica de cálculo explícita |
| RF-008 | ❌ | Sem alerta/bloqueio por confiança baixa |
| RF-009 | ⚠️ | `search_kb()` LIKE simples; query multi-termo quebrada |
| RF-010 | ⚠️ | Gaps gerados no enrich (mock não gera; IA real pendente de fix) |
| RF-011 | ⚠️ | Idem RF-010 |
| RF-012 | ⚠️ | Idem RF-010 |
| RF-013 | ⚠️ | Idem RF-010 |
| RF-014 | ⚠️ | Campo `executive_summary`; preenchido no enrich |
| RF-015 | ⚠️ | `discovery_plan` no model/UI; exportação de documento ausente |
| RF-016 | ✅ | Edição manual de todos os campos do brief na UI (2026-07-08), incluindo gaps/riscos/perguntas/premissas/stakeholders/referências |

| RNF | Status | Nota |
|---|---|---|
| RNF-001 | ⚠️ | Acoplado ao Gemini SDK; mock fallback agnóstico |
| RNF-002 | ❌ | Sem auth/RBAC |
| RNF-003 | ❌ | Sem sanitização de dados sensíveis |
| RNF-004 | ❌ | Sem exibição de fontes/trechos de origem |
| RNF-005 | ⚠️ | Histórico por versão; sem log de auditoria separado |
| RNF-006 | ⚠️ | Não medido; timeout e2e = 120s |
| RNF-007 | ❌ | Sem upload de arquivos multi-página |
| RNF-008–010 | ⚠️ | MVP local; não validado em produção |
