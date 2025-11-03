import { useState } from "react";
import styles from "./ProfileHeader.module.css";

const ProfileHeader = ({ activeTab, onTabChange, profile }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gradientHeader} />

      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>{profile?.avatar || "👨‍💼"}</div>
            <div className={styles.onlineIndicator} />
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{profile?.name || "Loading..."}</h1>
              <span className={styles.badge}>{profile?.role || "Admin"}</span>
            </div>
            <p className={styles.role}>super admin</p>
            <div className={styles.statusRow}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>
                {profile?.status || "Active"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            onClick={() => onTabChange("profile")}
            className={`${styles.tab} ${
              activeTab === "profile" ? styles.tabActive : ""
            }`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>My Profile</span>
          </button>

          <button
            onClick={() => onTabChange("teams")}
            className={`${styles.tab} ${
              activeTab === "teams" ? styles.tabActive : ""
            }`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Teams</span>
          </button>

          <button
            onClick={() => onTabChange("update")}
            className={`${styles.tab} ${
              activeTab === "update" ? styles.tabActive : ""
            }`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Update Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
