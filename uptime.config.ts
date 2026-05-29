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
    {
      id: 'supabase-api',
      name: 'Supabase API Gateway',
      method: 'GET',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/rest/v1/',
      expectedCodes: [200, 401],
      timeout: 15000,
      tooltip: 'Supabase REST gateway is reachable',
    },
    {
      id: 'bugsink',
      name: 'Bugsink (Error Tracking)',
      method: 'GET',
      target: 'https://bugsink.w0.toprod.xyz',
      expectedCodes: [200, 302],
      timeout: 15000,
    },

    // ═══════════════════════════════════════════
    // CRITICAL EDGE FUNCTIONS (respond to any POST)
    // ═══════════════════════════════════════════
    {
      id: 'fn-submit-order',
      name: 'Order: submit-order',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/submit-order',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-create-checkout',
      name: 'Order: create-checkout',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/create-checkout',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-stripe-webhook',
      name: 'Payment: stripe-webhook',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/stripe-webhook',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-send-email',
      name: 'Email: send-email',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/send-email',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-auth-hook',
      name: 'Email: auth-email-hook',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/auth-email-hook',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-orders',
      name: 'Admin: orders',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-orders',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-check-deadline',
      name: 'Cron: check-deadline',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/check-deadline',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
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
