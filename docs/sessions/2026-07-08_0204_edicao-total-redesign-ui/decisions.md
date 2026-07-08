# Decisões Tomadas — Edição Total + Redesign UI/UX

## Decisão 1: Renderização data-driven com `state.brief` como SSOT
- **Contexto**: A serialização manual campo-a-campo dessincronizava form↔model e não escalava para todos os campos.
- **Opções Consideradas**:
  - Opção A: Continuar com inputs estáticos + `serializeBriefFromForm` expandido — verboso, frágil, propenso a esquecer campos.
  - Opção B: State central (`state.brief`) editado in-place por componentes genéricos; envia o objeto inteiro no save.
- **Decisão**: Opção B.
- **Justificativa**: Uma única fonte de verdade, zero mapeamento manual no save, fácil adicionar campos.
- **Impacto**: `app.js` passa a expor `renderStringList` e `renderObjectList` reutilizáveis.

## Decisão 2: Componentes genéricos de lista (string e objeto)
- **Contexto**: O brief tem ~11 listas de strings e ~6 listas de objetos com enums.
- **Decisão**: Dois renderizadores parametrizados por descritores de campo; selects para enums; IDs (RSK/ASM/GAP/QST/REF) auto-gerados ao adicionar.
- **Justificativa**: DRY; consistência visual e de comportamento (adicionar/remover) em toda a app.
- **Impacto**: Enums duplicados no frontend (débito registrado: derivar do schema via OpenAPI no futuro).

## Decisão 3: Metadados de sistema permanecem read-only
- **Contexto**: "Todos os campos editáveis" vs. campos geridos pelo lifecycle.
- **Decisão**: id, created_at, status, version e context_version e history ficam como metadados read-only; o restante é editável.
- **Justificativa**: Editar status/versão manualmente conflita com o `PUT /validate` (que força `Validado` e incrementa versão) e quebra rastreabilidade.
- **Impacto**: Coerência com o backend; sem regressões no versionamento.
