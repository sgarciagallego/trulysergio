import styles from "./tagMap.module.scss"

export default function TagMap({
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