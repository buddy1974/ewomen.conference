/**
 * Lightweight analytics event tracker.
 * Drop-in ready for GA4, Plausible, Mixpanel, or any future provider.
 * Add the provider SDK to index.html and it will be picked up automatically.
 */

export type AnalyticsEvent =
  | "hero_cta_click"
  | "hero_whatsapp_click"
  | "register_payunit_click"
  | "register_whatsapp_click"
  | "payment_success_view";

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, unknown>
): void {
  // GA4 / gtag
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", event, properties ?? {});
  }

  // Plausible
  if (typeof window !== "undefined" && typeof (window as any).plausible === "function") {
    (window as any).plausible(event, { props: properties ?? {} });
  }

  // Dev console
  if (import.meta.env.DEV) {
    console.log("[analytics]", event, properties ?? {});
  }
}
