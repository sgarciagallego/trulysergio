import Image from "next/image"
import RootLayout from "./[...not_found]/layout"
import Hyperlink from "./components/atoms/hyperlink/hyperlink"

export default function NotFound() {
  return (
    <RootLayout>
      <div 
        className="space"
        style={{
          height: "100svh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div>
          <h1>Not Found</h1>
          <Hyperlink href="/">Back home</Hyperlink>
        </div>
        <div>
          <Image 
            src={"/avatar-wave.png"}
            alt="Avatar of Sergio waving"
            width={350}
            height={350}
          />
        </div>
      </div>
    </RootLayout>
  )
}