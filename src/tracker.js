
// --- module-scoped state (shared across your app in this tab) ---
const sent = new Set();

function makeKey({ type, site, path, campaignId }) {
  return `ta:${type}:${site}:${path}:${campaignId}`;
}

function alreadySent(key) {
  return sent.has(key);
}

function markSent(key) {
  sent.add(key);
}

// --- main tracker ---
export async function tracker({ type, campaignId }) {
  const path = window.location.pathname;
  const site = "portal"; // or window.location.host
  const body = { type, site, path, campaignId };
  const key = makeKey(body);

  if (alreadySent(key)) return; // ✅ don’t send twice per tab
  const url = "https://tenantactapi.vercel.app/api/track";

  try {
    // Prefer Beacon for reliability on unload/navigation
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(body)], { type: "text/plain" });
      const ok = navigator.sendBeacon(url, blob);
      if (ok) markSent(key);
      return;
    }

    // Fallback to fetch
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true, // helps when navigating away
      body: JSON.stringify(body),
      credentials: "omit", // ensure no cookies
    });

    if (res.ok) {
      markSent(key);
      // optional: const data = await res.json().catch(() => null);
    } else {
      console.warn(`⚠️ Tracker failed: ${res.status} ${res.statusText}`);
    }
  } catch (e) {
    console.error("❌ tracker_error", e);
  }
}

/*
Example:

tracker({
  type: "page_view",
  campaignId: "Tenant Complaints Portal",
});
*/
