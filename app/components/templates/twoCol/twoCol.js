import styles from "./twoCol.module.scss"

export default function TwoCol({ children, useMin }) {
  return (
    <section className={`space ${useMin ? styles.minWrapper : styles.maxWrapper}`}>
      {children}
    </section>
  )
}