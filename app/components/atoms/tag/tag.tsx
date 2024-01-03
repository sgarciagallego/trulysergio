import Link from "next/link"
import styles from "./tag.module.scss"

export default function Label({ 
  alt,
  href,
  children
} : {
  alt?: boolean
  href: string
  children: React.ReactNode
}) {
  return (
    <Link 
      href={href} passHref
      className={alt ? styles.altTag : styles.tag}
    >
      <div  
        role="listitem"
      >
        {children}
      </div>
    </Link>
  )
}
