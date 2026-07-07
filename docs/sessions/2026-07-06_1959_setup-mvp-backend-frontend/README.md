# Setup Inicial do Backend e Frontend (MVP) — 2026-07-06

## 🎯 Objetivo
Implementar o MVP do **Discovery Copilot AI** com backend Python (FastAPI) e frontend Vanilla JS/HTML/CSS, executando o primeiro ciclo de engenharia completo com base nas especificações de produto da versão 2.0.0.

## 📊 Resultados
- Ambiente virtual Python (`.venv`) criado e todas as dependências instaladas com sucesso.
- Backend FastAPI rodando em `http://127.0.0.1:8000` com:
  - Rota `POST /api/opportunities` para criação de oportunidades via IA.
  - Rota `GET /api/opportunities` para listagem de oportunidades.
  - Rota `GET /api/opportunities/{id}` para recuperação do Canonical Brief.
  - Rota `POST /api/opportunities/{id}/enrich` para enriquecimento via Gemini + KB.
  - Rota `PUT /api/opportunities/{id}/validate` para validação manual pelo analista.
  - Rota `GET /api/kb` para consulta de artigos da Knowledge Base.
  - Servindo o frontend estático em `/site`.
- Knowledge Base SQLite local inicializada com 4 artigos de semente relevantes para pré-vendas.
- UI SPA completa rodando em `http://127.0.0.1:8000/site/copilot/index.html`.

## 🔗 Links Relacionados
- [Backend: main.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/main.py)
- [Modelos: models.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/models.py)
- [Serviço IA: services/ai.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/services/ai.py)
- [Serviço KB: services/kb.py](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/backend/services/kb.py)
- [UI: site/copilot/index.html](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/site/copilot/index.html)
- [UI Lógica: site/copilot/app.js](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/site/copilot/app.js)
- [technical-context-lite.md](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/docs/technical-context-lite.md)

## ⏱️ Tempo Investido
Aproximadamente 45 minutos.
