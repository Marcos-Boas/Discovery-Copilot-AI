# Decisões Tomadas — Especificação Inicial do Discovery Copilot AI

## Decisão 1: Modularização da Especificação de Produto
- **Contexto**: A especificação inicial de produto no Onion Mini normalmente reside em seções no `business-context-lite.md`. No entanto, para o escopo do *Discovery Copilot AI*, o volume de regras, fluxos, requisitos e especificações da IA tornaria um único arquivo extremamente grande e difícil de ler e editar.
- **Opções Consideradas**:
  - **Opção A**: Manter tudo no `business-context-lite.md`. (Prós: arquivo único de produto. Contras: legibilidade reduzida, difícil versionamento e manutenção concorrente).
  - **Opção B**: Mudar para uma pasta de especificações modularizadas (`docs/product/`). (Prós: alta legibilidade, organização por temas como regras de negócio, modelo de domínio, comportamento de IA, etc. Contras: maior número de arquivos para manter sincronizados).
- **Decisão**: Opção B.
- **Justificativa**: A modularização em `docs/product/` separa preocupações e permite que futuros ciclos trabalhem focados apenas no escopo de interesse (ex: alterar comportamento da IA em `ai-behavior.md` sem impactar o modelo de domínio).
- **Impacto**: O arquivo `business-context-lite.md` foi mantido apenas como a SSOT de visão de produto e referências gerais de negócio. As especificações detalhadas agora residem em `docs/product/`.
