# Product Glossary

## Discovery Copilot AI

| Campo | Valor |
|--------|--------|
| **Documento** | Product Glossary |
| **Arquivo** | product-glossary.md |
| **Produto** | Discovery Copilot AI |
| **Versão** | 1.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-06-29 |

---

# Objetivo

Este documento estabelece a **Linguagem Ubíqua (Ubiquitous Language)** do Discovery Copilot AI.

Seu objetivo é garantir que Produto, Engenharia, IA, QA e demais envolvidos utilizem os mesmos termos com o mesmo significado ao longo de todo o ciclo de vida do projeto.

As definições aqui presentes são conceituais. A modelagem das entidades encontra-se em `domain-model.md`.

---

# Princípios

- Cada termo possui um único significado oficial.
- Termos sinônimos devem ser evitados na documentação.
- Novos termos devem ser adicionados a este documento antes de serem utilizados em outros artefatos.
- O glossário representa a referência oficial da terminologia do produto.

---

# Glossário

## Oportunidade (Opportunity)

Possível projeto, demanda ou iniciativa identificada pelo Comercial e encaminhada ao processo de Pré-Vendas.

É a unidade principal de trabalho do Discovery Copilot AI.

---

## Briefing

Conjunto inicial de informações recebidas sobre uma oportunidade.

Pode ter origem em CRM, e-mails, RFP, RFQ, documentos anexos ou outros canais.

---

## Canonical Brief

Documento vivo que representa o contexto oficial e consolidado da oportunidade.

É enriquecido continuamente durante todo o processo de discovery.

Todas as funcionalidades do produto utilizam o Canonical Brief como única fonte de contexto.

---

## Discovery

Processo de entendimento do problema do cliente, objetivos, restrições, tecnologias, riscos e critérios de sucesso.

---

## Discovery Plan

Documento estruturado utilizado para conduzir a reunião de discovery.

Pode conter:

- perguntas;
- premissas;
- riscos;
- lacunas;
- próximos passos.

---

## Executive Summary

Resumo executivo consolidado da oportunidade.

Destina-se ao compartilhamento rápido do contexto entre diferentes áreas.

---

## Knowledge Base

Repositório oficial de conhecimento corporativo utilizado pelo Discovery Copilot AI.

Não representa oportunidades.

Fornece conhecimento para enriquecer o Canonical Brief.

---

## Knowledge Asset

Qualquer conteúdo oficial armazenado na Knowledge Base.

Exemplos:

- playbooks;
- arquiteturas;
- documentos técnicos;
- FAQs;
- guias;
- checklists.

---

## Gap

Informação considerada necessária para compreender adequadamente a oportunidade, mas que ainda não está disponível.

---

## Question

Pergunta sugerida pela IA para reduzir lacunas identificadas durante a análise.

---

## Premise

Hipótese assumida temporariamente durante a análise da oportunidade.

Premissas nunca devem ser tratadas como fatos.

---

## Risk

Evento ou condição que pode impactar negativamente o sucesso da oportunidade.

Pode ser técnico, comercial, operacional ou de negócio.

---

## Classification

Resultado do processo de classificação automática da oportunidade.

Inclui:

- categoria;
- segmento;
- tecnologias;
- tipo de solução;
- nível de confiança.

---

## Confidence Level

Indicador do grau de confiança da IA em determinada interpretação ou recomendação.

Quando baixo, exige confirmação humana.

---

## Recommendation

Sugestão produzida pela IA com base no contexto da oportunidade e no conhecimento corporativo.

Toda recomendação depende de validação humana.

---

## Analista de Pré-Vendas

Responsável pela condução do discovery e pela validação das recomendações produzidas pela IA.

É o responsável final pelas decisões.

---

## Discovery Copilot AI

Agente de Inteligência Artificial que atua como copiloto do Analista de Pré-Vendas.

Seu papel é interpretar contexto, consultar conhecimento corporativo e apoiar a tomada de decisão.

---

## Knowledge Retrieval

Processo de recuperação de conhecimento oficial da Knowledge Base para enriquecer o contexto da oportunidade.

---

## Contexto

Conjunto de informações conhecidas sobre uma oportunidade em determinado momento.

O contexto oficial é representado exclusivamente pelo Canonical Brief.

---

# Documentos Relacionados

- business-context-lite.md
- process.md
- domain-model.md
- canonical-brief.md
- specification.md

---

# Diretrizes de Evolução

Todo novo conceito de negócio deverá ser incorporado primeiro neste glossário antes de ser utilizado em outros documentos do projeto.

Este documento representa a referência oficial da linguagem ubíqua do Discovery Copilot AI.