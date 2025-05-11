"use client"

import { Layout } from "@/components/layout"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import { TableOfContents } from "@/components/table-of-contents"
import { GamingTechnologies } from "@/components/gaming/gaming-technologies"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function GamingTechnologiesPage() {
  const [activeSection, setActiveSection] = useState("gaming-technologies")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Gaming Technologies", value: "gaming-technologies" }])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([
      { label: "Gaming Technologies", value: "gaming-technologies" },
      { label: sectionLabel, value: sectionId },
    ])

    // Scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Check for hash in URL on initial load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      handleNavigate(hash)
    }
  }, [])

  const getSectionLabel = (sectionId: string): string => {
    // Map section IDs to human-readable labels
    const sectionLabels: Record<string, string> = {
      "gaming-technologies-detail": "Gaming Technologies Detail",
    }

    return sectionLabels[sectionId] || sectionId
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Security", href: "/security" }}
      nextPage={{ title: "Governance Framework", href: "/governance-framework" }}
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
        <h1 className="text-4xl font-bold mb-2 text-primary">Gaming Technologies</h1>
        <p className="text-xl text-muted-foreground">Blockchain Gaming Integration and Asset Management</p>
      </div>
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        <GamingTechnologies />
      </div>
    </Layout>
  )
}
