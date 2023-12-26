import styles from "./tag.module.scss"

export default function Label({ children }) {
  return (
    <div 
      role="listitem" 
      className={styles.label}
    >
      {children}
    </div>
  )
}
