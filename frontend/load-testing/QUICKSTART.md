# Quick Start Scripts for Locust Load Testing

## For Windows Users

### Option 1: Double-click to Run

Simply double-click `run_locust.bat` and it will:

- Check if Python is installed
- Install Locust if needed
- Start the Locust Web UI
- Open http://localhost:8089 in your browser

### Option 2: Command Line

```powershell
.\run_locust.bat
```

## For Linux/Mac Users

### Make script executable (first time only):

```bash
chmod +x run_locust.sh
```

### Run the script:

```bash
./run_locust.sh
```

## Using the Locust Web UI

1. **Open Browser**: Go to http://localhost:8089
2. **Configure Test**:
   - Number of users: 50 (start small)
   - Spawn rate: 5 users/second
   - Host: Already set to your deployment URL
3. **Click Start** to begin load testing
4. **Monitor**: Watch real-time statistics, charts, and failures

## Quick Commands (Without Scripts)

### Start Web UI

```powershell
python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app
```

### Headless Mode (No UI)

```powershell
python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app --users 50 --spawn-rate 5 --run-time 2m --headless
```

### Generate HTML Report

```powershell
python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app --users 50 --spawn-rate 5 --run-time 2m --headless --html=report.html
```

## Test Scenarios

### Light Test (Development)

```powershell
python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app --users 10 --spawn-rate 2 --run-time 1m --headless
```

### Medium Test (Typical Load)

```powershell
python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app --users 50 --spawn-rate 5 --run-time 5m --headless
```

### Heavy Test (Stress Test)

```powershell
python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app --users 200 --spawn-rate 10 --run-time 10m --headless
```

### Spike Test (Sudden Traffic)

```powershell
python -m locust -f locustfile.py --host=https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app --users 500 --spawn-rate 50 --run-time 3m --headless
```

## What Gets Tested

- ✅ Homepage visits
- ✅ Registration page
- ✅ Team registration submissions
- ✅ Contact form submissions
- ✅ Dashboard access
- ✅ Admin panel access
- ✅ Team lead authentication

## Monitoring Results

### Key Metrics:

- **RPS (Requests/Second)**: Higher is better
- **Response Time**: Should be <1s for most requests
- **Failure Rate**: Should be <1%
- **95th Percentile**: 95% of requests complete within this time

### Expected Performance:

- Homepage: <500ms
- API endpoints: <1000ms
- Database operations: <2000ms

## Troubleshooting

### If you see "ModuleNotFoundError: No module named 'locust'"

```powershell
pip install locust
```

### If you see connection errors

- Check if the deployment URL is accessible
- Verify your internet connection
- Check Vercel status

### If tests are failing

- Reduce number of users
- Increase spawn rate delay
- Check MongoDB connection limits
- Review Vercel function execution limits

## Notes

- The target URL is automatically set to your latest deployment
- Results are displayed in real-time in the web UI
- You can stop tests at any time with Ctrl+C
- Test data will be created in the database (remember to clean up)

## Current Deployment URL

**https://frontend-icu8wrczi-amanraz-thakurs-projects.vercel.app**
