"use client";

import React from 'react';
import styles from '@/styles/Dashboard.module.css';

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
  submissionStatus: string;
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

interface TeamInfoProps {
  teamData: TeamData;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ teamData }) => {
  const teamLead = teamData.members.find(member => member.id === teamData.teamLeadId);
  const otherMembers = teamData.members.filter(member => member.id !== teamData.teamLeadId);

  return (
    <div className={styles.teamInfoContainer}>
      <div className={styles.infoGrid}>
        {/* Team Details */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Team Details</h3>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Team Name:</span>
            <span className={styles.infoValue}>{teamData.teamName}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>College:</span>
            <span className={styles.infoValue}>{teamData.collegeName}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Team Code:</span>
            <span className={styles.infoValue}>{teamData.teamCode}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Registration Date:</span>
            <span className={styles.infoValue}>
              {new Date(teamData.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Project Details */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Project Details</h3>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Project Title:</span>
            <span className={styles.infoValue}>{teamData.projectTitle}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Description:</span>
            <span className={styles.infoValue}>{teamData.projectDescription}</span>
          </div>
        </div>

        {/* Team Lead */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Team Lead</h3>
          {teamLead && (
            <div className={styles.memberCard}>
              <div className={styles.memberHeader}>
                <h4 className={styles.memberName}>{teamLead.name}</h4>
                <span className={styles.leadBadge}>Team Lead</span>
              </div>
              <div className={styles.memberDetails}>
                <div className={styles.memberInfo}>
                  <span className={styles.memberLabel}>Email:</span>
                  <a href={`mailto:${teamLead.email}`} className={styles.memberLink}>
                    {teamLead.email}
                  </a>
                </div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberLabel}>Phone:</span>
                  <a href={`tel:${teamLead.phone}`} className={styles.memberLink}>
                    {teamLead.phone}
                  </a>
                </div>
                {teamLead.usn && (
                  <div className={styles.memberInfo}>
                    <span className={styles.memberLabel}>USN:</span>
                    <span className={styles.memberValue}>{teamLead.usn}</span>
                  </div>
                )}
                <div className={styles.memberLinks}>
                  {teamLead.linkedin && (
                    <a 
                      href={teamLead.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      LinkedIn
                    </a>
                  )}
                  {teamLead.github && (
                    <a 
                      href={teamLead.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Team Members */}
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Team Members</h3>
          <div className={styles.membersList}>
            {otherMembers.map((member) => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.memberHeader}>
                  <h4 className={styles.memberName}>{member.name}</h4>
                </div>
                <div className={styles.memberDetails}>
                  <div className={styles.memberInfo}>
                    <span className={styles.memberLabel}>Email:</span>
                    <a href={`mailto:${member.email}`} className={styles.memberLink}>
                      {member.email}
                    </a>
                  </div>
                  <div className={styles.memberInfo}>
                    <span className={styles.memberLabel}>Phone:</span>
                    <a href={`tel:${member.phone}`} className={styles.memberLink}>
                      {member.phone}
                    </a>
                  </div>
                  {member.usn && (
                    <div className={styles.memberInfo}>
                      <span className={styles.memberLabel}>USN:</span>
                      <span className={styles.memberValue}>{member.usn}</span>
                    </div>
                  )}
                  <div className={styles.memberLinks}>
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
