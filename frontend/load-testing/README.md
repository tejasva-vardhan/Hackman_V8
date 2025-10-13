# Load Testing with Locust

This directory contains Locust load testing scripts for the Hackathon Registration Platform.

## Setup

1. **Install Python** (if not already installed)

   - Download from https://www.python.org/downloads/

2. **Install Locust:**
   ```bash
   pip install -r requirements.txt
   ```

## Running Load Tests

### Basic Load Test (Web UI)

Run Locust with web interface:

```bash
locust -f locustfile.py --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app
```

Then open http://localhost:8089 in your browser and configure:

- **Number of users**: Start with 10-50
- **Spawn rate**: 5 users per second
- **Host**: Pre-filled with your deployment URL

### Headless Load Test (Command Line)

Run without web UI:

```bash
locust -f locustfile.py --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app --users 50 --spawn-rate 5 --run-time 2m --headless
```

Parameters:

- `--users 50`: Simulate 50 concurrent users
- `--spawn-rate 5`: Add 5 users per second
- `--run-time 2m`: Run for 2 minutes
- `--headless`: No web UI

### Test Specific User Type

Test only regular users:

```bash
locust -f locustfile.py HackathonUser --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app
```

Test only admin users:

```bash
locust -f locustfile.py AdminUser --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app
```

## What Gets Tested

### HackathonUser (Regular Visitors)

- ✅ Homepage visits (30% of actions)
- ✅ Registration page visits (20%)
- ✅ Team registration submissions (10%)
- ✅ Contact form submissions (10%)
- ✅ Team lead status checks (10%)
- ✅ Dashboard visits (10%)

### AdminUser

- ✅ Admin page access (50%)
- ✅ Fetching all registrations (50%)

## Understanding Results

### Key Metrics to Watch:

- **RPS (Requests Per Second)**: Higher is better
- **Response Time**: Should be <1s for most requests
- **Failure Rate**: Should be <1%
- **95th Percentile**: 95% of requests complete within this time

### Expected Performance:

- Homepage: <500ms
- API endpoints: <1000ms
- Database operations: <2000ms

## Sample Test Scenarios

### Light Load (Development Testing)

```bash
locust -f locustfile.py --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app --users 10 --spawn-rate 2 --run-time 1m --headless
```

### Medium Load (Typical Usage)

```bash
locust -f locustfile.py --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app --users 50 --spawn-rate 5 --run-time 5m --headless
```

### Heavy Load (Stress Testing)

```bash
locust -f locustfile.py --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app --users 200 --spawn-rate 10 --run-time 10m --headless
```

### Spike Test (Sudden Traffic)

```bash
locust -f locustfile.py --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app --users 500 --spawn-rate 50 --run-time 3m --headless
```

## Export Results

Save results to CSV:

```bash
locust -f locustfile.py --host=https://frontend-2qaml73oq-amanraz-thakurs-projects.vercel.app --users 50 --spawn-rate 5 --run-time 2m --headless --csv=results --html=report.html
```

This generates:

- `results_stats.csv` - Request statistics
- `results_failures.csv` - Failed requests
- `results_stats_history.csv` - Time-series data
- `report.html` - Visual HTML report

## Troubleshooting

### Connection Errors

- Check if the deployment URL is correct
- Ensure the site is accessible
- Verify Vercel isn't rate-limiting

### High Failure Rates

- Reduce number of users
- Increase spawn rate delay
- Check MongoDB connection limits
- Review Vercel function execution limits (free tier: 10s timeout)

### Database Issues

- MongoDB Atlas free tier has connection limits (500 max)
- Consider upgrading if testing with >100 concurrent users

## Best Practices

1. **Start Small**: Begin with 10 users, gradually increase
2. **Monitor Server**: Watch Vercel logs during tests
3. **Test Off-Peak**: Avoid testing during actual registrations
4. **Clean Test Data**: Remove test registrations after load tests
5. **Respect Limits**: Vercel free tier has bandwidth/execution limits

## Security Note

The `locustfile.py` includes the admin token for testing. This is acceptable for load testing but ensure:

- Don't commit sensitive tokens to public repos
- Use test environments when possible
- Clean up test data after testing
