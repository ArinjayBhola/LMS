import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { youtubeUrl, courseId, courseType, createdBy, difficultyLevel, studyType } = body;

  // Extract video ID from various YouTube URL formats
  const videoId = extractVideoId(youtubeUrl);
  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  setTimeout(() => {
    inngest.send({
      name: "course.generateFromYoutube",
      data: {
        videoId,
        youtubeUrl,
        courseId,
        courseType,
        createdBy,
        difficultyLevel,
        studyType,
      },
    });
  }, 1000);

  return NextResponse.json({ result: "processing" });
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
