import styles from "./FollowerCard.module.css";

const FollowerCard = ({ follower, onToggleFollow }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{follower.avatar}</div>
          <div>
            <h3 className={styles.name}>{follower.name}</h3>
            <p className={styles.location}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{follower.location}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => onToggleFollow(follower.id)}
          className={`${styles.followButton} ${
            follower.is_following
              ? styles.followButtonFollowed
              : styles.followButtonNotFollowed
          }`}
        >
          {follower.is_following ? "Followed" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default FollowerCard;
