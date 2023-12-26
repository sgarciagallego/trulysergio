import styles from "./tag.module.scss"

export default function Tag({ children }) {
  return (
    <div 
      role="listitem" 
      className={styles.tag}
    >
      {children}
    </div>
  )
}
