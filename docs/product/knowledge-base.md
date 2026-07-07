# Knowledge Base

## Discovery Copilot AI

| Campo | Valor |
|--------|--------|
| **Documento** | Knowledge Base |
| **Arquivo** | knowledge-base.md |
| **Produto** | Discovery Copilot AI |
| **Versão** | 1.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-07-06 |

---

# Objetivo

Este documento define como o conhecimento corporativo é organizado, classificado, governado e disponibilizado para utilização pelo Discovery Copilot AI.

Seu objetivo é garantir que todas as recomendações produzidas pelo produto sejam fundamentadas em conhecimento oficial, atualizado, rastreável e governado.

Este documento não descreve tecnologias de armazenamento ou mecanismos de busca semântica.

---

# Visão Geral

A Knowledge Base representa o conjunto oficial de conhecimento corporativo utilizado pelo Discovery Copilot AI.

Ela centraliza informações provenientes de diferentes áreas da organização e disponibiliza esse conhecimento de forma estruturada para apoiar a preparação de reuniões de discovery.

A Knowledge Base é considerada uma fonte oficial de conhecimento, mas **não representa o contexto da oportunidade**.

O contexto da oportunidade é mantido exclusivamente pelo **Canonical Brief**.

---

# Objetivos

A Knowledge Base deve permitir:

- reutilização do conhecimento corporativo;
- padronização das recomendações;
- redução da dependência de especialistas;
- aumento da consistência entre analistas;
- melhoria da qualidade técnica das respostas;
- rastreabilidade da origem das informações.

---

# Princípios

## KB-01 — Fonte Oficial

Somente conteúdos aprovados pela organização poderão compor a Knowledge Base.

---

## KB-02 — Separação de Contexto

A Knowledge Base nunca representa o contexto da oportunidade.

Ela apenas fornece conhecimento para enriquecê-lo.

---

## KB-03 — Governança

Todo conhecimento deverá possuir responsável definido.

---

## KB-04 — Versionamento

Todo conteúdo deverá possuir histórico de versões.

---

## KB-05 — Curadoria

A inclusão, alteração ou remoção de conhecimento depende de validação humana.

---

## KB-06 — Rastreabilidade

Toda informação deverá possuir origem identificável.

---

# Estrutura Conceitual

A Knowledge Base é organizada em ativos de conhecimento.

Cada ativo representa um conteúdo reutilizável pela organização.

Exemplos:

- documento técnico;
- metodologia;
- playbook;
- arquitetura de referência;
- catálogo de produtos;
- checklist;
- FAQ;
- guia de boas práticas;
- documentação de integrações.

---

# Categorias

Os ativos poderão ser classificados por múltiplas dimensões.

## Área

- Comercial
- Pré-Vendas
- Arquitetura
- Engenharia
- Segurança
- Dados
- Infraestrutura

---

## Segmento

- Financeiro
- Saúde
- Varejo
- Educação
- Governo
- Indústria

---

## Tecnologia

- Cloud
- Kubernetes
- SAP
- Salesforce
- IA
- Dados
- APIs

---

## Tipo

- Processo
- Produto
- Arquitetura
- Serviço
- Integração
- Compliance
- Segurança

---

# Estrutura de um Ativo de Conhecimento

Todo ativo deverá possuir, no mínimo:

- identificador;
- título;
- descrição;
- categoria;
- palavras-chave;
- área responsável;
- autor;
- proprietário;
- data de criação;
- data de atualização;
- versão;
- status;
- origem;
- nível de confidencialidade.

---

# Ciclo de Vida

Todo conhecimento passa pelas seguintes etapas:

```text
Criação

↓

Revisão

↓

Aprovação

↓

Publicação

↓

Utilização

↓

Atualização

↓

Arquivamento
```

---

# Utilização pelo Discovery Copilot AI

Durante a execução das capacidades do produto, a IA poderá:

- pesquisar ativos relevantes;
- recuperar documentos;
- utilizar conhecimento aprovado;
- justificar recomendações;
- enriquecer o Canonical Brief.

A IA nunca altera diretamente a Knowledge Base.

---

# Relação com o Canonical Brief

A Knowledge Base e o Canonical Brief possuem responsabilidades distintas.

## Knowledge Base

Representa conhecimento corporativo permanente.

---

## Canonical Brief

Representa o conhecimento específico de uma oportunidade.

---

```text
Knowledge Base

↓

Fornece Conhecimento

↓

Canonical Brief

↓

Discovery Plan
```

---

# Curadoria

A curadoria é responsabilidade humana.

Ela envolve:

- revisão técnica;
- aprovação do conteúdo;
- classificação;
- atualização;
- descontinuação.

---

# Controle de Qualidade

Todo ativo deverá possuir critérios mínimos de qualidade.

Exemplos:

- conteúdo atualizado;
- responsável definido;
- origem conhecida;
- linguagem padronizada;
- classificação correta.

---

# Busca

A Knowledge Base deverá permitir recuperação considerando:

- palavras-chave;
- categoria;
- segmento;
- tecnologia;
- tipo de ativo;
- contexto da oportunidade.

A forma de implementação dessa recuperação será definida em `technical-context-lite.md`.

---

# Limitações

A Knowledge Base não:

- substitui especialistas;
- representa oportunidades;
- armazena decisões comerciais;
- contém contexto específico de clientes;
- modifica automaticamente seu conteúdo.

---

# Indicadores

A qualidade da Knowledge Base poderá ser acompanhada por indicadores como:

- percentual de conteúdos atualizados;
- reutilização dos ativos;
- cobertura por segmento;
- cobertura por tecnologia;
- tempo médio de atualização;
- ativos sem responsável;
- taxa de utilização pelo Discovery Copilot AI.

---

# Documentos Relacionados

Este documento complementa:

- business-context-lite.md
- process.md
- domain-model.md
- canonical-brief.md
- business-rules.md
- specification.md
- ai-behavior.md
- non-functional-requirements.md
- technical-context-lite.md

---

# Diretrizes de Evolução

A evolução da Knowledge Base deverá preservar sua governança, rastreabilidade e qualidade.

Novas categorias, tipos de ativos ou metadados poderão ser incorporados conforme a maturidade do produto, desde que mantenham compatibilidade com o modelo conceitual definido neste documento.

Aspectos técnicos como indexação, embeddings, busca semântica, banco vetorial, pipelines de ingestão, sincronização e atualização automática deverão ser especificados exclusivamente em `technical-context-lite.md`.