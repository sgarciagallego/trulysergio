import styles from "./twoCol.module.scss"

export default function TwoCol({ children }) {
  return (
    <section className={`space ${styles.wrapper}`}>
      {children}
    </section>
  )
}