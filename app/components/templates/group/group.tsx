import React from 'react'
import styles from "./group.module.scss"

export default function Group({
  element,
  heading,
  counter,
  children
} : {
  element?: any
  heading: string
  counter?: any
  children: React.ReactNode
}) {
  const Heading = element || "h1"

  return (
    <section className={`space ${styles.wrapper}`}>
      <div className={styles.split}>
        <Heading>{heading}</Heading>
        <span>{counter}</span>
      </div>
      {children}
    </section>
  )
}
