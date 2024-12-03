import Hls from "hls.js";
import { useEffect, useRef } from "react";

const MuxVideo = ({ playbackId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(`https://stream.mux.com/${playbackId}.m3u8`);
      hls.attachMedia(video);
    } else if (video) {
      video.src = `https://stream.mux.com/${playbackId}.m3u8`;
    }
  }, [playbackId]);

  return (
    <video ref={videoRef} controls width="640" height="360" autoPlay muted>
      Your browser does not support the video tag.
    </video>
  );
};

export default MuxVideo;
