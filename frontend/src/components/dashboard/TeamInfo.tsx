"use client";
import React from "react";
import styles from '@/styles/Dashboard.module.css';
interface Member {
  name: string;
  email: string;
  phone: string;
  isLead?: boolean;
}
interface TeamInfoProps {
  projectTitle: string;
  teamLeadPhone: string;
  members: Member[];
  teamLeadIndex: number;
}
const TeamInfo: React.FC<TeamInfoProps> = ({ projectTitle, teamLeadPhone, members, teamLeadIndex }) => {
  return (
    <div className={styles.teamOverviewSection}>
      <h2 className={styles.sectionTitle}>Team Overview</h2>
      <div className={styles.projectInfoCard}>
        <h3>Project Information</h3>
        <div className={styles.projectDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Project Title</span>
            <span className={styles.detailValue}>{projectTitle}</span>
          </div>
          {}
        </div>
      </div>
      <div className={styles.teamMembersSection}>
        <h3>Team Members</h3>
        <div className={styles.membersGrid}>
          {members.map((member, idx) => (
            <div className={styles.memberCard} key={idx}>
              <div className={styles.memberHeader}>
                <h4 className={styles.memberName}>Member {idx + 1}</h4>
                {idx === teamLeadIndex && <span className={styles.leadBadge}>Team Lead</span>}
              </div>
              <div className={styles.memberDetails}>
                <div className={styles.memberDetail}>
                  <span className={styles.detailIcon}>👤</span>
                  <span className={styles.detailText}><strong>Name:</strong> {member.name}</span>
                </div>
                <div className={styles.memberDetail}>
                  <span className={styles.detailIcon}>📧</span>
                  <span className={styles.detailText}><strong>Email:</strong> {member.email}</span>
                </div>
                <div className={styles.memberDetail}>
                  <span className={styles.detailIcon}>📱</span>
                  <span className={styles.detailText}><strong>Phone:</strong> {member.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TeamInfo;