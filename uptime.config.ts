// This is the production config for Mind Over Matter Meals
// Monitors ALL services 24/7 from Cloudflare edge

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
    // FRONTEND
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
      id: 'website-home',
      name: 'Website (Home)',
      method: 'GET',
      target: 'https://mindovermattermeals.com',
      expectedCodes: [200, 301, 308],
      timeout: 15000,
    },

    // ═══════════════════════════════════════════
    // SUPABASE / BACKEND INFRASTRUCTURE
    // ═══════════════════════════════════════════
    {
      id: 'supabase-rest',
      name: 'Supabase REST API',
      method: 'GET',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/rest/v1/',
      expectedCodes: [200, 401, 404], // 401 means reachable (needs auth)
      timeout: 15000,
      tooltip: 'Supabase PostgREST API gateway',
    },
    {
      id: 'supabase-auth',
      name: 'Supabase Auth',
      method: 'GET',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/auth/v1/',
      expectedCodes: [200, 401, 404],
      timeout: 15000,
    },
    {
      id: 'supabase-storage',
      name: 'Supabase Storage',
      method: 'GET',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/storage/v1/',
      expectedCodes: [200, 401, 404],
      timeout: 15000,
    },

    // ═══════════════════════════════════════════
    // ERROR TRACKING
    // ═══════════════════════════════════════════
    {
      id: 'bugsink',
      name: 'Bugsink (Error Tracking)',
      method: 'GET',
      target: 'https://bugsink.w0.toprod.xyz',
      expectedCodes: [200, 302],
      timeout: 15000,
    },

    // ═══════════════════════════════════════════
    // EDGE FUNCTIONS (All 47)
    // ═══════════════════════════════════════════
    // Critical order flow
    {
      id: 'fn-submit-order',
      name: 'EF: submit-order',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/submit-order',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-create-checkout',
      name: 'EF: create-checkout',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/create-checkout',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-stripe-webhook',
      name: 'EF: stripe-webhook',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/stripe-webhook',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-verify-checkout',
      name: 'EF: verify-checkout-status',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/verify-checkout-status',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-modify-paid-order',
      name: 'EF: modify-paid-order',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/modify-paid-order',
      expectedCodes: [200, 400, 401, 500],
      timeout: 10000,
    },

    // Auth & Email
    {
      id: 'fn-send-email',
      name: 'EF: send-email',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/send-email',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-send-confirmation',
      name: 'EF: send-confirmation',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/send-confirmation',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-auth-email-hook',
      name: 'EF: auth-email-hook',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/auth-email-hook',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-send-scheduled-email',
      name: 'EF: send-scheduled-email',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/send-scheduled-email',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    // Admin
    {
      id: 'fn-admin-orders',
      name: 'EF: admin-orders',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-orders',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-audit',
      name: 'EF: admin-audit',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-audit',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-failed-orders',
      name: 'EF: admin-failed-orders',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-failed-orders',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-create-order',
      name: 'EF: admin-create-order',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-create-order',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-tools',
      name: 'EF: admin-tools',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-tools',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-setup',
      name: 'EF: admin-setup',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-setup',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-pulse',
      name: 'EF: admin-pulse',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-pulse',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-auth-errors',
      name: 'EF: admin-auth-errors',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-auth-errors',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-admin-transactional-email-jobs',
      name: 'EF: admin-transactional-email-jobs',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/admin-transactional-email-jobs',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },

    // Cron / Scheduled
    {
      id: 'fn-check-deadline',
      name: 'EF: check-deadline',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/check-deadline',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-check-abandoned-carts',
      name: 'EF: check-abandoned-carts',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/check-abandoned-carts',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-check-account-status',
      name: 'EF: check-account-status',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/check-account-status',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-check-dependencies',
      name: 'EF: check-dependencies',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/check-dependencies',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-cleanup-stale-orders',
      name: 'EF: cleanup-stale-orders',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/cleanup-stale-orders',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-notify-menu-live',
      name: 'EF: notify-menu-live',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/notify-menu-live',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-notify-last-day',
      name: 'EF: notify-last-day',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/notify-last-day',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-send-abandoned-cart-email',
      name: 'EF: send-abandoned-cart-email',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/send-abandoned-cart-email',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-process-transactional-email',
      name: 'EF: process-transactional-email-jobs',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/process-transactional-email-jobs',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },

    // Data / Import
    {
      id: 'fn-fetch-wc-products',
      name: 'EF: fetch-wc-products',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/fetch-wc-products',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-import-customers',
      name: 'EF: import-customers',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/import-customers',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-import-data',
      name: 'EF: import-data',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/import-data',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-bulk-wc-stats',
      name: 'EF: bulk-wc-stats',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/bulk-wc-stats',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-backfill-orphan-auth',
      name: 'EF: backfill-orphan-auth-users',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/backfill-orphan-auth-users',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },

    // Other
    {
      id: 'fn-webhook-dispatcher',
      name: 'EF: webhook-dispatcher',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/webhook-dispatcher',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-contact-form',
      name: 'EF: contact-form',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/contact-form',
      expectedCodes: [200, 400, 401, 500],
      timeout: 10000,
    },
    {
      id: 'fn-manage-email-preferences',
      name: 'EF: manage-email-preferences',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/manage-email-preferences',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-purchase-gift-card',
      name: 'EF: purchase-gift-card',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/purchase-gift-card',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-validate-gift-card',
      name: 'EF: validate-gift-card',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/validate-gift-card',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-redeem-referral',
      name: 'EF: redeem-referral',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/redeem-referral',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-track-auth-error',
      name: 'EF: track-auth-error',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/track-auth-error',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-track-funnel-error',
      name: 'EF: track-funnel-error',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/track-funnel-error',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-verify-site-password',
      name: 'EF: verify-site-password',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/verify-site-password',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
    {
      id: 'fn-upload-meal-image',
      name: 'EF: upload-meal-image',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/upload-meal-image',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-enhance-meal-image',
      name: 'EF: enhance-meal-image',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/enhance-meal-image',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-migrate-base64-images',
      name: 'EF: migrate-base64-images',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/migrate-base64-images',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
      id: 'fn-send-test-email',
      name: 'EF: send-test-email',
      method: 'POST',
      target: 'https://ccjrhkejzbnibcqdwjiy.supabase.co/functions/v1/send-test-email',
      expectedCodes: [200, 400, 401],
      timeout: 10000,
    },
    {
  ],

  // ═══════════════════════════════════════════
  // NOTIFICATIONS — Telegram
  // ═══════════════════════════════════════════
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

const maintenances: MaintenanceConfig[] = [
  // {
  //   monitors: ['fn-import-data', 'fn-fetch-wc-products'],
  //   title: 'Planned Data Import',
  //   body: 'Scheduled WooCommerce data sync — services will be unavailable briefly.',
  //   start: '2026-06-01T02:00:00-04:00',
  //   end: '2026-06-01T04:00:00-04:00',
  //   color: 'blue',
  // },
]

export { maintenances, pageConfig, workerConfig }
