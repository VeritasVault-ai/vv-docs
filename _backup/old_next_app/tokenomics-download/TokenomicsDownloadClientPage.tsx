"use client"

import { TokenomicsDownloadContent } from "@/components/tokenomics/tokenomics-download-content"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { PDFCoverPage } from "@/components/pdf/pdf-cover-page"

export default function TokenomicsDownloadClientPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <div className="container max-w-4xl py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">BlockVision Tokenomics</h1>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
            Complete overview of the BlockVision token distribution, utility, and governance model
          </p>

          <div className="flex justify-center mb-8">
            <Button size="lg" className="flex items-center gap-2" onClick={() => window.print()}>
              <Download size={20} />
              Download PDF
            </Button>
          </div>

          <div className="print-only mb-8">
            <PDFCoverPage title="BlockVision Tokenomics" subtitle="Token Distribution & Utility" />
          </div>

          <TokenomicsDownloadContent />
        </div>
      </div>
    </main>
  )
}
