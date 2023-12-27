import Link from "next/link"
import styles from "./hyperlink.module.scss"
import Vector from "../vector"

export default function Hyperlink({ 
  href, 
  children 
} : {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} passHref legacyBehavior>
      <a className={styles.hyperlink}>
        {children}
        <Vector name={"arrowRight"} />
      </a>
    </Link>
  )
}