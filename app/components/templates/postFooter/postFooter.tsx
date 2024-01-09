import Vector from "../../atoms/vector"
import styles from "./postFooter.module.scss"

export default function PostFooter({
  lastUpdated,
  pageViews
} : {
  lastUpdated: string
  pageViews: number
}) {
  return (
    <div className={styles.wrapper}>
      <Vector name={"divider"} />
      <p>I hope you found this post useful ❤️</p>
      <div className={styles.lastUpdated}>
        <div className={styles.tokenIdentifier}>Last updated</div>
        <div className={styles.token}>{lastUpdated}</div>
      </div>
      <div className={styles.pageViews}>
        <div className={styles.tokenIdentifier}>Page views</div>
        <div className={styles.token}>{pageViews}</div>
      </div>
    </div>
  )
}