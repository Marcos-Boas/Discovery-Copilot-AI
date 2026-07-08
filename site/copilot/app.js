/* app.js · Discovery Copilot UI · Lógica do Frontend Vanilla JS */

// API_BASE dinâmico: usa a origem atual quando servido pelo backend (/site/...),
// com fallback para localhost:8000 ao abrir o arquivo direto (file://).
const API_BASE = (window.location.protocol === "http:" || window.location.protocol === "https:")
    ? window.location.origin
    : "http://localhost:8000";

const state = { brief: null };

/* ------------------------------------------------------------------ *
 * Referências da DOM
 * ------------------------------------------------------------------ */
const apiPill = document.getElementById("api-pill");
const apiStatusSpan = document.getElementById("api-status");
const opportunityListContainer = document.getElementById("opportunity-list");
const workspaceHeader = document.getElementById("workspace-header");
const workspaceBody = document.getElementById("workspace-body");
const emptyWorkspace = document.getElementById("empty-workspace");
const globalLoader = document.getElementById("global-loader");
const toastContainer = document.getElementById("toast-container");

const uploadModal = document.getElementById("upload-modal");
const uploadForm = document.getElementById("upload-form");

const btnEnrich = document.getElementById("btn-enrich");
const btnSave = document.getElementById("btn-save");

const oppDisplayTitle = document.getElementById("opp-display-title");
const oppDisplayCustomer = document.getElementById("opp-display-customer");
const oppDisplayVersion = document.getElementById("opp-display-version");
const oppDisplayStatus = document.getElementById("opp-display-status");

const kbSearchInput = document.getElementById("kb-search-input");
const kbResultsContainer = document.getElementById("kb-results-container");
const historyContainer = document.getElementById("history-container");

const metaId = document.getElementById("meta-id");
const metaSource = document.getElementById("meta-source");
const metaCreated = document.getElementById("meta-created");
const metaModel = document.getElementById("meta-model");

// Inputs escalares
const inputTitle = document.getElementById("input-title");
const inputSource = document.getElementById("input-source");
const inputCustomerName = document.getElementById("input-customer-name");
const inputCustomerSegment = document.getElementById("input-customer-segment");
const inputCustomerContact = document.getElementById("input-customer-contact");
const inputConfidenceLevel = document.getElementById("input-confidence-level");
const inputCurrentScenario = document.getElementById("input-current-scenario");
const inputDesiredScenario = document.getElementById("input-desired-scenario");
const inputExecutiveSummary = document.getElementById("input-executive-summary");
const inputPlanMethodology = document.getElementById("input-plan-methodology");

/* ------------------------------------------------------------------ *
 * Enums (selects)
 * ------------------------------------------------------------------ */
const IMPACT = ["Alto", "Médio", "Baixo"];
const PROBABILITY = ["Alta", "Média", "Baixa"];
const PRIORITY = ["Alta", "Média", "Baixa"];
const RISK_CATEGORY = ["Técnico", "Comercial", "Operacional", "Negócio"];
const GAP_AREA = ["Técnica", "Comercial", "Escopo", "Processo"];
const QUESTION_TYPE = ["Obrigatória", "Complementar", "Técnica", "Comercial", "Contexto"];
const REFERENCE_TYPE = ["Email", "PDF", "CRM", "Documento", "Ata", "Outro"];

/* ------------------------------------------------------------------ *
 * Inicialização
 * ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    checkApiStatus();
    loadOpportunities();
    loadKbArticles();
    setupEventListeners();
});

function setupEventListeners() {
    const openUpload = () => { uploadModal.classList.add("open"); };
    const closeUpload = () => { uploadModal.classList.remove("open"); uploadForm.reset(); };

    document.getElementById("btn-show-upload").addEventListener("click", openUpload);
    document.getElementById("btn-empty-import").addEventListener("click", openUpload);
    document.getElementById("btn-close-upload").addEventListener("click", closeUpload);
    uploadModal.addEventListener("click", (e) => { if (e.target === uploadModal) closeUpload(); });

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const text = document.getElementById("upload-text").value;
        const source = document.getElementById("upload-source").value;
        closeUpload();
        await createOpportunity(text, source);
    });

    btnEnrich.addEventListener("click", enrichOpportunity);
    btnSave.addEventListener("click", saveAndValidateOpportunity);
    document.getElementById("btn-export-md").addEventListener("click", exportMarkdown);
    document.getElementById("btn-export-pdf").addEventListener("click", exportPdf);

    // Bind escalares diretamente ao state
    bindScalar(inputTitle, () => state.brief.opportunity, "title");
    bindScalar(inputSource, () => state.brief.opportunity, "source");
    bindScalar(inputCustomerName, () => state.brief.customer, "name");
    bindScalar(inputCustomerSegment, () => state.brief.customer, "segment");
    bindScalar(inputCustomerContact, () => state.brief.customer, "contact_person");
    bindScalar(inputConfidenceLevel, () => state.brief, "confidence_level");
    bindScalar(inputCurrentScenario, () => state.brief.current_scenario, "description");
    bindScalar(inputDesiredScenario, () => state.brief.desired_scenario, "description");
    bindScalar(inputExecutiveSummary, () => state.brief, "executive_summary");
    bindScalar(inputPlanMethodology, () => state.brief.discovery_plan, "methodology");

    kbSearchInput.addEventListener("input", debounce(() => loadKbArticles(kbSearchInput.value), 300));
}

function bindScalar(input, getObj, key) {
    input.addEventListener("input", () => {
        if (!state.brief) return;
        getObj()[key] = input.value;
        if (input === inputTitle) oppDisplayTitle.innerText = input.value || "Oportunidade";
        if (input === inputCustomerName) oppDisplayCustomer.innerText = input.value || "—";
    });
}

/* ------------------------------------------------------------------ *
 * Utilitários de UI
 * ------------------------------------------------------------------ */
function showLoader() { globalLoader.style.display = "block"; }
function hideLoader() { globalLoader.style.display = "none"; }

function toast(message, type = "info") {
    const icons = { success: "✅", error: "⚠️", info: "ℹ️" };
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="t-icon">${icons[type] || icons.info}</span><span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(el);
    setTimeout(() => {
        el.classList.add("hide");
        setTimeout(() => el.remove(), 260);
    }, 3800);
}

function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/* ------------------------------------------------------------------ *
 * API
 * ------------------------------------------------------------------ */
async function checkApiStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/kb`);
        if (response.ok) {
            apiStatusSpan.innerText = "Conectado";
            apiPill.classList.add("online");
            return;
        }
        throw new Error();
    } catch (e) {
        apiStatusSpan.innerText = "Desconectado";
        apiPill.classList.remove("online");
    }
}

async function loadOpportunities() {
    try {
        const response = await fetch(`${API_BASE}/api/opportunities`);
        if (!response.ok) throw new Error();
        const data = await response.json();

        opportunityListContainer.innerHTML = "";
        if (data.length === 0) {
            opportunityListContainer.innerHTML = `<div class="sidebar-empty">Nenhuma oportunidade cadastrada.</div>`;
            return;
        }

        data.forEach(opp => {
            const activeClass = (state.brief && state.brief.opportunity.id === opp.id) ? "active" : "";
            const item = document.createElement("div");
            item.className = `opp-item ${activeClass}`;
            item.onclick = () => selectOpportunity(opp.id);
            const dateStr = new Date(opp.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
            item.innerHTML = `
                <h4>${escapeHtml(opp.title)}</h4>
                <p>${escapeHtml(opp.customer_name)}</p>
                <div class="opp-meta">
                  <span class="status-badge ${statusClass(opp.status)}">${escapeHtml(opp.status)}</span>
                  <span>v${opp.context_version} · ${dateStr}</span>
                </div>`;
            opportunityListContainer.appendChild(item);
        });
    } catch (e) {
        console.error("Erro ao listar oportunidades", e);
    }
}

function statusClass(status) {
    const map = {
        "Inicial": "status-inicial",
        "Enriquecido": "status-enriquecido",
        "Validado": "status-validado",
        "Consolidado": "status-consolidado",
        "Encerrado": "status-encerrado"
    };
    return map[status] || "status-inicial";
}

async function selectOpportunity(oppId) {
    showLoader();
    try {
        const response = await fetch(`${API_BASE}/api/opportunities/${oppId}`);
        if (!response.ok) throw new Error();
        const brief = await response.json();
        state.brief = normalizeBrief(brief);
        renderBriefEditor();
        loadOpportunities();
    } catch (e) {
        toast("Erro ao selecionar a oportunidade.", "error");
    } finally {
        hideLoader();
    }
}

async function createOpportunity(text, source) {
    if (!text || !text.trim()) { toast("O briefing está vazio.", "error"); return; }
    showLoader();
    try {
        const response = await fetch(`${API_BASE}/api/opportunities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ raw_text: text, source: source })
        });
        if (!response.ok) throw new Error();
        const brief = await response.json();
        state.brief = normalizeBrief(brief);
        await loadOpportunities();
        renderBriefEditor();
        toast("Briefing processado. Canonical Brief criado.", "success");
    } catch (e) {
        toast("Erro ao processar o briefing. Verifique o backend e a API Key.", "error");
    } finally {
        hideLoader();
    }
}

async function enrichOpportunity() {
    if (!state.brief) return;
    showLoader();
    try {
        const oppId = state.brief.opportunity.id;
        const response = await fetch(`${API_BASE}/api/opportunities/${oppId}/enrich`, { method: "POST" });
        if (!response.ok) throw new Error();
        const brief = await response.json();
        state.brief = normalizeBrief(brief);
        await loadOpportunities();
        renderBriefEditor();
        toast("Oportunidade enriquecida com IA e Knowledge Base.", "success");
    } catch (e) {
        toast("Erro ao enriquecer a oportunidade.", "error");
    } finally {
        hideLoader();
    }
}

async function saveAndValidateOpportunity() {
    if (!state.brief) return;
    showLoader();
    try {
        const oppId = state.brief.opportunity.id;
        const response = await fetch(`${API_BASE}/api/opportunities/${oppId}/validate`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state.brief)
        });
        if (!response.ok) throw new Error();
        const brief = await response.json();
        state.brief = normalizeBrief(brief);
        await loadOpportunities();
        renderBriefEditor();
        toast("Canonical Brief salvo e validado. Histórico atualizado.", "success");
    } catch (e) {
        toast("Erro ao salvar oportunidade.", "error");
    } finally {
        hideLoader();
    }
}

/* ------------------------------------------------------------------ *
 * Normalização defensiva (garante nós/arrays existentes)
 * ------------------------------------------------------------------ */
function normalizeBrief(b) {
    b.opportunity = b.opportunity || {};
    b.customer = b.customer || {};
    b.business_context = b.business_context || {};
    b.business_context.problems = b.business_context.problems || [];
    b.business_context.objectives = b.business_context.objectives || [];
    b.business_context.motivations = b.business_context.motivations || [];
    b.current_scenario = b.current_scenario || { description: "", key_points: [] };
    b.current_scenario.key_points = b.current_scenario.key_points || [];
    b.desired_scenario = b.desired_scenario || { description: "", key_points: [] };
    b.desired_scenario.key_points = b.desired_scenario.key_points || [];
    b.scope = b.scope || { included: [], excluded: [] };
    b.scope.included = b.scope.included || [];
    b.scope.excluded = b.scope.excluded || [];
    b.technologies = b.technologies || [];
    b.constraints = b.constraints || [];
    b.stakeholders = b.stakeholders || [];
    b.assumptions = b.assumptions || [];
    b.risks = b.risks || [];
    b.missing_information = b.missing_information || [];
    b.questions = b.questions || [];
    b.discovery_plan = b.discovery_plan || { steps: [], methodology: "", validation_metrics: [] };
    b.discovery_plan.steps = b.discovery_plan.steps || [];
    b.discovery_plan.validation_metrics = b.discovery_plan.validation_metrics || [];
    b.references = b.references || [];
    b.history = b.history || [];
    b.executive_summary = b.executive_summary || "";
    b.confidence_level = b.confidence_level || "Baixo";
    return b;
}

/* ------------------------------------------------------------------ *
 * Render principal
 * ------------------------------------------------------------------ */
function renderBriefEditor() {
    const b = state.brief;
    emptyWorkspace.style.display = "none";
    workspaceHeader.style.display = "flex";
    workspaceBody.style.display = "grid";

    // Cabeçalho
    oppDisplayTitle.innerText = b.opportunity.title || "Oportunidade";
    oppDisplayCustomer.innerText = b.customer.name || "—";
    oppDisplayVersion.innerText = `v${b.context_version}`;
    oppDisplayStatus.innerText = b.opportunity.status || "Inicial";
    oppDisplayStatus.className = `status-badge ${statusClass(b.opportunity.status)}`;

    // Metadados
    metaId.innerText = b.opportunity.id || "—";
    metaSource.innerText = b.opportunity.source || "—";
    metaCreated.innerText = b.opportunity.created_at ? new Date(b.opportunity.created_at).toLocaleString("pt-BR") : "—";
    metaModel.innerText = b.version || "—";

    // Escalares
    inputTitle.value = b.opportunity.title || "";
    inputSource.value = b.opportunity.source || "";
    inputCustomerName.value = b.customer.name || "";
    inputCustomerSegment.value = b.customer.segment || "";
    inputCustomerContact.value = b.customer.contact_person || "";
    inputConfidenceLevel.value = b.confidence_level || "Baixo";
    inputCurrentScenario.value = b.current_scenario.description || "";
    inputDesiredScenario.value = b.desired_scenario.description || "";
    inputExecutiveSummary.value = b.executive_summary || "";
    inputPlanMethodology.value = b.discovery_plan.methodology || "";

    // Listas de strings
    renderStringList("problems", b.business_context.problems, "Descreva um problema ou dor...");
    renderStringList("objectives", b.business_context.objectives, "Descreva um objetivo estratégico...");
    renderStringList("motivations", b.business_context.motivations, "Descreva uma motivação...");
    renderStringList("current_key_points", b.current_scenario.key_points, "Ponto-chave do cenário atual...");
    renderStringList("desired_key_points", b.desired_scenario.key_points, "Ponto-chave do cenário desejado...");
    renderStringList("scope_included", b.scope.included, "Item incluso no escopo...");
    renderStringList("scope_excluded", b.scope.excluded, "Item fora de escopo...");
    renderStringList("technologies", b.technologies, "Ex: AWS, Salesforce, PostgreSQL...");
    renderStringList("constraints", b.constraints, "Restrição técnica ou de negócio...");
    renderStringList("plan_steps", b.discovery_plan.steps, "Passo do roteiro de discovery...");
    renderStringList("validation_metrics", b.discovery_plan.validation_metrics, "Métrica de validação...");

    // Listas de objetos
    renderObjectList("stakeholders", b.stakeholders, STAKEHOLDER_FIELDS, { tone: "purple" });
    renderObjectList("assumptions", b.assumptions, ASSUMPTION_FIELDS, { tone: "amber", idPrefix: "ASM" });
    renderObjectList("risks", b.risks, RISK_FIELDS, { tone: "red", idPrefix: "RSK" });
    renderObjectList("missing_information", b.missing_information, GAP_FIELDS, { tone: "amber", idPrefix: "GAP" });
    renderObjectList("questions", b.questions, QUESTION_FIELDS, { tone: "purple", idPrefix: "QST" });
    renderObjectList("references", b.references, REFERENCE_FIELDS, { tone: "neutral", idPrefix: "REF" });

    renderHistory(b.history);
}

/* ------------------------------------------------------------------ *
 * Componente: lista de strings
 * ------------------------------------------------------------------ */
function renderStringList(mount, arr, placeholder) {
    const container = document.querySelector(`[data-mount="${mount}"]`);
    container.innerHTML = "";

    const list = document.createElement("div");
    list.className = "list-editor";

    const drawRows = () => {
        list.innerHTML = "";
        if (arr.length === 0) {
            const empty = document.createElement("div");
            empty.className = "list-empty";
            empty.innerText = "Nenhum item — clique em adicionar.";
            list.appendChild(empty);
        }
        arr.forEach((val, idx) => {
            const row = document.createElement("div");
            row.className = "list-row";
            const index = document.createElement("span");
            index.className = "row-index";
            index.innerText = idx + 1;
            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.value = val;
            input.placeholder = placeholder;
            input.addEventListener("input", () => { arr[idx] = input.value; });
            const del = document.createElement("button");
            del.type = "button";
            del.className = "icon-btn";
            del.title = "Remover";
            del.innerHTML = "&times;";
            del.addEventListener("click", () => { arr.splice(idx, 1); drawRows(); });
            row.append(index, input, del);
            list.appendChild(row);
        });
    };
    drawRows();

    const add = document.createElement("button");
    add.type = "button";
    add.className = "btn-add";
    add.innerHTML = "＋ Adicionar item";
    add.addEventListener("click", () => {
        arr.push("");
        drawRows();
        const inputs = list.querySelectorAll("input");
        if (inputs.length) inputs[inputs.length - 1].focus();
    });

    container.append(list, add);
}

/* ------------------------------------------------------------------ *
 * Componente: lista de objetos
 * ------------------------------------------------------------------ */
const STAKEHOLDER_FIELDS = [
    { key: "name", label: "Nome", type: "text", grid: 2 },
    { key: "role", label: "Papel / Cargo", type: "text", grid: 2 },
    { key: "contact", label: "Contato", type: "text", grid: 1 }
];
const ASSUMPTION_FIELDS = [
    { key: "description", label: "Descrição da premissa", type: "textarea", grid: 1 },
    { key: "impact", label: "Impacto", type: "select", options: IMPACT, grid: 1 }
];
const RISK_FIELDS = [
    { key: "description", label: "Descrição do risco", type: "textarea", grid: 1 },
    { key: "category", label: "Categoria", type: "select", options: RISK_CATEGORY, grid: 3 },
    { key: "impact", label: "Impacto", type: "select", options: IMPACT, grid: 3 },
    { key: "probability", label: "Probabilidade", type: "select", options: PROBABILITY, grid: 3 },
    { key: "mitigation", label: "Mitigação", type: "textarea", grid: 1 }
];
const GAP_FIELDS = [
    { key: "description", label: "Descrição da lacuna", type: "textarea", grid: 1 },
    { key: "area", label: "Área", type: "select", options: GAP_AREA, grid: 2 },
    { key: "priority", label: "Prioridade", type: "select", options: PRIORITY, grid: 2 }
];
const QUESTION_FIELDS = [
    { key: "question", label: "Pergunta", type: "textarea", grid: 1 },
    { key: "type", label: "Tipo", type: "select", options: QUESTION_TYPE, grid: 2 },
    { key: "target_role", label: "Stakeholder alvo", type: "text", grid: 2 },
    { key: "context", label: "Contexto / justificativa", type: "textarea", grid: 1 }
];
const REFERENCE_FIELDS = [
    { key: "type", label: "Tipo", type: "select", options: REFERENCE_TYPE, grid: 2 },
    { key: "source", label: "Fonte / arquivo", type: "text", grid: 2 }
];

function nextId(arr, prefix) {
    let max = 0;
    arr.forEach(it => {
        const m = (it.id || "").match(new RegExp(`${prefix}-(\\d+)`));
        if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    return `${prefix}-${String(max + 1).padStart(2, "0")}`;
}

function blankItem(fields, arr, idPrefix) {
    const item = {};
    if (idPrefix) item.id = nextId(arr, idPrefix);
    fields.forEach(f => {
        item[f.key] = f.type === "select" ? (f.options[0] || "") : "";
    });
    return item;
}

function renderObjectList(mount, arr, fields, opts = {}) {
    const container = document.querySelector(`[data-mount="${mount}"]`);
    container.innerHTML = "";
    const tone = opts.tone || "neutral";
    const idPrefix = opts.idPrefix;

    const draw = () => {
        container.innerHTML = "";
        if (arr.length === 0) {
            const empty = document.createElement("div");
            empty.className = "list-empty";
            empty.innerText = "Nenhum registro — clique em adicionar.";
            container.appendChild(empty);
        }
        arr.forEach((item, idx) => {
            container.appendChild(buildObjItem(item, idx, fields, arr, tone, idPrefix, draw));
        });
        const add = document.createElement("button");
        add.type = "button";
        add.className = `btn-add ${tone === "purple" ? "purple" : ""}`;
        add.innerHTML = "＋ Adicionar";
        add.addEventListener("click", () => { arr.push(blankItem(fields, arr, idPrefix)); draw(); });
        container.appendChild(add);
    };
    draw();
}

function buildObjItem(item, idx, fields, arr, tone, idPrefix, redraw) {
    const card = document.createElement("div");
    card.className = `obj-item tone-${tone}`;

    const head = document.createElement("div");
    head.className = "obj-item-head";
    const tag = document.createElement("span");
    tag.className = "obj-tag";
    tag.innerText = item.id || `#${idx + 1}`;
    const del = document.createElement("button");
    del.type = "button";
    del.className = "icon-btn";
    del.title = "Remover";
    del.innerHTML = "&times;";
    del.addEventListener("click", () => { arr.splice(idx, 1); redraw(); });
    head.append(tag, del);
    card.appendChild(head);

    // Agrupa campos por linhas conforme "grid"
    let i = 0;
    while (i < fields.length) {
        const f = fields[i];
        if (f.grid && f.grid > 1) {
            // agrupa campos consecutivos com o mesmo grid
            const rowFields = [];
            while (i < fields.length && fields[i].grid === f.grid) { rowFields.push(fields[i]); i++; }
            const rowWrap = document.createElement("div");
            rowWrap.className = f.grid === 3 ? "card-grid-3" : "card-grid-2";
            rowFields.forEach(rf => rowWrap.appendChild(buildField(rf, item)));
            card.appendChild(rowWrap);
        } else {
            card.appendChild(buildField(f, item));
            i++;
        }
    }
    return card;
}

function buildField(f, item) {
    const group = document.createElement("div");
    group.className = "form-group";
    const label = document.createElement("label");
    label.className = "field-label";
    label.innerText = f.label;
    group.appendChild(label);

    let control;
    if (f.type === "select") {
        control = document.createElement("select");
        control.className = "form-control";
        f.options.forEach(opt => {
            const o = document.createElement("option");
            o.value = opt; o.innerText = opt;
            control.appendChild(o);
        });
        control.value = item[f.key] ?? f.options[0];
    } else if (f.type === "textarea") {
        control = document.createElement("textarea");
        control.className = "form-control";
        control.style.height = "64px";
        control.value = item[f.key] ?? "";
    } else {
        control = document.createElement("input");
        control.type = "text";
        control.className = "form-control";
        control.value = item[f.key] ?? "";
    }
    control.addEventListener("input", () => { item[f.key] = control.value; });
    control.addEventListener("change", () => { item[f.key] = control.value; });
    group.appendChild(control);
    return group;
}

/* ------------------------------------------------------------------ *
 * Histórico
 * ------------------------------------------------------------------ */
function renderHistory(history) {
    historyContainer.innerHTML = "";
    if (!history || history.length === 0) {
        historyContainer.innerHTML = `<div class="list-empty">Sem histórico ainda.</div>`;
        return;
    }
    [...history].reverse().forEach(h => {
        const dateStr = new Date(h.date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
        const row = document.createElement("div");
        row.className = "history-row";
        row.innerHTML = `
            <div class="h-top"><span class="h-ver">Versão ${h.version}</span><span class="h-date">${dateStr}</span></div>
            <div class="h-author">${escapeHtml(h.author)}</div>
            <div class="h-sum">${escapeHtml(h.changes_summary)}</div>`;
        historyContainer.appendChild(row);
    });
}

/* ------------------------------------------------------------------ *
 * Knowledge Base
 * ------------------------------------------------------------------ */
async function loadKbArticles(searchQuery = "") {
    try {
        const url = searchQuery ? `${API_BASE}/api/kb?q=${encodeURIComponent(searchQuery)}` : `${API_BASE}/api/kb`;
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const data = await response.json();

        kbResultsContainer.innerHTML = "";
        if (!data.kb_context || data.kb_context.includes("Nenhum artigo")) {
            kbResultsContainer.innerHTML = `<div class="list-empty">Nenhum artigo correspondente.</div>`;
            return;
        }

        const articles = data.kb_context.split("---").map(a => a.trim()).filter(a => a.length > 0);
        articles.forEach(art => {
            const lines = art.split("\n");
            const titleLine = (lines[0] || "Artigo").replace("Artigo: ", "");
            const catLine = lines[1] || "";
            const contentLine = lines.slice(2).join("\n").replace("Conteúdo: ", "");
            const card = document.createElement("div");
            card.className = "kb-card";
            card.innerHTML = `
                <strong>${escapeHtml(titleLine)}</strong>
                <div class="kb-cat">${escapeHtml(catLine)}</div>
                <p>${escapeHtml(contentLine)}</p>`;
            kbResultsContainer.appendChild(card);
        });
    } catch (e) {
        console.error("Erro ao listar KB", e);
    }
}

/* ------------------------------------------------------------------ *
 * Exportação do briefing (Markdown + PDF via impressão nativa)
 * ------------------------------------------------------------------ */
function slugify(str) {
    return String(str || "briefing")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        .slice(0, 60) || "briefing";
}

function downloadBlob(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function exportMarkdown() {
    if (!state.brief) { toast("Selecione uma oportunidade primeiro.", "error"); return; }
    const b = state.brief;
    const name = `${b.opportunity.id || "OPP"}-${slugify(b.opportunity.title)}.md`;
    downloadBlob(name, briefToMarkdown(b), "text/markdown;charset=utf-8");
    toast("Briefing exportado em Markdown (.md).", "success");
}

function exportPdf() {
    if (!state.brief) { toast("Selecione uma oportunidade primeiro.", "error"); return; }
    const view = document.getElementById("print-view");
    view.innerHTML = briefToPrintHtml(state.brief);
    const prevTitle = document.title;
    document.title = `${state.brief.opportunity.id || "Briefing"} — ${state.brief.opportunity.title || "Canonical Brief"}`;
    const restore = () => { document.title = prevTitle; window.removeEventListener("afterprint", restore); };
    window.addEventListener("afterprint", restore);
    toast("Abrindo diálogo de impressão — escolha \"Salvar como PDF\".", "info");
    window.print();
}

/* Markdown ------------------------------------------------------------ */
function briefToMarkdown(b) {
    const out = [];
    const p = (s = "") => out.push(s);
    const cell = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
    const ul = (arr) => (arr && arr.length) ? arr.forEach(v => p(`- ${cell(v)}`)) : p("_Nenhum item._");
    const dt = (d) => d ? new Date(d).toLocaleString("pt-BR") : "—";

    p(`# ${b.opportunity.title || "Canonical Brief"}`);
    p("");
    p(`> **Cliente:** ${b.customer.name || "—"} · **Status:** ${b.opportunity.status || "—"} · **Versão:** v${b.context_version ?? 0} · **Confiança:** ${b.confidence_level || "—"}`);
    p("");
    p(`- **ID:** ${b.opportunity.id || "—"}`);
    p(`- **Origem:** ${b.opportunity.source || "—"}`);
    p(`- **Segmento:** ${b.customer.segment || "—"}`);
    p(`- **Contato Principal:** ${b.customer.contact_person || "—"}`);
    p(`- **Criado em:** ${dt(b.opportunity.created_at)}`);
    p("");

    if (b.executive_summary) { p(`## Resumo Executivo`); p(""); p(b.executive_summary); p(""); }

    p(`## Stakeholders`); p("");
    if (b.stakeholders.length) {
        p(`| Nome | Papel / Cargo | Contato |`);
        p(`|---|---|---|`);
        b.stakeholders.forEach(s => p(`| ${cell(s.name)} | ${cell(s.role)} | ${cell(s.contact)} |`));
    } else { p("_Nenhum stakeholder informado._"); }
    p("");

    p(`## Contexto de Negócio`); p("");
    p(`### Problemas / Dores`); ul(b.business_context.problems); p("");
    p(`### Objetivos Estratégicos`); ul(b.business_context.objectives); p("");
    p(`### Motivações`); ul(b.business_context.motivations); p("");

    p(`## Cenários`); p("");
    p(`### Cenário Atual (As-Is)`); p(""); p(b.current_scenario.description || "_Não informado._"); p("");
    ul(b.current_scenario.key_points); p("");
    p(`### Cenário Desejado (To-Be)`); p(""); p(b.desired_scenario.description || "_Não informado._"); p("");
    ul(b.desired_scenario.key_points); p("");

    p(`## Escopo, Tecnologias & Restrições`); p("");
    p(`### Escopo Incluso`); ul(b.scope.included); p("");
    p(`### Fora de Escopo`); ul(b.scope.excluded); p("");
    p(`### Tecnologias`); ul(b.technologies); p("");
    p(`### Restrições`); ul(b.constraints); p("");

    p(`## Premissas`); p("");
    if (b.assumptions.length) {
        p(`| ID | Descrição | Impacto |`);
        p(`|---|---|---|`);
        b.assumptions.forEach(a => p(`| ${cell(a.id)} | ${cell(a.description)} | ${cell(a.impact)} |`));
    } else { p("_Nenhuma premissa registrada._"); }
    p("");

    p(`## Riscos`); p("");
    if (b.risks.length) {
        p(`| ID | Descrição | Categoria | Impacto | Probab. | Mitigação |`);
        p(`|---|---|---|---|---|---|`);
        b.risks.forEach(r => p(`| ${cell(r.id)} | ${cell(r.description)} | ${cell(r.category)} | ${cell(r.impact)} | ${cell(r.probability)} | ${cell(r.mitigation)} |`));
    } else { p("_Nenhum risco mapeado._"); }
    p("");

    p(`## Lacunas de Informação (Gaps)`); p("");
    if (b.missing_information.length) {
        p(`| ID | Descrição | Área | Prioridade |`);
        p(`|---|---|---|---|`);
        b.missing_information.forEach(g => p(`| ${cell(g.id)} | ${cell(g.description)} | ${cell(g.area)} | ${cell(g.priority)} |`));
    } else { p("_Nenhuma lacuna registrada._"); }
    p("");

    p(`## Perguntas de Discovery`); p("");
    if (b.questions.length) {
        b.questions.forEach(q => {
            const role = q.target_role ? ` _(alvo: ${cell(q.target_role)})_` : "";
            p(`- **[${cell(q.type)}]** ${cell(q.question)}${role}`);
            if (q.context) p(`  - Contexto: ${cell(q.context)}`);
        });
    } else { p("_Nenhuma pergunta sugerida._"); }
    p("");

    p(`## Discovery Plan`); p("");
    p(`**Metodologia:** ${b.discovery_plan.methodology || "—"}`); p("");
    p(`### Passos Recomendados`); ul(b.discovery_plan.steps); p("");
    p(`### Métricas de Validação`); ul(b.discovery_plan.validation_metrics); p("");

    p(`## Referências`); p("");
    if (b.references.length) {
        p(`| Tipo | Fonte / Arquivo |`);
        p(`|---|---|`);
        b.references.forEach(r => p(`| ${cell(r.type)} | ${cell(r.source)} |`));
    } else { p("_Nenhuma referência._"); }
    p("");

    p(`---`);
    p(`_Exportado em ${new Date().toLocaleString("pt-BR")} · Discovery Copilot AI · Onion Mini_`);
    return out.join("\n");
}

/* Print HTML ---------------------------------------------------------- */
function briefToPrintHtml(b) {
    const e = escapeHtml;
    const dt = (d) => d ? new Date(d).toLocaleString("pt-BR") : "—";
    const ul = (arr) => (arr && arr.length)
        ? `<ul>${arr.map(v => `<li>${e(v)}</li>`).join("")}</ul>`
        : `<p class="pv-empty">Nenhum item.</p>`;
    const table = (headers, rows) => rows.length
        ? `<table class="pv-table"><thead><tr>${headers.map(h => `<th>${e(h)}</th>`).join("")}</tr></thead>`
          + `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${e(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
        : `<p class="pv-empty">Sem registros.</p>`;
    const section = (title, inner) => `<section class="pv-section"><h2>${e(title)}</h2>${inner}</section>`;

    const parts = [];
    parts.push(`<div class="pv-title">${e(b.opportunity.title || "Canonical Brief")}</div>`);
    parts.push(`<div class="pv-sub">Discovery Copilot AI · Onion Mini · ${e(b.opportunity.id || "")}</div>`);
    parts.push(`<div class="pv-badges">
        <span>Cliente: ${e(b.customer.name || "—")}</span>
        <span>Status: ${e(b.opportunity.status || "—")}</span>
        <span>Versão: v${e(b.context_version ?? 0)}</span>
        <span>Confiança: ${e(b.confidence_level || "—")}</span>
        <span>Segmento: ${e(b.customer.segment || "—")}</span>
        <span>Contato: ${e(b.customer.contact_person || "—")}</span>
        <span>Origem: ${e(b.opportunity.source || "—")}</span>
        <span>Criado: ${e(dt(b.opportunity.created_at))}</span>
    </div>`);

    if (b.executive_summary) {
        parts.push(section("Resumo Executivo", `<p class="pv-scenario">${e(b.executive_summary)}</p>`));
    }

    parts.push(section("Stakeholders",
        table(["Nome", "Papel / Cargo", "Contato"], b.stakeholders.map(s => [s.name || "", s.role || "", s.contact || ""]))));

    parts.push(section("Contexto de Negócio",
        `<h3>Problemas / Dores</h3>${ul(b.business_context.problems)}`
        + `<h3>Objetivos Estratégicos</h3>${ul(b.business_context.objectives)}`
        + `<h3>Motivações</h3>${ul(b.business_context.motivations)}`));

    parts.push(section("Cenários",
        `<h3>Cenário Atual (As-Is)</h3><p class="pv-scenario">${e(b.current_scenario.description || "Não informado.")}</p>${ul(b.current_scenario.key_points)}`
        + `<h3>Cenário Desejado (To-Be)</h3><p class="pv-scenario">${e(b.desired_scenario.description || "Não informado.")}</p>${ul(b.desired_scenario.key_points)}`));

    parts.push(section("Escopo, Tecnologias & Restrições",
        `<h3>Escopo Incluso</h3>${ul(b.scope.included)}`
        + `<h3>Fora de Escopo</h3>${ul(b.scope.excluded)}`
        + `<h3>Tecnologias</h3>${ul(b.technologies)}`
        + `<h3>Restrições</h3>${ul(b.constraints)}`));

    parts.push(section("Premissas",
        table(["ID", "Descrição", "Impacto"], b.assumptions.map(a => [a.id || "", a.description || "", a.impact || ""]))));

    parts.push(section("Riscos",
        table(["ID", "Descrição", "Categoria", "Impacto", "Probab.", "Mitigação"],
            b.risks.map(r => [r.id || "", r.description || "", r.category || "", r.impact || "", r.probability || "", r.mitigation || ""]))));

    parts.push(section("Lacunas de Informação (Gaps)",
        table(["ID", "Descrição", "Área", "Prioridade"],
            b.missing_information.map(g => [g.id || "", g.description || "", g.area || "", g.priority || ""]))));

    const questionsHtml = b.questions.length
        ? `<ul>${b.questions.map(q => {
            const role = q.target_role ? ` <em>(alvo: ${e(q.target_role)})</em>` : "";
            const ctx = q.context ? `<br><span class="pv-empty">Contexto: ${e(q.context)}</span>` : "";
            return `<li><strong>[${e(q.type || "")}]</strong> ${e(q.question || "")}${role}${ctx}</li>`;
        }).join("")}</ul>`
        : `<p class="pv-empty">Nenhuma pergunta sugerida.</p>`;
    parts.push(section("Perguntas de Discovery", questionsHtml));

    parts.push(section("Discovery Plan",
        `<p><strong>Metodologia:</strong> ${e(b.discovery_plan.methodology || "—")}</p>`
        + `<h3>Passos Recomendados</h3>${ul(b.discovery_plan.steps)}`
        + `<h3>Métricas de Validação</h3>${ul(b.discovery_plan.validation_metrics)}`));

    parts.push(section("Referências",
        table(["Tipo", "Fonte / Arquivo"], b.references.map(r => [r.type || "", r.source || ""]))));

    parts.push(`<div class="pv-foot">Exportado em ${e(new Date().toLocaleString("pt-BR"))} · Discovery Copilot AI · Onion Mini 🧅</div>`);
    return parts.join("");
}
