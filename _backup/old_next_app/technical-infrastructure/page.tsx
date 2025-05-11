"use client"

import { Layout } from "@/components/layout"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import { TableOfContents } from "@/components/table-of-contents"
import { TechnicalComponents } from "@/components/technical/technical-components"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function TechnicalInfrastructurePage() {
  const [activeSection, setActiveSection] = useState("technical-infrastructure")
  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: "Technical Infrastructure", value: "technical-infrastructure" },
  ])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([
      { label: "Technical Infrastructure", value: "technical-infrastructure" },
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
      "technical-components": "Technical Components",
    }

    return sectionLabels[sectionId] || sectionId
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Finance Models", href: "/finance-models" }}
      nextPage={{ title: "Tokenomics", href: "/tokenomics" }}
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
        <h1 className="text-4xl font-bold mb-2 text-primary">Technical Infrastructure</h1>
        <p className="text-xl text-muted-foreground">Robust Technical Foundation for Multi-Chain Operations</p>
      </div>
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        {activeSection === "technical-infrastructure" && (
          <div className="space-y-8">
            <p className="text-lg">
              VeritasVault.ai's technical infrastructure is designed to provide a secure, scalable, and efficient
              foundation for multi-chain portfolio management. The infrastructure leverages cutting-edge technologies
              and architectural patterns to ensure reliability, performance, and adaptability.
            </p>
            <TechnicalComponents />
          </div>
        )}
        {activeSection === "technical-components" && <TechnicalComponents />}
      </div>
    </Layout>
  )
}
