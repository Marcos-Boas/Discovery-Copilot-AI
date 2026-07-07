# Decisões Tomadas — Sync Código ↔ Docs

## Decisão 1: Documentar bug de GEMINI_API_KEY sem corrigir código
- **Contexto**: `ai.py` linha 15 lê env var com nome que parece chave API colada por engano, não `"GEMINI_API_KEY"`
- **Opções Consideradas**:
  - Opção A: Corrigir o bug imediatamente durante o sync
  - Opção B: Documentar como débito crítico e task no plano pós-sync
- **Decisão**: Opção B
- **Justificativa**: Escopo solicitado foi sync docs ↔ código, não fix de engenharia; manter separação de ciclos Onion
- **Impacto**: Plano pós-sync ganha task prioritária; traceability marca RF-002 como 🐛

## Decisão 2: Adicionar tabela de status de implementação em traceability.md
- **Contexto**: Matriz existente mapeia requisitos verticalmente mas não indica cobertura real
- **Opções Consideradas**:
  - Opção A: Criar arquivo separado `implementation-status.md`
  - Opção B: Seção nova em `traceability.md` (ponte produto ↔ engenharia)
- **Decisão**: Opção B
- **Justificativa**: Traceability já é o artefato de ponte; evita proliferar arquivos
- **Impacto**: `@engineer` pode referenciar RF com status ao priorizar plano pós-sync

## Decisão 3: Reclassificar item "Gemini integrado" do MVP como Feito com ressalva
- **Contexto**: Código existe mas integração real não funciona
- **Decisão**: Manter [x] com nota de ressalva + plano pós-sync dedicado
- **Justificativa**: Evita reabrir plano concluído; transparência via gotcha e task explícita
- **Impacto**: Redesenho registrado — validar env vars antes de marcar Feito no próximo ciclo
