import React, { useState } from 'react';

const PhotoGallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const samplePhotos = [
    { id: 1, category: 'Personal', title: 'Hari Bala Profile', src: 'assets/images/hari.jpeg' },
    { id: 2, category: 'College', title: 'Campus & Tech Events', src: 'assets/images/hari.jpeg' },
    { id: 3, category: 'Projects', title: 'AI Portfolio Build', src: 'assets/images/hari.jpeg' },
    { id: 4, category: 'Certificates', title: 'Full Stack Engineering', src: 'assets/images/hari.jpeg' },
  ];

  const categories = ['All', 'Personal', 'College', 'Projects', 'Certificates'];

  const filteredPhotos = activeCategory === 'All'
    ? samplePhotos
    : samplePhotos.filter(p => p.category === activeCategory);

  return (
    <div class="gallery-section">
      <div class="gallery-header">
        <h3 style={{ color: 'var(--gold-primary, #D4AF37)', fontFamily: 'var(--font-display, sans-serif)', fontSize: '22px' }}>
          📷 Photo Gallery ({filteredPhotos.length})
        </h3>
        <div class="gallery-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              class={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div class="photo-grid">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            class="photo-card"
            onClick={() => setLightboxImg(photo.src)}
          >
            <img src={photo.src} alt={photo.title} />
            <div class="photo-overlay">
              <span class="photo-title">{photo.title}</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxImg && (
        <div class="lightbox-modal" onClick={() => setLightboxImg(null)}>
          <div class="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button class="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
            <img src={lightboxImg} alt="Enlarged view" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
