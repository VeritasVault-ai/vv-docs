"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CoinGeckoPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/#coingecko-integration")
  }, [router])

  return <div>Redirecting...</div>
}
