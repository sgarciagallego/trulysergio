import styles from "./tagContainer.module.scss"

export default function TagContainer({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}