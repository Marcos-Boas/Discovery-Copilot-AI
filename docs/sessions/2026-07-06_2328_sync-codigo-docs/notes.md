# Notas e Observações — Sync Código ↔ Docs

## Insights e Aprendizados
- O MVP tem superfície completa (6 rotas API + SPA funcional em mock), mas cobertura real de requisitos é ~40% (muitos ⚠️ parciais)
- `test_e2e.py` valida `GEMINI_API_KEY` corretamente, mas `ai.py` usa nome diferente — teste passaria na verificação de env mas falharia na integração real
- CSS de chat panel existe sem feature — indício de feature planejada não implementada

## Próximos Passos
- **`@engineer`**: Corrigir bug `GEMINI_API_KEY` (task #1 do plano pós-sync) e rodar `test_e2e.py` com chave real
- **`@engineer`**: Tornar `API_BASE` dinâmico no frontend
- **`@product`**: Revisar RF-004 e RF-008 — ausentes no MVP; decidir se entram no próximo épico ou são adiados
- **`/status`**: Rodar diagnóstico após correção do bug para validar alinhamento
