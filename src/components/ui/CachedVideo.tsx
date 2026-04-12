"use client";

import React, { useEffect, useRef, useState } from 'react';

interface CachedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * A video component with lazy loading and mobile optimizations.
 * Uses IntersectionObserver to defer loading until in viewport.
 */
export function CachedVideo({ src, className, ...props }: CachedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>(src);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Lazy load video only when in viewport
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    
    let objectUrl: string | null = null;

    async function loadVideo() {
      if (!('caches' in window)) {
        setVideoUrl(src);
        return;
      }

      try {
        const cacheName = 'd-blanks-video-cache';
        const cache = await caches.open(cacheName);
        
        const cachedResponse = await cache.match(src);
        
        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          objectUrl = URL.createObjectURL(blob);
          setVideoUrl(objectUrl);
        } else {
          const response = await fetch(src);
          if (response.ok) {
            const responseToCache = response.clone();
            await cache.put(src, responseToCache);
            
            const blob = await response.blob();
            objectUrl = URL.createObjectURL(blob);
            setVideoUrl(objectUrl);
          }
        }
      } catch (error) {
        console.error('Video caching failed:', error);
        setVideoUrl(src);
      }
    }

    loadVideo();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      className={className}
      playsInline
      muted
      preload={shouldLoad ? 'metadata' : 'none'}
      {...props}
    />
  );
}