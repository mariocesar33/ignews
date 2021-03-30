import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="/images/logo.svg"/>
        <nav>
          <a className={styles.active} href="#">Home</a>
          <a href="#">Posts</a>
        </nav>
      </div>
    </header>
  );
}