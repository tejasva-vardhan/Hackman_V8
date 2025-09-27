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
  teamCode: string;
  submissionStatus: 'not_submitted' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  selectionStatus: 'pending' | 'selected' | 'waitlisted' | 'rejected';
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
  const [projectName, setProjectName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'submission' | 'status'>('overview');

  // Check if user is already authenticated (credentials in localStorage)
  useEffect(() => {
    const savedProjectName = localStorage.getItem('projectName');
    const savedTeamCode = localStorage.getItem('teamCode');
    if (savedProjectName && savedTeamCode) {
      setProjectName(savedProjectName);
      setTeamCode(savedTeamCode);
      fetchTeamData(savedProjectName, savedTeamCode);
    }
  }, []);

  const fetchTeamData = async (projectName: string, teamCode: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/team/${teamCode}?projectName=${encodeURIComponent(projectName)}`);
      const data = await response.json();

      if (response.ok) {
        setTeamData(data);
        setIsAuthenticated(true);
        localStorage.setItem('projectName', projectName);
        localStorage.setItem('teamCode', teamCode);
        toast.success('Welcome to your team dashboard!');
      } else {
        toast.error(data.message || 'Failed to fetch team data');
        setIsAuthenticated(false);
        localStorage.removeItem('projectName');
        localStorage.removeItem('teamCode');
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
      toast.error('An error occurred while fetching team data');
      setIsAuthenticated(false);
      localStorage.removeItem('projectName');
      localStorage.removeItem('teamCode');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !teamCode.trim()) {
      toast.error('Please enter both project name and team code');
      return;
    }
    await fetchTeamData(projectName.trim(), teamCode.trim().toUpperCase());
  };

  const handleLogout = () => {
    setTeamData(null);
    setIsAuthenticated(false);
    setProjectName('');
    setTeamCode('');
    localStorage.removeItem('projectName');
    localStorage.removeItem('teamCode');
    toast.success('Logged out successfully');
  };

  const updateTeamData = (updatedData: Partial<TeamData>) => {
    setTeamData(prev => prev ? { ...prev, ...updatedData } : null);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loginContainer}>
          <h1 className={`${styles.title} ${nosifer.className}`}>Team Dashboard</h1>
          <p className={styles.subtitle}>Enter your project name and team code to access your dashboard</p>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="projectName" className={styles.label}>Project Name</label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter your project name exactly as registered"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="teamCode" className={styles.label}>Team Code</label>
              <input
                type="text"
                id="teamCode"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                placeholder="Enter your 8-character team code"
                className={styles.input}
                maxLength={8}
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
            <p>Make sure to enter your project name exactly as you registered it.</p>
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
          <p className={styles.teamCode}>Team Code: <span>{teamData.teamCode}</span></p>
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
          {activeTab === 'overview' && (
            <TeamInfo teamData={teamData} />
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
