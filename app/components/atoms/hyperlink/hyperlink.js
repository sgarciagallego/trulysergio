import Link from "next/link"
import styles from "./hyperlink.module.scss"
import Vector from "../../atoms/vector"

export default function Hyperlink({ href, children }) {
  return (
    <Link href={href} passHref legacyBehavior>
      <Link className={styles.hyperlink}>
        {children}
        <Vector name={"arrowRight"} />
      </Link>
    </Link>
  )
}