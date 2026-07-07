# Product Specification

## Discovery Copilot AI

| Campo | Valor |
|--------|--------|
| **Documento** | Product Specification |
| **Arquivo** | specification.md |
| **Produto** | Discovery Copilot AI |
| **Versão** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-06-29 |

---

# Objetivo

Este documento especifica todas as capacidades funcionais do Discovery Copilot AI.

Seu objetivo é transformar o contexto de negócio em funcionalidades claramente especificadas, rastreáveis e preparadas para implementação.

Este documento representa a transição entre Produto e Engenharia.

---

# Escopo

Esta especificação contempla:

- capacidades do produto;
- funcionalidades;
- histórias de usuário;
- critérios de aceite;
- Definition of Done;
- rastreabilidade funcional.

Não contempla:

- arquitetura;
- tecnologias;
- APIs;
- banco de dados;
- infraestrutura.

---

# Referências

Esta especificação complementa:

- business-context-lite.md
- process.md
- domain-model.md
- canonical-brief.md
- business-rules.md

---

# Visão Funcional

O Discovery Copilot AI auxilia analistas de Pré-Vendas durante todo o processo de preparação do discovery.

O produto mantém continuamente um **Canonical Brief**, considerado o contexto oficial da oportunidade.

Todas as funcionalidades descritas neste documento consultam ou enriquecem esse contexto.

---

# Capacidades do Produto

| Código | Capacidade |
|----------|----------------------------|
| CF-01 | Interpretar Oportunidade |
| CF-02 | Consolidar Canonical Brief |
| CF-03 | Classificar Oportunidade |
| CF-04 | Consultar Knowledge Base |
| CF-05 | Detectar Lacunas |
| CF-06 | Gerar Perguntas |
| CF-07 | Gerar Premissas |
| CF-08 | Identificar Riscos |
| CF-09 | Produzir Executive Summary |
| CF-10 | Produzir Discovery Plan |

---

# Especificação das Capacidades

## CF-01 — Interpretar Oportunidade

### Objetivo

Interpretar documentos recebidos e compreender o contexto inicial da oportunidade.

### Entradas

- CRM
- Briefing
- RFP
- RFQ
- E-mails
- Documentos anexos

### Saídas

Atualização do Canonical Brief.

### Regras Relacionadas

- BR-011
- BR-012
- BR-013

### Conceitos do Domínio

- Opportunity
- Canonical Brief

---

## CF-02 — Consolidar Canonical Brief

### Objetivo

Padronizar e consolidar todas as informações conhecidas da oportunidade.

### Responsabilidades

- normalizar informações;
- consolidar contexto;
- registrar origem das informações;
- manter histórico.

### Regras Relacionadas

- BR-013
- BR-014
- BR-040
- BR-041

### Conceitos do Domínio

- Canonical Brief

---

## CF-03 — Classificar Oportunidade

### Objetivo

Classificar automaticamente a oportunidade.

### Resultado Esperado

- categoria;
- segmento;
- tecnologias;
- tipo de solução;
- nível de confiança.

### Regras Relacionadas

- BR-020
- BR-021
- BR-022

### Conceitos

- Classification

---

## CF-04 — Consultar Knowledge Base

### Objetivo

Recuperar conhecimento oficial relevante para o contexto da oportunidade.

### Resultado Esperado

Enriquecimento do Canonical Brief.

### Regras Relacionadas

- BR-030
- BR-031
- BR-032

### Conceitos

- Knowledge Base

---

## CF-05 — Detectar Lacunas

### Objetivo

Identificar informações necessárias ainda não conhecidas.

### Resultado Esperado

Lista priorizada de gaps.

### Regras Relacionadas

- BR-052

### Conceitos

- Gap

---

## CF-06 — Gerar Perguntas

### Objetivo

Produzir perguntas contextualizadas para reduzir as lacunas identificadas.

### Tipos

- obrigatórias;
- complementares;
- técnicas;
- comerciais;
- contexto.

### Regras Relacionadas

- BR-050
- BR-051
- BR-052

### Conceitos

- Question

---

## CF-07 — Gerar Premissas

### Objetivo

Registrar hipóteses utilizadas durante a análise.

### Resultado Esperado

Premissas documentadas.

### Regras Relacionadas

- BR-060
- BR-061

### Conceitos

- Premise

---

## CF-08 — Identificar Riscos

### Objetivo

Detectar riscos relacionados à oportunidade.

### Categorias

- Técnico
- Comercial
- Operacional
- Negócio

### Regras Relacionadas

- BR-070
- BR-071

### Conceitos

- Risk

---

## CF-09 — Produzir Executive Summary

### Objetivo

Consolidar o entendimento atual da oportunidade em um resumo executivo.

### Conceitos

- Executive Summary

---

## CF-10 — Produzir Discovery Plan

### Objetivo

Gerar o roteiro estruturado que apoiará a reunião de discovery.

### Conteúdo

- contexto consolidado;
- perguntas;
- lacunas;
- premissas;
- riscos;
- próximos passos.

### Conceitos

- Discovery Plan

---

# Histórias de Usuário

## US-001

Como Analista de Pré-Vendas

Quero enviar uma oportunidade

Para receber automaticamente um Canonical Brief estruturado.

Capacidades

- CF-01
- CF-02

---

## US-002

Como Analista

Quero que a IA classifique automaticamente a oportunidade

Para reduzir meu tempo de preparação.

Capacidades

- CF-03

---

## US-003

Como Analista

Quero visualizar lacunas do contexto

Para conduzir um discovery mais completo.

Capacidades

- CF-05
- CF-06

---

## US-004

Como Analista

Quero visualizar premissas e riscos

Para preparar uma solução consistente.

Capacidades

- CF-07
- CF-08

---

## US-005

Como Analista

Quero receber um Executive Summary

Para compartilhar rapidamente o contexto com outras áreas.

Capacidades

- CF-09

---

## US-006

Como Analista

Quero receber um Discovery Plan

Para conduzir a reunião de discovery.

Capacidades

- CF-10

---

# Critérios de Aceite

## Interpretação

- documentos interpretados corretamente;
- contexto atualizado;
- fontes registradas.

---

## Canonical Brief

- contexto consolidado;
- histórico preservado;
- rastreabilidade mantida.

---

## Classificação

- categoria corretamente identificada;
- confiança calculada;
- confirmação solicitada quando necessário.

---

## Knowledge Base

- somente conteúdo oficial utilizado;
- limitações explicitadas.

---

## Lacunas

- informações ausentes identificadas;
- prioridade definida.

---

## Perguntas

- contextualizadas;
- relacionadas às lacunas;
- organizadas por categoria.

---

## Premissas

- claramente identificadas;
- separadas de fatos.

---

## Riscos

- categorizados;
- priorizados;
- relacionados ao contexto.

---

## Executive Summary

- representa corretamente o entendimento atual da oportunidade.

---

## Discovery Plan

- contém todas as informações necessárias para condução do discovery.

---

# Definition of Done

Uma capacidade funcional será considerada concluída quando:

- todos os critérios de aceite forem atendidos;
- as Business Rules forem respeitadas;
- os testes forem aprovados;
- a documentação estiver atualizada;
- a rastreabilidade estiver preservada;
- houver validação do Product Owner;
- houver validação de um Analista de Pré-Vendas.

---

# Matriz de Rastreabilidade

| Capability | Processo | Domínio | Regras |
|------------|----------|----------|---------|
| CF-01 | Interpretar Briefing | Opportunity | BR-011 a BR-013 |
| CF-02 | Atualizar Canonical Brief | Canonical Brief | BR-013, BR-014, BR-040, BR-041 |
| CF-03 | Classificar Oportunidade | Classification | BR-020 a BR-022 |
| CF-04 | Consultar KB | Knowledge Base | BR-030 a BR-032 |
| CF-05 | Identificar Lacunas | Gap | BR-052 |
| CF-06 | Gerar Perguntas | Question | BR-050 a BR-052 |
| CF-07 | Gerar Premissas | Premise | BR-060 e BR-061 |
| CF-08 | Identificar Riscos | Risk | BR-070 e BR-071 |
| CF-09 | Produzir Executive Summary | Executive Summary | BR-080 |
| CF-10 | Produzir Discovery Plan | Discovery Plan | BR-080 e BR-081 |

---

# Documentos Relacionados

- business-context-lite.md
- process.md
- domain-model.md
- canonical-brief.md
- business-rules.md
- knowledge-base.md
- ai-behavior.md
- non-functional-requirements.md
- technical-context-lite.md

---

# Diretrizes de Evolução

Toda nova capacidade funcional deverá:

- estar alinhada ao contexto de negócio;
- utilizar os conceitos definidos no Domain Model;
- operar sobre o Canonical Brief;
- respeitar as Business Rules;
- possuir User Story;
- possuir Critérios de Aceite;
- possuir rastreabilidade completa.

A Specification representa a referência oficial das funcionalidades do produto e deve ser atualizada antes de qualquer implementação técnica.