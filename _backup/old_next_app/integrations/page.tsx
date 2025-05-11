import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IntegrationComparison } from "@/components/integrations/integration-comparison"
import Link from "next/link"
import { Database, Wallet, Layers, BarChart } from "lucide-react"

export default function IntegrationsPage() {
  return (
    <Layout
      showSidebar={true}
      previousPage={{ title: "Whitepaper", href: "/" }}
      nextPage={{ title: "Data Providers", href: "/integrations/data-providers" }}
    >
      <div className="mb-6">
        <Link href="/" className="text-primary hover:underline flex items-center gap-2">
          ← Back to Whitepaper
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-primary">Integrations</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive integration ecosystem for multi-chain portfolio management
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <section id="integration-benefits">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Integration Benefits</h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai's multi-chain architecture leverages strategic integrations to provide a comprehensive,
                secure, and efficient portfolio management solution. These integrations offer numerous benefits:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Enhanced Security:</strong> Multiple layers of security across different blockchain networks
                  reduce single points of failure.
                </li>
                <li className="text-base font-normal">
                  <strong>Improved Scalability:</strong> Distributed processing across multiple chains enables higher
                  transaction throughput and better performance.
                </li>
                <li className="text-base font-normal">
                  <strong>Diversified Risk:</strong> Cross-chain asset allocation reduces exposure to
                  blockchain-specific risks.
                </li>
                <li className="text-base font-normal">
                  <strong>Comprehensive Data:</strong> Integration with multiple data providers ensures accurate and
                  complete market information.
                </li>
                <li className="text-base font-normal">
                  <strong>Seamless User Experience:</strong> Unified interface for managing assets across multiple
                  blockchains simplifies portfolio management.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <IntegrationComparison />

        <section id="integration-categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Data Providers
                </CardTitle>
                <CardDescription>Comprehensive data integration for accurate portfolio management</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Integrations with CoinGecko, DeFiLlama, Pinax, and Goldsky for comprehensive market data and
                  analytics.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/integrations/data-providers" className="text-sm text-primary hover:underline">
                  View Data Provider Integrations →
                </Link>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-green-500" />
                  Wallet Integrations
                </CardTitle>
                <CardDescription>Secure wallet solutions for multi-chain asset management</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Integrations with EtherMail and Plurality for secure, user-friendly access to multi-chain portfolio
                  management.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/integrations/wallet-integrations" className="text-sm text-primary hover:underline">
                  View Wallet Integrations →
                </Link>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  Blockchain Integrations
                </CardTitle>
                <CardDescription>Cross-chain infrastructure for secure portfolio management</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Integrations with EigenLayer and EtherLink for enhanced security and cross-chain communication.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/integrations/blockchain-integrations" className="text-sm text-primary hover:underline">
                  View Blockchain Integrations →
                </Link>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-red-500" />
                  Risk Management
                </CardTitle>
                <CardDescription>Advanced risk assessment for multi-chain portfolio management</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Integration with Risk Bot for comprehensive risk assessment and mitigation across multiple blockchain
                  networks.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/integrations/risk-management" className="text-sm text-primary hover:underline">
                  View Risk Management Integrations →
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  )
}
