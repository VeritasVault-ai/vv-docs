"use client"

import { Layout } from "@/components/layout"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import { TableOfContents } from "@/components/table-of-contents"
import { TokenomicsOverview } from "@/components/tokenomics/tokenomics-overview"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function TokenomicsPage() {
  const [activeSection, setActiveSection] = useState("tokenomics")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Tokenomics", value: "tokenomics" }])
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
      { label: "Tokenomics", value: "tokenomics" },
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
          { label: "Tokenomics", value: "tokenomics" },
          { label: sectionLabel, value: hash },
        ])

        // Scroll to section
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        setActiveSection("tokenomics")
        setBreadcrumbs([{ label: "Tokenomics", value: "tokenomics" }])
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

  const getSectionLabel = (sectionId: string): string => {
    // Map section IDs to human-readable labels
    const sectionLabels: Record<string, string> = {
      "tokenomics-overview": "Tokenomics Overview",
      "token-distribution": "Token Distribution",
      "token-utility": "Token Utility",
      "token-utility-diagram": "Token Utility Diagram",
      "token-economics": "Token Economics",
      "token-economics-flow": "Token Economics Flow",
      "token-governance": "Token Governance",
      "token-vesting": "Token Vesting Schedule",
      "token-staking": "Token Staking Calculator",
      "token-burn": "Token Burn Mechanism",
      "token-comparison": "Token Comparison",
    }

    return sectionLabels[sectionId] || sectionId
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Technical Infrastructure", href: "/technical-infrastructure" }}
      nextPage={{ title: "Security", href: "/security" }}
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
        <h1 className="text-4xl font-bold mb-2 text-primary">Tokenomics</h1>
        <p className="text-xl text-muted-foreground">VVAI Token Economics and Governance</p>
      </div>
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        <TokenomicsOverview />
      </div>
    </Layout>
  )
}
