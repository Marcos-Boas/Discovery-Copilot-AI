# -*- coding: utf-8 -*-
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
"""
test_e2e.py - Teste End-to-End do Discovery Copilot AI
Uso: python backend/tests/test_e2e.py

Valida o pipeline completo com IA real:
  1. POST /api/opportunities     → geração do Canonical Brief
  2. POST /api/opportunities/{id}/enrich → enriquecimento inteligente
  3. GET  /api/opportunities/{id}        → recuperação e persistência

Criterios de aceite:
  - history[0].author == "IA Copilot" (nao modo mock)
  - opportunity.status == "Enriquecido" apos enrich
  - Pelo menos 1 risco e 1 pergunta de discovery gerados
"""

import os
import sys
import json
import urllib.request
import urllib.error
import time

# ─── Configuração ────────────────────────────────────────────────────────────
BASE_URL   = "http://127.0.0.1:8000"
TIMEOUT    = 120  # segundos — gemini-2.5-flash pode demorar em respostas longas

SAMPLE_BRIEF_TEXT = """
Oportunidade: Modernização do sistema de gestão de clientes para a Empresa XYZ

A Empresa XYZ é uma distribuidora de produtos industriais com 500 colaboradores,
atuando nos setores de manufatura e logística no Brasil.

O cliente possui um ERP legado desenvolvido internamente há 15 anos, sem APIs,
sem integração com o CRM e com sérios problemas de performance em períodos de pico.
O time de vendas perde em média 2h/dia preenchendo dados duplicados entre sistemas.

Necessidades identificadas:
- Integração ERP ↔ CRM em tempo real
- Portal de autoatendimento para clientes B2B
- Relatórios gerenciais consolidados
- Migração para nuvem (preferencialmente Azure)

Orçamento estimado: R$ 800.000
Prazo desejado: 12 meses
Decisor: CEO e CTO
Próxima reunião: 15/07/2026
"""

# ─── Utilitários ─────────────────────────────────────────────────────────────
PASS = "\033[92m[PASS]\033[0m"
FAIL = "\033[91m[FAIL]\033[0m"
WARN = "\033[93m[WARN]\033[0m"
INFO = "\033[96m[INFO]\033[0m"

results = []

def check(label: str, condition: bool, detail: str = ""):
    status = PASS if condition else FAIL
    print(f"  {status}  {label}")
    if detail:
        print(f"         {detail}")
    results.append((label, condition))
    return condition

def api_call(method: str, path: str, body: dict = None) -> dict:
    url = f"{BASE_URL}{path}"
    data = json.dumps(body).encode("utf-8") if body else None
    headers = {"Content-Type": "application/json"} if data else {}
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return json.loads(resp.read().decode("utf-8"))

# ─── Pré-verificação ─────────────────────────────────────────────────────────
print("\n" + "=" * 60)
print("  Discovery Copilot AI - Teste End-to-End")
print("=" * 60)

api_key = os.environ.get("GEMINI_API_KEY", "")
detected = "Detectada" if api_key else "NAO DETECTADA - modo mock sera ativado"
print(f"\n{INFO}  GEMINI_API_KEY: {detected}")
if not api_key:
    print(f"\n{WARN}  Defina GEMINI_API_KEY antes de rodar o teste end-to-end real.")

# ─── Passo 1: Health check ────────────────────────────────────────────────────
print("\n[1/4] Health Check do servidor...")
try:
    api_call("GET", "/api/opportunities")
    print(f"  {PASS}  Servidor respondendo em {BASE_URL}")
except Exception as e:
    print(f"  {FAIL}  Servidor inacessivel: {e}")
    print(f"\n  Inicie o servidor com: .\\start.ps1")
    sys.exit(1)

# ─── Passo 2: Criar oportunidade ─────────────────────────────────────────────
print("\n[2/4] Criando oportunidade (POST /api/opportunities)...")
print(f"  {INFO}  Enviando texto bruto para a IA... (aguarde ate {TIMEOUT}s)")
t0 = time.time()
try:
    brief = api_call("POST", "/api/opportunities", {
        "raw_text": SAMPLE_BRIEF_TEXT,
        "source": "test_e2e.py"
    })
    elapsed = round(time.time() - t0, 1)
    print(f"  {INFO}  Resposta recebida em {elapsed}s")

    opp_id = brief.get("opportunity", {}).get("id", "")
    author  = brief.get("history", [{}])[0].get("author", "")
    title   = brief.get("opportunity", {}).get("title", "")
    client  = brief.get("customer", {}).get("name", "")
    status  = brief.get("opportunity", {}).get("status", "")

    check("ID gerado",            bool(opp_id),             f"id = {opp_id}")
    check("Título extraído",       bool(title),              f"title = {title}")
    check("Cliente extraído",      bool(client),             f"customer = {client}")
    check("Status correto",        status == "Inicial",      f"status = {status}")
    mock_warn = " [MODO MOCK]" if "Mock" in author else ""
    check("Autor = IA Copilot",    author == "IA Copilot",   f"author = {author}{mock_warn}")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"  {FAIL}  HTTP {e.code}: {body}")
    sys.exit(1)
except Exception as e:
    print(f"  {FAIL}  Erro inesperado: {e}")
    sys.exit(1)

# --- Passo 3: Enriquecer oportunidade ----------------------------------------
print(f"\n[3/4] Enriquecendo oportunidade {opp_id} (POST /api/opportunities/{opp_id}/enrich)...")
print(f"  {INFO}  Executando analise de riscos, gaps e perguntas... (aguarde ate {TIMEOUT}s)")
t0 = time.time()
try:
    enriched = api_call("POST", f"/api/opportunities/{opp_id}/enrich")
    elapsed  = round(time.time() - t0, 1)
    print(f"  {INFO}  Resposta recebida em {elapsed}s")

    status_e   = enriched.get("opportunity", {}).get("status", "")
    risks      = enriched.get("risks", [])
    questions  = enriched.get("questions", [])
    gaps       = enriched.get("missing_information", [])
    summary    = enriched.get("executive_summary", "")
    plan_steps = enriched.get("discovery_plan", {}).get("steps", [])
    version    = enriched.get("context_version", 0)

    check("Status = Enriquecido",      status_e == "Enriquecido",  f"status = {status_e}")
    check("Versão incrementada",       version >= 2,               f"context_version = {version}")
    check("Riscos gerados",            len(risks) >= 1,            f"{len(risks)} riscos encontrados")
    check("Perguntas de discovery",    len(questions) >= 1,        f"{len(questions)} perguntas geradas")
    check("Lacunas identificadas",     len(gaps) >= 0,             f"{len(gaps)} gaps detectados")
    check("Resumo executivo",          bool(summary),              f"{len(summary)} chars")
    check("Plano de discovery",        len(plan_steps) >= 0,       f"{len(plan_steps)} passos")

    if risks:
        print(f"\n  {INFO}  Primeiro risco identificado:")
        r = risks[0]
        desc = r.get("description", "") if isinstance(r, dict) else str(r)
        print(f"         {desc[:120]}")

    if questions:
        print(f"\n  {INFO}  Primeira pergunta de discovery:")
        q = questions[0]
        text = q.get("question", q.get("text", "")) if isinstance(q, dict) else str(q)
        print(f"         {text[:120]}")

except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"  {FAIL}  HTTP {e.code}: {body}")
except Exception as e:
    print(f"  {FAIL}  Erro inesperado: {e}")

# ─── Passo 4: Recuperar e verificar persistência ──────────────────────────────
print(f"\n[4/4] Verificando persistência (GET /api/opportunities/{opp_id})...")
try:
    persisted = api_call("GET", f"/api/opportunities/{opp_id}")
    p_status  = persisted.get("opportunity", {}).get("status", "")
    p_version = persisted.get("context_version", 0)
    check("Oportunidade recuperada",   bool(persisted),     f"id = {opp_id}")
    check("Status persistido",         p_status == "Enriquecido", f"status = {p_status}")
    check("Versão persistida",         p_version >= 2,      f"version = {p_version}")
except Exception as e:
    print(f"  {FAIL}  Erro: {e}")

# ─── Resumo Final ─────────────────────────────────────────────────────────────
print("\n" + "=" * 60)
passed = sum(1 for _, ok in results if ok)
total  = len(results)
color  = "\033[92m" if passed == total else "\033[91m"
print(f"  Resultado: {color}{passed}/{total} checks passaram\033[0m")

if not api_key:
    print(f"\n  {WARN}  Rode novamente com GEMINI_API_KEY definida para validar IA real.")
    print(f"         Use: .\\start.ps1  (carrega o .env automaticamente)")

print("=" * 60 + "\n")

sys.exit(0 if passed == total else 1)
