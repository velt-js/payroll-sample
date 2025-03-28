import { useEffect, useState } from 'react';
import { useVeltClient } from '@veltdev/react';

// [VELT] Initializes the current signed in user in Velt.
export default function VeltInitializeUser() {
  const { client } = useVeltClient();
  // const hardcodedUser = {
  //   userId: 'user-4',
  //   name: 'Dwight Schrute',
  //   email: 'dwight@example.com',
  //   color: '#FF5733',
  //   textColor: '#FFFFFF',
  //   organizationId: 'payroll-review-org-1'
  // };

  // const hardcodedUser = {
  //   userId: 'user-2',
  //   name: 'Bridgette Haymaker',
  //   email: 'bridgette@example.com',
  //   color: '#FF5733',
  //   textColor: '#FFFFFF',
  //   organizationId: 'payroll-review-org-1'
  // };

  const hardcodedUser = {
    userId: 'user-3',
    name: 'Eric Harris',
    email: 'eric@example.com',
    color: '#FF5733',
    textColor: '#FFFFFF',
    organizationId: 'payroll-review-org-1'
  };

  // Initialize Velt with user info and token
  useEffect(() => {
    if (hardcodedUser && client) {
      client.identify(
        {
          userId: hardcodedUser.userId,
          name: hardcodedUser.name,
          email: hardcodedUser.email,
          organizationId: hardcodedUser.organizationId,
        }
      );
    }
  }, [hardcodedUser, client]);

  return null;
}
