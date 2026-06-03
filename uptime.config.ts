// Only monitors that give useful results
// Other services are tracked via Bugsink error logging

import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "Mind Over Matter — Status",
  links: [
    { link: 'https://www.mindovermattermeals.com', label: 'Website' },
    { link: 'https://github.com/nickbryanorg777', label: 'GitHub' },
    { link: 'mailto:mom@mindovermattermeals.com', label: 'Contact', highlight: true },
  ],
}

const workerConfig: WorkerConfig = {
  monitors: [
    // ═══════════════════════════════════════════
    // CORE INFRASTRUCTURE
    // ═══════════════════════════════════════════
    {
      id: 'website',
      name: 'Website (Production)',
      method: 'GET',
      target: 'https://www.mindovermattermeals.com',
      expectedCodes: [200],
      timeout: 15000,
      tooltip: 'Frontend hosted via Lovable Cloud behind Cloudflare',
      statusPageLink: 'https://www.mindovermattermeals.com',
    },
  ],

  notification: {
    webhook: {
      url: 'https://api.telegram.org/bot8430557934:AAFp_Uo_kMTu0_k7SPrQLAnqXPB1tnz4Nu4/sendMessage',
      payloadType: 'x-www-form-urlencoded',
      payload: {
        chat_id: 8567195008,
        text: '$MSG',
      },
      timeout: 10000,
    },
    timeZone: 'America/New_York',
    gracePeriod: 10,
  },
}

const maintenances: MaintenanceConfig[] = []
export { maintenances, pageConfig, workerConfig }
