"use client"

import type React from "react"
import { useState, useRef } from "react"

interface UploadPageProps {
  onFileUpload: (file: File) => void
}

const FileTextIcon = () => (
  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

export function UploadPage({ onFileUpload }: UploadPageProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const resumeFile = files.find(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().includes(".pdf") ||
        file.name.toLowerCase().includes(".doc") ||
        file.name.toLowerCase().includes(".docx"),
    )

    if (resumeFile) {
      setUploadedFile(resumeFile)
      onFileUpload(resumeFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      onFileUpload(file)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#1F1F1F" }}>
      <div className="w-full max-w-2xl text-center animate-apple-fade-in">
        <h1 className="text-4xl md:text-6xl font-light text-white mb-16 animate-apple-slide-up animate-apple-float">
          Drop your resume below
        </h1>

        <div
          className={`
            border-2 border-dashed border-white/30 rounded-3xl p-12 cursor-pointer
            apple-card-hover apple-interactive min-h-[200px] flex items-center justify-center
            animate-apple-slide-up-delay
            ${isDragOver ? "border-white border-solid animate-apple-pulse animate-apple-glow" : ""}
            ${uploadedFile ? "border-white border-solid animate-apple-glow" : ""}
          `}
          style={{ backgroundColor: "#40912F" }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!uploadedFile ? (
            <div className="text-white text-center">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-2xl font-medium mb-2">
                {isDragOver ? "Release to upload" : "Drop your resume here"}
              </div>
              <div className="text-white/80">or click to browse</div>
              <div className="text-sm text-white/60 mt-4">Supports PDF, DOC, and DOCX files (max 10MB)</div>
            </div>
          ) : (
            <div className="text-white text-center">
              <FileTextIcon />
              <div className="text-xl font-semibold mb-2 break-words">{uploadedFile.name}</div>
              <div className="text-white/80">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
