import os
import sqlite3
from typing import List, Dict

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "knowledge")
DB_PATH = os.path.join(DB_DIR, "knowledge.db")

def init_kb_db():
    """
    Inicializa o banco de dados SQLite de Knowledge Base se ele não existir,
    inserindo alguns artigos de exemplo para o Discovery.
    """
    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Cria tabela de artigos
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS articles (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            content TEXT NOT NULL
        )
    """)

    # Insere dados de semente (seed) se a tabela estiver vazia
    cursor.execute("SELECT COUNT(*) FROM articles")
    if cursor.fetchone()[0] == 0:
        articles_seed = [
            (
                "ART-001",
                "Padrão de Integração de CRM Salesforce",
                "Integração",
                "Para integrações com Salesforce CRM, a empresa adota preferencialmente APIs REST com autenticação OAuth 2.0 via barramento corporativo. O tempo médio estimado de setup de conectores padrão é de 3 a 5 semanas. Qualquer requisito de sincronização bidirecional em tempo real deve passar pela validação do time de Arquitetura de Integração (risco de concorrência de dados)."
            ),
            (
                "ART-002",
                "Política de Segurança e LGPD para Dados de Clientes",
                "Segurança",
                "Todos os produtos desenvolvidos devem criptografar dados pessoais sensíveis (PII) em repouso e em trânsito (AES-256 e TLS 1.3). Bases de dados de homologação ou teste devem obrigatoriamente sofrer processos de anonimização/mascaramento de dados. Respostas a RFPs devem garantir conformidade com a LGPD e certificação ISO 27001."
            ),
            (
                "ART-003",
                "Diretrizes para Migração de Cloud AWS",
                "Cloud/Infra",
                "Nossa arquitetura padrão de cloud é baseada em AWS, utilizando serviços gerenciados como ECS Fargate (para containers), RDS PostgreSQL (para banco relacional) e S3 (para armazenamento de objetos). Soluções que exijam conformidade com PCI-DSS devem rodar em VPCs segregadas com monitoramento por AWS GuardDuty."
            ),
            (
                "ART-004",
                "Modelo de Qualificação de Oportunidades Complexas",
                "Processo",
                "Uma oportunidade é considerada de alta complexidade técnica se envolver: mais de 3 integrações com sistemas legados, volumetria superior a 100 requisições por segundo (RPS) ou desenvolvimento de modelos proprietários de IA. Oportunidades complexas necessitam da validação de um Especialista Técnico na segunda reunião de discovery."
            )
        ]
        cursor.executemany("INSERT INTO articles VALUES (?, ?, ?, ?)", articles_seed)
        conn.commit()

    conn.close()

def search_kb(query: str = "") -> str:
    """
    Busca artigos na Knowledge Base local e retorna uma string consolidada
    para servir de contexto no prompt da LLM.
    """
    init_kb_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    if query:
        # Busca textual simples nos títulos ou conteúdo
        cursor.execute(
            "SELECT id, title, category, content FROM articles WHERE title LIKE ? OR content LIKE ?",
            (f"%{query}%", f"%{query}%")
        )
    else:
        cursor.execute("SELECT id, title, category, content FROM articles")

    rows = cursor.fetchall()
    conn.close()

    if not rows:
        return "Nenhum artigo oficial de conhecimento foi encontrado para este tema na Knowledge Base."

    context_list = []
    for row in rows:
        art_id, title, category, content = row
        context_list.append(
            f"Artigo: {title} ({art_id})\nCategoria: {category}\nConteúdo: {content}\n---"
        )

    return "\n\n".join(context_list)
