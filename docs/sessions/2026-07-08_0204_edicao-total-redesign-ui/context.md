# Contexto — Edição Total + Redesign UI/UX

## Situação Inicial
O MVP estava funcional, mas a UI do Copilot expunha apenas parte do Canonical Brief para edição. Gaps, perguntas, riscos e premissas eram renderizados como cartões read-only, e vários campos do model (stakeholders, objetivos, motivações, key_points, referências, métricas de validação) não apareciam na tela. A serialização do formulário (`serializeBriefFromForm`) só mapeava um subconjunto dos campos.

## Motivação
O analista de Pré-Vendas precisa revisar e corrigir manualmente o brief inteiro (BR-081/BR-082 — correções e captura de feedback). Deixar campos read-only quebra a Regra de Ouro de rastreabilidade/edição humana. O pedido do usuário foi explícito: tornar todos os campos editáveis, com design premium (julho/2026), fácil de ler, entender e preencher.

## Restrições
- Frontend em Vanilla JS/CSS/HTML (ADR: sem build/transpiladores).
- O backend `PUT /validate` já aceita o `CanonicalBrief` completo — foco no frontend.
- Manter o design system warm do Onion (creme + laranja + roxo, fonte Fraunces).
- Status/id/created_at/version/history permanecem geridos pelo sistema (não editáveis).

## Referências
- `docs/product/canonical-brief.md` (modelo de dados)
- `backend/models.py` (schemas Pydantic)
- Plano Pós-Sync em `technical-context-lite.md`
