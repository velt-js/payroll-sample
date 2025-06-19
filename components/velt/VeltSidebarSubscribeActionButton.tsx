"use client"

import { IconBell, IconBellOff } from "@tabler/icons-react"
import { useNotificationSettings, useNotificationUtils, useVeltEventCallback } from "@veltdev/react"
import { NotificationSettingsConfig } from "@veltdev/types"
import { useEffect, useState } from "react"
import SidebarActionButton from "./SidebarActionButton"

enum NotificationSettingValues {
  ALL = "ALL",
  MINE = "MINE",
  NONE = "NONE",
}

const VeltSidebarSubscribeActionButton = () => {
  const [localSettings, setLocalSettings] = useState<NotificationSettingsConfig | null>(
    null
  )

  const documentInitEvent = useVeltEventCallback('documentInit');
  const {setSettingsInitialConfig,setSettings, settings} = useNotificationSettings();


  // [VELT]: Set the initial settings for the document when the document is initialized
  useEffect(() => {
    if (documentInitEvent && setSettingsInitialConfig) {
      console.log('debug: documentInit', documentInitEvent);

      console.log('debug: setting settings initial config');
      setSettingsInitialConfig([
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
      ]);
    }
  }, [setSettingsInitialConfig, documentInitEvent])

  // [VELT]: Update the local settings from the server settings when the server settings are updated
  useEffect(() => {
    if (settings) {
      console.log('debug: server settings', settings);
      console.log('debug: updating local settings from server');
      setLocalSettings(settings);
    }
  }, [settings])

  // [VELT]: Log the local settings when it actually updates
  useEffect(() => {
    if (localSettings) {
      console.log('debug: localSettings state updated to:', localSettings);
    }
  }, [localSettings])

  return (
    <SidebarActionButton
      Icon={settings?.email === NotificationSettingValues.MINE || settings?.email === NotificationSettingValues.ALL ? IconBellOff : IconBell}
      label={settings?.email === NotificationSettingValues.MINE || settings?.email === NotificationSettingValues.ALL ? 'Unsubscribe' : 'Subscribe'}
      tooltip={settings?.email === NotificationSettingValues.MINE || settings?.email === NotificationSettingValues.ALL ? 'Unsubscribe from notifications for this record' : 'Subscribe to notifications for this record'}
      onClick={() => {
        if (settings?.email === NotificationSettingValues.MINE) {
          // [VELT]: Only update the server settings here
          setSettings({
            email: NotificationSettingValues.NONE,
            inbox: NotificationSettingValues.NONE,
          });
          console.log('debug: disabling notifications');
        } else {
          // [VELT]: Only update the server settings here
          setSettings({
            email: NotificationSettingValues.MINE,
            inbox: NotificationSettingValues.MINE,
          });
          console.log('debug: enabling notifications');
        }
      }}
    />
  );
}

export default VeltSidebarSubscribeActionButton 