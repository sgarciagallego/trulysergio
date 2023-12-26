import styles from "./subtitle.module.scss"

export default function Subtitle({ children }) {
  return (
    <div role="doc-subtitle" className={styles.subtitle}>
      {children}
    </div>
  )
}