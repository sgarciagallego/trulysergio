import styles from "./card.module.scss"
import Hyperlink from "../../atoms/hyperlink/hyperlink"

export default function Card({ useAlt, element, heading, dateTime, excerpt, href, children }) {
  const Heading = element || "h2"

  return (
    <article className={`space ${useAlt ? styles.altWrapper : styles.wrapper}`}>
      {useAlt ? (
        <>
          <time>{dateTime}</time>
          <Heading>{heading}</Heading>
          <p>{excerpt}</p>
          {children}
          <Hyperlink href={href}>Read more</Hyperlink>
        </>
      ) : (
        <>
          <div className={styles.container}>
            <time>{dateTime}</time>
            <Heading>{heading}</Heading>
            <p>{excerpt}</p>
            {children}
          </div>
          <Hyperlink href={href}>Read more</Hyperlink>
        </>
      )}
    </article>
  )
}