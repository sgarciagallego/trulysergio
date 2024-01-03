'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./navbar.module.scss"
import ThemeToggle from "../../atoms/themeToggle/themeToggle"

export default function Navbar() {
  const [viewportWidth, setViewportWidth] = useState(0)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth)
    }

    updateViewportWidth()

    window.addEventListener("resize", updateViewportWidth)

    return () => {
      window.removeEventListener("resize", updateViewportWidth)
    }
  })

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible)
  }

  const handleLinkClick = () => {
    setMobileMenuVisible(false)
  }

  return (
    <header className={`space ${styles.wrapper}`}>
      {viewportWidth < 768 ? (
        <>
          <Link href="/">
            <span>Truly</span>
            {" "}Sergio
          </Link>
          <button
            className={`
              ${styles.hamburger}
              ${mobileMenuVisible ? styles.active : ""}
            `}
            onClick={toggleMobileMenu}
            aria-label="Hamburger menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {mobileMenuVisible && (
            <nav className={styles.mobileContainer}>
              <ul>
                <li><Link href="/about" onClick={handleLinkClick}>About</Link></li>
                <li><Link href="/blog" onClick={handleLinkClick}>Blog</Link></li>
                <li><Link href="/contact" onClick={handleLinkClick}>Contact</Link></li>
                <ThemeToggle />
              </ul>
            </nav>
          )}
        </>
      ) : (
        <>
          <div className={styles.container}>
            <Link href="/">
              <span>Truly</span>
              {" "}Sergio
            </Link>
            <nav >
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <ThemeToggle />
        </>
      )}
    </header>
  )
}