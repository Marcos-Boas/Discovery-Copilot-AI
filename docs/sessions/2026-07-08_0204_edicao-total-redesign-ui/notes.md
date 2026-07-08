# Notas e Observações — Edição Total + Redesign UI/UX

## Insights e Aprendizados
- O backend `PUT /validate` já aceitava o `CanonicalBrief` completo; o gargalo era 100% no frontend (renderização parcial + serialização parcial).
- Renderização data-driven elimina a classe de bugs "campo editado na UI mas não persistido".

## Próximos Passos
- **`@engineer`**: derivar os descritores de campo/enums do schema Pydantic (via `/openapi.json`) para acabar com a duplicação de enums no frontend.
- **`@engineer`**: itens restantes do plano pós-sync — busca KB multi-termo, upload PDF/DOCX, suite de testes automatizada, lifecycle `Consolidado`/`Encerrado`.
- **`@product`**: decidir sobre exportação do Discovery Plan (RF-015) e explicabilidade por origem (RF-004).
