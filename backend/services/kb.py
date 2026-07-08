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
        articles_seed = articles_seed = [
        (
            "ART-001",
            "Padrão de Integração de CRM Salesforce",
            "Integração",
            "Para integrações com Salesforce CRM, a empresa adota preferencialmente APIs REST com autenticação OAuth 2.0 via barramento corporativo."
        ),
        (
            "ART-002",
            "Política de Segurança e LGPD para Dados de Clientes",
            "Segurança",
            "Todos os produtos desenvolvidos devem criptografar dados pessoais sensíveis (PII) em repouso e em trânsito (AES-256 e TLS 1.3) para conformidade com a LGPD."
        ),
        (
            "ART-003",
            "Diretrizes para Migração de Cloud AWS",
            "Cloud/Infra",
            "Nossa arquitetura padrão de cloud é baseada em AWS, utilizando serviços gerenciados como ECS Fargate (para containers) e RDS Aurora (para banco de dados)."
        ),
        (
            "ART-004",
            "Modelo de Qualificação de Oportunidades Complexas",
            "Processo",
            "Uma oportunidade é considerada de alta complexidade técnica se envolver: mais de 3 integrações com sistemas legados, volume de dados superior a 10TB/mês ou requisitos de tempo real."
        ),
        (
            "ART-005",
            "Fluxo de Registro e Qualificação de Leads no CRM",
            "Processo / Comercial",
            "O registro de novos leads deve conter informações comerciais mínimas para a abertura de Registro de Oportunidade (RO), sob a responsabilidade (R) do Vendedor. A qualificação técnica da oportunidade exige a aprovação (A) da Diretoria de Pré-Vendas e o apoio consultivo (C) do BDM e do Price Manager. "
        ),
        (
            "ART-006",
            "Processo de Precificação e Validação de Margens (Price Manager)",
            "Processo / Financeiro",
            "O preenchimento e análise do Price são de responsabilidade do Price Manager (GES), atuando como Consultor (C) para o Vendedor na definição de margens e comissões. A validação final de precificação exige aprovação (A) da Diretoria Comercial antes do envio da proposta ao cliente. "
        ),
        (
            "ART-007",
            "Validação de Escopo e Engenharia de Pré-Vendas",
            "Processo / Pré-Vendas",
            "Toda validação de escopo técnico (DDAS) e serviços para propostas (Implantação, COps e SOC) é de responsabilidade estrita da equipe de Pré-Vendas (R), com aprovação da Diretoria de Pré-Vendas ou Pós-Venda a depender do modelo de entrega. "
        ),
        (
            "ART-008",
            "Portfólio de Serviços Gerenciados: SOC e COps",
            "Portfólio / Serviços",
            "A ClearIT oferece Serviços Gerenciados com monitoramento contínuo 24x7x365[cite: 29]. O Centro de Operações de Segurança (SOC) engloba SIEM [cite: 31], análise comportamental (UEBA) [cite: 34] e automação (SOAR)[cite: 37]. O Centro de Operações Cognitivas (COps) foca em observabilidade de infraestrutura [cite: 43] e análise preditiva com IA[cite: 47]."
        ),
        (
            "ART-009",
            "Pilares de Soluções de Infraestrutura e Nuvem",
            "Portfólio / Infraestrutura",
            "As soluções de infraestrutura da ClearIT visam impulsionar a eficiência operacional através de estratégias de adoção de Nuvem Híbrida e Multinuvem [cite: 5, 14], Resiliência de Dados [cite: 8], Inteligência Artificial [cite: 11] e Comunicação de Campus ou Datacenter[cite: 9]."
        ),
        (
            "ART-010",
            "Arquitetura e Pilares de Cibersegurança",
            "Portfólio / Segurança",
            "O portfólio de Cibersegurança cobre os seguintes pilares fundamentais: Proteção de Perímetro [cite: 16], Proteção de Dispositivos (Endpoints) [cite: 17], Proteção de Identidade [cite: 19], Gestão de Vulnerabilidades [cite: 21], Microsegmentação [cite: 25] e conscientização/simulação de usuários[cite: 24]."
        ),
        (
            "ART-011",
            "Matriz de Parceiros e Fabricantes Homologados",
            "Parceiros",
            "Para resiliência de dados e backup, os parceiros homologados são Veeam, Commvault e Exagrid[cite: 54, 55, 66]. Para segurança de perímetro, proteção e redes com IA, utilizam-se Fortinet [cite: 62], SentinelOne [cite: 63], Juniper (Mist AI) [cite: 59] e Illumio[cite: 69]. Soluções de computação e nuvem apoiam-se em AWS [cite: 65], Nutanix [cite: 54] e NVIDIA[cite: 57]."
        )
    ]
        cursor.executemany("INSERT INTO articles VALUES (?, ?, ?, ?)", articles_seed)
        conn.commit()

    conn.close()

def search_kb(query: str = "") -> str:
    """
    Busca artigos na Knowledge Base local e retorna uma string consolidada
    para servir de contexto no prompt da LLM.
    
    Suporta múltiplos termos separados por " OR " (ex: "AWS OR Cloud").
    """
    init_kb_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    if query:
        # Separa termos por " OR " e busca cada um individualmente
        terms = [t.strip() for t in query.split(" OR ") if t.strip()]
        
        if terms:
            # Construa múltiplos LIKEs para cada termo
            conditions = []
            params = []
            for term in terms:
                conditions.extend(["title LIKE ?", "content LIKE ?"])
                params.extend([f"%{term}%", f"%{term}%"])
            
            sql = f"SELECT id, title, category, content FROM articles WHERE {' OR '.join(conditions)}"
            cursor.execute(sql, params)
        else:
            cursor.execute("SELECT id, title, category, content FROM articles")
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
