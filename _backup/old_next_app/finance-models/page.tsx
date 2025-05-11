"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { TableOfContents } from "@/components/table-of-contents"
import { FinanceModelsOverview } from "@/components/finance/finance-models-overview"
import { MonteCarloSimulation } from "@/components/finance/monte-carlo-simulation"
import { FactorModels } from "@/components/finance/factor-models"
import { DeFiYieldOptimization } from "@/components/finance/defi-yield-optimization"
import { NeuralNetworks } from "@/components/finance/neural-networks"
import { BlackLittermanModel } from "@/components/finance/black-litterman-model"
import { PageHeader } from "@/components/page-header"
import { SectionProgressIndicator } from "@/components/section-progress-indicator"

export default function FinanceModelsPage() {
  const [activeSection, setActiveSection] = useState("finance-models")
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Finance Models", value: "finance-models" }])

  const sections = [
    { id: "finance-models", label: "Overview" },
    { id: "monte-carlo-simulation", label: "Monte Carlo" },
    { id: "factor-models", label: "Factor Models" },
    { id: "defi-yield-optimization", label: "DeFi Yield" },
    { id: "neural-networks", label: "Neural Networks" },
    { id: "black-litterman", label: "Black-Litterman" },
  ]

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)

    // Update breadcrumbs based on section
    const sectionLabel = getSectionLabel(sectionId)
    setBreadcrumbs([
      { label: "Finance Models", value: "finance-models" },
      { label: sectionLabel, value: sectionId },
    ])

    // Scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
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
      "finance-models": "Overview",
      "finance-models-overview": "Finance Models Overview",
      "monte-carlo-simulation": "Monte Carlo Simulation",
      "factor-models": "Factor Models",
      "defi-yield-optimization": "DeFi Yield Optimization",
      "neural-networks": "Neural Networks",
      "black-litterman": "Black-Litterman Model",
    }

    return sectionLabels[sectionId] || sectionId
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      prevPage={{ title: "Architecture", href: "/architecture" }}
      nextPage={{ title: "Technical Infrastructure", href: "/technical-infrastructure" }}
    >
      <PageHeader
        title="Finance Models"
        description="Advanced Financial Models for Portfolio Optimization"
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
      />

      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="space-y-8 max-w-4xl mx-auto">
        {activeSection === "finance-models" && <FinanceModelsOverview />}
        {activeSection === "finance-models-overview" && <FinanceModelsOverview />}
        {activeSection === "monte-carlo-simulation" && <MonteCarloSimulation />}
        {activeSection === "factor-models" && <FactorModels />}
        {activeSection === "defi-yield-optimization" && <DeFiYieldOptimization />}
        {activeSection === "neural-networks" && <NeuralNetworks />}
        {activeSection === "black-litterman" && <BlackLittermanModel />}
      </div>

      <SectionProgressIndicator sections={sections} />
    </Layout>
  )
}
