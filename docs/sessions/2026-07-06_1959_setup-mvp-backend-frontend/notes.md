# Notas e Observações — Setup MVP Backend e Frontend

## Insights e Aprendizados
- O `google-genai` SDK (v2.x) usa uma API de cliente nova (`genai.Client()`) que difere da versão 1.x (`google.generativeai`). O import correto é `from google import genai`.
- O FastAPI com `StaticFiles` resolve o problema de CORS elegantemente sem precisar de qualquer servidor adicional — ideal para a proposta de portabilidade do Onion Mini.
- O modo mock sem API Key é um padrão valioso para acelerar o desenvolvimento de UI sem bloquear na infraestrutura de IA.
- O `pip install` global no Python do Windows falhou por bloqueio de permissão em executáveis (WinError 2). O `venv` resolveu completamente o problema.

## Próximos Passos
- Configurar a variável de ambiente `GEMINI_API_KEY` e testar o pipeline completo com IA real (geração e enriquecimento real do Canonical Brief).
- Adicionar arquivo `backend/__init__.py` se necessário para corrigir problemas de imports ao executar o servidor de diferentes diretórios.
- Criar um script `start.ps1` ou `Makefile` para facilitar o startup do servidor.
- Implementar autenticação básica (JWT ou chave de API simples) para uso em ambiente de produção.
- Adicionar testes unitários em `backend/tests/` para os schemas Pydantic.

## 🔁 Redesenho da Sessão
**No próximo ciclo de Engenharia:** começar sempre com a criação do `.venv` e a validação de imports antes de escrever código de lógica — evita o problema de permissão e garante que o ambiente está correto desde o início.
