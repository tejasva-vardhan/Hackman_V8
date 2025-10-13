from locust import HttpUser, task, between
import random
import string

class HackathonUser(HttpUser):
    """
    Simulates users interacting with the hackathon registration website
    """
    wait_time = between(1, 3)  # Wait 1-3 seconds between tasks
    
    def on_start(self):
        """Called when a simulated user starts"""
        print("Starting user simulation...")
    
    @task(3)
    def view_homepage(self):
        """Visit the homepage (most common action)"""
        self.client.get("/")
    
    @task(2)
    def view_registration_page(self):
        """Visit the registration page"""
        self.client.get("/registration")
    
    @task(1)
    def submit_registration(self):
        """Submit a team registration form"""
        team_name = f"Team_{''.join(random.choices(string.ascii_uppercase, k=5))}"
        
        # Generate team members
        members = []
        num_members = random.randint(2, 4)
        
        for i in range(num_members):
            member = {
                "name": f"Member_{random.randint(1000, 9999)}",
                "usn": f"1DS{random.randint(20, 23)}IS{random.randint(100, 999)}",
                "email": f"test{random.randint(1000, 9999)}@example.com",
                "phone": f"{''.join(random.choices(string.digits, k=10))}",
                "year": random.choice([2, 3, 4]),
                "branch": random.choice(["CSE", "ISE", "ECE", "ME", "CIVIL"]),
                "isTeamLead": i == 0  # First member is team lead
            }
            members.append(member)
        
        registration_data = {
            "teamName": team_name,
            "projectTitle": f"Project_{random.randint(100, 999)}",
            "members": members
        }
        
        with self.client.post(
            "/api/registration",
            json=registration_data,
            catch_response=True
        ) as response:
            if response.status_code == 201:
                response.success()
            elif response.status_code == 400:
                # Expected for duplicate emails in load testing
                response.success()
            else:
                response.failure(f"Got status code: {response.status_code}")
    
    @task(1)
    def submit_contact_form(self):
        """Submit a contact form"""
        contact_data = {
            "name": f"User_{random.randint(1000, 9999)}",
            "email": f"contact{random.randint(1000, 9999)}@example.com",
            "message": "This is a load test message"
        }
        
        with self.client.post(
            "/api/contact",
            json=contact_data,
            catch_response=True
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Got status code: {response.status_code}")
    
    @task(1)
    def check_team_lead_status(self):
        """Check team lead authentication"""
        params = {
            "email": f"test{random.randint(1000, 9999)}@example.com",
            "phone": f"{''.join(random.choices(string.digits, k=10))}"
        }
        
        self.client.get("/api/team/lead", params=params)
    
    @task(1)
    def view_dashboard(self):
        """Visit the dashboard page"""
        self.client.get("/dashboard")


class AdminUser(HttpUser):
    """
    Simulates admin users accessing the admin dashboard
    """
    wait_time = between(2, 5)
    
    @task(1)
    def view_admin_page(self):
        """Visit the admin page"""
        self.client.get("/admin")
    
    @task(1)
    def get_registrations(self):
        """Fetch all registrations (requires auth)"""
        headers = {"Authorization": "Bearer hacman@1"}
        self.client.get("/api/admin/registrations", headers=headers)
