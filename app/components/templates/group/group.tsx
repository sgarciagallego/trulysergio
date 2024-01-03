import styles from "./group.module.scss"
import Intro from "../../atoms/intro/intro"
import Grid from "../../organisms/grid/grid"

export default function Group({
  heading,
  counter,
  children
} : {
  heading: string
  counter?: any
  children: React.ReactNode
}) {
  
  return (
    <section className="space">
      <div className={styles.intro}>
        <Intro>{heading}</Intro>
        <span>{counter}</span>
      </div>
      <Grid useMin>{children}</Grid>
    </section>
  )
}
