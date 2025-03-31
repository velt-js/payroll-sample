"use client"

import PayrollInterface from "@/components/payroll-interface"
import { VeltCollaboration } from "@/components/velt/VeltCollaboration"
import { VeltProvider } from "@veltdev/react"

export default function Home() {
  // [VELT] Velt provider: Encapsulate your app in the VeltProvider to enable Velt features.
  return (
    <VeltProvider apiKey="j3AwoBkuQMTEgeqrmPve">
      <VeltCollaboration />
      <PayrollInterface />
    </VeltProvider>
  )
}