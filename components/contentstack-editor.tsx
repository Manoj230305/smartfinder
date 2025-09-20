"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { FileSearch, RefreshCcw, CheckCircle2, Shield, BookOpen, Mail, Menu, X } from "lucide-react"

export function ContentstackEditor() {
  const [content, setContent] = useState(`Example content: Alpha Company launched a revolutionary product last year. Visit "https://alpha.com" Alpha Company for more information. Contact us at "mailto:contact@alphacompany.com" contact@alphacompany.com.`)
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [replaceAll, setReplaceAll] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false) // ✅ Mobile menu state

  const handleFindAndPreview = async () => {
    setIsLoading(true)
    try {
      const payload = { content, find: findText, replace: replaceText, replaceAll }
      const response = await axios.post("http://127.0.0.1:8000/api/smart-context-replace/", payload)
      setPreviewContent(response.data.rephrased || response.data.result || "⚠️ Unexpected response")
    } catch (error) {
      console.error("API Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplyChanges = () => {
    if (previewContent !== null) {
      setContent(previewContent)
      setPreviewContent(null)
    }
  }

  const handleManualReplace = () => {
    if (!findText) return
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), replaceAll ? "gi" : "")
    const replaced = content.replace(regex, replaceText)
    setPreviewContent(replaced)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* 🌐 NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg rounded-b-2xl border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 flex items-center gap-3 tracking-tight drop-shadow">
            <Shield className="w-7 h-7 text-blue-600 animate-pulse" />
            Contentstack Tool
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-gray-600 font-semibold">
            <a href="#features" className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md">
              <BookOpen className="w-5 h-5" /> Features
            </a>
            <a href="#editor" className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md">
              <FileSearch className="w-5 h-5" /> Editor
            </a>
            <a href="#contact" className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md">
              <Mail className="w-5 h-5" /> Contact
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-blue-700 hover:bg-blue-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-gray-700 font-medium bg-white/90 border-t border-blue-100 shadow-md">
            <a href="#features" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={() => setMenuOpen(false)}>
              <BookOpen className="w-5 h-5" /> Features
            </a>
            <a href="#editor" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={() => setMenuOpen(false)}>
              <FileSearch className="w-5 h-5" /> Editor
            </a>
            <a href="#contact" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={() => setMenuOpen(false)}>
              <Mail className="w-5 h-5" /> Contact
            </a>
          </div>
        )}
      </nav>

      {/* 🎯 HERO / BANNER */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-28 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-3xl text-white">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Smart Find & Replace for Contentstack
          </h2>
          <p className="text-lg opacity-90">
            Edit, preview, and apply content changes seamlessly with our smart replace engine.
          </p>
          <div className="flex justify-center w-full">
            <a href="#editor">
              <Button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg text-lg flex items-center gap-4">
                <FileSearch className="w-5 h-5 item-center" /> Try It Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 📝 MAIN SECTION */}
            <main id="editor" className="flex-grow flex items-center justify-center py-16 px-4">
        <Card className="max-w-4xl w-full p-8 shadow-2xl rounded-3xl border border-blue-200 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-extrabold text-blue-700 tracking-tight">
              Contentstack Find & Replace
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-44 rounded-xl border-2 border-blue-200 p-4 text-base bg-white shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="Edit your content here..."
            />

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Input
                type="text"
                placeholder="Find"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="flex-1 border-blue-200 rounded-lg shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
              <Input
                type="text"
                placeholder="Replace with"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="flex-1 border-blue-200 rounded-lg shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
              <label className="flex items-center gap-2 text-blue-700 font-medium">
                <input
                  type="checkbox"
                  checked={replaceAll}
                  onChange={(e) => setReplaceAll(e.target.checked)}
                  className="rounded accent-blue-500 w-5 h-5 border-2 border-blue-300"
                />
                Replace All
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <Button
                onClick={handleManualReplace}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-200 flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" /> Manual Replace Preview
              </Button>

              <Button
                onClick={handleFindAndPreview}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-2 rounded-xl shadow hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2"
              >
                <FileSearch className="w-4 h-4" /> Smart Replace Preview
              </Button>

              <Button
                onClick={handleApplyChanges}
                disabled={previewContent === null}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-6 py-2 rounded-xl shadow hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Apply Preview
              </Button>
            </div>

            {isLoading && <p className="text-blue-500 font-medium animate-pulse">Processing...</p>}

            {previewContent && (
              <>
                <Separator className="my-6" />
                <h3 className="font-bold text-xl text-blue-700 mb-2">Preview Content:</h3>
                <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl whitespace-pre-wrap border-2 border-blue-200 shadow-inner text-gray-800">
                  {previewContent}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {/* 📌 FOOTER */}
      <footer id="contact" className="bg-gray-100 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Contentstack Tool. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
