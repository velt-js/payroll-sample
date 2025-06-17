"use client"

import { VeltSidebarButton, VeltNotificationsTool } from "@veltdev/react"
import VeltSidebarSubscribeActionButton from "./VeltSidebarSubscribeActionButton"

export default function VeltTools() {
  return (
    <>
      {/* [VELT] Sidebar button */}
      <VeltSidebarButton />
      <VeltSidebarSubscribeActionButton />
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