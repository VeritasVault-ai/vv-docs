import { Layout } from "@/components/layout"
import { RiskManagement } from "@/components/integrations/risk-management"
import { RiskManagementComparison } from "@/components/integrations/comparison-tables/risk-management-comparison"
import { RiskManagementDiagram } from "@/components/integrations/diagrams/risk-management-diagram"
import { RiskBotIntegration } from "@/components/integrations/risk-management/risk-bot"
import Link from "next/link"

export default function RiskManagementPage() {
  return (
    <Layout
      showSidebar={true}
      previousPage={{ title: "Blockchain Integrations", href: "/integrations/blockchain-integrations" }}
      nextPage={{ title: "Whitepaper", href: "/" }}
    >
      <div className="mb-6">
        <Link href="/integrations" className="text-primary hover:underline flex items-center gap-2">
          ← Back to Integrations
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-primary">Risk Management</h1>
        <p className="text-xl text-muted-foreground">Advanced risk assessment for multi-chain portfolio management</p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <RiskManagement />
        <RiskManagementComparison />
        <RiskManagementDiagram />
        <RiskBotIntegration />
      </div>
    </Layout>
  )
}
