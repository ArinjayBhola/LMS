import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function POST() {
  try {
    const upload = await mux.video.uploads.create({
      cors_origin: "*",
      new_asset_settings: { playback_policy: ["public"] },
    });

    return new Response(
      JSON.stringify({
        upload,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error creating upload URL:", error);

    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const credentials = Buffer.from(
      `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`,
    ).toString("base64");

    const response = await fetch(
      `https://api.mux.com/video/v1/assets/chFmBAJt00neH8PizDi1mAMM5dsfKpDZL6c00BW564c100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify({ error }), {
        status: response.status,
      });
    }

    const data = await response.json();

    // Extract playback ID
    const playbackId = data.data.playback_ids?.[0]?.id;
    if (!playbackId) {
      return new Response(
        JSON.stringify({ error: "No playback ID found in response" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ playbackId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching playback ID:", error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
