import styles from "./tag.module.scss"

export default function Tag({ 
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
