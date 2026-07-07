# Contexto — Setup MVP Backend e Frontend

## Situação Inicial
O projeto possuía especificações de produto completas e aprovadas em `docs/product/` e um `technical-context-lite.md` preenchido com a stack acordada (Python/FastAPI + Vanilla JS + SQLite + Gemini). Não havia nenhum código de implementação. O backend e o frontend precisavam ser criados do zero.

## Motivação
A aprovação do plano de implementação pelo product owner habilitou o início do Ciclo de Engenharia (`@engineer`). O objetivo era criar um MVP funcional que permitisse ao analista de Pré-Vendas criar, enriquecer e validar um Canonical Brief de forma guiada pela IA (Gemini).

## Restrições
- **Stack minimalista:** Sem frameworks pesados de frontend (React, Next.js). Apenas HTML5, CSS e JS nativos.
- **Portabilidade:** Sem banco de dados externo. SQLite local para KB e arquivos JSON para oportunidades.
- **Modo offline/mock:** O sistema deve funcionar sem chave Gemini configurada, retornando dados de teste, para facilitar o desenvolvimento.

## Referências
- [docs/product/canonical-brief.md](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/docs/product/canonical-brief.md) — schema dos dados
- [docs/product/specification.md](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/docs/product/specification.md) — capacidades funcionais CF-01 a CF-10
- [docs/technical-context-lite.md](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/docs/technical-context-lite.md) — stack e ADR aprovadas
