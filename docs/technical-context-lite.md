# Technical Context

> Este arquivo é a **SSOT (fonte única de verdade) de Engenharia** — outros artefatos CITAM este arquivo, nunca duplicam seu conteúdo. O agente `@engineer` o atualiza a cada mudança de arquitetura.

## 1. Stack Tecnológica
- **Linguagem:** Python 3.10+ & JavaScript (ES6+)
- **Framework:** FastAPI (Backend) & Vanilla JS/HTML/CSS (Frontend)
- **Banco de Dados & Armazenamento:** SQLite (para a Knowledge Base) & JSON local (para persistência de oportunidades)
- **APIs de IA:** API do Gemini (Google Gen AI SDK)
- **Infraestrutura:** Servidor local (localhost) / Hospedagem leve estática para frontend e Servidor Python em nuvem (ex: Render, Fly.io)

## 2. Padrões de Código & Gotchas
- **Padrões de Nomenclatura:**
  - Python: Snake Case (`funcao_exemplo`, `variavel_exemplo`) e CamelCase para classes.
  - JavaScript: Camel Case (`funcaoExemplo`, `variavelExemplo`).
  - Arquivos: kebab-case (`technical-context-lite.md`, `copilot-style.css`).
- **Validação de Dados:** Todo dado trafegado na API do backend deve ser validado estritamente usando Schemas do Pydantic, espelhando os campos obrigatórios do [canonical-brief.md](file:///c:/Users/marco/OneDrive/Área de Trabalho/pulse mais/onion-portable/onion-mini/docs/product/canonical-brief.md).
- **Gotchas (Armadilhas):**
  - O SDK do Gemini (`google-genai`) requer `GEMINI_API_KEY` no ambiente (carregada via `start.ps1` ou `.env`). Validado em e2e real em 2026-07-06 (15/15 checks, ~20s create + ~27s enrich).
  - `site/copilot/app.js` deriva `API_BASE` de `window.location.origin` quando servido via HTTP (fallback `http://localhost:8000` para abertura via `file://`) — usar `-Port` não quebra mais a UI.
  - Fontes `fraunces-var.woff2` / `fraunces-italic-var.woff2` presentes em `site/fonts/` (self-hosted no re-skin).
  - Evitar complexidades de transpiladores no frontend (como TypeScript ou Babel) para manter o desenvolvimento ágil, limpo e direto no navegador.

## 3. Arquitetura & Mapa do Código

A arquitetura do Discovery Copilot AI é dividida em duas camadas leves e comunicada por meio de rotas REST JSON. O banco SQLite atua como fonte estática da Knowledge Base, enquanto oportunidades enriquecidas são gravadas em arquivos JSON locais.

```text
               ┌───────────────────────────────┐
               │        UI (HTML5 SPA)         │
               └───────────────┬───────────────┘
                               │
                      HTTP REST JSON (Fetch)
                               │
                               ▼
               ┌───────────────────────────────┐
               │       FastAPI (Backend)       │
               └───────┬───────────────┬───────┘
                       │               │
                       ▼               ▼
         ┌──────────────────┐   ┌──────────────┐
         │ SDK Google GenAI │   │ SQLite & JSON│
         │   (Gemini LLM)   │   │  (Data/KB)   │
         └──────────────────┘   └──────────────┘
```

| Diretório/Arquivo-chave | O que vive ali |
|---|---|
| `/backend/main.py` | Entrada da API (v2.0.0), rotas REST, CORS, mount estático `/site`. |
| `/backend/models.py` | Schemas Pydantic do Canonical Brief v2.0.0 (14 classes). |
| `/backend/services/ai.py` | Extração inicial e enriquecimento via Gemini 2.5 Flash (mock fallback). |
| `/backend/services/kb.py` | SQLite KB em `data/knowledge/knowledge.db` (4 artigos seed). |
| `/backend/tests/test_e2e.py` | Script de integração manual (não pytest); requer servidor ativo. |
| `/site/copilot/` | SPA do analista: `index.html`, `app.js`, `style.css`. |
| `/site/index.html` | Landing page pública do Onion Mini. |
| `/start.ps1` | Ativa `.venv`, carrega `.env`, sobe uvicorn. |
| `/data/opportunities/` | Um `{OPP-id}.json` por oportunidade (criado em runtime). |
| `/data/knowledge/` | `knowledge.db` SQLite (criado em runtime por `init_kb_db()`). |

### Mapa de API (implementado)

| Método | Rota | Descrição | RF relacionado |
|---|---|---|---|
| `POST` | `/api/opportunities` | Cria oportunidade a partir de texto bruto → IA → JSON | RF-001, RF-002, RF-003 |
| `GET` | `/api/opportunities` | Lista resumos de oportunidades | — |
| `GET` | `/api/opportunities/{id}` | Retorna Canonical Brief completo | RF-005 |
| `POST` | `/api/opportunities/{id}/enrich` | Busca KB + enriquece via IA (riscos, gaps, perguntas) | RF-009–RF-015 |
| `PUT` | `/api/opportunities/{id}/validate` | Salva edições manuais, status → `Validado`, incrementa versão | RF-016, RF-005 |
| `GET` | `/api/kb?q=` | Consulta direta à KB (retorna `{kb_context}`) | RF-009 |

**Status lifecycle no código:** `Inicial` → `Enriquecido` → `Validado`. Estados `Consolidado` e `Encerrado` existem no model mas sem rota/UI.

### Cobertura UI vs Model (edição total 2026-07-08)

| Exposto e editável | Somente leitura |
|---|---|
| **Todos os campos de conteúdo**: title, source, customer (name/segment/contact), confidence, stakeholders, business_context (problems/objectives/motivations), current/desired scenario (description + key_points), scope (included/excluded), technologies, constraints, executive_summary, assumptions, risks, missing_information (gaps), questions, discovery_plan (methodology/steps/validation_metrics), references | metadados de sistema: id, created_at, status (lifecycle), version, context_version, history |

Edição via componentes genéricos no `app.js`: `renderStringList` (listas de texto) e `renderObjectList` (listas de objetos com selects para enums e IDs auto-gerados). O `state.brief` é a fonte de verdade e é enviado inteiro no `PUT /validate`.

### Dependências declaradas vs usadas

| Pacote | Status |
|---|---|
| `fastapi`, `uvicorn`, `pydantic`, `google-genai` | Em uso |
| `pypdf`, `python-docx` | Declarados em `requirements.txt`, **não usados** (RF-001 parcial — só texto colado, sem upload de arquivo) |

## 4. Decisões Técnicas (ADR-lite)
> Toda decisão de arquitetura/tecnologia com trade-off entra aqui — é o que evita rediscutir o mesmo tema.

| Data | Decisão | Alternativa rejeitada | Porquê |
|---|---|---|---|
| 2026-07-06 | SPA em Vanilla JS/CSS/HTML no Frontend | Next.js / React (com build) | Complexidade desnecessária de dependências. O design system local e a interface limpa rodam perfeitamente sem ferramentas de empacotamento. |
| 2026-07-06 | Persistência local em JSON e SQLite | PostgreSQL / MongoDB | Facilidade de portabilidade no Onion Mini. Um arquivo JSON por oportunidade é auditável, fácil de versionar e ideal para o Canonical Brief. |
| 2026-07-06 | RAG Simplificado (Contexto no Prompt) | Banco Vetorial dedicado (ChromaDB/Pinecone) | A janela de contexto do Gemini (2.5 Flash / Pro) é gigante, tornando viável alimentar os prompts com os artigos relevantes de forma direta e sem latência de vetorização. |

## 5. Planos de Implementação Ativos
> O checklist de cada plano é o **quadro de tasks** de Engenharia (`A Fazer → Em Dev → Feito`).

### Plano para Setup Inicial do Copilot (MVP) — Concluído
*   [x] Criar a pasta do backend e declarar dependências no `backend/requirements.txt` -- **Feito**
*   [x] Implementar schemas de dados em `backend/models.py` baseados no [canonical-brief.md](./product/canonical-brief.md) -- **Feito**
*   [x] Desenvolver serviços do Gemini (`backend/services/ai.py`) com outputs JSON estruturados -- **Feito** *(código presente; integração real bloqueada por bug de env var — ver Plano Pós-Sync)*
*   [x] Desenvolver rotas e servidor FastAPI em `backend/main.py` -- **Feito**
*   [x] Criar arquivos do frontend sob `site/copilot/` (HTML, CSS e JS) reutilizando os estilos do Onion -- **Feito**
*   [x] Integrar frontend e backend via requisições fetch -- **Feito**
*   [x] Validar funcionamento do servidor (logs confirmam HTTP 200 em todos os assets) -- **Feito**

### Plano Pós-Sync (Correções e Gaps identificados em 2026-07-06)
> Prioridade derivada da engenharia reversa código ↔ docs. Referencia RFs em [traceability.md](./product/traceability.md).

*   [x] **Corrigir `GEMINI_API_KEY` em `ai.py`** — trocar env var incorreta por `"GEMINI_API_KEY"` (RF-002, RF-009–RF-015) -- **Feito** *(e2e 15/15 em 2026-07-06)*
*   [x] **Tornar `API_BASE` dinâmico no frontend** — derivado de `window.location.origin` com fallback `file://` (RNF-006) -- **Feito** *(2026-07-08)*
*   [ ] **Corrigir busca KB multi-termo** — query `"term1 OR term2"` não funciona com `LIKE` único em `kb.py` (RF-009) -- **A Fazer**
*   [ ] **Upload PDF/DOCX** — implementar parsing com `pypdf`/`python-docx` já declarados (RF-001) -- **A Fazer**
*   [x] **Edição de TODOS os campos na UI** — gaps, perguntas, riscos, premissas, stakeholders, objetivos, motivações, key_points, referências, métricas etc. agora editáveis com adicionar/remover (RF-016) -- **Feito** *(2026-07-08)*
*   [ ] **Adicionar fontes em `site/fonts/`** ou remover referências quebradas -- **A Fazer**
*   [ ] **Suite de testes automatizada** — converter `test_e2e.py` para pytest ou CI (DoD traceability) -- **A Fazer**
*   [ ] **Status `Consolidado`/`Encerrado`** — rotas e transições de lifecycle (RF-015) -- **A Fazer**

## 6. Débitos & Riscos Conhecidos
- **Bug crítico — Gemini desabilitado:** ~~`ai.py` não lê `GEMINI_API_KEY`~~ **Resolvido** (2026-07-06). Integração real validada via `test_e2e.py`.
- **Ausência de Autenticação:** Sem controle de acesso (login). Risco baixo em dev local, crítico para produção (RNF-002).
- **Armazenamento Não Concorrente:** JSON local sem file locking. Risco baixo para MVP de analista único.
- **KB simplificada:** Busca `LIKE` em SQLite, não semântica (RF-009 parcial). Aceitável para MVP conforme ADR de RAG no prompt.
- **Referências de origem ausentes:** RF-004 (explicabilidade por documento/trecho) não implementado no fluxo de extração.
- ~~**Chat UI stub:** CSS de chat sem lógica~~ **Resolvido** (2026-07-08): CSS morto removido no redesign.

## 7. 🔁 Redesenhos
> A casa do redesenho de Engenharia: todo checkpoint de fechamento do Ciclo de Engenharia registra aqui **o que muda no processo**.

| Data | Ciclo/Feature | O que muda no próximo ciclo |
|---|---|---|
| 2026-07-06 | Setup MVP / Ciclo de Engenharia 01 | Criar `.venv` antes de qualquer código; validar imports no início do ciclo para evitar problemas de permissão no Windows. |
| 2026-07-06 | Sync código ↔ docs / Ciclo Sync 01 | Após cada ciclo de engenharia, rodar `@docs` sync antes de marcar tasks como Feito; validar env vars e e2e com chave real, não só HTTP 200. |
| 2026-07-08 | Edição total + redesign UI / Ciclo Eng 02 | Renderização data-driven (`renderStringList`/`renderObjectList`) elimina dessincronização form↔model; próximo ciclo deve derivar os descritores de campo do próprio schema Pydantic (via `/openapi.json`) para zero duplicação de enums no frontend. |
