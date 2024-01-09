'use client'

import React, { useEffect, useState, useRef } from "react"
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
  lastUpdated,
  pageViews
}: {
  noIndex?: boolean
  children?: React.ReactNode
  lastUpdated: string
  pageViews: number
}) {
  const [headings, setHeadings] = useState<HierarchicalHeading[]>([])
  const [isFixed, setIsFixed] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleScroll() {
      if (wrapperRef.current && indexRef.current) {
        const { top } = wrapperRef.current.getBoundingClientRect()
        setIsFixed(top <= 0)
      }
    }
  
    window.addEventListener("scroll", handleScroll)
  
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!noIndex && children) {
      const mainElement = document.querySelector("main")

      if (mainElement) {
        const headingTags = ["h2", "h3", "h4", "h5", "h6"]

        const headingElements = mainElement.querySelectorAll(
          headingTags.join(", ")
        ) as NodeListOf<HTMLElement>

        const extractedHeadings: HierarchicalHeading[] = []
        let currentHierarchy: HierarchicalHeading[] = []

        headingElements.forEach((element) => {
          const text = element.textContent || ""
          const anchor = text.toLowerCase().replace(/\s+/g, "-")
          const level = element.tagName.toLowerCase().replace("h", "")

          const newHeading: HierarchicalHeading = {
            level,
            text,
            anchor,
          }

          if (level === "2") {
            extractedHeadings.push(newHeading)
            currentHierarchy = [newHeading]
          } else {
            let parentHierarchy:
              | HierarchicalHeading
              | undefined = currentHierarchy[currentHierarchy.length - 1]

            while (
              parentHierarchy &&
              parseInt(parentHierarchy.level) >= parseInt(level)
            ) {
              currentHierarchy.pop()
              parentHierarchy =
                currentHierarchy[currentHierarchy.length - 1]
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
    <div 
      className={`space ${styles.wrapper}`} 
      ref={wrapperRef}
    >
      <main className={`
        ${styles.body} 
        ${noIndex ? styles.noIndex : styles.availableIndex}
      `}>
        {children}
        <PostFooter 
          lastUpdated={lastUpdated}
          pageViews={pageViews}
        />
      </main>
      <div className={styles.container}>
        {!noIndex && headings.length > 0 && (
          <aside
            className={`
              ${styles.index}
              ${isFixed ? styles.fixed : ""}
            `}
            ref={indexRef}
          >
            <h2>Table of contents</h2>
            {renderHeadings(headings)}
          </aside>
        )}
      </div>
    </div>
  )
}