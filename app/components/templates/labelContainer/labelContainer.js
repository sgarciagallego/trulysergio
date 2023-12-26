import styles from "./labelContainer.module.scss"

export default function LabelContainer({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}