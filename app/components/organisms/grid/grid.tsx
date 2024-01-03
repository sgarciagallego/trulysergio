import styles from "./grid.module.scss"

export default function Grid({ 
  useMin,
  children,
} : {
  useMin?: boolean
  children: React.ReactNode
}) {
  return (
    <section 
      className={`
        space 
        ${useMin ? styles.minWrapper : styles.maxWrapper}
      `}
    >
      {children}
    </section>
  )
}