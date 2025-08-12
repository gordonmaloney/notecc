// useEmailClient.js — A reusable React hook to detect the user's email client/provider
// Usage:
//   const { client, loading, error } = useEmailClient(userEmail);
//   // client can be: 'gmail' | 'outlook' | 'yahoo' | 'icloud' | 'proton' | 'mobile' | null
//
// Features:
// - SSR-safe (checks for window before touching navigator)
// - Static domain match first; kicks off MX sniff with timeout + abort
// - Optimistic: sets static match immediately; replaces with MX result if different
// - Caches MX results per-domain to avoid repeat lookups
// - Accepts custom providers and timeout via options

import { useEffect, useMemo, useRef, useState } from "react";

const defaultProviders = [
  {
    name: "gmail",
    domains: ["gmail.com", "googlemail.com"],
    mxHint: "google.com",
  },
  {
    name: "outlook",
    domains: [
      "outlook.com",
      "hotmail.com",
      "live.com",
      "msn.com",
      "outlook.co.uk",
    ],
    mxHint: "outlook.com",
  },
  {
    name: "yahoo",
    domains: ["yahoo.com", "ymail.com", "rocketmail.com"],
    mxHint: "yahoodns.net",
  },
  {
    name: "icloud",
    domains: ["icloud.com", "me.com", "mac.com"],
    mxHint: "icloud.com",
  },
  {
    name: "proton",
    domains: ["proton.me", "protonmail.com"],
    mxHint: "protonmail",
  },
  { name: "zoho", domains: ["zoho.com", "zohomail.com"], mxHint: "zoho" },
];

// simple in-module cache for MX lookups
const mxCache = new Map(); // key: domain -> value: providerName|null

function normalizeDomain(domain) {
  return (domain || "").trim().toLowerCase();
}

function matchProvider(domain, providers) {
  const clean = normalizeDomain(domain);
  for (const p of providers) {
    // case-insensitive match against declared domains
    if (p.domains.some((d) => d.toLowerCase() === clean)) return p.name;
  }
  return null;
}

async function sniffMX(domain, providers, timeoutMs = 4000, signal) {
  const clean = normalizeDomain(domain);
  if (!clean) return null;

  // cache hit
  if (mxCache.has(clean)) return mxCache.get(clean);

  const controller = new AbortController();
  const linkedSignal = signal ? new AbortController() : null;

  // tie external signal to our controller if provided
  if (linkedSignal) {
    const onAbort = () => controller.abort();
    signal.addEventListener("abort", onAbort, { once: true });
  }

  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(clean)}&type=MX`,
      { headers: { Accept: "application/dns-json" }, signal: controller.signal }
    );

    if (!res.ok) {
      mxCache.set(clean, null);
      return null;
    }

    const { Answer } = await res.json();
    if (!Array.isArray(Answer)) {
      mxCache.set(clean, null);
      return null;
    }

    for (const { data } of Answer) {
      const mxHost = String(data || "")
        .replace(/\.$/, "")
        .toLowerCase();
      for (const p of providers) {
        if (mxHost.includes(p.mxHint.toLowerCase())) {
          mxCache.set(clean, p.name);
          return p.name;
        }
      }
    }
  } catch (err) {
    // ignore AbortError, cache miss so we try again later
    if (err?.name !== "AbortError") {
      console.error("MX lookup failed:", err);
    }
  } finally {
    clearTimeout(t);
  }

  mxCache.set(clean, null);
  return null;
}

export default function useEmailClient(userEmail, options = {}) {
  const {
    providers = defaultProviders,
    mxTimeoutMs = 4000,
    userAgentOverride,
  } = options;

  const [client, setClient] = useState(null); // string | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  const ua =
    userAgentOverride ||
    (typeof window !== "undefined" ? window.navigator?.userAgent : "");

const email = useMemo(() => String(userEmail || "").trim(), [userEmail]);

  useEffect(() => {
    // cleanup any in-flight
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    setError(null);

    if (!email) {
      setClient(null);
      setLoading(false);
      return;
    }

    // Mobile short-circuit (SSR-safe: only if UA available)
    if (ua && /Mobi|Android|iPhone/i.test(ua)) {
      setClient("mobile");
      setLoading(false);
      return;
    }

    const [, domainRaw] = email.split("@");
    const domain = normalizeDomain(domainRaw);
    if (!domain) {
      setClient(null);
      setLoading(false);
      return;
    }

    // ① Static match (optimistic)
    const staticMatch = matchProvider(domain, providers);
    if (staticMatch) setClient(staticMatch);

    // ② MX sniff (may confirm or override)
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    sniffMX(domain, providers, mxTimeoutMs, controller.signal)
      .then((mx) => {
        if (controller.signal.aborted) return; // component unmounted or email changed
        if (mx) setClient(mx); // override if different or confirm
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setError(e);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
        if (abortRef.current === controller) abortRef.current = null;
      });

    return () => {
      controller.abort();
    };
  }, [email, ua, providers, mxTimeoutMs]);

  return { client, loading, error };
}

// Optional helper: expose a way to prime the cache (e.g., during SSR or tests)
export function primeMxCache(domain, providerName) {
  const d = normalizeDomain(domain);
  mxCache.set(d, providerName || null);
}

export function clearMxCache() {
  mxCache.clear();
}
