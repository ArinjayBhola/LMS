"use client";

import React, { useState } from "react";

export default function VideoUploader() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [playbackId, setPlaybackId] = useState("");

  const fetchPlaybackId = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/mux`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.upload.id) {
        console.log("Playback ID:", data.upload.id);
        setPlaybackId(data.upload.id);
        setUploadStatus("Video ready to play!");
      } else if (data.status === "processing") {
        console.log("Processing...");
        setTimeout(() => fetchPlaybackId(), 5000);
      }
    } catch (error) {
      console.error("Error fetching playback ID:", error);
      setUploadStatus("Error fetching playback ID.");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (!target.files) {
      console.error("No files selected");
      return;
    }
    const file = target.files[0];

    try {
      const res = await fetch("/api/mux", { method: "POST" });
      const upload = await res.json();
      const uploadUrl = upload.upload.url;
      const uploadId = upload.upload.id;
      console.log(uploadId, uploadUrl);

      // Upload video
      await fetch(uploadUrl, { method: "PUT", body: file });

      setUploadStatus("Video uploaded. Processing...");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={(e) => handleUpload(e)} />
      <p>{uploadStatus}</p>
      <button onClick={fetchPlaybackId} className="bg-blue-500">
        See Video
      </button>
      {playbackId && (
        // <MuxPlayer
        //   playbackId={"b6WlYZq44di6KWIBpBEBb01P35TY53xJJU9b3MQOJhBU"}
        //   metadata={{
        //     video_id: "video-id-123456",
        //     video_title: "Bick Buck Bunny",
        //     viewer_user_id: "user-id-bc-789",
        //   }}
        // />
        <video controls>
          <source
            src={`https://stream.mux.com/${playbackId}.m3u8`}
            type="application/x-mpegURL"
          />
        </video>
      )}
    </div>
  );
}
