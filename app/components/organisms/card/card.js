import styles from "./card.module.scss"
import Hyperlink from "../../atoms/hyperlink/hyperlink"

export default function Card({ element, heading, dateTime, excerpt, href, children }) {
  const Heading = element || "h2"

  return (
    <article className={`space ${styles.wrapper}`}>
      <div>
        <time>{dateTime}</time>
        <Heading>{heading}</Heading>
        <p>{excerpt}</p>
        {children}
      </div>
      <Hyperlink href={href}>Read more</Hyperlink>
    </article>
  )
}