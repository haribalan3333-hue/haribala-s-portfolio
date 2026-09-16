import React, { useState } from 'react';

const VideoGallery = () => {
  const [playingVideo, setPlayingVideo] = useState(null);

  const sampleVideos = [
    {
      id: 1,
      title: 'Portfolio Showcase & AI Features',
      thumb: 'assets/images/hari.jpeg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // placeholder video embed
    },
    {
      id: 2,
      title: 'Full Stack Project Walkthrough',
      thumb: 'assets/images/hari.jpeg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  return (
    <div class="gallery-section" style={{ marginTop: '50px' }}>
      <div class="gallery-header">
        <h3 style={{ color: 'var(--gold-primary, #D4AF37)', fontFamily: 'var(--font-display, sans-serif)', fontSize: '22px' }}>
          🎬 Video Demos ({sampleVideos.length})
        </h3>
      </div>

      <div class="video-grid">
        {sampleVideos.map((video) => (
          <div key={video.id} class="video-card">
            {playingVideo === video.id ? (
              <div style={{ aspectRatio: '16/9' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`${video.videoUrl}?autoplay=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div class="video-thumb-container" onClick={() => setPlayingVideo(video.id)}>
                <img src={video.thumb} alt={video.title} />
                <div class="play-btn-overlay">
                  <div class="play-ic-circle">▶</div>
                </div>
              </div>
            )}
            <div style={{ padding: '12px 15px', color: '#FFF', fontSize: '14px', fontWeight: '500' }}>
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
