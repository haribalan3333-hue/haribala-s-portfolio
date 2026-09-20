import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'haribala_photo_wall_positions_v2';

const PhotoGallery = () => {
  // Modal states: Level 1 = Interactive Photo Wall, Level 2 = Lightbox Viewer
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Arrange mode toggle
  const [isArrangeMode, setIsArrangeMode] = useState(true);

  // Dragging states
  const [draggingPhotoId, setDraggingPhotoId] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(50);

  // Lightbox transition and touch swipe
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // Refs
  const canvasRef = useRef(null);
  const thumbStripRef = useRef(null);
  const dragRef = useRef({
    photoId: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    hasMoved: false,
    cardWidth: 210,
    cardHeight: 245,
    pointerId: null
  });

  // All 40 actual local photos with stable IDs and absolute browser paths
  const photos = useMemo(() => [
    { id: 'photo-01', title: 'Early Childhood Memories', tag: 'Memories', src: '/assets/images/Haribala/haribala-1.jpg', num: 1 },
    { id: 'photo-02', title: 'Athletic Passion & Sports', tag: 'Athletics', src: '/assets/images/Haribala/haribala-2.jpg', num: 2 },
    { id: 'photo-03', title: 'Casual & Campus Moments', tag: 'Campus', src: '/assets/images/Haribala/haribala-3.jpg', num: 3 },
    { id: 'photo-04', title: 'College Days & Journey', tag: 'College', src: '/assets/images/Haribala/haribala-4.jpg', num: 4 },
    { id: 'photo-05', title: '10K Marathon Finisher', tag: 'Fitness', src: '/assets/images/Haribala/haribala-5.jpg', num: 5 },
    { id: 'photo-06', title: 'Red Shirt Dynamic Moods', tag: 'Lifestyle', src: '/assets/images/Haribala/haribala-6.jpg', num: 6 },
    { id: 'photo-07', title: 'Yellow Shirt Candid Vibes', tag: 'Candid', src: '/assets/images/Haribala/haribala-7.jpg', num: 7 },
    { id: 'photo-08', title: 'Campus Lifestyle & Outdoor', tag: 'Outdoor', src: '/assets/images/Haribala/haribala-8.jpg', num: 8 },
    { id: 'photo-09', title: 'Hari Bala Signature Portrait', tag: 'Portrait', src: '/assets/images/Haribala/haribala-9.jpg', num: 9 },
    { id: 'photo-10', title: 'Smart Casuals & Personal Style', tag: 'Style', src: '/assets/images/Haribala/haribala-10.jpg', num: 10 },
    { id: 'photo-11', title: 'Campus Moments & Smart Casuals', tag: 'Campus', src: '/assets/images/Haribala/haribala-11.jpg', num: 11 },
    { id: 'photo-12', title: 'Vector Art & Patriotic Tribute', tag: 'Creative', src: '/assets/images/Haribala/haribala-12.jpg', num: 12 },
    { id: 'photo-13', title: 'Nature Bokeh Portrait', tag: 'Nature', src: '/assets/images/Haribala/haribala-13.jpg', num: 13 },
    { id: 'photo-14', title: 'Traditional Heritage Celebration', tag: 'Heritage', src: '/assets/images/Haribala/haribala-14.jpg', num: 14 },
    { id: 'photo-15', title: 'Festive Celebration in White Attire', tag: 'Festival', src: '/assets/images/Haribala/haribala-15.jpg', num: 15 },
    { id: 'photo-16', title: 'Maroon Shirt Campus Moments', tag: 'Campus', src: '/assets/images/Haribala/haribala-16.jpg', num: 16 },
    { id: 'photo-17', title: 'Casual Styling & Mirror Shots', tag: 'Style', src: '/assets/images/Haribala/haribala-17.jpg', num: 17 },
    { id: 'photo-18', title: 'Nostalgic Memories & Childhood Scrapbook', tag: 'Vintage', src: '/assets/images/Haribala/haribala-18.jpg', num: 18 },
    { id: 'photo-19', title: 'Cyber Neon Vector Art Profile', tag: 'Digital', src: '/assets/images/Haribala/haribala-19.jpg', num: 19 },
    { id: 'photo-20', title: 'Casual Streetwear on Steps', tag: 'Streetwear', src: '/assets/images/Haribala/haribala-20.jpg', num: 20 },
    { id: 'photo-21', title: 'Outdoor Triptych Smiling Moments', tag: 'Outdoor', src: '/assets/images/Haribala/haribala-21.jpg', num: 21 },
    { id: 'photo-22', title: 'Night Out Vibes & Cotton Candy', tag: 'Memories', src: '/assets/images/Haribala/haribala-22.jpg', num: 22 },
    { id: 'photo-23', title: 'Executive Formal Suit Portrait', tag: 'Formal', src: '/assets/images/Haribala/haribala-23.jpg', num: 23 },
    { id: 'photo-24', title: 'Traditional Silk Veshti & Festive Pose', tag: 'Culture', src: '/assets/images/Haribala/haribala-24.jpg', num: 24 },
    { id: 'photo-25', title: 'Blue Grid Shirt Campus Quad Collage', tag: 'Campus', src: '/assets/images/Haribala/haribala-25.jpg', num: 25 },
    { id: 'photo-26', title: 'Casual Phone Call & Cheerful Smiles', tag: 'Moments', src: '/assets/images/Haribala/haribala-26.jpg', num: 26 },
    { id: 'photo-27', title: 'Red Vibes Selfie with Trendy Glasses', tag: 'Selfie', src: '/assets/images/Haribala/haribala-27.jpg', num: 27 },
    { id: 'photo-28', title: 'Deep Blue Formal Shirt Campus Moments', tag: 'Campus', src: '/assets/images/Haribala/haribala-28.jpg', num: 28 },
    { id: 'photo-29', title: 'Plaid Blue Check Shirt Campus Portraits', tag: 'Portrait', src: '/assets/images/Haribala/haribala-29.jpg', num: 29 },
    { id: 'photo-30', title: 'Airport Terminal & Travel Style', tag: 'Travel', src: '/assets/images/Haribala/haribala-30.jpg', num: 30 },
    { id: 'photo-31', title: 'Cricket Passion & Practice Moments', tag: 'Cricket', src: '/assets/images/Haribala/haribala-31.jpg', num: 31 },
    { id: 'photo-32', title: 'Yamaha R15 Superbike Ride', tag: 'Bikes', src: '/assets/images/Haribala/haribala-32.jpg', num: 32 },
    { id: 'photo-33', title: 'School Days & Friendship Memories', tag: 'School', src: '/assets/images/Haribala/haribala-33.jpg', num: 33 },
    { id: 'photo-34', title: 'Murugan Spiritual Pilgrimage Memories', tag: 'Spiritual', src: '/assets/images/Haribala/haribala-34.jpg', num: 34 },
    { id: 'photo-35', title: 'Sports Jersey Athletic 4-Panel Collage', tag: 'Sports', src: '/assets/images/Haribala/haribala-35.jpg', num: 35 },
    { id: 'photo-36', title: 'Birthday Celebrations & Party Hat Vibes', tag: 'Birthday', src: '/assets/images/Haribala/haribala-36.jpg', num: 36 },
    { id: 'photo-37', title: 'Campus Friends & Joyful Smiles', tag: 'Friends', src: '/assets/images/Haribala/haribala-37.jpg', num: 37 },
    { id: 'photo-38', title: 'Monochrome Striped Shirt Vintage Portrait', tag: 'Vintage', src: '/assets/images/Haribala/haribala-38.jpg', num: 38 },
    { id: 'photo-39', title: 'Red Headband & Blue Tee Stylish Pose', tag: 'Style', src: '/assets/images/Haribala/haribala-39.jpg', num: 39 },
    { id: 'photo-40', title: 'Stylized Comic Poster Shutter Pose', tag: 'Art', src: '/assets/images/Haribala/haribala-40.jpg', num: 40 },
  ], []);

  // Compute default grid coordinates for any photo index
  const computeDefaultPosition = useCallback((index) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1024;
    
    const cols = isMobile ? 2 : isTablet ? 3 : 4;
    const cardWidth = isMobile ? 150 : 210;
    const cardHeight = isMobile ? 190 : 245;
    const gapX = isMobile ? 12 : 20;
    const gapY = isMobile ? 16 : 24;
    const padX = isMobile ? 12 : 24;
    const padY = isMobile ? 16 : 24;

    const col = index % cols;
    const row = Math.floor(index / cols);

    const x = padX + col * (cardWidth + gapX);
    const y = padY + row * (cardHeight + gapY);
    const zIndex = index + 1;

    return { x, y, zIndex };
  }, []);

  // Saved positions loaded from localStorage
  const [positions, setPositions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read saved photo positions from localStorage", e);
    }
    return {};
  });

  // Helper to get effective position of a photo
  const getPhotoPosition = useCallback((photoId, index) => {
    if (positions[photoId] && typeof positions[photoId].x === 'number') {
      return positions[photoId];
    }
    return computeDefaultPosition(index);
  }, [positions, computeDefaultPosition]);

  // Open Level 1 Photo Album Window (Interactive Photo Wall)
  const openPhotoAlbum = (e) => {
    if (e) e.stopPropagation();
    setIsAlbumModalOpen(true);
  };

  // Close Level 1 Photo Album Window
  const closePhotoAlbum = (e) => {
    if (e) e.stopPropagation();
    setIsAlbumModalOpen(false);
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  // Open Level 2 Lightbox Viewer (Single large photo)
  const openLightbox = (index = 0, e) => {
    if (e) e.stopPropagation();
    const targetPhoto = photos[index] || photos[0];
    console.log("Opening photo:", targetPhoto?.src);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Close Level 2 Lightbox Viewer
  const closeLightbox = (e) => {
    if (e) e.stopPropagation();
    setIsLightboxOpen(false);
    if (!isAlbumModalOpen) {
      document.body.style.overflow = '';
    }
  };

  // Lightbox Next/Prev
  const nextPhoto = useCallback((e) => {
    if (e) e.stopPropagation();
    setIsTransitioning(true);
    setTimeout(() => {
      setLightboxIndex((prev) => (prev + 1) % photos.length);
      setIsTransitioning(false);
    }, 120);
  }, [photos.length]);

  const prevPhoto = useCallback((e) => {
    if (e) e.stopPropagation();
    setIsTransitioning(true);
    setTimeout(() => {
      setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
      setIsTransitioning(false);
    }, 120);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') nextPhoto();
        else if (e.key === 'ArrowLeft') prevPhoto();
      } else if (isAlbumModalOpen) {
        if (e.key === 'Escape') closePhotoAlbum();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isAlbumModalOpen, nextPhoto, prevPhoto]);

  // Body scroll lock management (restores cleanly on modal close)
  useEffect(() => {
    if (isAlbumModalOpen || isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAlbumModalOpen, isLightboxOpen]);

  // Auto-scroll active thumbnail in lightbox strip
  useEffect(() => {
    if (isLightboxOpen && thumbStripRef.current) {
      const activeThumb = thumbStripRef.current.children[lightboxIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [lightboxIndex, isLightboxOpen]);

  // Lightbox swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) {
      nextPhoto();
    } else if (deltaX < -50) {
      prevPhoto();
    }
    setTouchStartX(null);
  };

  // =========================================================================
  // DRAG AND DROP ENGINE USING POINTER EVENTS
  // =========================================================================
  const handlePointerDown = (e, photo, index) => {
    // Only respond to primary mouse button (left click) or touch
    if (e.button !== undefined && e.button !== 0) return;

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const cardEl = e.currentTarget;
    const cardRect = cardEl.getBoundingClientRect();

    const offsetX = e.clientX - cardRect.left;
    const offsetY = e.clientY - cardRect.top;

    try {
      cardEl.setPointerCapture(e.pointerId);
    } catch (err) {
      // Ignore if unsupported
    }

    const currentPos = getPhotoPosition(photo.id, index);
    const newMaxZ = maxZIndex + 1;
    setMaxZIndex(newMaxZ);

    // Bring clicked card to top immediately
    setPositions(prev => ({
      ...prev,
      [photo.id]: {
        ...currentPos,
        zIndex: newMaxZ
      }
    }));

    dragRef.current = {
      photoId: photo.id,
      index,
      startX: e.clientX,
      startY: e.clientY,
      offsetX,
      offsetY,
      hasMoved: false,
      cardWidth: cardRect.width || 210,
      cardHeight: cardRect.height || 245,
      pointerId: e.pointerId
    };
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || !drag.photoId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    // Distinguish click from drag: 6px threshold
    if (!drag.hasMoved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      drag.hasMoved = true;
      setDraggingPhotoId(drag.photoId);
    }

    if (drag.hasMoved) {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      const canvasRect = canvasEl.getBoundingClientRect();
      const scrollLeft = canvasEl.scrollLeft || 0;
      const scrollTop = canvasEl.scrollTop || 0;

      // Position relative to canvas container including internal scroll
      let newX = (e.clientX - canvasRect.left + scrollLeft) - drag.offsetX;
      let newY = (e.clientY - canvasRect.top + scrollTop) - drag.offsetY;

      // Clamping inside canvas boundaries
      const maxX = Math.max(0, canvasEl.scrollWidth - drag.cardWidth - 8);
      const maxY = Math.max(0, canvasEl.scrollHeight - drag.cardHeight - 8);

      newX = Math.max(8, Math.min(newX, maxX));
      newY = Math.max(8, Math.min(newY, maxY));

      setPositions(prev => ({
        ...prev,
        [drag.photoId]: {
          x: Math.round(newX),
          y: Math.round(newY),
          zIndex: maxZIndex + 1
        }
      }));
    }
  };

  const handlePointerUp = (e) => {
    const drag = dragRef.current;
    if (!drag || !drag.photoId) return;

    const photoId = drag.photoId;
    const photoIdx = drag.index;
    const wasDragged = drag.hasMoved;

    if (drag.pointerId !== null && e.currentTarget) {
      try {
        e.currentTarget.releasePointerCapture(drag.pointerId);
      } catch (err) {}
    }

    dragRef.current = { photoId: null, index: 0, startX: 0, startY: 0, offsetX: 0, offsetY: 0, hasMoved: false, cardWidth: 210, cardHeight: 245, pointerId: null };
    setDraggingPhotoId(null);

    if (wasDragged) {
      // Persist updated positions to localStorage
      setPositions(prev => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
        } catch (err) {
          console.error("Failed to save photo positions:", err);
        }
        return prev;
      });
    } else {
      // It was a clean click (not a drag) -> open large Lightbox viewer!
      openLightbox(photoIdx, e);
    }
  };

  // Reset all photo positions back to default layout
  const handleResetLayout = (e) => {
    if (e) e.stopPropagation();
    const confirmed = window.confirm("Reset all photos to their original positions?");
    if (confirmed) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error("Failed to clear localStorage:", err);
      }
      setPositions({});
      setMaxZIndex(50);
    }
  };

  // Compute total canvas height so all items fit comfortably
  const totalCanvasHeight = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1024;
    const cols = isMobile ? 2 : isTablet ? 3 : 4;
    const cardHeight = isMobile ? 190 : 245;
    const gapY = isMobile ? 16 : 24;
    const padY = isMobile ? 16 : 24;
    const rows = Math.ceil(photos.length / cols);
    const calculatedHeight = padY * 2 + rows * (cardHeight + gapY) + 120;
    
    // Also consider any dragged photos that might be placed further down
    let maxDraggedY = 0;
    Object.values(positions).forEach(pos => {
      if (pos && typeof pos.y === 'number') {
        maxDraggedY = Math.max(maxDraggedY, pos.y + cardHeight + 60);
      }
    });

    return Math.max(calculatedHeight, maxDraggedY, 900);
  }, [photos.length, positions]);

  const currentLightboxPhoto = photos[lightboxIndex] || photos[0];

  return (
    <div className="single-album-section">
      {/* ============================================================
          MAIN WEBSITE: ONLY ONE PHOTO ALBUM SHOWCASE CARD
          ============================================================ */}
      <div 
        className="photo-album-card" 
        onClick={openPhotoAlbum}
        role="button"
        tabIndex={0}
        aria-label="Open Photo Album"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openPhotoAlbum(e); }}
      >
        {/* Layered 3D Stack Effect */}
        <div className="album-stack-layer layer-back"></div>
        <div className="album-stack-layer layer-mid"></div>

        <div className="album-main-container">
          <div className="album-cover-box">
            <img 
              src="/assets/images/Haribala/haribala-23.jpg" 
              alt="Photo Album Cover" 
              className="album-cover-img"
              loading="lazy"
              onError={(e) => {
                console.error("Gallery Cover Image load failed:", e.target.src);
                e.target.src = '/assets/images/Haribala/haribala-1.jpg';
              }}
            />
            <div className="album-glass-glare"></div>
            <div className="album-count-badge">
              <span className="badge-icon">📷</span> {photos.length} Photos
            </div>
            <div className="album-hover-prompt">
              <span>Click to Explore & Arrange</span>
            </div>
          </div>

          <div className="album-meta-content">
            <div className="album-header-pill">PERSONAL COLLECTION</div>
            <h3 className="album-main-title">Photo Album</h3>
            <p className="album-main-subtitle">Memories & Moments</p>
            <p className="album-brief">
              An interactive drag-and-drop photo wall of lifestyle chronicles, academic milestones, athletics, festivals & creative designs.
            </p>

            <button 
              className="view-album-btn"
              onClick={openPhotoAlbum}
            >
              <span>View Album</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          LEVEL 1 MODAL: INTERACTIVE DRAG-AND-DROP PHOTO WALL
          ============================================================ */}
      {isAlbumModalOpen && (
        <div 
          className="photo-album-modal-overlay"
          onClick={closePhotoAlbum}
        >
          <div 
            className="photo-wall-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Arrange and Reset Controls */}
            <div className="photo-wall-modal-header">
              <div className="photo-wall-header-left">
                <div className="photo-wall-badge">
                  <span className="badge-icon">📷</span> {photos.length} Photos
                </div>
                <div>
                  <h3 className="photo-wall-title">Photo Album &bull; Interactive Wall</h3>
                  <p className="photo-wall-subtitle">
                    {isArrangeMode 
                      ? "🖐️ Drag any photo to customize position &bull; Click to view in HD" 
                      : "Click any photo to view in full resolution"}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="photo-wall-actions">
                <button 
                  className={`photo-wall-tool-btn ${isArrangeMode ? 'active' : ''}`}
                  onClick={() => setIsArrangeMode(!isArrangeMode)}
                  title={isArrangeMode ? "Arrange mode enabled (Drag photos freely)" : "Click to enable arrange mode"}
                >
                  <span className="btn-icon">🖐️</span>
                  <span className="btn-text">{isArrangeMode ? 'Arrange: ON' : 'Arrange: OFF'}</span>
                </button>

                <button 
                  className="photo-wall-tool-btn reset-btn"
                  onClick={handleResetLayout}
                  title="Reset all photos to original positions"
                >
                  <span className="btn-icon">🔄</span>
                  <span className="btn-text">Reset Layout</span>
                </button>

                <button 
                  className="photo-wall-close-btn"
                  onClick={closePhotoAlbum}
                  aria-label="Close Photo Album (Esc)"
                  title="Close Photo Album (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Arrange Hint Banner */}
            {isArrangeMode && (
              <div className="photo-wall-hint-banner">
                <span>💡 <strong>Free Positioning Active:</strong> Grab & drag any photo to arrange your custom personal photo wall. Positions auto-save!</span>
              </div>
            )}

            {/* Scrollable Canvas for Free Dragging & Absolute Positioning */}
            <div className="photo-wall-canvas-container" ref={canvasRef}>
              <div 
                className="photo-wall-canvas"
                style={{ height: `${totalCanvasHeight}px` }}
              >
                {photos.map((photo, index) => {
                  const pos = getPhotoPosition(photo.id, index);
                  const isDragging = draggingPhotoId === photo.id;

                  return (
                    <div 
                      key={photo.id}
                      className={`draggable-photo-card ${isDragging ? 'is-dragging' : ''} ${isArrangeMode ? 'arrange-ready' : ''}`}
                      style={{
                        transform: `translate3d(${pos.x}px, ${pos.y}px, 0px)`,
                        zIndex: isDragging ? maxZIndex + 10 : pos.zIndex || index + 1
                      }}
                      onPointerDown={(e) => handlePointerDown(e, photo, index)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      role="button"
                      tabIndex={0}
                      aria-label={`${photo.title} (Draggable Photo)`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          openLightbox(index, e);
                        }
                      }}
                    >
                      {/* Photo Thumbnail Wrapper */}
                      <div className="photo-card-media-box">
                        <img 
                          src={photo.src} 
                          alt={photo.title}
                          className="photo-card-img"
                          loading="lazy"
                          draggable={false}
                          onError={(e) => console.error(`Photo load failed (${photo.src}):`, e.target.src)}
                        />
                        <div className="photo-card-glare"></div>

                        {/* Top Category Badge */}
                        <div className="photo-card-tag-badge">
                          {photo.tag}
                        </div>

                        {/* Drag Grip Handle */}
                        {isArrangeMode && (
                          <div className="photo-drag-grip" title="Drag to move">
                            <span>⠿</span>
                          </div>
                        )}

                        {/* Hover View Prompt */}
                        <div className="photo-hover-indicator">
                          <span>🔍 View</span>
                        </div>
                      </div>

                      {/* Photo Card Bottom Info */}
                      <div className="photo-card-caption-bar">
                        <span className="photo-card-number">#{photo.num.toString().padStart(2, '0')}</span>
                        <h5 className="photo-card-name" title={photo.title}>{photo.title}</h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          LEVEL 2 MODAL: FULLSCREEN & CENTERED LIGHTBOX VIEWER
          ============================================================ */}
      {isLightboxOpen && currentLightboxPhoto && (
        <div 
          className="album-lightbox-overlay" 
          onClick={closeLightbox}
        >
          <div 
            className="photo-lightbox-window"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Lightbox Header Bar */}
            <div className="lightbox-top-bar">
              <div className="lightbox-brand-title">
                <span className="album-icon">📷</span> Photo Album &bull; Memories & Moments
              </div>
              <div className="lightbox-counter-badge">
                {lightboxIndex + 1} / {photos.length}
              </div>
              <button 
                className="lightbox-exit-btn" 
                onClick={closeLightbox}
                aria-label="Close Lightbox (Esc)"
                title="Close Lightbox (Esc) & Return to Album"
              >
                ✕
              </button>
            </div>

            {/* Lightbox Center Stage */}
            <div className="lightbox-stage">
              {/* Previous Button */}
              <button 
                className="lightbox-arrow-btn prev-arrow" 
                onClick={prevPhoto}
                aria-label="Previous Photo"
                title="Previous (Left Arrow)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Main Active Photo */}
              <div className={`lightbox-image-wrapper ${isTransitioning ? 'fading' : ''}`}>
                <img 
                  src={currentLightboxPhoto.src} 
                  alt={currentLightboxPhoto.title || "Photo"} 
                  className="lightbox-hero-img"
                  onError={(e) => {
                    console.error("PHOTO LOAD ERROR:", currentLightboxPhoto?.src);
                    e.target.src = '/assets/images/Haribala/haribala-23.jpg';
                  }}
                  onLoad={() => {
                    console.log("Photo loaded successfully:", currentLightboxPhoto?.src);
                  }}
                />
                <div className="lightbox-caption">
                  <span className="caption-text">{currentLightboxPhoto.title}</span>
                  <span className="caption-number">{lightboxIndex + 1} of {photos.length} &bull; {currentLightboxPhoto.tag}</span>
                </div>
              </div>

              {/* Next Button */}
              <button 
                className="lightbox-arrow-btn next-arrow" 
                onClick={nextPhoto}
                aria-label="Next Photo"
                title="Next (Right Arrow)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Bottom Thumbnail Strip for Fast Navigation */}
            <div className="lightbox-thumb-strip-container">
              <div className="lightbox-thumb-strip" ref={thumbStripRef}>
                {photos.map((item, idx) => (
                  <div 
                    key={item.id}
                    className={`lightbox-thumb-item ${idx === lightboxIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      if (e) e.stopPropagation();
                      setLightboxIndex(idx);
                    }}
                    title={item.title}
                  >
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      loading="lazy" 
                      onError={(e) => console.error(`Failed to load thumbnail index ${idx} (${item.src}):`, e.target.src)}
                    />
                    <span className="thumb-idx">{idx + 1}</span>
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

export default PhotoGallery;
