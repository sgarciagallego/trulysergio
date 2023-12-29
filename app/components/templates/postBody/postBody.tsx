import styles from "./postBody.module.scss"
import ReadingItem from "../../atoms/readingItem/readingItem"

export default function PostBody({
  noIndex,
  children,
  readingOrder,
}: {
  noIndex?: boolean;
  children?: React.ReactNode
  index?: React.ReactNode
  readingOrder?: { 
    id: string
    href: string
    name: string 
  }[]
}) {
  return (
    <div className={`space ${styles.wrapper}`}>
      <main
        className={`${styles.body} ${
          noIndex ? styles.noIndex : styles.availableIndex
        }`}
      >
        {children}
      </main>
      {!noIndex && (
        <aside className={styles.index}>
          <h2>Table of contents</h2>
          
        </aside>
      )}
    </div>
  )
}