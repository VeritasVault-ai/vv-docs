import { Layout } from "@/components/layout"
import { DataProviders } from "@/components/integrations/data-providers"
import { DataProvidersComparison } from "@/components/integrations/comparison-tables/data-providers-comparison"
import { DataProvidersDiagram } from "@/components/integrations/diagrams/data-providers-diagram"
import { CoinGeckoIntegration } from "@/components/integrations/data-providers/coingecko"
import { DeFiLlamaIntegration } from "@/components/integrations/data-providers/defillama"
import { PinaxIntegration } from "@/components/integrations/data-providers/pinax"
import { GoldskyIntegration } from "@/components/integrations/data-providers/goldsky"
import Link from "next/link"

export default function DataProvidersPage() {
  return (
    <Layout
      showSidebar={true}
      previousPage={{ title: "Integrations", href: "/integrations" }}
      nextPage={{ title: "Wallet Integrations", href: "/integrations/wallet-integrations" }}
    >
      <div className="mb-6">
        <Link href="/integrations" className="text-primary hover:underline flex items-center gap-2">
          ← Back to Integrations
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-primary">Data Providers</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive data integration for multi-chain portfolio management
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <DataProviders />
        <DataProvidersComparison />
        <DataProvidersDiagram />
        <CoinGeckoIntegration />
        <DeFiLlamaIntegration />
        <PinaxIntegration />
        <GoldskyIntegration />
      </div>
    </Layout>
  )
}
