"use client";

import React from 'react';
import styles from '@/styles/Dashboard.module.css';

interface TeamData {
  _id: string;
  teamName: string;
  collegeName: string;
  projectTitle: string;
  projectDescription: string;
  teamLeadId: number;
  members: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    usn?: string;
    linkedin?: string;
    github?: string;
  }>;
  submissionStatus: 'not_submitted' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  selectionStatus: string;
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

interface SubmissionStatusProps {
  teamData: TeamData;
}

const SubmissionStatus: React.FC<SubmissionStatusProps> = ({ teamData }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_submitted':
        return styles.statusNotSubmitted;
      case 'submitted':
        return styles.statusSubmitted;
      case 'under_review':
        return styles.statusUnderReview;
      case 'accepted':
        return styles.statusAccepted;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusNotSubmitted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_submitted':
        return 'Not Submitted';
      case 'submitted':
        return 'Submitted';
      case 'under_review':
        return 'Under Review';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not_submitted':
        return '⏳';
      case 'submitted':
        return '📤';
      case 'under_review':
        return '🔍';
      case 'accepted':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '❓';
    }
  };

  return (
    <div className={styles.statusCard}>
      <h3 className={styles.cardTitle}>Submission Status</h3>
      
      <div className={styles.statusHeader}>
        <div className={styles.statusInfo}>
          <div className={styles.statusLabel}>Current Status</div>
          <div className={`${styles.statusBadge} ${getStatusColor(teamData.submissionStatus)}`}>
            <span className={styles.statusIcon}>{getStatusIcon(teamData.submissionStatus)}</span>
            <span className={styles.statusText}>{getStatusText(teamData.submissionStatus)}</span>
          </div>
        </div>
      </div>

      {teamData.submissionStatus !== 'not_submitted' && (
        <div className={styles.statusDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Submitted At:</span>
            <span className={styles.detailValue}>
              {teamData.submissionDetails.submittedAt 
                ? new Date(teamData.submissionDetails.submittedAt).toLocaleString()
                : 'Not available'
              }
            </span>
          </div>

          {teamData.submissionDetails.githubRepo && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>GitHub Repository:</span>
              <a 
                href={teamData.submissionDetails.githubRepo} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                View Repository
              </a>
            </div>
          )}

          {teamData.submissionDetails.liveDemo && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Live Demo:</span>
              <a 
                href={teamData.submissionDetails.liveDemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                View Demo
              </a>
            </div>
          )}

          {teamData.submissionDetails.presentationLink && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Presentation:</span>
              <a 
                href={teamData.submissionDetails.presentationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                View Presentation
              </a>
            </div>
          )}

          {teamData.submissionDetails.additionalNotes && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Additional Notes:</span>
              <span className={styles.detailValue}>{teamData.submissionDetails.additionalNotes}</span>
            </div>
          )}
        </div>
      )}

      {teamData.reviewComments && (
        <div className={styles.reviewSection}>
          <h4 className={styles.reviewTitle}>Review Comments</h4>
          <div className={styles.reviewComments}>
            {teamData.reviewComments}
          </div>
        </div>
      )}

      {teamData.finalScore !== null && (
        <div className={styles.scoreSection}>
          <h4 className={styles.scoreTitle}>Final Score</h4>
          <div className={styles.scoreValue}>
            {teamData.finalScore}/100
          </div>
        </div>
      )}

      {teamData.submissionStatus === 'not_submitted' && (
        <div className={styles.notSubmittedMessage}>
          <p>Your project has not been submitted yet.</p>
          <p>Go to the &quot;Project Submission&quot; tab to submit your project.</p>
        </div>
      )}
    </div>
  );
};

export default SubmissionStatus;