"use client"

import { Layout } from "@/components/layout"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import { TableOfContents } from "@/components/table-of-contents"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export default function ImplementationRoadmapPage() {
  const [activeSection, setActiveSection] = useState("implementation-roadmap")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Implementation Roadmap", value: "implementation-roadmap" }])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([
      { label: "Implementation Roadmap", value: "implementation-roadmap" },
      { label: sectionLabel, value: sectionId },
    ])

    // Scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getSectionLabel = (sectionId: string): string => {
    // Map section IDs to human-readable labels
    const sectionLabels: Record<string, string> = {
      "phase-1": "Phase 1: Foundation",
      "phase-2": "Phase 2: Expansion",
      "phase-3": "Phase 3: Maturation",
    }

    return sectionLabels[sectionId] || sectionId
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Governance Framework", href: "/governance-framework" }}
      nextPage={{ title: "Home", href: "/" }}
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
        <h1 className="text-4xl font-bold mb-2 text-primary">Implementation Roadmap</h1>
        <p className="text-xl text-muted-foreground">Development Timeline and Milestones</p>
      </div>
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        <section
          id="implementation-roadmap"
          className={activeSection === "implementation-roadmap" ? "scroll-mt-20" : "scroll-mt-20"}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 group flex items-center">
                Implementation Roadmap
                <SectionAnchor id="implementation-roadmap" />
              </h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai will be developed and deployed in phases to ensure stability, security, and
                functionality. The implementation roadmap outlines the key milestones and timelines for the platform's
                development.
              </p>
              <h3 className="text-xl font-semibold mb-2" id="phase-1">
                Phase 1: Foundation (Q3 2025)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">Development of core protocol architecture</li>
                <li className="text-base font-normal">Implementation of basic data processing capabilities</li>
                <li className="text-base font-normal">Integration with primary blockchain networks</li>
                <li className="text-base font-normal">Development of security infrastructure</li>
              </ul>
              <h3 className="text-xl font-semibold mb-2" id="phase-2">
                Phase 2: Expansion (Q1 2026)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">Integration with additional blockchain networks</li>
                <li className="text-base font-normal">Implementation of advanced portfolio optimization algorithms</li>
                <li className="text-base font-normal">Development of user interface and experience</li>
                <li className="text-base font-normal">Deployment of governance framework</li>
              </ul>
              <h3 className="text-xl font-semibold mb-2" id="phase-3">
                Phase 3: Maturation (Q3 2026)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">Implementation of advanced risk management features</li>
                <li className="text-base font-normal">Integration with additional data providers</li>
                <li className="text-base font-normal">Optimization of cross-chain operations</li>
                <li className="text-base font-normal">Expansion of governance capabilities</li>
              </ul>
              <p className="text-base font-normal">
                This phased approach allows for thorough testing and optimization at each stage, ensuring that
                VeritasVault.ai delivers a secure, efficient, and user-friendly platform for multi-chain portfolio
                management.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  )
}
