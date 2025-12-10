"use client";
import { useState } from "react";
import Image from "next/image";

import faatiHaaayat from "@/public/src/faatihaaayat.jpg";
export default function ThemeSong() {
  const [play, setPlay] = useState(false);

  return (
    <div className="relative w-full max-w-3xl mx-auto">

      {!play && (
        <div
          className="relative cursor-pointer"
          onClick={() => setPlay(true)}
        >
          {/* Thumbnail Image */}
          <Image
            src={faatiHaaayat}   // এখানে তোমার thumbnail image
            width={800}
            height={450}
            alt="Video Thumbnail"
            className="rounded-lg"
            priority
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white/80 p-4 rounded-full">
              ▶
            </div>
          </div>
        </div>
      )}

      {/* After click: show iframe */}
      {play && (
        <iframe
          src="https://drive.google.com/file/d/1yGsToM501o4lJGBwIyyvyZGeILjnauJx/preview"
          width="100%"
          height="480"
          allow="autoplay"
          className="rounded-lg"
        ></iframe>
      )}
    </div>
  );
}
