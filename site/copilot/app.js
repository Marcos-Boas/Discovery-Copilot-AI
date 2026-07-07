/* app.js · Discovery Copilot UI · Lógica do Frontend Vanilla JS */

const API_BASE = "http://localhost:8000";
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

// Containers de Lists no Form
const displayGapsContainer = document.getElementById("display-gaps-container");
const displayQuestionsContainer = document.getElementById("display-questions-container");
const displayRisksContainer = document.getElementById("display-risks-container");
const displayAssumptionsContainer = document.getElementById("display-assumptions-container");

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

    // Enriquecer e Salvar
    btnEnrich.addEventListener("click", enrichOpportunity);
    btnSave.addEventListener("click", saveAndValidateOpportunity);

    // Pesquisa KB
    kbSearchInput.addEventListener("input", debounce(() => {
        loadKbArticles(kbSearchInput.value);
    }, 300));
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

    // Gaps (Lacunas)
    displayGapsContainer.innerHTML = "";
    if (brief.missing_information && brief.missing_information.length > 0) {
        brief.missing_information.forEach(gap => {
            const card = document.createElement("div");
            card.className = "sans";
            card.style = "background: rgba(28,22,18,0.015); border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.5rem; font-size: 0.85rem;";
            card.innerHTML = `<strong>[${gap.area}] ${gap.id}:</strong> ${gap.description} <span style="font-size: 0.7rem; color: #C2410C; font-weight: bold; margin-left: 0.5rem;">Prioridade: ${gap.priority}</span>`;
            displayGapsContainer.appendChild(card);
        });
    } else {
        displayGapsContainer.innerHTML = '<p class="sans" style="font-size: 0.8rem; color: var(--text-muted);">Nenhum gap identificado.</p>';
    }

    // Perguntas
    displayQuestionsContainer.innerHTML = "";
    if (brief.questions && brief.questions.length > 0) {
        brief.questions.forEach(q => {
            const card = document.createElement("div");
            card.className = "sans";
            card.style = "background: var(--purple-dim); border: 1px solid rgba(124,58,237,0.15); padding: 0.65rem 0.85rem; border-radius: 6px; margin-bottom: 0.5rem; font-size: 0.85rem;";
            card.innerHTML = `
                <div style="font-weight: 700; color: var(--purple);">${q.id}: ${q.question}</div>
                <div style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-body);">Alvo: <strong>${q.target_role || "Todos"}</strong> | Tipo: ${q.type}</div>
                ${q.context ? `<div style="font-size: 0.75rem; margin-top: 0.25rem; font-style: italic; color: var(--text-muted);">${q.context}</div>` : ""}
            `;
            displayQuestionsContainer.appendChild(card);
        });
    } else {
        displayQuestionsContainer.innerHTML = '<p class="sans" style="font-size: 0.8rem; color: var(--text-muted);">Nenhuma pergunta sugerida.</p>';
    }

    // Riscos
    displayRisksContainer.innerHTML = "";
    if (brief.risks && brief.risks.length > 0) {
        brief.risks.forEach(r => {
            const card = document.createElement("div");
            card.className = "sans";
            card.style = "background: rgba(220,38,38,0.03); border: 1px solid rgba(220,38,38,0.15); padding: 0.65rem 0.85rem; border-radius: 6px; margin-bottom: 0.5rem; font-size: 0.82rem;";
            card.innerHTML = `
                <div style="font-weight: 700; color: #B91C1C;">${r.id}: [${r.category}] ${r.description}</div>
                <div style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-body);">Impacto: <strong>${r.impact}</strong> | Probabilidade: <strong>${r.probability}</strong></div>
                ${r.mitigation ? `<div style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-muted);">Mitigação: ${r.mitigation}</div>` : ""}
            `;
            displayRisksContainer.appendChild(card);
        });
    } else {
        displayRisksContainer.innerHTML = '<p class="sans" style="font-size: 0.8rem; color: var(--text-muted);">Nenhum risco mapeado.</p>';
    }

    // Premissas
    displayAssumptionsContainer.innerHTML = "";
    if (brief.assumptions && brief.assumptions.length > 0) {
        brief.assumptions.forEach(asm => {
            const card = document.createElement("div");
            card.className = "sans";
            card.style = "background: rgba(28,22,18,0.02); border: 1px solid var(--border); padding: 0.65rem 0.85rem; border-radius: 6px; margin-bottom: 0.5rem; font-size: 0.82rem;";
            card.innerHTML = `
                <div><strong>${asm.id}:</strong> ${asm.description}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">Impacto no Projeto: <strong>${asm.impact}</strong></div>
            `;
            displayAssumptionsContainer.appendChild(card);
        });
    } else {
        displayAssumptionsContainer.innerHTML = '<p class="sans" style="font-size: 0.8rem; color: var(--text-muted);">Nenhuma premissa registrada.</p>';
    }

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
