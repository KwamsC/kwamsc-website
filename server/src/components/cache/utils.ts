const purgeCloudflareCache = async (urls: string[]) => {
  const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
  const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

  if (!CLOUDFLARE_ZONE_ID || !CLOUDFLARE_API_TOKEN) {
    console.error("Missing Cloudflare credentials");
    return; // Don't throw - fail gracefully
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: urls }),
      },
    );

    const result = await response.json();

    if (!result.success) {
      console.error("Cloudflare purge failed:", result.errors);
    } else {
      console.log("Cache purged successfully:", urls);
    }
  } catch (error) {
    console.error("Cache purge error:", error);
  }
};

export default purgeCloudflareCache;
