import Link from "next/link"
import styles from "./card.module.scss"
import Hyperlink from "../../atoms/hyperlink/hyperlink"
import Vector from "../../atoms/vector";

export default function Card({ 
  useAlt, 
  element, 
  heading, 
  dateTime, 
  excerpt, 
  href, 
  children 
} : {
  useAlt?: boolean;
  element?: any;
  heading: string;
  dateTime: string;
  excerpt: string;
  href: string;
  children?: React.ReactNode;
}) {
  const Heading = element || "h2"

  return (
    <article className={`space ${useAlt ? styles.altWrapper : styles.wrapper}`}>
      {useAlt ? (
        <>
          <time>{dateTime}</time>
          <Link href={href} passHref><Heading>{heading}</Heading></Link>
          <p>{excerpt}</p>
          {children && (children)}
          <Hyperlink href={href}>Read more</Hyperlink>
        </>
      ) : (
        <Link href={href} passHref>
          <div className={styles.container}>
            <time>{dateTime}</time>
            <Heading>{heading}</Heading>
            <p>{excerpt}</p>
            {children && (children)}
          </div>
          <div className={styles.cta}>
            Read more
            <Vector name="arrowRight" />
          </div>
        </Link>
      )}
    </article>
  )
}