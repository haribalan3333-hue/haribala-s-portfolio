import React, { useState, useEffect, useRef, useCallback } from 'react';

const VideoGallery = () => {
  const [isVideoAlbumOpen, setIsVideoAlbumOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const videoPlayerRef = useRef(null);
  const thumbStripRef = useRef(null);

  // Exact 10 local video files inside public/videos/
  const videos = [
    {
      id: 'video-01',
      title: 'Video 01',
      subtitle: 'Portfolio Showcase & Project Reel',
      description: 'Highlights of UI/UX engineering, creative design and development.',
      src: '/videos/video-01.mp4',
      badge: '01'
    },
    {
      id: 'video-02',
      title: 'Video 02',
      subtitle: 'Milestones & Journey Moments',
      description: 'Key academic, creative, and personal milestones.',
      src: '/videos/video-02.mp4',
      badge: '02'
    },
    {
      id: 'video-03',
      title: 'Video 03',
      subtitle: 'Tech & Interactive UI Experience',
      description: 'Dynamic frontend features, animations and code experiments.',
      src: '/videos/video-03.mp4',
      badge: '03'
    },
    {
      id: 'video-04',
      title: 'Video 04',
      subtitle: 'Campus Days & Lifestyle Chronicles',
      description: 'Memories and vibrant moments from campus life.',
      src: '/videos/video-04.mp4',
      badge: '04'
    },
    {
      id: 'video-05',
      title: 'Video 05',
      subtitle: 'Athletics & 10K Marathon Finisher',
      description: 'Sports discipline, athletic drive and fitness passion.',
      src: '/videos/video-05.mp4',
      badge: '05'
    },
    {
      id: 'video-06',
      title: 'Video 06',
      subtitle: 'Motion & Visual Prototypes',
      description: 'Creative animations, UI concepts and interactive effects.',
      src: '/videos/video-06.mp4',
      badge: '06'
    },
    {
      id: 'video-07',
      title: 'Video 07',
      subtitle: 'Engineering & Innovation Showcase',
      description: 'Hands-on mechanical and technical engineering projects.',
      src: '/videos/video-07.mp4',
      badge: '07'
    },
    {
      id: 'video-08',
      title: 'Video 08',
      subtitle: 'Festivals & Cherished Memories',
      description: 'Celebrations with family, friends and cultural festivities.',
      src: '/videos/video-08.mp4',
      badge: '08'
    },
    {
      id: 'video-09',
      title: 'Video 09',
      subtitle: 'Travel & Outdoor Adventures',
      description: 'Road trips, motorcycle rides and outdoor exploration.',
      src: '/videos/video-09.mp4',
      badge: '09'
    },
    {
      id: 'video-10',
      title: 'Video 10',
      subtitle: 'Portfolio Retrospective Montage',
      description: 'A comprehensive video summary of experiences and passions.',
      src: '/videos/video-10.mp4',
      badge: '10'
    }
  ];

  const isPlayerOpen = selectedVideoIndex !== null;
  const currentVideo = isPlayerOpen ? videos[selectedVideoIndex] : null;

  // Open the 10-video album modal
  const openVideoAlbum = (e) => {
    if (e) e.stopPropagation();
    setIsVideoAlbumOpen(true);
  };

  // Close the 10-video album modal
  const closeVideoAlbum = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }
    setSelectedVideoIndex(null);
    setVideoLoadError(false);
    setIsVideoAlbumOpen(false);
  };

  // Open the video player modal for a specific video
  const openVideoPlayer = (index, e) => {
    if (e) e.stopPropagation();
    console.log("Opening video:", videos[index]?.src);
    setVideoLoadError(false);
    setSelectedVideoIndex(index);
  };

  // Close the video player modal (returns to 10-video album)
  const closeVideoPlayer = (e) => {
    if (e) e.stopPropagation();
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }
    setSelectedVideoIndex(null);
    setVideoLoadError(false);
  };

  // Previous video navigation: disabled on Video 01 (index 0)
  const prevVideo = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedVideoIndex !== null && selectedVideoIndex > 0) {
      setVideoLoadError(false);
      setSelectedVideoIndex(selectedVideoIndex - 1);
    }
  }, [selectedVideoIndex]);

  // Next video navigation: disabled on Video 10 (index 9)
  const nextVideo = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedVideoIndex !== null && selectedVideoIndex < videos.length - 1) {
      setVideoLoadError(false);
      setSelectedVideoIndex(selectedVideoIndex + 1);
    }
  }, [selectedVideoIndex, videos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isPlayerOpen) {
        if (e.key === 'Escape') {
          closeVideoPlayer();
        } else if (e.key === 'ArrowRight') {
          nextVideo();
        } else if (e.key === 'ArrowLeft') {
          prevVideo();
        }
      } else if (isVideoAlbumOpen) {
        if (e.key === 'Escape') {
          closeVideoAlbum();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayerOpen, isVideoAlbumOpen, nextVideo, prevVideo]);

  // Background scroll lock
  useEffect(() => {
    if (isVideoAlbumOpen || isPlayerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoAlbumOpen, isPlayerOpen]);

  // Attempt auto-play when switching videos in player modal
  useEffect(() => {
    if (isPlayerOpen && videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = 0;
      const playPromise = videoPlayerRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log("Autoplay blocked — user can press Play.");
        });
      }
    }
  }, [selectedVideoIndex, isPlayerOpen]);

  // Auto-scroll active thumbnail in bottom strip
  useEffect(() => {
    if (isPlayerOpen && thumbStripRef.current && selectedVideoIndex !== null) {
      const activeThumb = thumbStripRef.current.children[selectedVideoIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedVideoIndex, isPlayerOpen]);

  // Mobile swipe handlers for player modal
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) {
      nextVideo();
    } else if (deltaX < -50) {
      prevVideo();
    }
    setTouchStartX(null);
  };

  return (
    <div className="single-video-album-section">
      {/* ============================================================
          MAIN WEBSITE: ONLY ONE VIDEO ALBUM CARD
          Cover photo: haribala-40.jpg (with fallback to haribala-23.jpg)
          ============================================================ */}
      <div 
        className="video-album-card"
        onClick={openVideoAlbum}
        role="button"
        tabIndex={0}
        aria-label="Open Video Album"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openVideoAlbum(e); }}
      >
        {/* Layered 3D Stack Effect */}
        <div className="album-stack-layer layer-back"></div>
        <div className="album-stack-layer layer-mid"></div>

        <div className="album-main-container">
          {/* Cover Box with High-Quality Photo Cover */}
          <div className="video-album-cover-box">
            <img 
              src="assets/images/Haribala/haribala-40.jpg" 
              alt="Video Album Cover"
              className="video-album-cover-img"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'assets/images/Haribala/haribala-23.jpg';
              }}
            />
            <div className="album-glass-glare"></div>
            
            {/* Play Badge Overlay */}
            <div className="video-cover-play-badge">
              <div className="video-cover-pulse"></div>
              <div className="video-cover-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <div className="album-count-badge">
              <span className="badge-icon">🎬</span> {videos.length} Videos
            </div>

            <div className="album-hover-prompt">
              <span>Click to Open Album</span>
            </div>
          </div>

          {/* Meta Content */}
          <div className="album-meta-content">
            <div className="album-header-pill">FEATURED MEDIA</div>
            <h3 className="album-main-title">My Video Collection</h3>
            <p className="album-main-subtitle">Memories & Projects</p>
            <p className="album-brief">
              A curated cinematic chronicle of engineering projects, frontend UI demonstrations, campus memories & fitness journeys.
            </p>

            <button 
              className="view-album-btn"
              onClick={openVideoAlbum}
            >
              <span>Open Album</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          LEVEL 1 MODAL: 10-VIDEO ALBUM COLLECTION WINDOW
          ============================================================ */}
      {isVideoAlbumOpen && (
        <div 
          className="video-album-modal-overlay"
          onClick={closeVideoAlbum}
        >
          <div 
            className="video-album-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Album Modal Header */}
            <div className="video-album-modal-header">
              <div className="modal-header-left">
                <div className="modal-album-badge">
                  <span className="modal-badge-icon">🎬</span> {videos.length} Videos
                </div>
                <div>
                  <h3 className="modal-album-title">My Video Collection</h3>
                  <p className="modal-album-subtitle">Memories & Projects &bull; Click any video to play</p>
                </div>
              </div>

              <button 
                className="video-modal-close-btn"
                onClick={closeVideoAlbum}
                aria-label="Close Video Album (Esc)"
                title="Close Video Album (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Grid of All 10 Video Cards */}
            <div className="video-album-grid-scroll">
              <div className="video-album-cards-grid">
                {videos.map((vid, idx) => (
                  <div 
                    key={vid.id}
                    className="video-grid-card"
                    onClick={(e) => openVideoPlayer(idx, e)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play ${vid.title}`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openVideoPlayer(idx, e); }}
                  >
                    <div className="grid-card-thumb-container">
                      <video 
                        src={vid.src}
                        muted
                        playsInline
                        preload="metadata"
                        className="grid-card-video-preview"
                        onError={(e) => console.log(`Thumbnail preview load for ${vid.title} (${vid.src}): fallback active`)}
                      />
                      <div className="grid-card-overlay"></div>
                      
                      <div className="grid-card-play-btn">
                        <div className="grid-play-circle">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      <div className="grid-card-badge">Video {vid.badge}</div>
                    </div>

                    <div className="grid-card-body">
                      <h4 className="grid-card-title">{vid.title}</h4>
                      <p className="grid-card-subtitle">{vid.subtitle}</p>
                      <div className="grid-card-action">
                        <span>Watch Video</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          LEVEL 2 MODAL: HTML5 VIDEO PLAYER POPUP
          ============================================================ */}
      {isPlayerOpen && currentVideo && (
        <div 
          className="video-player-modal-overlay"
          onClick={closeVideoPlayer}
        >
          <div 
            className="video-player-window"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Player Top Bar */}
            <div className="video-player-top-bar">
              <div className="player-top-title-group">
                <span className="player-top-icon">🎬</span>
                <div>
                  <h4 className="player-video-title">{currentVideo.title} &mdash; {currentVideo.subtitle}</h4>
                  <p className="player-video-desc">{currentVideo.description}</p>
                </div>
              </div>

              <div className="player-counter-badge">
                Video {selectedVideoIndex + 1} / {videos.length}
              </div>

              <button 
                className="player-close-btn"
                onClick={closeVideoPlayer}
                aria-label="Close Video Player (Esc)"
                title="Close Video (Esc) & Return to Album"
              >
                ✕
              </button>
            </div>

            {/* Video Player Center Stage */}
            <div className="video-player-stage">
              {/* Previous Video Button */}
              <button 
                className="video-nav-btn prev-btn"
                onClick={prevVideo}
                disabled={selectedVideoIndex === 0}
                aria-label="Previous Video"
                title={selectedVideoIndex === 0 ? "First Video" : "Previous Video (Left Arrow)"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Video Player Box */}
              <div className="video-screen-container">
                <video 
                  ref={videoPlayerRef}
                  key={currentVideo.src}
                  src={currentVideo.src}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="video-active-screen"
                  onError={(e) => {
                    console.error("VIDEO PLAYBACK ERROR:", currentVideo?.src, e.currentTarget.error);
                    setVideoLoadError(true);
                  }}
                  onLoadedData={() => {
                    console.log("Video loaded successfully:", currentVideo?.src);
                    setVideoLoadError(false);
                  }}
                >
                  <source src={currentVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {videoLoadError && (
                  <div className="video-error-overlay">
                    <div className="video-error-badge">⚠️ Media Notice</div>
                    <p className="video-error-text">Unable to load this video.</p>
                    <p className="video-error-path">Attempted source: <code>{currentVideo.src}</code></p>
                  </div>
                )}
              </div>

              {/* Next Video Button */}
              <button 
                className="video-nav-btn next-btn"
                onClick={nextVideo}
                disabled={selectedVideoIndex === videos.length - 1}
                aria-label="Next Video"
                title={selectedVideoIndex === videos.length - 1 ? "Last Video" : "Next Video (Right Arrow)"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Bottom Thumbnails Strip for Quick Switching */}
            <div className="player-thumb-strip-container">
              <div className="player-thumb-strip" ref={thumbStripRef}>
                {videos.map((vid, idx) => (
                  <div 
                    key={vid.id}
                    className={`player-thumb-item ${idx === selectedVideoIndex ? 'active' : ''}`}
                    onClick={(e) => openVideoPlayer(idx, e)}
                    title={`${vid.title} — ${vid.subtitle}`}
                  >
                    <div className="thumb-item-box">
                      <video 
                        src={vid.src}
                        preload="metadata"
                        muted
                        playsInline
                      />
                      <div className="thumb-play-icon">▶</div>
                    </div>
                    <span className="thumb-number">{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
