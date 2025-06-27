"use client"

import { VeltSidebarButton, VeltNotificationsTool } from "@veltdev/react"

export default function VeltTools() {
  return (
    <>
      {/* [VELT] Sidebar button */}
      <VeltSidebarButton />
      {/* [VELT] Notifications tool */}
      <VeltNotificationsTool
        settings={true}
        shadowDom={false}
        tabConfig={{
          forYou: {
            name: "For You",
            enable: true,
          },
          documents: {
            name: "Payrolls",
            enable: true,
          },
          all: {
            name: "All",
            enable: true,
          },
        }}
      />
    </>
  )
} 