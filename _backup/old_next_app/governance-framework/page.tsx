"use client"

import { Layout } from "@/components/layout"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import { TableOfContents } from "@/components/table-of-contents"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export default function GovernanceFrameworkPage() {
  const [activeSection, setActiveSection] = useState("governance-framework")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Governance Framework", value: "governance-framework" }])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([
      { label: "Governance Framework", value: "governance-framework" },
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
      "security-model": "Security Model",
      "audit-framework": "Audit Framework",
      "communication-system": "Communication System",
    }

    return sectionLabels[sectionId] || sectionId
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Gaming Technologies", href: "/gaming-technologies" }}
      nextPage={{ title: "Implementation Roadmap", href: "/implementation-roadmap" }}
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
        <h1 className="text-4xl font-bold mb-2 text-primary">Governance Framework</h1>
        <p className="text-xl text-muted-foreground">Decentralized Governance for Platform Development</p>
      </div>
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        <section
          id="governance-framework"
          className={activeSection === "governance-framework" ? "scroll-mt-20" : "scroll-mt-20"}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 group flex items-center">
                Governance Framework
                <SectionAnchor id="governance-framework" />
              </h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai implements a decentralized governance framework that enables stakeholders to participate
                in decision-making processes. This framework ensures transparency, accountability, and community
                involvement in the platform's development and operation.
              </p>
              <h3 className="text-xl font-semibold mb-2">Governance Structure</h3>
              <p className="mb-4 text-base font-normal">The governance framework consists of several key components:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Governance Token:</strong> A utility token that grants voting rights and represents ownership
                  in the platform.
                </li>
                <li className="text-base font-normal">
                  <strong>Proposal System:</strong> A mechanism for submitting, discussing, and voting on proposals for
                  platform changes.
                </li>
                <li className="text-base font-normal">
                  <strong>Voting Mechanism:</strong> A secure and transparent system for casting and counting votes on
                  governance proposals.
                </li>
                <li className="text-base font-normal">
                  <strong>Execution Framework:</strong> A process for implementing approved proposals in a timely and
                  secure manner.
                </li>
              </ul>
              <p className="text-base font-normal">
                This governance framework ensures that VeritasVault.ai remains responsive to the needs of its users and
                adapts to changing market conditions while maintaining its core principles of security, transparency,
                and efficiency.
              </p>
            </CardContent>
          </Card>
        </section>

        {activeSection === "communication-system" && (
          <section id="communication-system" className="scroll-mt-20">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 group flex items-center">
                  Communication System
                  <SectionAnchor id="communication-system" />
                </h2>
                <p>Communication system content goes here.</p>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </Layout>
  )
}
