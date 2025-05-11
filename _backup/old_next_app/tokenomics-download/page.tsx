import type { Metadata } from "next"
import TokenomicsDownloadPage from "@/components/tokenomics/tokenomics-download-page"

export const metadata: Metadata = {
  title: "Tokenomics - VeritasVault.ai",
  description: "VeritasVault.ai tokenomics, token distribution, and utility details.",
}

export default function TokenomicsPage() {
  return <TokenomicsDownloadPage />
}
