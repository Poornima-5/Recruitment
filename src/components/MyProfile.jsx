import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import PostCard from "./PostCard";
import styles from "./MyProfile.module.css";

const MyProfile = ({ profile }) => {
  const [stats, setStats] = useState([]);
  const [teams, setTeams] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, teamsRes, postsRes] = await Promise.all([
        supabase.from("stats").select("*"),
        supabase.from("teams").select("*"),
        supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (teamsRes.data) setTeams(teamsRes.data);
      if (postsRes.data) setPosts(postsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    setPosting(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          content: newPostContent,
          author: profile?.name || "Anonymous",
          avatar: profile?.avatar || "👨",
          likes: 0,
          comments: 0,
        })
        .select()
        .single();

      if (error) throw error;

      setPosts([data, ...posts]);
      setNewPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.grid}>
      <div className={styles.sidebar}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>About me</h3>
          <p className={styles.cardText}>
            {profile?.about || "No description available."}
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Contact</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div
                className={`${styles.contactIcon} ${styles.contactIconOrange}`}
              >
                📞
              </div>
              <div>
                <p className={styles.contactLabel}>Call</p>
                <p className={styles.contactValue}>{profile?.phone || "N/A"}</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div
                className={`${styles.contactIcon} ${styles.contactIconGreen}`}
              >
                📧
              </div>
              <div>
                <p className={styles.contactLabel}>Email</p>
                <p className={styles.contactValue}>{profile?.email || "N/A"}</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div
                className={`${styles.contactIcon} ${styles.contactIconBlue}`}
              >
                💬
              </div>
              <div>
                <p className={styles.contactLabel}>Skype</p>
                <p className={styles.contactValue}>{profile?.skype || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Other</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div
                className={`${styles.contactIcon} ${styles.contactIconOrange}`}
              >
                📍
              </div>
              <div>
                <p className={styles.contactLabel}>Location</p>
                <p className={styles.contactValue}>
                  {profile?.location || "N/A"}
                </p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div
                className={`${styles.contactIcon} ${styles.contactIconGreen}`}
              >
                🎓
              </div>
              <div>
                <p className={styles.contactLabel}>Education</p>
                <p className={styles.contactValue}>
                  {profile?.education || "N/A"}
                </p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div
                className={`${styles.contactIcon} ${styles.contactIconPurple}`}
              >
                🌐
              </div>
              <div>
                <p className={styles.contactLabel}>Language</p>
                <p className={styles.contactValue}>
                  {profile?.language || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Teams</h3>
          <div className={styles.teamsList}>
            {teams.map((team) => (
              <div key={team.id} className={styles.teamItem}>
                <div className={styles.teamIcon}>{team.abbreviation}</div>
                <div>
                  <p className={styles.teamName}>{team.name}</p>
                  <p className={styles.teamMembers}>{team.members} members</p>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.viewAllButton}>View all</button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{
                  background: "hsl(199 89% 96%)",
                  color: "hsl(199 89% 48%)",
                }}
              >
                {stat.icon}
              </div>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className={styles.feedCard}>
          <div className={styles.feedTabs}>
            <button className={`${styles.feedTab} ${styles.feedTabInactive}`}>
              Feeds
            </button>
            <button className={`${styles.feedTab} ${styles.feedTabActive}`}>
              Timeline
            </button>
          </div>

          <div className={styles.createPost}>
            <textarea
              className={styles.createPostTextarea}
              placeholder="What are your thoughts?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={3}
            />
            <div className={styles.createPostActions}>
              <button className={styles.createPostButton}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                Attachment
              </button>
              <button className={styles.createPostButton}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Link
              </button>
              <button className={styles.createPostButton}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Emoji
              </button>
              <button
                className={styles.postSubmitButton}
                onClick={handleCreatePost}
                disabled={posting || !newPostContent.trim()}
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>

          <div className={styles.postsList}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
