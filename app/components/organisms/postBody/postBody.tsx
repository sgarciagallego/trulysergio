'use client'

import React, { useEffect, useState } from "react"
import styles from "./postBody.module.scss"
import PostFooter from "../postFooter/postFooter"
import Link from "next/link"

interface Heading {
  level: string
  text: string
  anchor: string
}

interface HierarchicalHeading extends Heading {
  children?: HierarchicalHeading[]
}

export default function PostBody({
  noIndex,
  children,
}: {
  noIndex?: boolean
  children?: React.ReactNode
}) {
  const [headings, setHeadings] = useState<HierarchicalHeading[]>([])

  useEffect(() => {
    if (!noIndex && children) {
      const mainElement = document.querySelector("main")

      if (mainElement) {
        const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"]

        const headingElements = mainElement.querySelectorAll(
          headingTags.join(", ")
        ) as NodeListOf<HTMLElement>

        const extractedHeadings: HierarchicalHeading[] = []
        let currentHierarchy: HierarchicalHeading[] = []

        headingElements.forEach((element) => {
          const text = element.textContent || ""
          const anchor = text.toLowerCase().replace(/\s+/g, "-")
          const level = element.tagName.toLowerCase()

          const newHeading: HierarchicalHeading = {
            level,
            text,
            anchor,
          }

          if (level === "h2") {
            extractedHeadings.push(newHeading)
            currentHierarchy = [newHeading]
          } else {
            let parentHierarchy: HierarchicalHeading | undefined = currentHierarchy[currentHierarchy.length - 1]

            while (parentHierarchy && parseInt(parentHierarchy.level[1]) >= parseInt(level[1])) {
              currentHierarchy.pop()
              parentHierarchy = currentHierarchy[currentHierarchy.length - 1]
            }

            if (parentHierarchy) {
              if (!parentHierarchy.children) {
                parentHierarchy.children = []
              }
              parentHierarchy.children.push(newHeading)
              currentHierarchy.push(newHeading)
            }
          }
          
          element.id = anchor
        })

        setHeadings(extractedHeadings)
      }
    }
  }, [children, noIndex])

  const renderHeadings = (headings: HierarchicalHeading[]) => (
    <ul role="list" className={styles.list}>
      {headings.map((heading, index) => (
        <li key={index}>
          <Link href={`#${heading.anchor}`}>{heading.text}</Link>
          {heading.children && renderHeadings(heading.children)}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`space ${styles.wrapper}`}>
      <main className={`
        ${styles.body} 
        ${noIndex ? styles.noIndex : styles.availableIndex}
      `}>
        {children}
        <PostFooter />
      </main>
      {!noIndex && headings.length > 0 && (
        <aside className={styles.index}>
          <h2>Table of contents</h2>
          {renderHeadings(headings)}
        </aside>
      )}
    </div>
  )
}