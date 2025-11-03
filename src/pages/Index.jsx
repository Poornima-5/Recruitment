import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import ProfileHeader from "../components/ProfileHeader";
import MyProfile from "../components/MyProfile";
import TeamsView from "../components/TeamsView";
import UpdateProfileView from "../components/UpdateProfileView";
import styles from "./Index.module.css";

const Index = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <a href="/" className={styles.breadcrumbLink}>
            Home
          </a>
          <span>•</span>
          <span className={styles.breadcrumbActive}>User Profile2</span>
        </div>
      </div>

      <div className={styles.container}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ProfileHeader
              activeTab={activeTab}
              onTabChange={setActiveTab}
              profile={profile}
            />

            <div className={styles.content}>
              {activeTab === "profile" && <MyProfile profile={profile} />}
              {activeTab === "teams" && <TeamsView />}
              {activeTab === "update" && (
                <UpdateProfileView
                  profile={profile}
                  onProfileUpdate={fetchProfile}
                />
              )}
            </div>
          </>
        )}
      </div>

      <button className={styles.fab}>
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
      </button>
    </div>
  );
};

export default Index;
