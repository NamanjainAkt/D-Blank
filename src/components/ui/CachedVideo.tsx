"use client";

import React, { useEffect, useRef, useState } from 'react';

interface CachedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * A video component that aggressively caches the video file in the browser's Cache API.
 * This ensures the video loads from the user's device after the first visit.
 */
export function CachedVideo({ src, className, ...props }: CachedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>(src);

  useEffect(() => {
    let objectUrl: string | null = null;

    async function loadVideo() {
      if (!('caches' in window)) return;

      try {
        const cacheName = 'd-blanks-video-cache';
        const cache = await caches.open(cacheName);
        
        // Try to find the video in cache
        const cachedResponse = await cache.match(src);
        
        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          objectUrl = URL.createObjectURL(blob);
          setVideoUrl(objectUrl);
        } else {
          // If not in cache, fetch and store it
          const response = await fetch(src);
          if (response.ok) {
            // Clone the response to store one in cache and use one for current display
            const responseToCache = response.clone();
            await cache.put(src, responseToCache);
            
            const blob = await response.blob();
            objectUrl = URL.createObjectURL(blob);
            setVideoUrl(objectUrl);
          }
        }
      } catch (error) {
        console.error('Video caching failed:', error);
        // Fallback to original src if caching fails
        setVideoUrl(src);
      }
    }

    loadVideo();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      className={className}
      {...props}
    />
  );
}
