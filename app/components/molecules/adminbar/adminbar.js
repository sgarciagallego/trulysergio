import Link from "next/link"
import styles from "./adminbar.module.scss"
import Vector from "../../atoms/vector"

export default function AdminBar() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <span>Truly</span>
        Sergio
      </div>
      <Link 
        className={styles.hyperlink}
        href="/"
      >
        Back home
      </Link>
    </header>
  )
}