import { Layout } from "@/components/layout"
import { WalletIntegrations } from "@/components/integrations/wallet-integrations"
import { WalletIntegrationsComparison } from "@/components/integrations/comparison-tables/wallet-integrations-comparison"
import { WalletIntegrationsDiagram } from "@/components/integrations/diagrams/wallet-integrations-diagram"
import { EtherMailIntegration } from "@/components/integrations/wallet-integrations/ethermail"
import { PluralityIntegration } from "@/components/integrations/wallet-integrations/plurality"
import Link from "next/link"

export default function WalletIntegrationsPage() {
  return (
    <Layout
      showSidebar={true}
      previousPage={{ title: "Data Providers", href: "/integrations/data-providers" }}
      nextPage={{ title: "Blockchain Integrations", href: "/integrations/blockchain-integrations" }}
    >
      <div className="mb-6">
        <Link href="/integrations" className="text-primary hover:underline flex items-center gap-2">
          ← Back to Integrations
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-primary">Wallet Integrations</h1>
        <p className="text-xl text-muted-foreground">Secure wallet solutions for multi-chain portfolio management</p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <WalletIntegrations />
        <WalletIntegrationsComparison />
        <WalletIntegrationsDiagram />
        <EtherMailIntegration />
        <PluralityIntegration />
      </div>
    </Layout>
  )
}
