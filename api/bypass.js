export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metode tidak didukung." });
  }

  const url = typeof req.body?.url === "string" ? req.body.url.trim() : "";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: "URL tidak valid." });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return res.status(400).json({ error: "Hanya URL HTTP/HTTPS yang didukung." });
  }

  try {
    const endpoint = new URL("https://anabot.my.id/api/tools/izenLOL");
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("apikey", process.env.IZEN_API_KEY || "freeApikey");

    const upstream = await fetch(endpoint, {
      method: "GET",
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(20000)
    });

    if (!upstream.ok) {
      return res.status(502).json({ error: "Layanan bypass sedang tidak merespons. Coba lagi nanti." });
    }

    const json = await upstream.json();
    const result = json?.data?.result?.result;

    if (typeof result !== "string" || !result.trim()) {
      return res.status(422).json({ error: "Link ini gagal diproses. Coba link lain." });
    }

    let finalUrl;
    try {
      finalUrl = new URL(result.trim());
    } catch {
      return res.status(502).json({ error: "API mengembalikan hasil tautan yang tidak valid." });
    }

    if (!["http:", "https:"].includes(finalUrl.protocol)) {
      return res.status(502).json({ error: "Hasil tautan tidak didukung." });
    }

    return res.status(200).json({ result: finalUrl.href });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan saat menghubungi layanan bypass." });
  }
}
