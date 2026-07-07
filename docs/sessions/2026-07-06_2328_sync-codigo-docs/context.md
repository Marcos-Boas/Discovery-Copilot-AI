# Contexto — Sync Código ↔ Docs

## Situação Inicial
- MVP marcado como **Feito** no `technical-context-lite.md` (7/7 tasks concluídas)
- Documentação de produto aprovada (v2.0.0) em `docs/product/`
- Código presente: backend FastAPI (6 rotas), frontend SPA, script e2e manual
- Última sessão registrada: setup MVP (19:59)

## Motivação
O usuário solicitou sincronismo `@docs` para garantir que a documentação SSOT reflita o código real — especialmente após conclusão apressada do MVP sem validação de integração Gemini com chave real.

## Restrições
- Sync documenta divergências; **não corrige código** nesta sessão (escopo = docs)
- `.env` com `GEMINI_API_KEY` existe localmente mas está gitignored — não inspecionado

## Referências
- `backend/main.py`, `backend/models.py`, `backend/services/ai.py`, `backend/services/kb.py`
- `site/copilot/app.js`, `start.ps1`, `backend/tests/test_e2e.py`
- `docs/product/requirements-catalog.md`, `docs/product/traceability.md`
