import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import FollowerCard from "./FollowerCard";
import styles from "./TeamsView.module.css";

const TeamsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const { data, error } = await supabase
        .from("followers")
        .select("*")
        .order("name");

      if (error) throw error;
      setFollowers(data || []);
    } catch (error) {
      console.error("Error fetching followers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFollow = async (id) => {
    const follower = followers.find((f) => f.id === id);
    if (!follower) return;

    try {
      const { error } = await supabase
        .from("followers")
        .update({ is_following: !follower.is_following })
        .eq("id", id);

      if (error) throw error;

      setFollowers(
        followers.map((f) =>
          f.id === id ? { ...f, is_following: !f.is_following } : f
        )
      );
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const filteredFollowers = followers.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const followersCount = followers.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Followers</h2>
          <span className={styles.badge}>{followersCount}</span>
        </div>

        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Followers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredFollowers.map((follower) => (
          <FollowerCard
            key={follower.id}
            follower={follower}
            onToggleFollow={handleToggleFollow}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamsView;
