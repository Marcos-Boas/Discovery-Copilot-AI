# Mudanças Realizadas — Setup MVP Backend e Frontend

## Arquivos Criados

### Backend
- [backend/requirements.txt](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/requirements.txt) — Dependências Python: fastapi, uvicorn[standard], pydantic, google-genai, pypdf, python-docx.
- [backend/models.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/models.py) — Todos os schemas Pydantic que espelham o Canonical Brief (OpportunityInfo, CustomerInfo, RiskInfo, GapInfo, QuestionInfo, AssumptionInfo, DiscoveryPlanInfo, HistoryEntry, CanonicalBrief, etc.).
- [backend/services/ai.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/services/ai.py) — Integração com SDK `google-genai`. Funções `generate_initial_brief()` e `enrich_brief()` com Structured Output JSON.
- [backend/services/kb.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais\onion-portable\onion-mini/backend/services/kb.py) — Serviço SQLite para criação e busca de artigos da Knowledge Base. 4 artigos de semente incluídos.
- [backend/main.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/main.py) — Servidor FastAPI com 6 rotas REST + StaticFiles para servir o frontend.

### Frontend
- [site/copilot/index.html](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/site/copilot/index.html) — SPA completa do Painel do Analista com formulário do Canonical Brief, modal de upload e layout em grid responsivo.
- [site/copilot/style.css](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/site/copilot/style.css) — Design System completo derivado do Onion Mini (variáveis CSS, cards, chips, badges de status, layouts de grid, formulários).
- [site/copilot/app.js](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/site/copilot/app.js) — Controller completo em Vanilla JS: listar/criar/selecionar/enriquecer/salvar oportunidades, renderizar o Canonical Brief no editor, pesquisar KB e exibir histórico.

### Infraestrutura
- `.venv/` — Ambiente virtual Python com todas as dependências instaladas.

## Arquivos Modificados
- [backend/main.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/main.py) — Adicionado suporte a `StaticFiles` para servir a pasta `/site` em `/site/` do FastAPI.
- [docs/technical-context-lite.md](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/docs/technical-context-lite.md) — Preenchido com stack definitiva, ADR de decisões e checklist de tarefas de implementação.

## Testes Realizados
- API `GET /api/kb` respondendo `200 OK` com artigos da KB ✅
- Logs do servidor confirmam `GET /site/copilot/index.html 200 OK` ✅
- Logs confirmam carregamento de CSS, JS e fontes `200 OK` ✅
- Logs confirmam `GET /api/opportunities 200 OK` ✅
