"use client"

import { Layout } from "@/components/layout"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import { TableOfContents } from "@/components/table-of-contents"
import { ArchitectureSection } from "@/components/architecture/architecture-section"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ArchitecturePage() {
  const [activeSection, setActiveSection] = useState("architecture")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Architecture", value: "architecture" }])
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([
      { label: "Architecture", value: "architecture" },
      { label: sectionLabel, value: sectionId },
    ])

    // Scroll to section
    if (isClient) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const getSectionLabel = (sectionId: string): string => {
    // Map section IDs to human-readable labels
    const sectionLabels: Record<string, string> = {
      "architecture-overview": "Architecture Overview",
      "layered-architecture": "Layered Architecture",
      "architecture-diagrams": "Architecture Diagrams",
      "architecture-comparison": "Architecture Comparison",
    }

    return sectionLabels[sectionId] || sectionId
  }

  // Check for hash in URL on initial load and when hash changes
  useEffect(() => {
    if (!isClient) return

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveSection(hash)

        // Update breadcrumbs based on section
        const sectionLabel = getSectionLabel(hash)
        setBreadcrumbs([
          { label: "Architecture", value: "architecture" },
          { label: sectionLabel, value: hash },
        ])

        // Scroll to section
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        setActiveSection("architecture")
        setBreadcrumbs([{ label: "Architecture", value: "architecture" }])
      }
    }

    // Check hash on initial load
    handleHashChange()

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [isClient])

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Home", href: "/" }}
      nextPage={{ title: "Finance Models", href: "/finance-models" }}
    >
      <div className="flex justify-between items-center">
        <BreadcrumbNavigation items={breadcrumbs} onNavigate={handleNavigate} />
        <div className="md:hidden flex items-center space-x-2">
          <PDFDownloadButton type="pdf" iconSize={3} />
          <PDFDownloadButton type="whitepaper" iconSize={3} />
          <Link href="/pdf-preview" className="download-button text-sm">
            <span>Preview</span>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-2 text-primary">System Architecture</h1>
        <p className="text-xl text-muted-foreground">Multi-Chain Architecture for Secure Portfolio Management</p>
      </div>
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        <ArchitectureSection />
      </div>
    </Layout>
  )
}
