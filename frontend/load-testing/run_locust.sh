#!/bin/bash

echo "========================================"
echo "  Locust Load Testing - Hackman V8"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python is not installed"
    echo "Please install Python from https://www.python.org/downloads/"
    exit 1
fi

# Check if locust is installed
if ! python3 -c "import locust" &> /dev/null; then
    echo "Locust not found. Installing..."
    pip3 install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install Locust"
        exit 1
    fi
fi

echo ""
echo "Starting Locust Web UI..."
echo ""
echo "Once started, open your browser to: http://localhost:8089"
echo ""
echo "Target URL: https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app"
echo ""

python3 -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app
