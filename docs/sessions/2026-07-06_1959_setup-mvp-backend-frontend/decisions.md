# Decisões Tomadas — Setup MVP Backend e Frontend

## Decisão 1: Ambiente Virtual Python em vez de instalação global

- **Contexto**: Tentativa inicial de `pip install -r backend/requirements.txt` falhou com erro de permissão no Python global (`WinError 2` ao tentar escrever executáveis).
- **Opções Consideradas**:
  - Opção A: Instalar com `--user` flag. (Prós: rápido. Contras: pode conflitar com outros projetos).
  - Opção B: Criar um virtualenv `.venv` dedicado. (Prós: isolamento total, portabilidade, padrão da indústria. Contras: nenhum).
- **Decisão**: Opção B (`.venv`).
- **Justificativa**: Isolamento de dependências garante reprodutibilidade do ambiente. O servidor deve ser iniciado com `.venv\Scripts\python -m uvicorn ...`.
- **Impacto**: Todos os comandos de execução do backend precisam referenciar o executável do venv.

---

## Decisão 2: Servir o frontend estático diretamente pelo FastAPI

- **Contexto**: Inicialmente o frontend era servido como arquivo local (`file://`), o que causava bloqueios de CORS e impossibilitava comunicação com a API.
- **Opções Consideradas**:
  - Opção A: Servidor separado (Live Server VSCode, `npx serve`). (Prós: simples. Contras: dois processos para gerenciar).
  - Opção B: Montar a pasta `/site` no FastAPI via `StaticFiles`. (Prós: um único processo, sem problemas de CORS, URL limpa: `http://localhost:8000/site/copilot/index.html`).
- **Decisão**: Opção B.
- **Justificativa**: Simplifica o desenvolvimento e elimina qualquer problema de CORS ao custo zero de complexidade.
- **Impacto**: Frontend acessível em `http://127.0.0.1:8000/site/copilot/index.html`.

---

## Decisão 3: Modo Mock para funcionar sem GEMINI_API_KEY

- **Contexto**: O serviço de IA precisa de uma chave da API para funcionar. Bloquear o desenvolvimento até ter a chave atrasaria os testes.
- **Decisão**: O serviço `ai.py` detecta se a chave está ausente e retorna dados fictícios estruturados para permitir testes de UI sem integração real.
- **Impacto**: O ciclo de teste de interface pode prosseguir independentemente da configuração da API Key.
