import styles from "./twoCol.module.scss"

export default function TwoCol({ 
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