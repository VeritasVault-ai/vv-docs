"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, FileDown, Printer, ArrowLeft } from "lucide-react"
import { PDFCoverPage } from "@/components/pdf/pdf-cover-page"
import { WhitepaperContent } from "@/components/whitepaper-content"
import { TokenomicsPDFContent } from "@/components/tokenomics/tokenomics-pdf-content"
import "./print.css" // Import the print CSS

export default function PDFPreviewPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [documentType, setDocumentType] = useState<string>("whitepaper")
  const [documentTitle, setDocumentTitle] = useState("VeritasVault.ai Whitepaper")
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [includeAll, setIncludeAll] = useState(false)
  const [isTokenomicsOnly, setIsTokenomicsOnly] = useState(false)
  const [isSingleSection, setIsSingleSection] = useState(false)

  // Use a ref to track if we've already processed the params
  const paramsProcessed = useRef(false)

  // Handle print action
  const handlePrint = () => {
    console.log("Print button clicked")
    window.print()
  }

  // Handle back action
  const handleBack = () => {
    window.location.href = "/"
  }

  // Handle download action
  const handleDownload = () => {
    console.log("Download button clicked")
    window.print()
  }

  useEffect(() => {
    // Only process params once to prevent infinite loops
    if (paramsProcessed.current) return
    paramsProcessed.current = true

    console.log("PDF Preview page mounted")

    try {
      // Get document type from URL
      const type = searchParams.get("type") || "whitepaper"
      setDocumentType(type)
      console.log("Document type set to:", type)

      // Get selected sections
      const sectionsParam = searchParams.get("sections")
      const sections = sectionsParam ? sectionsParam.split(",") : []

      // For executive summary, ensure we have the right section if no sections are specified
      if (type === "executive-summary" && sections.length === 0) {
        sections.push("executive-summary")
      }

      setSelectedSections(sections)

      // Check if we should include all sections
      const includeAllParam = searchParams.get("includeAll")
      setIncludeAll(includeAllParam === "true")

      // Check if this is tokenomics only
      const isTokenomicsOnlyParam = searchParams.get("isTokenomicsOnly")
      setIsTokenomicsOnly(isTokenomicsOnlyParam === "true")

      // Check if this is a single section
      const isSingleSectionParam = searchParams.get("isSingleSection")
      setIsSingleSection(isSingleSectionParam === "true")

      // Set document title based on type
      if (type === "tokenomics") {
        setDocumentTitle("VeritasVault.ai Tokenomics")
      } else if (type === "executive-summary") {
        setDocumentTitle("VeritasVault.ai Executive Summary")
      } else if (type === "litepaper") {
        setDocumentTitle("VeritasVault.ai Litepaper")
      } else {
        setDocumentTitle("VeritasVault.ai Whitepaper")
      }

      // Set loading to false immediately
      setIsLoading(false)
    } catch (err) {
      console.error("Error in PDF preview:", err)
      setError("An error occurred while preparing the document")
      setIsLoading(false)
    }
  }, []) // Empty dependency array to prevent infinite loops

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 text-red-500 mb-4">
          <AlertCircle className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Document Generation Failed</h2>
        <p className="text-center mb-6 max-w-md">{error}</p>
        <Button onClick={handleBack} variant="outline">
          Go Back
        </Button>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Preparing document...</h2>
        <p className="text-muted-foreground mb-6">This may take a few moments</p>
        <Button variant="outline" onClick={handleBack}>
          Cancel
        </Button>
      </div>
    )
  }

  // Content ready
  return (
    <div className="pdf-container">
      {/* Always show the header with print and download buttons */}
      <div className="print:hidden sticky top-0 z-10 bg-background border-b p-4 flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <FileDown className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="default" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* Cover Page - with explicit page break after */}
        <div className="pdf-cover-page">
          <PDFCoverPage title={documentTitle} documentType={documentType} />
        </div>

        {/* Content based on document type - with explicit page break before */}
        <div className="pdf-content-wrapper">
          {documentType === "tokenomics" || isTokenomicsOnly ? (
            <TokenomicsPDFContent />
          ) : (
            <WhitepaperContent
              selectedSections={selectedSections}
              includeAll={includeAll}
              isPrintMode={true}
              isTokenomicsOnly={isTokenomicsOnly}
              isSingleSection={isSingleSection}
            />
          )}
        </div>
      </div>
    </div>
  )
}
