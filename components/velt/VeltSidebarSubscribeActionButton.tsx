"use client"

import { IconBell, IconBellOff } from "@tabler/icons-react"
import { useNotificationUtils, useVeltEventCallback } from "@veltdev/react"
import { NotificationSettingsConfig } from "@veltdev/types"
import { useEffect, useState } from "react"
import SidebarActionButton from "./SidebarActionButton"

enum NotificationSettingValues {
  ALL = "ALL",
  MINE = "MINE",
  NONE = "NONE",
}

const VeltSidebarSubscribeActionButton = () => {
  const [settings, setSettings] = useState<NotificationSettingsConfig | null>(
    null
  )

  const documentInitEvent = useVeltEventCallback('documentInit');
  console.log('debug: documentInit', documentInitEvent);

  const notificationElement = useNotificationUtils()

  useEffect(() => {
    if (notificationElement && documentInitEvent) {
      console.log('debug: setting settings initial config');
      const settings = notificationElement.getSettings() ?? null;
      console.log('debug: current settings', settings);
      setSettings(settings);
      notificationElement.setSettingsInitialConfig([
        {
          name: "Email",
          id: "email",
          default: NotificationSettingValues.MINE,
          enable: true,
          values: [
            {
              name: NotificationSettingValues.ALL,
              id: NotificationSettingValues.ALL,
            },
            {
              name: NotificationSettingValues.MINE,
              id: NotificationSettingValues.MINE,
            },
            {
              name: NotificationSettingValues.NONE,
              id: NotificationSettingValues.NONE,
            },
          ],
        },
        {
          name: "Inbox",
          id: "inbox",
          default: NotificationSettingValues.MINE,
          enable: true,
          values: [
            {
              name: NotificationSettingValues.ALL,
              id: NotificationSettingValues.ALL,
            },
            {
              name: NotificationSettingValues.MINE,
              id: NotificationSettingValues.MINE,
            },
            {
              name: NotificationSettingValues.NONE,
              id: NotificationSettingValues.NONE,
            },
          ],
        },
      ])
    }
  }, [notificationElement, documentInitEvent])

  return (
    <SidebarActionButton
      Icon={settings?.email === NotificationSettingValues.MINE || settings?.email === NotificationSettingValues.ALL ? IconBellOff : IconBell}
      label={settings?.email === NotificationSettingValues.MINE || settings?.email === NotificationSettingValues.ALL ? 'Unsubscribe' : 'Subscribe'}
      tooltip={settings?.email === NotificationSettingValues.MINE || settings?.email === NotificationSettingValues.ALL ? 'Unsubscribe from notifications for this record' : 'Subscribe to notifications for this record'}
      onClick={() => {
        console.log('debug: settings', settings);
        if (settings?.email === NotificationSettingValues.MINE) {
          notificationElement?.setSettings({
            email: NotificationSettingValues.NONE,
            inbox: NotificationSettingValues.NONE,
          });
          setSettings({
            email: NotificationSettingValues.NONE,
            inbox: NotificationSettingValues.NONE,
          });
          console.log('debug: disabling notifications', notificationElement?.getSettings());
        } else {
          notificationElement?.setSettings({
            email: NotificationSettingValues.MINE,
            inbox: NotificationSettingValues.MINE,
          });
          setSettings({
            email: NotificationSettingValues.MINE,
            inbox: NotificationSettingValues.MINE,
          });
          console.log('debug: enabling notifications', notificationElement?.getSettings());
        }
      }}
    />
  );
}

export default VeltSidebarSubscribeActionButton 