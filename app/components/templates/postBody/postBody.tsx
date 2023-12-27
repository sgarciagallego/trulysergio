import styles from "./postBody.module.scss"

export default function PostBody({
  noIndex,
  children,
  index,
}: {
  noIndex?: boolean
  children?: React.ReactNode
  index?: React.ReactNode
}) {
  return (
    <div className={`space ${styles.wrapper}`}>
      <main className={`
        ${styles.body} 
        ${noIndex ? styles.noIndex : styles.availableIndex}
      `}>
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