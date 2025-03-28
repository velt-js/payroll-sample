"use client"

import PayrollInterface from "@/components/payroll-interface"
import { VeltCollaboration } from "@/components/velt/VeltCollaboration"
import { VeltProvider } from "@veltdev/react"

export default function Home() {
  return (
    <VeltProvider apiKey="j3AwoBkuQMTEgeqrmPve">
      <VeltCollaboration />
      <PayrollInterface />
    </VeltProvider>
  )
}