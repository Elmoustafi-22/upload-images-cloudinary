import "./globals.css"
import UploadForm from "@/components/UploadForm"
import React from "react"

export default function Home() {
  return (
    <div className="flex flex-col mx-auto justify-center
      items-center h-screen">
      <UploadForm />
    </div>
  )
}