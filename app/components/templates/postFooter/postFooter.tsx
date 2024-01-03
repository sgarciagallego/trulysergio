import Vector from "../../atoms/vector"
import styles from "./postFooter.module.scss"

export default function PostFooter() {
  return (
    <div className={styles.wrapper}>
      <Vector name={"divider"} />
      I hope you found this tutorial useful. 
    </div>
  )
}