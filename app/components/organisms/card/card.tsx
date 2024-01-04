import Link from "next/link"
import styles from "./card.module.scss"
import Vector from "../../atoms/vector";

export default function Card({ 
  alt, 
  element, 
  heading, 
  dateTime, 
  excerpt, 
  href, 
  children 
} : {
  alt?: boolean;
  element?: any;
  heading: string;
  dateTime: string;
  excerpt: string;
  href: string;
  children?: React.ReactNode;
}) {
  const Heading = element || "h2"

  return (
    <Link 
      href={href} passHref
      className={alt ? styles.wrapper : styles.spacer}
    >
      {alt ? (
        <article className={styles.card}>
          <div className={styles.container}>
            <time>{dateTime}</time>
            <Heading>{heading}</Heading>
            <p>{excerpt}</p>
            {children && children}
          </div>
          <div className={styles.cta}>
            Read more
            <Vector name="arrowRight" />
          </div>
        </article>
      ) : (
        <article className={styles.article}>
          <time>{dateTime}</time>
          <Heading>{heading}</Heading>
          <p>{excerpt}</p>
          {children && children}
          <div className={styles.cta}>
            Read more
            <Vector name="arrowRight" />
          </div>
        </article>
      )}
    </Link>
  )
}