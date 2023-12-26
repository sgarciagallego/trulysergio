import styles from "./intro.module.scss"
import Subtitle from "../../atoms/subtitle/subtitle"

export default function Intro({ element, subtitle, children }) {
  const Element = element || "div"

  return (
    <div className={subtitle && subtitle.trim() !== "" ? styles.wrapperMax : styles.wrapperMin}>
      <Element className={`space`}>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <h1>{children}</h1>
      </Element>
    </div>
  )
}