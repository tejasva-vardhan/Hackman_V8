"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Nosifer } from 'next/font/google';
import TeamInfo from '@/components/dashboard/TeamInfo';
import SubmissionStatus from '@/components/dashboard/SubmissionStatus';
import SelectionStatus from '@/components/dashboard/SelectionStatus';
import ProjectSubmission from '@/components/dashboard/ProjectSubmission';
import styles from '@/styles/Dashboard.module.css';

const nosifer = Nosifer({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface TeamMember {
  id: number;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  usn?: string;
  linkedin?: string;
  github?: string;
}

interface TeamData {
  _id: string;
  teamName: string;
  collegeName: string;
  projectTitle: string;
  projectDescription: string;
  teamLeadId: number;
  members: TeamMember[];
  submissionStatus: 'not_submitted' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  selectionStatus: 'pending' | 'selected' | 'waitlisted' | 'rejected';
  paymentStatus: 'unpaid' | 'paid' | 'verified';
  submissionDetails: {
    githubRepo: string;
    liveDemo: string;
    presentationLink: string;
    additionalNotes: string;
    submittedAt: Date | null;
  };
  reviewComments: string;
  finalScore: number | null;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [leadEmail, setLeadEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'submission' | 'status'>('overview');

  // Check for auto-login after registration
  useEffect(() => {
    const autoLoginEmail = sessionStorage.getItem('autoLoginEmail');
    const autoLoginPhone = sessionStorage.getItem('autoLoginPhone');
    const isNewRegistration = sessionStorage.getItem('isNewRegistration');
    
    if (autoLoginEmail && autoLoginPhone) {
      // Clear the auto-login credentials
      sessionStorage.removeItem('autoLoginEmail');
      sessionStorage.removeItem('autoLoginPhone');
      sessionStorage.removeItem('isNewRegistration');
      
      // Set the form fields and fetch team data
      setLeadEmail(autoLoginEmail);
      setPhone(autoLoginPhone);
      fetchTeamData(autoLoginEmail, autoLoginPhone, isNewRegistration === 'true');
    }
  }, []);

  const fetchTeamData = async (leadEmail: string, phone: string, isNewRegistration: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/team/lead?email=${encodeURIComponent(leadEmail)}&phone=${encodeURIComponent(phone)}`);
      const data = await response.json();

      if (response.ok && data && typeof data === 'object' && data._id) {
        // Valid team data received
        setTeamData(data);
        setIsAuthenticated(true);
        // Store only for current session, not persistent
        sessionStorage.setItem('projectName', data.projectTitle || '');
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('leadEmail', leadEmail);
        
        // Show different message for new registrations vs returning users
        if (isNewRegistration) {
          toast.dismiss();
          setTimeout(() => toast.success('🎉 Registration complete! Welcome to your dashboard!'), 10);
        } else {
          toast.dismiss();
          setTimeout(() => toast.success('Welcome back to your dashboard!'), 10);
        }
      } else {
        // Invalid credentials or no team found
        toast.dismiss();
        setTimeout(() => toast.error('❌ Invalid credentials! Please check your team lead email and phone number.'), 10);
        setIsAuthenticated(false);
        setTeamData(null);
        sessionStorage.removeItem('projectName');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('leadEmail');
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
      toast.dismiss();
      setTimeout(() => toast.error('⚠️ Connection error! Please check your internet and try again.'), 10);
      setIsAuthenticated(false);
      setTeamData(null);
      sessionStorage.removeItem('projectName');
      sessionStorage.removeItem('phone');
      sessionStorage.removeItem('leadEmail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim() || !phone.trim()) {
      toast.dismiss();
      setTimeout(() => toast.error('Please enter both team lead email and phone number'), 10);
      return;
    }
    await fetchTeamData(leadEmail.trim(), phone.trim());
  };

  const handleLogout = () => {
    setTeamData(null);
    setIsAuthenticated(false);
    setLeadEmail('');
    setPhone('');
    sessionStorage.removeItem('leadEmail');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('projectName');
    toast.dismiss();
    setTimeout(() => toast.success('Logged out successfully'), 10);
  };

  const updateTeamData = (updatedData: Partial<TeamData>) => {
    setTeamData(prev => prev ? { ...prev, ...updatedData } : null);
  };

  // If team is selected but payment is unpaid, optionally auto-open payment link once per session
  useEffect(() => {
    if (!teamData) return;
    const url = process.env.NEXT_PUBLIC_PAYMENT_URL;
    const alreadyPrompted = typeof window !== 'undefined' ? sessionStorage.getItem('paymentPrompted') : '1';
    if (
      teamData.selectionStatus === 'selected' &&
      teamData.paymentStatus === 'unpaid' &&
      url &&
      !alreadyPrompted
    ) {
      try {
        sessionStorage.setItem('paymentPrompted', '1');
        toast.loading('Opening payment page...', { duration: 1500 });
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch (e) {
        // no-op
      }
    }
  }, [teamData]);

  if (!isAuthenticated) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loginContainer}>
          <h1 className={`${styles.title} ${nosifer.className}`}>Team Dashboard</h1>
          <p className={styles.subtitle}>Enter your project title and team code to access your dashboard</p>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="leadEmail" className={styles.label}>Team Lead Email</label>
              <input
                type="email"
                id="leadEmail"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="Enter team lead's email address"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>Team Lead Phone Number</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter team lead's 10-digit phone number"
                className={styles.input}
                maxLength={10}
                required
              />
            </div>
            <button 
              type="submit" 
              className={`${styles.loginButton} ${nosifer.className}`}
              disabled={isLoading}
            >
              {isLoading ? 'Accessing...' : 'Access Dashboard'}
            </button>
          </form>
          
          <div className={styles.helpText}>
            <p>Don&apos;t have your credentials? Check your registration confirmation email.</p>
            <p>Make sure to enter your project title exactly as you registered it.</p>
            <p>Need help? Contact the organizers.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Loading team data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <h1 className={`${styles.dashboardTitle} ${nosifer.className}`}>
            {teamData.teamName}
          </h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.dashboardContent}>
        <nav className={styles.tabNavigation}>
          <button
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Team Overview
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'submission' ? styles.active : ''}`}
            onClick={() => setActiveTab('submission')}
          >
            Project Submission
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'status' ? styles.active : ''}`}
            onClick={() => setActiveTab('status')}
          >
            Selection Status
          </button>
        </nav>

        <div className={styles.tabContent}>
          {activeTab === 'overview' && teamData && (
            <TeamInfo 
              projectTitle={teamData.projectTitle}
              teamLeadPhone={teamData.members[teamData.teamLeadId]?.phone || "N/A"}
              members={teamData.members.map((m, idx) => ({ 
                name: m.name, 
                email: m.email, 
                phone: m.phone,
                isLead: idx === teamData.teamLeadId
              }))}
              teamLeadIndex={teamData.teamLeadId}
            />
          )}
          {activeTab === 'submission' && (
            <ProjectSubmission 
              teamData={teamData} 
              onUpdate={updateTeamData}
            />
          )}
          {activeTab === 'status' && (
            <div className={styles.statusContainer}>
              <SubmissionStatus teamData={teamData} />
              <SelectionStatus teamData={teamData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}