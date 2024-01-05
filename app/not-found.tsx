'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Hyperlink from "./components/atoms/hyperlink/hyperlink"

export default function NotFound() {
  const [isWideScreen, setIsWideScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 992)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      className="space"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between"
      }}
    >
      <div>
        <h1>Not Found</h1>
        <p>Sorry, it seems we took a wrong turn...</p>
        <Hyperlink href="/">Back home</Hyperlink>
      </div>
      {isWideScreen && (
        <div>
          <Image 
            src={"/avatar-wave.png"}
            alt="Avatar of Sergio waving"
            width={350}
            height={350}
          />
        </div>
      )}
    </div>
  )
}