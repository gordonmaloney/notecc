export async function submitter({
  campaignId,
  contactDeets,
  testimonial,
  complaintDeets,
}) {
  const type = "submission";
  const path = window.location.pathname;
  const site = "portal";

  const body = {
    type,
    site,
    path,
    campaignId,
    testimonial,
    contactDeets,
    complaintDeets,
  };

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/submission`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      // optionally log server response (if any)
      const data = await res.json().catch(() => null);
    } else {
      console.warn(
        `⚠️ Submission failed: ${res.status} ${res.statusText}`,
        await res.text(),
      );
    }
  } catch (e) {
    console.error("❌ submitter_error", e);
  }
}
