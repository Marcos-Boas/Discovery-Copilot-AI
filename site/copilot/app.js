/* app.js · Discovery Copilot UI · Lógica do Frontend Vanilla JS */

const API_BASE = window.location.origin.includes("localhost") ? "http://localhost:8000" : window.location.origin;
let activeOpportunity = null;

// Elementos da DOM
const apiStatusSpan = document.getElementById("api-status");
const opportunityListContainer = document.getElementById("opportunity-list");
const workspaceHeader = document.getElementById("workspace-header");
const workspaceBody = document.getElementById("workspace-body");
const emptyWorkspace = document.getElementById("empty-workspace");
const globalLoader = document.getElementById("global-loader");

// Modal de Upload
const uploadModal = document.getElementById("upload-modal");
const btnShowUpload = document.getElementById("btn-show-upload");
const btnEmptyImport = document.getElementById("btn-empty-import");
const btnCloseUpload = document.getElementById("btn-close-upload");
const uploadForm = document.getElementById("upload-form");

// Botões de Ação
const btnEnrich = document.getElementById("btn-enrich");
const btnExport = document.getElementById("btn-export");
const btnSave = document.getElementById("btn-save");

// Elementos de Exibição do Cabeçalho
const oppDisplayTitle = document.getElementById("opp-display-title");
const oppDisplayCustomer = document.getElementById("opp-display-customer");
const oppDisplayVersion = document.getElementById("opp-display-version");

// KB Search e Histórico
const kbSearchInput = document.getElementById("kb-search-input");
const kbResultsContainer = document.getElementById("kb-results-container");
const historyContainer = document.getElementById("history-container");

// Metadados
const metaSource = document.getElementById("meta-source");
const metaCreated = document.getElementById("meta-created");
const metaId = document.getElementById("meta-id");

// Inputs do Formulário
const formBrief = document.getElementById("canonical-brief-form");
const inputTitle = document.getElementById("input-title");
const inputCustomerName = document.getElementById("input-customer-name");
const inputCustomerSegment = document.getElementById("input-customer-segment");
const inputConfidenceLevel = document.getElementById("input-confidence-level");
const inputProblems = document.getElementById("input-business-problems");
const inputCurrentScenario = document.getElementById("input-current-scenario");
const inputDesiredScenario = document.getElementById("input-desired-scenario");
const inputScopeIncluded = document.getElementById("input-scope-included");
const inputScopeExcluded = document.getElementById("input-scope-excluded");
const inputTechnologies = document.getElementById("input-technologies");
const inputConstraints = document.getElementById("input-constraints");
const inputExecutiveSummary = document.getElementById("input-executive-summary");
const inputPlanMethodology = document.getElementById("input-plan-methodology");
const inputPlanSteps = document.getElementById("input-plan-steps");

// Containers de cards editáveis
const gapsContainer = document.getElementById("gaps-container");
const questionsContainer = document.getElementById("questions-container");
const risksContainer = document.getElementById("risks-container");
const assumptionsContainer = document.getElementById("assumptions-container");

// Botões de adicionar
const btnAddGap = document.getElementById("btn-add-gap");
const btnAddQuestion = document.getElementById("btn-add-question");
const btnAddRisk = document.getElementById("btn-add-risk");
const btnAddAssumption = document.getElementById("btn-add-assumption");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    checkApiStatus();
    loadOpportunities();
    loadKbArticles();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Modal Upload
    const openUpload = () => { uploadModal.style.display = "flex"; };
    const closeUpload = () => { uploadModal.style.display = "none"; uploadForm.reset(); };
    btnShowUpload.addEventListener("click", openUpload);
    btnEmptyImport.addEventListener("click", openUpload);
    btnCloseUpload.addEventListener("click", closeUpload);
    
    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const text = document.getElementById("upload-text").value;
        const source = document.getElementById("upload-source").value;
        closeUpload();
        await createOpportunity(text, source);
    });

    // Enriquecer, Exportar e Salvar
    btnEnrich.addEventListener("click", enrichOpportunity);
    btnExport.addEventListener("click", exportBrief);
    btnSave.addEventListener("click", saveAndValidateOpportunity);

    // Pesquisa KB
    kbSearchInput.addEventListener("input", debounce(() => {
        loadKbArticles(kbSearchInput.value);
    }, 300));

    // Cards editáveis
    btnAddGap.addEventListener("click", () => addGapCard());
    btnAddQuestion.addEventListener("click", () => addQuestionCard());
    btnAddRisk.addEventListener("click", () => addRiskCard());
    btnAddAssumption.addEventListener("click", () => addAssumptionCard());
}

// Funções para Cards Editáveis
function generateId() {
    return 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function createCardHeader(title, onRemove) {
    const header = document.createElement('div');
    header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;';
    
    const label = document.createElement('label');
    label.textContent = title;
    label.style.cssText = 'font-size: 0.8rem; font-weight: 600; color: var(--text-body); margin: 0;';
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '✕';
    removeBtn.className = 'btn btn-secondary';
    removeBtn.style.cssText = 'width: auto; padding: 0.3rem 0.6rem; font-size: 0.75rem; min-width: 32px;';
    removeBtn.addEventListener('click', onRemove);
    
    header.appendChild(label);
    header.appendChild(removeBtn);
    return header;
}

function createInput(placeholder, value = '', style = '') {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.placeholder = placeholder;
    input.value = value;
    if (style) input.style.cssText = style;
    return input;
}

function createSelect(options, value = '') {
    const select = document.createElement('select');
    select.className = 'form-control';
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (opt === value) option.selected = true;
        select.appendChild(option);
    });
    return select;
}

function addGapCard(gap = null) {
    const card = document.createElement('div');
    card.className = 'editable-card';
    card.style.cssText = 'background: rgba(28,22,18,0.02); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; transition: all 0.2s ease;';
    
    const id = gap ? gap.id : generateId();
    
    card.appendChild(createCardHeader('Gap de Informação', () => card.remove()));
    
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;';
    
    grid.appendChild(createInput('Área', gap ? gap.area : ''));
    grid.appendChild(createSelect(['Alta', 'Média', 'Baixa'], gap ? gap.priority : ''));
    card.appendChild(grid);
    
    const descInput = document.createElement('textarea');
    descInput.className = 'form-control';
    descInput.placeholder = 'Descrição do gap...';
    descInput.value = gap ? gap.description : '';
    descInput.style.cssText = 'min-height: 60px; resize: vertical;';
    card.appendChild(descInput);
    
    card.dataset.id = id;
    gapsContainer.appendChild(card);
}

function addQuestionCard(question = null) {
    const card = document.createElement('div');
    card.className = 'editable-card';
    card.style.cssText = 'background: var(--purple-dim); border: 1px solid var(--border-purple); border-radius: 8px; padding: 1rem; transition: all 0.2s ease;';
    
    const id = question ? question.id : generateId();
    
    card.appendChild(createCardHeader('Pergunta de Validação', () => card.remove()));
    
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;';
    
    grid.appendChild(createSelect(['Aberta', 'Fechada', 'Múltipla Escolha'], question ? question.type : 'Aberta'));
    grid.appendChild(createInput('Alvo (papel)', question ? question.target_role : ''));
    card.appendChild(grid);
    
    const descInput = document.createElement('textarea');
    descInput.className = 'form-control';
    descInput.placeholder = 'Pergunta...';
    descInput.value = question ? question.question : '';
    descInput.style.cssText = 'min-height: 60px; resize: vertical; margin-bottom: 0.75rem;';
    card.appendChild(descInput);
    
    const ctxInput = document.createElement('input');
    ctxInput.type = 'text';
    ctxInput.className = 'form-control';
    ctxInput.placeholder = 'Contexto adicional (opcional)';
    ctxInput.value = question ? question.context || '' : '';
    card.appendChild(ctxInput);
    
    card.dataset.id = id;
    questionsContainer.appendChild(card);
}

function addRiskCard(risk = null) {
    const card = document.createElement('div');
    card.className = 'editable-card';
    card.style.cssText = 'background: rgba(220,38,38,0.03); border: 1px solid rgba(220,38,38,0.15); border-radius: 8px; padding: 1rem; transition: all 0.2s ease;';
    
    const id = risk ? risk.id : generateId();
    
    card.appendChild(createCardHeader('Risco Identificado', () => card.remove()));
    
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;';
    
    grid.appendChild(createSelect(['Técnico', 'Comercial', 'Operacional', 'Financeiro', 'Legal'], risk ? risk.category : ''));
    grid.appendChild(createSelect(['Alto', 'Médio', 'Baixo'], risk ? risk.probability : ''));
    card.appendChild(grid);
    
    const descInput = document.createElement('textarea');
    descInput.className = 'form-control';
    descInput.placeholder = 'Descrição do risco...';
    descInput.value = risk ? risk.description : '';
    descInput.style.cssText = 'min-height: 60px; resize: vertical; margin-bottom: 0.75rem;';
    card.appendChild(descInput);
    
    const grid2 = document.createElement('div');
    grid2.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;';
    grid2.appendChild(createInput('Impacto', risk ? risk.impact : ''));
    grid2.appendChild(createInput('Mitigação', risk ? risk.mitigation : ''));
    card.appendChild(grid2);
    
    card.dataset.id = id;
    risksContainer.appendChild(card);
}

function addAssumptionCard(assumption = null) {
    const card = document.createElement('div');
    card.className = 'editable-card';
    card.style.cssText = 'background: rgba(28,22,18,0.02); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; transition: all 0.2s ease;';
    
    const id = assumption ? assumption.id : generateId();
    
    card.appendChild(createCardHeader('Premissa Documentada', () => card.remove()));
    
    const descInput = document.createElement('textarea');
    descInput.className = 'form-control';
    descInput.placeholder = 'Descrição da premissa...';
    descInput.value = assumption ? assumption.description : '';
    descInput.style.cssText = 'min-height: 60px; resize: vertical; margin-bottom: 0.75rem;';
    card.appendChild(descInput);
    
    card.appendChild(createInput('Impacto no Projeto', assumption ? assumption.impact : ''));
    
    card.dataset.id = id;
    assumptionsContainer.appendChild(card);
}

// Utilitários de Requisição
async function checkApiStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/kb`);
        if (response.ok) {
            apiStatusSpan.innerText = "Conectado";
            apiStatusSpan.style.color = "#059669";
        }
    } catch (e) {
        apiStatusSpan.innerText = "Desconectado";
        apiStatusSpan.style.color = "#DC2626";
    }
}

function showLoader() {
    // Injeta loader na tela
    document.body.appendChild(globalLoader);
    globalLoader.style.display = "flex";
}

function hideLoader() {
    globalLoader.style.display = "none";
}

// Carregar Oportunidades
async function loadOpportunities() {
    try {
        const response = await fetch(`${API_BASE}/api/opportunities`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        opportunityListContainer.innerHTML = "";
        
        if (data.length === 0) {
            opportunityListContainer.innerHTML = `
                <div class="sans" style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 2rem;">
                    Nenhuma oportunidade cadastrada.
                </div>`;
            return;
        }

        data.forEach(opp => {
            const activeClass = (activeOpportunity && activeOpportunity.opportunity.id === opp.id) ? "active" : "";
            const item = document.createElement("div");
            item.className = `opp-item ${activeClass}`;
            item.onclick = () => selectOpportunity(opp.id);
            
            const dateStr = new Date(opp.created_at).toLocaleDateString("pt-BR", {day: "2-digit", month: "2-digit"});
            const statusClass = `status-${opp.status.toLowerCase()}`;
            
            item.innerHTML = `
                <h4>${opp.title}</h4>
                <p>${opp.customer_name}</p>
                <div class="opp-meta">
                  <span class="status-badge ${statusClass}">${opp.status}</span>
                  <span>v${opp.context_version} · ${dateStr}</span>
                </div>
            `;
            opportunityListContainer.appendChild(item);
        });
    } catch (e) {
        console.error("Erro ao listar oportunidades", e);
    }
}

// Selecionar Oportunidade
async function selectOpportunity(oppId) {
    showLoader();
    try {
        const response = await fetch(`${API_BASE}/api/opportunities/${oppId}`);
        if (!response.ok) throw new Error();
        const brief = await response.json();
        
        activeOpportunity = brief;
        renderBriefEditor(brief);
        
        // Destaca item selecionado
        const items = document.querySelectorAll(".opp-item");
        items.forEach(it => it.classList.remove("active"));
        loadOpportunities(); // Atualiza classes
        
    } catch (e) {
        alert("Erro ao selecionar a oportunidade.");
    } finally {
        hideLoader();
    }
}

// Criar Oportunidade
async function createOpportunity(text, source) {
    showLoader();
    try {
        const response = await fetch(`${API_BASE}/api/opportunities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ raw_text: text, source: source })
        });
        if (!response.ok) throw new Error();
        const brief = await response.json();
        
        activeOpportunity = brief;
        await loadOpportunities();
        renderBriefEditor(brief);
    } catch (e) {
        alert("Erro ao processar o briefing inicial. Certifique-se de que o backend e a API Key estão configurados.");
    } finally {
        hideLoader();
    }
}

// Enriquecer Oportunidade
async function enrichOpportunity() {
    if (!activeOpportunity) return;
    showLoader();
    try {
        const oppId = activeOpportunity.opportunity.id;
        const response = await fetch(`${API_BASE}/api/opportunities/${oppId}/enrich`, {
            method: "POST"
        });
        if (!response.ok) throw new Error();
        const brief = await response.json();
        
        activeOpportunity = brief;
        await loadOpportunities();
        renderBriefEditor(brief);
        alert("Oportunidade enriquecida com IA e Knowledge Base com sucesso!");
    } catch (e) {
        alert("Erro ao enriquecer a oportunidade.");
    } finally {
        hideLoader();
    }
}

// Salvar e Validar Oportunidade
async function saveAndValidateOpportunity() {
    if (!activeOpportunity) return;
    showLoader();
    try {
        const oppId = activeOpportunity.opportunity.id;
        const briefData = serializeBriefFromForm();

        const response = await fetch(`${API_BASE}/api/opportunities/${oppId}/validate`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(briefData)
        });
        if (!response.ok) throw new Error();
        const brief = await response.json();

        activeOpportunity = brief;
        await loadOpportunities();
        renderBriefEditor(brief);
        alert("Canonical Brief salvo e validado com sucesso! Histórico atualizado.");
    } catch (e) {
        alert("Erro ao salvar oportunidade.");
    } finally {
        hideLoader();
    }
}

// Exportar Briefing
function exportBrief() {
    if (!activeOpportunity) {
        alert("Nenhuma oportunidade selecionada para exportar.");
        return;
    }

    const brief = activeOpportunity;
    const markdown = generateMarkdownExport(brief);

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `briefing-${brief.opportunity.id}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateMarkdownExport(brief) {
    return `# Discovery Brief: ${brief.opportunity.title}

**Cliente:** ${brief.customer.name}  
**Segmento:** ${brief.customer.segment || "N/A"}  
**ID:** ${brief.opportunity.id}  
**Versão:** v${brief.context_version}  
**Status:** ${brief.opportunity.status}  
**Origem:** ${brief.opportunity.source}  
**Criado em:** ${new Date(brief.opportunity.created_at).toLocaleString("pt-BR")}  
**Nível de Confiança:** ${brief.confidence_level}

---

## Contexto de Negócio

### Problemas Identificados
${brief.business_context.problems.map(p => `- ${p}`).join("\n") || "Nenhum problema identificado."}

### Objetivos
${brief.business_context.objectives.map(o => `- ${o}`).join("\n") || "Nenhum objetivo definido."}

### Motivações
${brief.business_context.motivations.map(m => `- ${m}`).join("\n") || "Nenhuma motivação registrada."}

---

## Cenário Atual
${brief.current_scenario.description || "Não descrito."}

### Pontos Chave
${brief.current_scenario.key_points.map(p => `- ${p}`).join("\n") || "Nenhum ponto chave."}

---

## Cenário Desejado
${brief.desired_scenario.description || "Não descrito."}

### Pontos Chave
${brief.desired_scenario.key_points.map(p => `- ${p}`).join("\n") || "Nenhum ponto chave."}

---

## Escopo

### Incluído
${brief.scope.included.map(i => `- ${i}`).join("\n") || "Nada definido."}

### Excluído
${brief.scope.excluded.map(e => `- ${e}`).join("\n") || "Nada definido."}

---

## Tecnologias
${brief.technologies.map(t => `- ${t}`).join("\n") || "Nenhuma tecnologia listada."}

---

## Restrições
${brief.constraints.map(c => `- ${c}`).join("\n") || "Nenhuma restrição."}

---

## Lacunas de Informação (Gaps)
${brief.missing_information.map(g => `
### ${g.id} [${g.area}] - Prioridade: ${g.priority}
${g.description}
`).join("\n") || "Nenhuma lacuna identificada."}

---

## Perguntas de Discovery
${brief.questions.map(q => `
### ${q.id} [${q.type}]
**Pergunta:** ${q.question}
**Alvo:** ${q.target_role || "Todos"}
**Contexto:** ${q.context || "N/A"}
`).join("\n") || "Nenhuma pergunta sugerida."}

---

## Riscos
${brief.risks.map(r => `
### ${r.id} [${r.category}]
**Descrição:** ${r.description}
**Impacto:** ${r.impact}
**Probabilidade:** ${r.probability}
**Mitigação:** ${r.mitigation || "Nenhuma mitigação proposta."}
`).join("\n") || "Nenhum risco identificado."}

---

## Premissas
${brief.assumptions.map(a => `
### ${a.id}
**Descrição:** ${a.description}
**Impacto no Projeto:** ${a.impact}
`).join("\n") || "Nenhuma premissa registrada."}

---

## Resumo Executivo
${brief.executive_summary || "Não gerado."}

---

## Plano de Discovery

### Metodologia
${brief.discovery_plan.methodology || "Não definida."}

### Passos
${brief.discovery_plan.steps.map(s => `${s}`).join("\n") || "Nenhum passo definido."}

### Métricas de Validação
${brief.discovery_plan.validation_metrics.map(m => `- ${m}`).join("\n") || "Nenhuma métrica definida."}

---

## Stakeholders
${brief.stakeholders.map(s => `
### ${s.name}
**Papel:** ${s.role}
**Contato:** ${s.contact || "N/A"}
`).join("\n") || "Nenhum stakeholder listado."}

---

## Histórico de Versões
${brief.history.map(h => `
### v${h.version} - ${new Date(h.date).toLocaleString("pt-BR")}
**Autor:** ${h.author}
**Resumo:** ${h.changes_summary}
`).join("\n")}

---

*Gerado pelo Discovery Copilot AI - Onion Mini v2.0*
`;
}

// Renderizar Formulário com dados do Brief
function renderBriefEditor(brief) {
    emptyWorkspace.style.display = "none";
    workspaceHeader.style.display = "flex";
    workspaceBody.style.display = "grid";

    // Cabeçalho
    oppDisplayTitle.innerText = brief.opportunity.title;
    oppDisplayCustomer.innerText = brief.customer.name || "N/A";
    oppDisplayVersion.innerText = `v${brief.context_version}`;

    // Metadados
    metaSource.innerText = brief.opportunity.source;
    metaCreated.innerText = new Date(brief.opportunity.created_at).toLocaleString("pt-BR");
    metaId.innerText = brief.opportunity.id;

    // Inputs Textos Gerais
    inputTitle.value = brief.opportunity.title;
    inputCustomerName.value = brief.customer.name || "";
    inputCustomerSegment.value = brief.customer.segment || "";
    inputConfidenceLevel.value = brief.confidence_level || "Baixo";
    
    inputProblems.value = (brief.business_context.problems || []).join("\n");
    inputCurrentScenario.value = brief.current_scenario.description || "";
    inputDesiredScenario.value = brief.desired_scenario.description || "";
    
    inputScopeIncluded.value = (brief.scope.included || []).join("\n");
    inputScopeExcluded.value = (brief.scope.excluded || []).join("\n");
    
    inputTechnologies.value = (brief.technologies || []).join(", ");
    inputConstraints.value = (brief.constraints || []).join("\n");
    
    inputExecutiveSummary.value = brief.executive_summary || "";
    
    inputPlanMethodology.value = brief.discovery_plan.methodology || "";
    inputPlanSteps.value = (brief.discovery_plan.steps || []).join("\n");

    // Gaps (Lacunas) - formato: ID|Área|Prioridade|Descrição
    inputGaps.value = (brief.missing_information || []).map(g => `${g.id}|${g.area}|${g.priority}|${g.description}`).join("\n");

    // Perguntas - formato: ID|Tipo|Pergunta|Alvo|Contexto
    inputQuestions.value = (brief.questions || []).map(q => `${q.id}|${q.type}|${q.question}|${q.target_role || ""}|${q.context || ""}`).join("\n");

    // Riscos - formato: ID|Categoria|Descrição|Impacto|Probabilidade|Mitigação
    inputRisks.value = (brief.risks || []).map(r => `${r.id}|${r.category}|${r.description}|${r.impact}|${r.probability}|${r.mitigation || ""}`).join("\n");

    // Premissas - formato: ID|Descrição|Impacto
    inputAssumptions.value = (brief.assumptions || []).map(a => `${a.id}|${a.description}|${a.impact}`).join("\n");

    // Histórico
    historyContainer.innerHTML = "";
    if (brief.history && brief.history.length > 0) {
        // Ordena por versão decrescente para mostrar no histórico lateral
        const historySorted = [...brief.history].reverse();
        historySorted.forEach(h => {
            const dateStr = new Date(h.date).toLocaleString("pt-BR", {hour: "2-digit", minute:"2-digit"});
            const row = document.createElement("div");
            row.style = "border-bottom: 1px solid var(--border); padding-bottom: 0.35rem; margin-bottom: 0.35rem;";
            row.innerHTML = `
                <div style="display: flex; justify-content: space-between; font-weight: bold; color: var(--text);">
                  <span>Versão ${h.version}</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted);">${dateStr}</span>
                </div>
                <div style="color: var(--orange-light); font-size: 0.7rem;">Por: ${h.author}</div>
                <div style="color: var(--text-body); margin-top: 0.15rem; line-height: 1.3;">${h.changes_summary}</div>
            `;
            historyContainer.appendChild(row);
        });
    }
}

// Serializar Dados do Formulário para enviar no Save
function serializeBriefFromForm() {
    const listFromTextarea = (val) => val.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const commaSeparated = (val) => val.split(",").map(i => i.trim()).filter(i => i.length > 0);

    // Mantém estruturas estáticas que não são editadas diretamente no formulário
    const brief = JSON.parse(JSON.stringify(activeOpportunity));

    brief.opportunity.title = inputTitle.value;
    brief.customer.name = inputCustomerName.value;
    brief.customer.segment = inputCustomerSegment.value;
    brief.confidence_level = inputConfidenceLevel.value;

    brief.business_context.problems = listFromTextarea(inputProblems.value);
    brief.current_scenario.description = inputCurrentScenario.value;
    brief.desired_scenario.description = inputDesiredScenario.value;

    brief.scope.included = listFromTextarea(inputScopeIncluded.value);
    brief.scope.excluded = listFromTextarea(inputScopeExcluded.value);

    brief.technologies = commaSeparated(inputTechnologies.value);
    brief.constraints = listFromTextarea(inputConstraints.value);

    brief.executive_summary = inputExecutiveSummary.value;

    brief.discovery_plan.methodology = inputPlanMethodology.value;
    brief.discovery_plan.steps = listFromTextarea(inputPlanSteps.value);

    // Parse Gaps - formato: ID|Área|Prioridade|Descrição
    brief.missing_information = listFromTextarea(inputGaps.value).map(line => {
        const parts = line.split("|");
        if (parts.length >= 4) {
            return {
                id: parts[0].trim(),
                area: parts[1].trim(),
                priority: parts[2].trim(),
                description: parts.slice(3).join("|").trim()
            };
        }
        return null;
    }).filter(g => g !== null);

    // Parse Perguntas - formato: ID|Tipo|Pergunta|Alvo|Contexto
    brief.questions = listFromTextarea(inputQuestions.value).map(line => {
        const parts = line.split("|");
        if (parts.length >= 3) {
            return {
                id: parts[0].trim(),
                type: parts[1].trim(),
                question: parts[2].trim(),
                target_role: parts[3] ? parts[3].trim() : null,
                context: parts[4] ? parts[4].trim() : null
            };
        }
        return null;
    }).filter(q => q !== null);

    // Parse Riscos - formato: ID|Categoria|Descrição|Impacto|Probabilidade|Mitigação
    brief.risks = listFromTextarea(inputRisks.value).map(line => {
        const parts = line.split("|");
        if (parts.length >= 5) {
            return {
                id: parts[0].trim(),
                category: parts[1].trim(),
                description: parts[2].trim(),
                impact: parts[3].trim(),
                probability: parts[4].trim(),
                mitigation: parts[5] ? parts[5].trim() : null
            };
        }
        return null;
    }).filter(r => r !== null);

    // Parse Premissas - formato: ID|Descrição|Impacto
    brief.assumptions = listFromTextarea(inputAssumptions.value).map(line => {
        const parts = line.split("|");
        if (parts.length >= 3) {
            return {
                id: parts[0].trim(),
                description: parts[1].trim(),
                impact: parts[2].trim()
            };
        }
        return null;
    }).filter(a => a !== null);

    return brief;
}

// Carregar Artigos da KB
async function loadKbArticles(searchQuery = "") {
    try {
        const url = searchQuery ? `${API_BASE}/api/kb?q=${encodeURIComponent(searchQuery)}` : `${API_BASE}/api/kb`;
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        kbResultsContainer.innerHTML = "";
        
        if (!data.kb_context || data.kb_context.includes("Nenhum artigo")) {
            kbResultsContainer.innerHTML = `
                <div style="text-align: center; color: var(--text-muted); padding: 1rem;">
                    Nenhum artigo correspondente encontrado.
                </div>`;
            return;
        }

        // Divide a string agregada do backend para exibir individualmente
        const articles = data.kb_context.split("---").map(a => a.trim()).filter(a => a.length > 0);
        
        articles.forEach(art => {
            const lines = art.split("\n");
            const titleLine = lines[0] || "Artigo";
            const catLine = lines[1] || "Categoria";
            const contentLine = lines.slice(2).join("\n");
            
            const card = document.createElement("div");
            card.style = "background: #FFFFFF; border: 1px solid var(--border); border-radius: 6px; padding: 0.65rem; box-shadow: 0 1px 3px rgba(0,0,0,0.01);";
            card.innerHTML = `
                <strong style="color: var(--text);">${titleLine.replace("Artigo: ", "")}</strong>
                <div style="font-size: 0.7rem; color: var(--orange-light); margin: 0.15rem 0;">${catLine}</div>
                <p style="color: var(--text-body); font-size: 0.75rem; line-height: 1.4;">${contentLine.replace("Conteúdo: ", "")}</p>
            `;
            kbResultsContainer.appendChild(card);
        });
    } catch (e) {
        console.error("Erro ao listar KB", e);
    }
}

// Auxiliar Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
