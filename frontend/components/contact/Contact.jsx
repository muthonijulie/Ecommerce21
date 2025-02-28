
import { FaTools, FaHome, FaClock } from "react-icons/fa";
import styles from "./Contact.module.css"; // Importing CSS module

const WorkInProgress = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.iconWrapper}>
          <FaTools className={styles.toolIcon} />
        </div>

        <h1 className={styles.title}>Work in Progress</h1>

        <div className={styles.divider}></div>

        <p className={styles.description}>
        We're making improvements! This page is currently under development as we work to enhance your experience. Stay tuned for exciting updates!
        </p>

        <div className={styles.cardsContainer}>
          <div className={styles.infoCard}>
            <FaClock className={styles.cardIcon} />
            <h3>Coming Soon</h3>
            <p>Check back for updates</p>
          </div>

          <a href="/" className={styles.infoCard}>
            <FaHome className={styles.cardIcon} />
            <h3>Return Home</h3>
            <p>Explore other sections</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
