import styles from "./tagContainer.module.scss"

export default function TagContainer({ 
  children
} : {
  children: React.ReactNode
}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}