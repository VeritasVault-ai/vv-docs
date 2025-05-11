"use client"

import { Layout } from "@/components/layout"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import { TableOfContents } from "@/components/table-of-contents"
import { SecurityArchitectureOverview } from "@/components/security/security-architecture-overview"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function SecurityPage() {
  const [activeSection, setActiveSection] = useState("security")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Security", value: "security" }])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([
      { label: "Security", value: "security" },
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
      "security-architecture": "Security Architecture",
      "security-model": "Security Model",
      "audit-framework": "Audit Framework",
    }

    return sectionLabels[sectionId] || sectionId
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Tokenomics", href: "/tokenomics" }}
      nextPage={{ title: "Gaming Technologies", href: "/gaming-technologies" }}
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
        <h1 className="text-4xl font-bold mb-2 text-primary">Security</h1>
        <p className="text-xl text-muted-foreground">Comprehensive Security Framework for Multi-Chain Operations</p>
      </div>
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        {activeSection === "security" && (
          <div className="space-y-8">
            <p className="text-lg">
              Security is a foundational principle of VeritasVault.ai's multi-chain architecture. Our comprehensive
              security framework encompasses multiple layers of protection, from application-level security to
              blockchain-specific safeguards, ensuring the integrity and confidentiality of user assets and data.
            </p>
            <SecurityArchitectureOverview />
          </div>
        )}
        {activeSection === "security-architecture" && <SecurityArchitectureOverview />}
        {activeSection === "security-model" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Security Model</h2>
            <p>Security model content goes here.</p>
          </div>
        )}
        {activeSection === "audit-framework" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Audit Framework</h2>
            <p>Audit framework content goes here.</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
