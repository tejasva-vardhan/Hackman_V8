@echo off
echo ========================================
echo   Locust Load Testing - Hackman V8
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if locust is installed
python -c "import locust" >nul 2>&1
if %errorlevel% neq 0 (
    echo Locust not found. Installing...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo Error: Failed to install Locust
        pause
        exit /b 1
    )
)

echo.
echo Starting Locust Web UI...
echo.
echo Once started, open your browser to: http://localhost:8089
echo.
echo Target URL: https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app
echo.

python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app

pause
