# Requirements Catalog

## Discovery Copilot AI

| Campo | Valor |
|--------|--------|
| **Documento** | Requirements Catalog |
| **Arquivo** | requirements-catalog.md |
| **Produto** | Discovery Copilot AI |
| **Versão** | 1.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-07-06 |

---

# Objetivo

Este documento contém o Catálogo de Requisitos Funcionais e Não Funcionais do Discovery Copilot AI. 

Seu objetivo é detalhar as capacidades funcionais em requisitos granulares e testáveis, e mapear formalmente as necessidades operacionais e de qualidade do produto. Esse catálogo serve como ponte de desenvolvimento para a Engenharia e base de verificação para o QA.

---

# Requisitos Funcionais (RF)

| ID | Nome | Descrição | Prioridade | Capacidade Relacionada |
|---|---|---|---|---|
| **RF-001** | Upload e Processamento de Briefing | O sistema deve permitir que o Comercial ou Analista faça upload de briefings (PDF, Word, e-mails, RFPs, RFQs ou transcrições de atas) para iniciar o processo de discovery. | Alta | CF-01 |
| **RF-002** | Extração Inteligente de Fatos | O sistema deve extrair de forma automática fatos relevantes (objetivos, restrições, dores, tecnologias, prazos e stakeholders) a partir dos documentos de entrada usando processamento de linguagem natural (LLM). | Alta | CF-01 |
| **RF-003** | Normalização de Campos de Negócio | O sistema deve padronizar as informações extraídas de múltiplos formatos, eliminando duplicidades e alinhando com a estrutura padronizada do Canonical Brief. | Alta | CF-02 |
| **RF-004** | Registro de Origem (Explicabilidade) | Cada fato, objetivo ou restrição inserido no Canonical Brief deve obrigatoriamente referenciar o documento de origem e o trecho interpretado. | Alta | CF-02 |
| **RF-005** | Controle de Histórico do Contexto | Cada atualização do Canonical Brief decorrente de novas informações deve incrementar uma nova versão (ex: v1, v2, v3) e registrar as alterações realizadas. | Média | CF-02 |
| **RF-006** | Classificação Automática de Oportunidades | O sistema deve classificar a oportunidade quanto à categoria do projeto, segmento de mercado, tecnologias propostas e complexidade técnica. | Média | CF-03 |
| **RF-007** | Indicação de Confiança da Classificação | Para cada classificação gerada, o sistema deve computar e exibir um indicador de nível de confiança (Baixo, Médio, Alto). | Alta | CF-03 |
| **RF-008** | Validação Humana de Classificação | Se o nível de confiança da classificação for considerado Baixo, o sistema deve emitir um alerta destacando a incerteza e forçar a validação do analista antes de prosseguir. | Alta | CF-03 |
| **RF-009** | Busca e Resgate de Ativos de Conhecimento | O sistema deve realizar busca semântica na Knowledge Base corporativa para identificar Playbooks, FAQs e Casos de Sucesso aplicáveis à classificação da oportunidade. | Alta | CF-04 |
| **RF-010** | Identificação e Mapeamento de Gaps | O sistema deve comparar as informações do Canonical Brief com o modelo de dados esperado para classificar o que são informações ausentes (gaps críticos). | Alta | CF-05 |
| **RF-011** | Geração e Priorização de Perguntas | O sistema deve gerar uma lista de perguntas recomendadas organizadas por criticidade (obrigatórias e complementares) focadas em preencher os gaps detectados. | Alta | CF-06 |
| **RF-012** | Formulador de Premissas | O sistema deve gerar uma listagem de premissas (hipóteses operacionais e técnicas) baseadas nos dados não confirmados ou assumidos sobre a oportunidade. | Média | CF-07 |
| **RF-013** | Levantamento Automático de Riscos | O sistema deve sugerir riscos em quatro categorias (Técnico, Comercial, Operacional e de Negócio) derivados do cenário atual da oportunidade e das premissas registradas. | Média | CF-08 |
| **RF-014** | Consolidação do Executive Summary | O sistema deve consolidar o estado atual de negócio do cliente, o problema central, os objetivos da oportunidade, os riscos e as lacunas em um resumo conciso. | Média | CF-09 |
| **RF-015** | Geração do Roteiro de Discovery Plan | O sistema deve exportar um documento roteirizado contendo o Executive Summary, as perguntas priorizadas, os riscos previstos e as premissas para a reunião. | Alta | CF-10 |
| **RF-016** | Edição Manual de Recomendações de IA | O analista de Pré-Vendas deve poder editar, excluir ou adicionar perguntas, premissas ou riscos antes do encerramento da fase de planejamento. | Alta | CF-10 |

---

# Requisitos Não Funcionais (RNF)

| ID | Nome | Requisito de Qualidade | Prioridade | Requisito Relacionado |
|---|---|---|---|---|
| **RNF-001** | Portabilidade e Independência de Modelos | O comportamento lógico e a extração estruturada do sistema devem ser agnósticos de modelo de LLM (GPT, Claude, Gemini). | Alta | NFR-18 |
| **RNF-002** | Segurança e Permissões | O acesso ao Canonical Brief e à Knowledge Base deve seguir controles rigorosos baseados na regra de acesso mínimo necessário (RBAC). | Alta | NFR-07 |
| **RNF-003** | Privacidade e Proteção de Dados | Informações sensíveis de clientes ou dados sob LGPD devem ser filtrados, sanitizados ou mascarados ao serem enviados a APIs públicas de modelos de linguagem. | Alta | NFR-08 |
| **RNF-004** | Explicabilidade e Transparência | Toda recomendação gerada por IA deve exibir as fontes internas e as premissas assumidas que justificam aquela conclusão. | Alta | NFR-02, NFR-03 |
| **RNF-005** | Auditoria e Rastreabilidade | Todas as modificações estruturais realizadas no Canonical Brief (sejam por IA ou por analista) devem ser registradas em log de auditoria permanente. | Média | NFR-04, NFR-19 |
| **RNF-006** | Tempo de Resposta da IA | O processamento de leitura de briefings e a consolidação inicial do Canonical Brief devem levar no máximo 30 segundos sob condições normais de rede. | Média | NFR-09 |
| **RNF-007** | Escalabilidade de Contexto | O sistema deve ser capaz de processar e consolidar briefings que contenham até 100 páginas de documentos de entrada sem estourar o contexto máximo ou degradar a performance. | Alta | NFR-10 |
| **RNF-008** | Disponibilidade Operacional | A API de consulta e enriquecimento de oportunidades deve estar disponível com SLA de no mínimo 99.5% durante o horário comercial. | Média | NFR-11 |
| **RNF-009** | Resiliência a Falhas de API | Em caso de falha de conexão ou timeout na API da LLM, o sistema deve possuir mecanismo de Retry exponencial com fallback de erro amigável ao usuário. | Alta | NFR-12 |
| **RNF-010** | Usabilidade Simplificada | A tela de edição do Discovery Plan pelo analista deve requerer no máximo 3 cliques para validar e salvar o plano finalizado. | Baixa | NFR-14 |

---

# Diretrizes de Evolução

* Qualquer alteração no escopo ou nas capacidades funcionais definidas em `specification.md` deve refletir em novos requisitos ou na alteração dos requisitos listados neste catálogo.
* Os identificadores de requisitos (RF-xxx e RNF-xxx) devem permanecer fixos para garantir a estabilidade da Matriz de Rastreabilidade. Regras e requisitos descontinuados devem ser marcados como `[OBSOLETO]` ao invés de removidos fisicamente.
