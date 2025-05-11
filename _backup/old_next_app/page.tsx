"use client"

import { useState, useEffect, useRef } from "react"
import { Layout } from "@/components/layout"
import { TableOfContents } from "@/components/table-of-contents"
import { ProjectOverview } from "@/components/project-overview"
import { SectionStructureGuide } from "@/components/section-structure-guide"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Coins, BarChart, Layers, BookOpen, Code, Network, Lock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DirectDownloadButton } from "@/components/pdf/direct-download-button"
import { PageHeader } from "@/components/page-header"

export default function Home() {
  const [activeSection, setActiveSection] = useState("project-overview")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Project Overview", value: "project-overview" }])
  const [isClient, setIsClient] = useState(false)
  const [showPDFSelector, setShowPDFSelector] = useState(false)

  // Refs for each section
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([{ label: sectionLabel, value: sectionId }])

    // Scroll to section
    if (isClient) {
      const element = document.getElementById(sectionId)
      if (element) {
        // Scroll to the top of the section with offset for header
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  const getSectionLabel = (sectionId: string): string => {
    // Map section IDs to human-readable labels
    const sectionLabels: Record<string, string> = {
      whitepaper: "Whitepaper",
      "project-overview": "Project Overview",
      "executive-summary": "Executive Summary",
      "protocol-overview": "Protocol Overview",
      "governance-framework": "Governance Framework",
      "technical-infrastructure": "Technical Infrastructure",
      "technical-components": "Technical Components",
      "black-litterman": "Black-Litterman Model",
      "integration-benefits": "Integration Benefits",
      "integration-comparison": "Integration Comparison",
      "data-providers": "Data Providers",
      "data-providers-comparison": "Data Providers Comparison",
      "data-providers-diagram": "Data Providers Diagram",
      "coingecko-integration": "CoinGecko",
      "defillama-integration": "DeFiLlama",
      "pinax-integration": "Pinax",
      "goldsky-integration": "Goldsky",
      "wallet-integrations": "Wallet Integrations",
      "wallet-integrations-comparison": "Wallet Integrations Comparison",
      "wallet-integrations-diagram": "Wallet Integrations Diagram",
      "ethermail-integration": "EtherMail",
      "plurality-integration": "Plurality",
      "blockchain-integrations": "Blockchain Integrations",
      "blockchain-integrations-comparison": "Blockchain Integrations Comparison",
      "blockchain-integrations-diagram": "Blockchain Integrations Diagram",
      "eigenlayer-integration": "EigenLayer",
      "etherlink-integration": "EtherLink",
      "risk-management": "Risk Management",
      "risk-management-comparison": "Risk Management Comparison",
      "risk-management-diagram": "Risk Management Diagram",
      "risk-bot-integration": "Risk Bot",
      "security-model": "Security Model",
      "audit-framework": "Audit Framework",
      "communication-system": "Communication System",
      "implementation-roadmap": "Implementation Roadmap",
    }

    return sectionLabels[sectionId] || sectionId
  }

  // Update active section based on scroll position
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const sectionBottom = sectionTop + section.clientHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const sectionId = section.getAttribute("id") || ""
          if (sectionId && sectionId !== activeSection) {
            setActiveSection(sectionId)
            const sectionLabel = getSectionLabel(sectionId)
            setBreadcrumbs([{ label: sectionLabel, value: sectionId }])

            // Update URL hash without scrolling
            if (history.pushState) {
              history.pushState(null, "", `#${sectionId}`)
            }
          }
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection, isClient])

  // Check for hash in URL on initial load
  useEffect(() => {
    if (!isClient) return

    const hash = window.location.hash.replace("#", "")
    if (hash) {
      const sectionId = hash
      setActiveSection(sectionId)
      const sectionLabel = getSectionLabel(sectionId)
      setBreadcrumbs([{ label: sectionLabel, value: sectionId }])

      // Scroll to section with delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          // Scroll to the top of the section with offset for header
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    }
  }, [isClient])

  // Store section refs when they mount
  const setSectionRef = (id: string, element: HTMLElement | null) => {
    sectionRefs.current[id] = element
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      nextPage={{ title: "Architecture", href: "/architecture" }}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background rounded-lg p-8 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-primary">VeritasVault.ai Whitepaper</h1>
          <p className="text-2xl text-muted-foreground mb-6">
            Multi-Chain Architecture for Secure Portfolio Management
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <DirectDownloadButton type="whitepaper" size="lg" />
            <Link href="/tokenomics">
              <Button size="lg" variant="outline">
                <Coins className="mr-2 h-4 w-4" /> Tokenomics
              </Button>
            </Link>
            <Link href="https://github.com/example/veritasvault" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Page Header with Breadcrumbs */}
      <PageHeader
        title="Documentation"
        description="Comprehensive documentation for the VeritasVault.ai platform"
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
      />

      {/* Documentation Structure Guide */}
      <SectionStructureGuide />

      {/* Table of Contents */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />
      </div>

      {/* Main Content */}
      <div className="space-y-12 max-w-4xl mx-auto">
        {/* Project Overview */}
        <section id="project-overview" className="scroll-mt-20" ref={(el) => setSectionRef("project-overview", el)}>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Project Overview</h2>
          <ProjectOverview />
        </section>

        {/* Executive Summary */}
        <section id="executive-summary" className="scroll-mt-20" ref={(el) => setSectionRef("executive-summary", el)}>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Executive Summary</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              VeritasVault.ai is a revolutionary multi-chain portfolio management platform designed to provide
              institutional-grade security, advanced financial modeling, and seamless integration with leading
              blockchain protocols. Our platform leverages cutting-edge technologies to deliver a comprehensive solution
              for digital asset management.
            </p>
            <p>
              This whitepaper outlines the technical architecture, financial models, security protocols, and tokenomics
              that form the foundation of the VeritasVault.ai ecosystem. We present a detailed analysis of our approach
              to solving the challenges of secure, efficient portfolio management in the decentralized finance space.
            </p>
          </div>
        </section>

        {/* Protocol Overview */}
        <section id="protocol-overview" className="scroll-mt-20" ref={(el) => setSectionRef("protocol-overview", el)}>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Protocol Overview</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The VeritasVault.ai protocol is built on a layered architecture that separates concerns between security,
              data processing, financial modeling, and user interaction. This design ensures robustness, scalability,
              and adaptability to evolving blockchain ecosystems.
            </p>
            <p>
              Our protocol implements advanced cryptographic techniques, multi-signature authorization, and real-time
              risk assessment to safeguard user assets while providing sophisticated portfolio management capabilities.
            </p>
          </div>
        </section>

        {/* Root Level Topics Overview */}
        <section id="root-level-topics" className="scroll-mt-20" ref={(el) => setSectionRef("root-level-topics", el)}>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Key Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Architecture */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-primary" />
                  Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Our layered architecture provides a robust foundation for secure, scalable portfolio management across
                  multiple blockchains.
                </p>
                <Link href="/architecture">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Technical Infrastructure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Technical Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Built on cutting-edge technologies, our infrastructure ensures high performance, reliability, and
                  security for all operations.
                </p>
                <Link href="/technical-infrastructure">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Finance Models */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-primary" />
                  Finance Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Advanced financial models including Black-Litterman, Monte Carlo simulations, and neural networks for
                  optimal portfolio management.
                </p>
                <Link href="/finance-models">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 mr-2 text-primary" />
                  Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Seamless connections with leading data providers, wallet solutions, and blockchain protocols to
                  enhance platform capabilities.
                </p>
                <Link href="/integrations">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive security framework with multi-layered protections, regular audits, and real-time
                  monitoring to safeguard assets.
                </p>
                <Link href="/security">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tokenomics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-primary" />
                  Tokenomics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Detailed token economics including distribution, utility, governance mechanisms, and vesting
                  schedules.
                </p>
                <Link href="/tokenomics">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Governance Framework */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Governance Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Decentralized governance structure that enables community participation in platform development and
                  decision-making.
                </p>
                <Link href="/governance-framework">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Implementation Roadmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Implementation Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive development timeline with key milestones, feature releases, and strategic partnerships.
                </p>
                <Link href="/implementation-roadmap">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  )
}
