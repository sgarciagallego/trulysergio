'use client'

import Image from "next/image"
import styles from "./intro.module.scss"
import Subtitle from "../../atoms/subtitle/subtitle"
import { useEffect, useState } from "react"

export default function Intro({
  element,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  subtitle,
  children,
}: {
  element?: keyof JSX.IntrinsicElements
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  subtitle?: string
  children: React.ReactNode
}) {
  const Element = element || "div"
  const [isWideScreen, setIsWideScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 992)
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className={subtitle && subtitle.trim() !== "" ? styles.wrapperMax : styles.wrapperMin}>
      <Element className={`
        space
        ${isWideScreen && image ? styles.flex : ""}
      `}>
        {image && isWideScreen ? (
          <>
            <div className={styles.copy}>
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
              <h1>{children}</h1>
            </div>
            <div className={styles.image}>
              <Image 
                src={image} 
                alt={imageAlt} 
                width={imageWidth} 
                height={imageHeight} 
                priority 
              />
            </div>
          </>
        ) : (
          <>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            <h1>{children}</h1>
          </>
        )}
      </Element>
    </div>
  )
}
