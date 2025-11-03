import { useLocation } from "react-router-dom";
import { useEffect } from "react";


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <a href="/" className={styles.homeLink}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
