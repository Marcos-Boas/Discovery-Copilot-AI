# Business Context

> Este arquivo é a **SSOT (fonte única de verdade) de Produto** — outros artefatos CITAM este arquivo, nunca duplicam seu conteúdo. O agente `@product` o atualiza a cada descoberta. Ao preencher, **substitua (e remova) os `[colchetes]`**.
# Business Context Lite

## Discovery Copilot AI

| Campo | Valor |
|--------|-------|
| **Documento** | Business Context Lite |
| **Produto** | Discovery Copilot AI |
| **Versão** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-07-06 |

---

# Objetivo

Este documento apresenta o contexto de negócio do Discovery Copilot AI.

Seu propósito é explicar por que o produto existe, qual problema resolve, quem são seus usuários, quais objetivos estratégicos busca atingir e quais princípios orientam sua evolução.

Este documento representa a principal referência de contexto para todas as fases do ciclo Onion e serve como ponto de partida para os documentos de Processo, Modelo de Domínio, Regras de Negócio, Especificação Funcional e Engenharia.

---

# Visão do Produto

O Discovery Copilot AI é um copiloto inteligente para analistas de Pré-Vendas que auxilia na preparação de reuniões de discovery por meio da interpretação de oportunidades comerciais, consolidação de contexto e geração de recomendações fundamentadas em conhecimento corporativo oficial.

O produto transforma informações provenientes de diferentes fontes em um contexto único, estruturado e continuamente enriquecido, permitindo que analistas conduzam processos de discovery de forma mais consistente, rápida e rastreável.

A decisão final permanece sempre sob responsabilidade humana.

---

# Problema de Negócio

O processo de preparação de reuniões de discovery normalmente depende de informações distribuídas entre diferentes sistemas, documentos e especialistas.

Essa realidade gera problemas como:

- informações incompletas;
- conhecimento disperso;
- dependência excessiva de especialistas;
- falta de padronização;
- retrabalho;
- diferentes níveis de qualidade entre analistas;
- dificuldade para reutilizar conhecimento corporativo.

O Discovery Copilot AI nasce para reduzir essas limitações sem substituir o papel do analista.

---

# Proposta de Valor

O Discovery Copilot AI centraliza o conhecimento necessário para preparação do discovery e apoia o analista durante todo o processo.

Os principais benefícios esperados são:

- redução do tempo de preparação;
- maior consistência entre analistas;
- reutilização do conhecimento corporativo;
- menor dependência de especialistas;
- melhoria da qualidade das reuniões de discovery;
- maior rastreabilidade das decisões;
- aumento da confiança nas recomendações produzidas.

---

# Objetivos Estratégicos

## Objetivo Principal

Reduzir o esforço necessário para preparação de reuniões de discovery sem comprometer a qualidade técnica das análises.

## Objetivos Secundários

- Padronizar o processo de discovery.
- Melhorar a qualidade dos briefings.
- Aumentar a reutilização do conhecimento corporativo.
- Reduzir retrabalho.
- Melhorar a colaboração entre Comercial, Pré-Vendas e Especialistas.
- Tornar o processo mais rastreável.
- Criar uma base evolutiva de conhecimento sobre oportunidades.

---

# Escopo do Produto

O Discovery Copilot AI é responsável por:

- interpretar oportunidades comerciais;
- consolidar informações provenientes de múltiplas fontes;
- padronizar briefings em um contexto estruturado;
- consultar a Knowledge Base oficial;
- classificar oportunidades;
- identificar lacunas de informação;
- sugerir perguntas contextualizadas;
- registrar premissas;
- identificar riscos;
- produzir um Discovery Plan estruturado;
- gerar um Executive Summary;
- manter continuamente atualizado o contexto da oportunidade.

---

# Fora de Escopo

O produto não possui como objetivo:

- aprovar soluções técnicas;
- substituir especialistas;
- negociar com clientes;
- elaborar propostas comerciais completas;
- alterar documentos da Knowledge Base;
- tomar decisões comerciais;
- tomar decisões técnicas em nome da organização.

---

# Personas

## Comercial

Origina oportunidades e fornece o contexto inicial do cliente.

### Objetivos

- Registrar oportunidades rapidamente.
- Compartilhar informações relevantes.
- Melhorar a qualidade da passagem para Pré-Vendas.

---

## Analista de Pré-Vendas

Principal usuário do produto.

### Objetivos

- Preparar reuniões de discovery.
- Reduzir esforço operacional.
- Melhorar qualidade técnica.
- Validar recomendações da IA.

---

## Especialista Técnico

Atua apenas quando necessário.

### Objetivos

- Apoiar oportunidades complexas.
- Validar decisões críticas.
- Reduzir interrupções operacionais.

---

## Cliente

Fonte das informações de negócio.

### Objetivos

- Compartilhar necessidades.
- Esclarecer dúvidas.
- Validar entendimento do problema.

---

# Contexto Oficial da Oportunidade

O Discovery Copilot AI mantém um contexto único para cada oportunidade comercial.

Esse contexto é representado pelo **Canonical Brief**, que consolida todas as informações conhecidas sobre a oportunidade e evolui continuamente durante seu ciclo de vida.

O Canonical Brief é considerado a fonte oficial de contexto do produto e serve como base para todas as capacidades inteligentes.

---

# Princípios do Produto

O desenvolvimento do Discovery Copilot AI é guiado pelos seguintes princípios:

## IA como Copiloto

A IA apoia o analista, mas não substitui sua responsabilidade pelas decisões.

---

## Contexto Evolutivo

O conhecimento sobre uma oportunidade evolui continuamente conforme novas informações são recebidas e validadas.

---

## Fonte Única de Contexto

Todas as capacidades inteligentes utilizam o Canonical Brief como referência oficial da oportunidade.

---

## Conhecimento Oficial

As recomendações devem ser fundamentadas prioritariamente na Knowledge Base corporativa.

---

## Transparência

Premissas, limitações, conflitos e níveis de confiança devem ser explicitados ao analista.

---

## Explicabilidade

Toda recomendação deve possuir justificativa e origem identificável.

---

## Governança

O conhecimento produzido deve permanecer auditável e rastreável ao longo do tempo.

---

## Colaboração Humano + IA

O produto foi concebido para potencializar a atuação humana, combinando inteligência artificial, conhecimento corporativo e validação especializada.

---

# Indicadores de Sucesso

O sucesso do produto poderá ser medido por indicadores como:

- redução do tempo de preparação do discovery;
- aumento da reutilização da Knowledge Base;
- redução de retrabalho;
- diminuição da dependência de especialistas;
- melhoria da qualidade dos briefings;
- aumento da completude das informações coletadas;
- satisfação dos analistas de Pré-Vendas.

---

# Dependências

O Discovery Copilot AI depende da disponibilidade dos seguintes ativos:

- CRM corporativo;
- documentos de entrada da oportunidade;
- Knowledge Base oficial;
- analistas de Pré-Vendas;
- especialistas técnicos para casos excepcionais.

---

# Documentos Relacionados

Este documento deve ser utilizado em conjunto com:

- process.md
- domain-model.md
- canonical-brief.md
- business-rules.md
- specification.md
- knowledge-base.md
- ai-behavior.md
- non-functional-requirements.md
- technical-context-lite.md

---

# Diretrizes de Evolução

Este documento descreve exclusivamente o contexto de negócio do produto.

Detalhes sobre fluxo operacional, conceitos do domínio, regras de negócio, comportamento da IA, requisitos funcionais e aspectos técnicos devem ser documentados em seus respectivos artefatos, evitando duplicidade de informação.

O Business Context Lite deve permanecer estável ao longo do projeto, sofrendo alterações apenas quando houver mudanças relevantes na estratégia, no posicionamento do produto ou nos objetivos de negócio.

---
> **Graduação:** ao adotar o [Sistema Onion completo](https://onionevolve.com), cada seção expande para sua camada em `docs/business-context/` — §1/§4/§5/§6 → `02-product/` · §2/§3 → `01-customer/` · §7 → convenção `[INFERIDO]` do core. Zero retrabalho.

