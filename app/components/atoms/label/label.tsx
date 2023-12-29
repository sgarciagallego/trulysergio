import styles from "./label.module.scss"

export default function Label({ 
  children,
  alt
} : {
  children: React.ReactNode
  alt?: boolean
}) {
  return (
    <div 
      role="listitem" 
      className={alt ? styles.altTag : styles.tag}
    >
      {children}
    </div>
  )
}
