import { Layout } from "@/components/layout"
import { BlockchainIntegrations } from "@/components/integrations/blockchain-integrations"
import { BlockchainIntegrationsComparison } from "@/components/integrations/comparison-tables/blockchain-integrations-comparison"
import { BlockchainIntegrationsDiagram } from "@/components/integrations/diagrams/blockchain-integrations-diagram"
import { EigenLayerIntegration } from "@/components/integrations/blockchain-integrations/eigenlayer"
import { EtherLinkIntegration } from "@/components/integrations/blockchain-integrations/etherlink"
import Link from "next/link"

export default function BlockchainIntegrationsPage() {
  return (
    <Layout
      showSidebar={true}
      previousPage={{ title: "Wallet Integrations", href: "/integrations/wallet-integrations" }}
      nextPage={{ title: "Risk Management", href: "/integrations/risk-management" }}
    >
      <div className="mb-6">
        <Link href="/integrations" className="text-primary hover:underline flex items-center gap-2">
          ← Back to Integrations
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-primary">Blockchain Integrations</h1>
        <p className="text-xl text-muted-foreground">Cross-chain infrastructure for secure portfolio management</p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <BlockchainIntegrations />
        <BlockchainIntegrationsComparison />
        <BlockchainIntegrationsDiagram />
        <EigenLayerIntegration />
        <EtherLinkIntegration />
      </div>
    </Layout>
  )
}
