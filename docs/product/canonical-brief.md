# Canonical Brief

## Discovery Copilot AI

| Campo | Valor |
|--------|-------|
| **Documento** | Canonical Brief |
| **Produto** | Discovery Copilot AI |
| **Versão** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-07-06 |

---

# Objetivo

O Canonical Brief é o **Contexto Oficial da Oportunidade** e representa o principal artefato do Discovery Copilot AI.

Seu objetivo é consolidar, organizar, enriquecer e manter continuamente atualizado todo o conhecimento relacionado a uma oportunidade comercial, independentemente da origem das informações.

Ao invés de representar apenas um documento padronizado, o Canonical Brief atua como o núcleo do domínio do produto, tornando-se a única fonte de contexto utilizada durante todo o ciclo de preparação do Discovery.

Todas as capacidades inteligentes do sistema consultam, enriquecem e validam esse mesmo objeto.

---

# Papel no Produto

O Canonical Brief é responsável por:

- consolidar todas as informações da oportunidade;
- eliminar diferenças entre formatos de entrada;
- representar o estado atual do conhecimento;
- manter histórico de evolução;
- servir como contrato funcional entre Produto e Engenharia;
- centralizar todo o contexto utilizado pelos agentes de IA.

Ele é a **Single Source of Truth (SSOT)** do Discovery Copilot AI.

---

# Objetivos

O Canonical Brief foi criado para:

- Padronizar informações provenientes de múltiplas fontes.
- Reduzir ambiguidades.
- Melhorar a interpretação da IA.
- Aumentar a qualidade das consultas à Knowledge Base.
- Diminuir alucinações.
- Garantir rastreabilidade.
- Manter um contexto evolutivo.
- Reutilizar conhecimento entre oportunidades.
- Servir como contrato de dados do produto.

---

# Princípios

## Fonte Única de Contexto

Todo o pipeline consome exclusivamente o Canonical Brief.

---

## Contexto Evolutivo

O contexto nunca é recriado.

Ele evolui continuamente.

---

## Independência da Origem

CRM

Email

RFP

RFQ

PDF

Word

PowerPoint

Atas

Todos são tratados igualmente.

---

## Explicabilidade

Toda informação deve possuir origem identificável.

---

## Rastreabilidade

Toda alteração deve possuir histórico.

---

## Transparência

Premissas e limitações nunca poderão ser ocultadas.

---

## Governança

Nenhuma informação poderá ser removida sem registro.

---

# Ciclo de Vida

## Estado 1

Opportunity criada.

↓

Recebimento do Briefing.

↓

Criação do Canonical Brief.

---

## Estado 2

Normalização.

↓

Extração de entidades.

↓

Organização das informações.

---

## Estado 3

Enriquecimento.

↓

Consulta à KB.

↓

Classificação.

↓

Identificação de lacunas.

↓

Perguntas.

↓

Premissas.

↓

Riscos.

↓

Resumo Executivo.

---

## Estado 4

Validação Humana.

↓

Correções.

↓

Confirmações.

↓

Ajustes.

---

## Estado 5

Consolidação.

↓

Discovery realizado.

↓

Contexto completo.

---

## Estado 6

Encerramento.

↓

Conhecimento consolidado.

↓

Disponível para reutilização.

---

# Fluxo Conceitual

```text
Documentos

CRM

Emails

PDFs

RFP

RFQ

Atas

PowerPoint

Word

           │

           ▼

Leitura

           ▼

Extração

           ▼

Normalização

           ▼

Canonical Brief

           ▼

Enriquecimento Contínuo

           ▼

Contexto Oficial
```

---

# Estrutura Geral

O Canonical Brief é composto pelos seguintes blocos.

## Opportunity

Informações da oportunidade.

---

## Customer

Dados do cliente.

---

## Stakeholders

Pessoas envolvidas.

---

## Business Context

Problema de negócio.

Objetivos.

Motivações.

---

## Current Scenario

Situação atual.

---

## Desired Scenario

Situação desejada.

---

## Scope

Escopo conhecido.

---

## Technologies

Tecnologias envolvidas.

---

## Constraints

Restrições.

---

## Assumptions

Premissas.

---

## Risks

Riscos.

---

## Missing Information

Lacunas.

---

## Questions

Perguntas sugeridas.

---

## Executive Summary

Resumo executivo.

---

## Discovery Plan

Plano consolidado do Discovery.

---

## References

Origem das informações.

---

## History

Histórico das atualizações.

---

## Confidence

Nível de confiança.

---

# Capacidades que Enriquecem o Contexto

Cada capacidade inteligente adiciona novas informações ao Canonical Brief.

## Normalização

Padroniza os documentos recebidos.

---

## Classificação

Classifica a oportunidade.

---

## Knowledge Base

Recupera conhecimento oficial.

---

## Gap Analysis

Identifica informações ausentes.

---

## Question Generator

Produz perguntas.

---

## Risk Analysis

Identifica riscos.

---

## Premise Generator

Registra premissas.

---

## Executive Summary

Consolida o entendimento.

---

## Human Validation

Permite correções e validações.

---

# Estados do Contexto

## Inicial

Contexto mínimo.

---

## Enriquecido

IA adicionou conhecimento.

---

## Validado

Analista confirmou.

---

## Consolidado

Discovery concluído.

---

## Encerrado

Oportunidade finalizada.

---

# Campos Obrigatórios

- Cliente
- Objetivo
- Problema
- Contexto
- Fonte das informações
- Nível de confiança

---

# Regras de Normalização

## CNB-01

Campos equivalentes devem ser unificados.

---

## CNB-02

Datas seguem ISO 8601.

---

## CNB-03

Tecnologias utilizam nomenclatura oficial.

---

## CNB-04

Duplicidades devem ser removidas.

---

## CNB-05

Conflitos nunca são descartados.

Devem ser sinalizados.

---

## CNB-06

Toda informação deve possuir origem.

---

## CNB-07

Toda atualização gera histórico.

---

# Versionamento

Existem dois tipos de versão.

## Modelo

Representa alterações estruturais.

Exemplo:

2.0.0

2.1.0

3.0.0

---

## Contexto

Representa a evolução da oportunidade.

Exemplo:

v0

↓

v1

↓

v2

↓

v3

---

# Modelo Conceitual

```text
                          Opportunity
                                │
                                ▼
                     Canonical Brief
                                │
        ┌───────────────┬───────────────┐
        ▼               ▼               ▼
 Classification   Knowledge Base   Human Validation
        │               │               │
        ├───────────────┼───────────────┤
        ▼               ▼               ▼
 Questions        Premises         Risks
                │
                ▼
       Executive Summary
                │
                ▼
         Discovery Plan
```

---

# Diretrizes de Evolução

O Canonical Brief representa o contexto oficial do Discovery Copilot AI.

Novas capacidades do produto deverão enriquecer esse contexto, nunca criar fontes paralelas de informação.

Toda alteração estrutural deverá refletir nos documentos:

- business-context-lite.md
- process.md
- domain-model.md
- specification.md
- technical-context-lite.md

O Canonical Brief deverá permanecer independente de qualquer tecnologia, banco de dados, framework ou modelo de IA, garantindo sua utilização como contrato funcional entre Produto, Engenharia e Operações.