import styles from "./grid.module.scss"

export default function Grid({ 
  element,
  useMin,
  children,
} : {
  element?: React.ElementType
  useMin?: boolean
  children: React.ReactNode
}) {
  const Wrapper = element || "div"

  return (
    <Wrapper 
      className={`
        space 
        ${useMin ? styles.minWrapper : styles.maxWrapper}
      `}
    >
      {children}
    </Wrapper>
  )
}