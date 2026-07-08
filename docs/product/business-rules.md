# Business Rules

## Discovery Copilot AI

| Campo | Valor |
|--------|-------|
| **Documento** | Business Rules |
| **Produto** | Discovery Copilot AI |
| **Versão** | 1.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-07-06 |

---

# Objetivo

Este documento centraliza todas as regras de negócio do Discovery Copilot AI.

Seu objetivo é garantir que o comportamento do produto permaneça consistente independentemente da tecnologia utilizada ou da implementação adotada.

Todas as funcionalidades, processos, agentes de IA e futuras implementações deverão respeitar as regras aqui definidas.

---

# Escopo

Este documento contempla:

- Regras do Produto;
- Regras do Processo;
- Regras do Canonical Brief;
- Regras de utilização da IA;
- Regras da Knowledge Base;
- Regras de Governança;
- Regras de Validação;
- Regras de Evolução do Contexto.

Não contempla:

- Decisões de arquitetura;
- Regras técnicas de implementação;
- Configurações de infraestrutura.

---

# Princípios Gerais

## BR-001 — A IA atua como copiloto

O Discovery Copilot AI auxilia o analista durante todo o processo de discovery.

A responsabilidade final pelas decisões permanece sempre com o analista de Pré-Vendas.

---

## BR-002 — A decisão final é humana

Nenhuma recomendação gerada pela IA poderá ser considerada automaticamente aprovada.

Toda saída deverá ser validada por um analista.

---

## BR-003 — Transparência

A IA nunca deverá ocultar limitações, dúvidas ou incertezas.

Sempre que existir baixa confiança, isso deverá ser explicitado.

---

## BR-004 — Explicabilidade

Toda recomendação deverá possuir justificativa e rastreabilidade.

Sempre que possível, a origem da informação deverá ser apresentada.

---

## BR-005 — Conhecimento Oficial

Somente informações provenientes da Knowledge Base oficial poderão ser utilizadas como base para recomendações.

Quando não existir conhecimento oficial suficiente, a IA deverá informar essa limitação.

---

# Regras do Processo

## BR-010 — Recebimento da Oportunidade

Toda oportunidade deverá possuir um identificador antes do início do processo.

---

## BR-011 — Leitura do Briefing

Todo documento recebido deverá ser interpretado antes da normalização.

---

## BR-012 — Padronização

Todo briefing deverá ser transformado em um Canonical Brief.

Nenhuma etapa posterior poderá consumir diretamente documentos originais.

---

## BR-013 — Evolução Contínua

O Canonical Brief representa o contexto oficial da oportunidade.

Todas as capacidades do produto enriquecem esse mesmo contexto.

Não poderão existir múltiplos contextos paralelos para uma mesma oportunidade.

---

## BR-014 — Atualização do Contexto

Sempre que novas informações forem recebidas, o Canonical Brief deverá ser atualizado.

As versões anteriores deverão permanecer rastreáveis.

---

# Regras de Classificação

## BR-020 — Classificação Obrigatória

Toda oportunidade deverá ser classificada antes da geração das perguntas.

---

## BR-021 — Confiança

Toda classificação deverá possuir um nível de confiança.

---

## BR-022 — Baixa Confiança

Quando o nível de confiança for considerado insuficiente, o sistema deverá solicitar confirmação ao analista.

---

# Regras da Knowledge Base

## BR-030 — Fonte Oficial

Somente documentos oficiais poderão compor a Knowledge Base utilizada pelo produto.

---

## BR-031 — Conteúdo Inexistente

Quando não existir conhecimento oficial disponível, essa limitação deverá ser apresentada explicitamente.

A IA não poderá complementar a resposta com conhecimento externo sem autorização.

---

## BR-032 — Integridade

O Discovery Copilot AI nunca altera diretamente o conteúdo da Knowledge Base.

A curadoria permanece sob responsabilidade humana.

---

# Regras do Canonical Brief

## BR-040 — Fonte Única de Contexto

Todas as funcionalidades do produto utilizam exclusivamente o Canonical Brief.

---

## BR-041 — Contexto Evolutivo

O Canonical Brief evolui continuamente durante o ciclo da oportunidade.

---

## BR-042 — Histórico

Toda alteração deverá gerar histórico.

---

## BR-043 — Rastreabilidade

Toda informação deverá possuir origem identificável.

---

## BR-044 — Conflitos

Informações conflitantes nunca deverão ser descartadas automaticamente.

Devem permanecer registradas até validação humana.

---

# Regras para Geração de Perguntas

## BR-050 — Contextualização

Perguntas deverão ser adaptadas ao contexto da oportunidade.

---

## BR-051 — Priorização

Perguntas obrigatórias possuem prioridade sobre perguntas complementares.

---

## BR-052 — Lacunas

Perguntas deverão priorizar o preenchimento das informações ausentes.

---

# Regras para Premissas

## BR-060 — Premissas Explícitas

Toda premissa deverá ser identificada como hipótese.

---

## BR-061 — Premissas não são fatos

Premissas nunca poderão ser apresentadas como informações confirmadas.

---

# Regras para Riscos

## BR-070 — Identificação

Todo risco deverá possuir categoria.

Categorias:

- Técnico;
- Comercial;
- Operacional;
- Negócio.

---

## BR-071 — Dependências

Sempre que possível, riscos deverão possuir dependências identificadas.

---

# Regras de Validação Humana

## BR-080 — Revisão Obrigatória

Todo Discovery Plan deverá passar por revisão humana.

---

## BR-081 — Correções

Correções realizadas pelo analista deverão enriquecer o Canonical Brief.

---

## BR-082 — Aprendizado

Feedbacks do analista poderão ser utilizados para melhoria contínua do produto, respeitando as políticas de governança.

---

# Regras de Papéis e Responsabilidades

## BR-083 — Matriz de Responsabilidades

As atividades do processo de Pré-Vendas deverão respeitar a matriz de responsabilidades (RACI) definida pela organização.

Quando uma atividade possuir responsáveis definidos, o Discovery Copilot AI deverá utilizar essa informação para contextualizar suas recomendações.

---

## BR-084 — Identificação dos Papéis

Sempre que possível, o Discovery Copilot AI deverá identificar os papéis organizacionais envolvidos na atividade em análise.

Essa identificação poderá incluir:

- Responsável (Responsible);
- Aprovador (Approver);
- Consultado (Consulted);
- Informado (Informed).

---

## BR-085 — Recomendações Contextualizadas

As recomendações produzidas pela IA deverão considerar a etapa do processo e os papéis envolvidos.

Quando uma recomendação depender da participação de outro ator organizacional, essa dependência deverá ser explicitada ao analista.

---

## BR-086 — Governança Organizacional

O Discovery Copilot AI não poderá alterar, substituir ou redefinir responsabilidades estabelecidas pela organização.

A matriz RACI é considerada uma referência oficial do processo corporativo.

---

# Regras de Governança

## BR-090 — Auditoria

Todas as alterações relevantes deverão permanecer auditáveis.

---

## BR-091 — Versionamento

Toda alteração estrutural deverá respeitar o versionamento do produto.

---

## BR-092 — Histórico

Nenhuma atualização deverá eliminar o histórico da oportunidade.

---

# Regras de IA Responsável

## BR-100 — Não Alucinação

A IA não deverá inventar informações.

Quando não houver contexto suficiente, deverá informar explicitamente a limitação.

---

## BR-101 — Limitações

Toda limitação deverá ser comunicada ao analista.

---

## BR-102 — Incerteza

A IA deverá indicar o nível de confiança das recomendações.

---

## BR-103 — Neutralidade

A IA não deverá assumir decisões comerciais, técnicas ou contratuais.

---

# Matriz de Rastreabilidade

| Regra | Documento(s) Relacionado(s) |
|--------|-----------------------------|
| BR-001 a BR-005 | business-context-lite.md |
| BR-010 a BR-014 | process.md |
| BR-020 a BR-022 | specification.md |
| BR-030 a BR-032 | knowledge-base.md |
| BR-040 a BR-044 | canonical-brief.md |
| BR-050 a BR-071 | specification.md |
| BR-080 a BR-082 | process.md |
| BR-083 a BR-086 | process.md / domain-model.md / specification.md |
| BR-090 a BR-103 | non-functional-requirements.md |

---

# Diretrizes de Evolução

- Toda nova funcionalidade deverá avaliar se introduz novas regras de negócio.
- Novas regras deverão ser registradas neste documento antes de sua implementação.
- Regras descontinuadas não deverão ser removidas, mas marcadas como obsoletas para preservar a rastreabilidade.
- Este documento é a referência oficial para comportamento funcional do produto e deve ser consultado por Produto, Engenharia, QA e IA antes de qualquer alteração.