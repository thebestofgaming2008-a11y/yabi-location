const quoteApi =
  "https://kindhearted-caiman-242.eu-west-1.convex.site/api/quotes";

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/rental-request") {
      if (!["POST", "OPTIONS"].includes(request.method)) {
        return new Response(null, {
          status: 405,
          headers: { Allow: "POST, OPTIONS" },
        });
      }

      try {
        const upstream = await fetch(new Request(quoteApi, request));
        const response = new Response(upstream.body, upstream);
        response.headers.set("Cache-Control", "no-store");
        return response;
      } catch {
        return json(
          { ok: false, error: "quote_service_unavailable" },
          502,
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
