import styles from "./label.module.scss"

export default function Label({ 
  children 
} : {
  children: React.ReactNode
}) {
  return (
    <div 
      role="listitem" 
      className={styles.tag}
    >
      {children}
    </div>
  )
}
