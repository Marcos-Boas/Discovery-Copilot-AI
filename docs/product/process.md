# Process

## Discovery Copilot AI

| Campo | Valor |
|--------|-------|
| **Documento** | Process |
| **Produto** | Discovery Copilot AI |
| **Versão** | 2.0.0 |
| **Status** | Approved |
| **Owner** | Product Team |
| **Metodologia** | Onion Portable |
| **Fase Onion** | Product |
| **Última Atualização** | 2026-07-06 |

---

# Objetivo

Este documento descreve o processo de negócio suportado pelo Discovery Copilot AI.

Seu objetivo é demonstrar como uma oportunidade comercial evolui desde sua entrada até a preparação do Discovery Plan, evidenciando as responsabilidades de cada ator e o papel desempenhado pelo produto ao longo do fluxo.

As regras de negócio detalhadas estão documentadas em **business-rules.md**.


## Contexto do Processo

O processo de discovery faz parte do fluxo completo de gestão de oportunidades comerciais da organização.

O Discovery Copilot AI atua especificamente na preparação e execução do discovery, porém considera o contexto das etapas anteriores e posteriores para produzir recomendações mais precisas.

O processo contempla desde a qualificação inicial da oportunidade até sua transição para as etapas comerciais e de pós-venda.

---

# Visão Geral do Processo

O Discovery Copilot AI apoia analistas de Pré-Vendas na preparação de reuniões de discovery.

O processo inicia com o recebimento de uma oportunidade comercial e evolui continuamente por meio da consolidação de contexto, enriquecimento de informações e validação humana.

Durante toda a execução existe apenas um contexto oficial da oportunidade: o **Canonical Brief**.

Todas as capacidades inteligentes do produto consultam e enriquecem esse mesmo contexto.

---

# Objetivo do Processo

- Interpretar corretamente oportunidades comerciais.
- Consolidar informações provenientes de múltiplas fontes.
- Preparar o analista para reuniões de discovery.
- Identificar lacunas de informação.
- Reduzir retrabalho.
- Melhorar consistência entre analistas.
- Produzir um Discovery Plan estruturado.

---

# Atores

## Comercial

Responsável por originar a oportunidade e fornecer o contexto inicial.

---

## Analista de Pré-Vendas

Responsável pela preparação do discovery, validação das recomendações da IA e condução da reunião com o cliente.

---

## Especialista Técnico

Participa quando necessário para esclarecer aspectos específicos da solução.

---

## Cliente

Fornece informações durante o processo de discovery.

---

## Discovery Copilot AI

Atua como copiloto do analista.

Suas responsabilidades incluem:

- interpretar documentos;
- consolidar contexto;
- consultar a Knowledge Base;
- classificar oportunidades;
- identificar lacunas;
- sugerir perguntas;
- registrar premissas;
- identificar riscos;
- produzir recomendações.

---

# Entradas do Processo

O processo pode ser iniciado a partir de diferentes fontes de informação.

Exemplos:

- oportunidade comercial;
- CRM;
- briefing inicial;
- e-mails;
- RFP;
- RFQ;
- documentos anexos;
- histórico do cliente;
- atas de reuniões.

Todas essas informações passam pelo mesmo processo de interpretação antes de integrarem o contexto oficial da oportunidade.

---

# Fluxo do Processo

## 1. Receber Oportunidade

**Responsável**

Comercial

**Resultado**

Oportunidade registrada.

---

## 2. Interpretar Briefing

**Responsável**

Discovery Copilot AI

**Objetivo**

Interpretar documentos recebidos e compreender seu conteúdo.

---

## 3. Atualizar Canonical Brief

**Responsável**

Discovery Copilot AI

**Objetivo**

Padronizar as informações interpretadas e consolidá-las no contexto oficial da oportunidade.

Este passo ocorre continuamente durante todo o processo.

---

## 4. Classificar Oportunidade

**Responsável**

Discovery Copilot AI

**Objetivo**

Identificar categoria, segmento, tecnologias e demais atributos relevantes da oportunidade.

Os resultados são incorporados ao Canonical Brief.

---

## 5. Consultar Knowledge Base

**Responsável**

Discovery Copilot AI

**Objetivo**

Recuperar conhecimento corporativo relacionado ao contexto da oportunidade.

As informações recuperadas enriquecem o Canonical Brief.

---

## 6. Identificar Lacunas

**Responsável**

Discovery Copilot AI

**Objetivo**

Detectar informações ausentes que possam comprometer a qualidade do discovery.

As lacunas identificadas passam a compor o contexto oficial.

---

## 7. Gerar Perguntas

**Responsável**

Discovery Copilot AI

**Objetivo**

Produzir perguntas obrigatórias e complementares para reduzir as lacunas identificadas.

As perguntas tornam-se parte do Canonical Brief.

---

## 8. Gerar Premissas

**Responsável**

Discovery Copilot AI

**Objetivo**

Registrar hipóteses necessárias para interpretação da oportunidade.

---

## 9. Identificar Riscos

**Responsável**

Discovery Copilot AI

**Objetivo**

Identificar riscos técnicos, comerciais, operacionais e de negócio relacionados à oportunidade.

---

## 10. Produzir Executive Summary

**Responsável**

Discovery Copilot AI

**Objetivo**

Consolidar o entendimento atual da oportunidade em um resumo executivo.

---

## 11. Produzir Discovery Plan

**Responsável**

Discovery Copilot AI

**Objetivo**

Organizar todas as informações produzidas durante o processo em um roteiro estruturado para condução da reunião de discovery.

---

## 12. Revisão Humana

**Responsável**

Analista de Pré-Vendas

**Objetivo**

Validar recomendações, complementar informações e corrigir eventuais inconsistências.

As alterações realizadas atualizam o Canonical Brief.

---

## 13. Execução do Discovery

**Responsável**

Analista de Pré-Vendas

**Objetivo**

Conduzir a reunião utilizando o Discovery Plan como apoio.

Novas informações obtidas durante a reunião retroalimentam o Canonical Brief.

---

# Fluxo Conceitual

```text
Lead

↓

Qualificação Comercial

↓

Qualificação Técnica

↓

Preparação do Briefing

↓

Padronização do Briefing

↓

Interpretação do Briefing

↓

Classificação da Oportunidade

↓

Consulta à Knowledge Base

↓

Identificação de Lacunas

↓

Geração de Perguntas

↓

Geração de Premissas

↓

Geração de Riscos

↓

Revisão do Analista

↓

Discovery

↓

Definição Técnica da Solução

↓

Cotação

↓

Precificação

↓

Proposta Técnica

↓

Proposta Comercial

↓

Contrato

↓

Pós-Venda

```

---

# Decisões do Processo

Durante a execução do processo, algumas decisões podem alterar o fluxo.

## D-01 — Há informações suficientes?

Caso negativo, o processo continua identificando lacunas e sugerindo perguntas.

---

## D-02 — A classificação possui confiança adequada?

Caso negativo, a confirmação do analista é solicitada.

---

## D-03 — Existe conhecimento oficial disponível?

Caso negativo, a limitação é registrada e comunicada ao analista.

---

## D-04 — O analista validou o contexto?

Caso negativo, o Canonical Brief permanece em evolução até que a validação ocorra.

---

# Saídas do Processo

Ao término do processo, o produto disponibiliza:

- Canonical Brief atualizado;
- Discovery Plan;
- Executive Summary;
- perguntas obrigatórias;
- perguntas complementares;
- lacunas identificadas;
- premissas;
- riscos;
- contexto consolidado da oportunidade.

---

# Automação

| Etapa | Automação |
|---------|-----------|
| Interpretar Briefing | Alta |
| Atualizar Canonical Brief | Alta |
| Classificar Oportunidade | Alta |
| Consultar Knowledge Base | Alta |
| Identificar Lacunas | Alta |
| Gerar Perguntas | Média |
| Gerar Premissas | Média |
| Identificar Riscos | Média |
| Executive Summary | Média |
| Revisão | Humana |
| Discovery | Humana |

---


## Integração com a Matriz de Responsabilidades

Cada atividade do processo possui responsáveis definidos conforme a matriz RACI corporativa.

O Discovery Copilot AI poderá utilizar essa matriz para:

- identificar participantes obrigatórios;
- sugerir consultas a especialistas;
- indicar responsáveis por determinada atividade;
- informar aprovações necessárias;
- contextualizar recomendações conforme o papel de cada ator.

A definição detalhada da matriz encontra-se na Knowledge Base corporativa.

# Documentos Relacionados

Este processo utiliza os seguintes artefatos:

- business-context-lite.md
- domain-model.md
- canonical-brief.md
- business-rules.md
- specification.md
- knowledge-base.md
- ai-behavior.md
- technical-context-lite.md

---

# Diretrizes de Evolução

O fluxo descrito neste documento representa o processo de negócio do Discovery Copilot AI.

Alterações nas regras de negócio deverão ser realizadas exclusivamente em **business-rules.md**.

Alterações na estrutura do contexto deverão ser realizadas em **canonical-brief.md**.

Alterações no modelo conceitual deverão ser realizadas em **domain-model.md**.

Novas funcionalidades deverão ser incorporadas ao fluxo apenas quando representarem mudanças reais no processo de negócio.