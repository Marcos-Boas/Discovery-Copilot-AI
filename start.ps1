# start.ps1 -- Startup do Discovery Copilot AI
# Uso: .\start.ps1
# Opcional: .\start.ps1 -Port 8080 -Reload

param(
    [int]$Port = 8000,
    [switch]$Reload
)

$Root = $PSScriptRoot

# --- 1. Ativa o ambiente virtual Python ---
$VenvActivate = Join-Path $Root ".venv\Scripts\Activate.ps1"
if (-not (Test-Path $VenvActivate)) {
    Write-Error "ERRO: .venv nao encontrado. Execute: python -m venv .venv"
    exit 1
}
. $VenvActivate
Write-Host "[OK] .venv ativado." -ForegroundColor Green

# --- 2. Carrega variaveis do .env (se existir) ---
$EnvFile = Join-Path $Root ".env"
if (Test-Path $EnvFile) {
    Get-Content $EnvFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -and $line -notmatch "^#") {
            $parts = $line -split "=", 2
            if ($parts.Length -eq 2) {
                $key   = $parts[0].Trim()
                $value = $parts[1].Trim().Trim('"').Trim("'")
                [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
                Write-Host "[OK] Variavel carregada: $key" -ForegroundColor Cyan
            }
        }
    }
    Write-Host "[OK] .env carregado." -ForegroundColor Green
} else {
    Write-Warning "AVISO: Arquivo .env nao encontrado. Servidor iniciara em modo MOCK."
    Write-Warning "Crie um arquivo .env com: GEMINI_API_KEY=sua-chave-aqui"
}

# --- 3. Valida se GEMINI_API_KEY esta disponivel ---
if ($env:GEMINI_API_KEY) {
    Write-Host "[OK] GEMINI_API_KEY detectada." -ForegroundColor Green
} else {
    Write-Host "[AVISO] GEMINI_API_KEY nao definida -- modo MOCK ativado." -ForegroundColor Yellow
}

# --- 4. Sobe o servidor FastAPI via uvicorn ---
Write-Host ""
Write-Host "Iniciando Discovery Copilot AI em http://127.0.0.1:$Port" -ForegroundColor Magenta
Write-Host "  Swagger UI: http://127.0.0.1:$Port/docs" -ForegroundColor Magenta
Write-Host "  Frontend:   http://127.0.0.1:$Port/site/copilot/" -ForegroundColor Magenta
Write-Host ""

Set-Location $Root
if ($Reload) {
    python -m uvicorn backend.main:app --host 127.0.0.1 --port $Port --reload
} else {
    python -m uvicorn backend.main:app --host 127.0.0.1 --port $Port
}
