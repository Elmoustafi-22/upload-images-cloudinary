import "./globals.css"
import React from "react"
import UploadPage from "@/components/UploadPage"

export default async function Home() {
  return (
    <div className="flex flex-col mx-auto justify-center
      items-center">
      <UploadPage />
    </div>
  )
}