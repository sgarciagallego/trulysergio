import Link from "next/link"
import styles from "./readingItem.module.scss"

export default function ReadingItem({
  href,
  children,
} : {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={styles.wrapper}>
      {children}
    </Link>
  )
}