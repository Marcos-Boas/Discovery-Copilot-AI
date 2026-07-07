# Domain Model

## Discovery Copilot AI

| Campo | Valor |
|--------|--------|
| **Documento** | Domain Model |
| **Arquivo** | domain-model.md |
| **Produto** | Discovery Copilot AI |
| **Versão** | 2.1.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-06-29 |

---

# Objetivo

Este documento descreve o modelo conceitual do domínio do Discovery Copilot AI.

Seu objetivo é representar as principais entidades do negócio, seus relacionamentos e responsabilidades.

As definições conceituais dos termos utilizados encontram-se em `product-glossary.md`.

---

# Referências

Este documento complementa:

- product-glossary.md
- business-context-lite.md
- process.md
- business-rules.md
- specification.md

---

# Modelo Conceitual

```text
Opportunity
      │
      ▼
Canonical Brief
      │
 ├──────────────┐
 ▼              ▼
Gap         Classification
 │              │
 ▼              ▼
Question     Recommendation
 │
 ▼
Discovery Plan
 │
 ├──────────────┐
 ▼              ▼
Premise      Risk
```

Knowledge Base fornece conhecimento para o Canonical Brief, mas não faz parte dele.

---

# Entidades do Domínio

## Opportunity

### Responsabilidade

Representar uma oportunidade comercial durante todo o ciclo de discovery.

### Relacionamentos

- possui um Canonical Brief;
- possui uma Classification;
- pode gerar um Discovery Plan.

---

## Canonical Brief

### Responsabilidade

Representar o contexto oficial e evolutivo da oportunidade.

### Relacionamentos

- pertence a uma Opportunity;
- consolida informações;
- referencia Knowledge Assets;
- contém Gaps, Questions, Premises e Risks.

---

## Classification

### Responsabilidade

Representar a classificação da oportunidade.

### Relacionamentos

- pertence ao Canonical Brief.

---

## Gap

### Responsabilidade

Representar informações ausentes ou incompletas.

### Relacionamentos

- pertence ao Canonical Brief;
- pode originar Questions.

---

## Question

### Responsabilidade

Representar perguntas sugeridas para reduzir lacunas.

### Relacionamentos

- responde a um Gap;
- integra o Discovery Plan.

---

## Premise

### Responsabilidade

Representar hipóteses utilizadas durante a análise.

### Relacionamentos

- pertence ao Canonical Brief.

---

## Risk

### Responsabilidade

Representar riscos identificados.

### Relacionamentos

- pertence ao Canonical Brief.

---

## Discovery Plan

### Responsabilidade

Representar o roteiro estruturado da reunião de discovery.

### Relacionamentos

- consolida Questions;
- consolida Premises;
- consolida Risks.

---

## Executive Summary

### Responsabilidade

Representar uma visão executiva consolidada da oportunidade.

### Relacionamentos

- deriva do Canonical Brief.

---

## Knowledge Base

### Responsabilidade

Representar o conhecimento corporativo oficial utilizado pela IA.

### Relacionamentos

- fornece Knowledge Assets;
- não pertence ao contexto da oportunidade.

---

## Knowledge Asset

### Responsabilidade

Representar um conteúdo oficial reutilizável.

### Relacionamentos

- pertence à Knowledge Base;
- pode ser referenciado pelo Canonical Brief.

---

# Regras Estruturais

- Toda Opportunity possui exatamente um Canonical Brief.
- Todo Canonical Brief pertence a apenas uma Opportunity.
- Questions devem estar associadas a um ou mais Gaps.
- Premises nunca substituem fatos.
- Risks devem estar associados ao contexto da oportunidade.
- Knowledge Assets nunca pertencem ao Canonical Brief, apenas são referenciados.

---

# Documentos Relacionados

- product-glossary.md
- process.md
- canonical-brief.md
- business-rules.md
- specification.md

---

# Diretrizes de Evolução

Novas entidades deverão representar conceitos permanentes do domínio.

Fluxos operacionais, regras de negócio e decisões técnicas não devem ser modelados como entidades.

Este documento representa a visão estrutural do domínio e deve permanecer independente da implementação técnica.