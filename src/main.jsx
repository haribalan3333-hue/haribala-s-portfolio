import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameZoneLeft, GameZoneRight, GallerySection, TranslatorWidget, AIAssistantWidget } from './App';

// Import CSS
import './styles/games.css';
import './styles/gallery.css';
import './styles/translator.css';
import './styles/assistant.css';

function mountAll() {
  // Game Zone Left
  const gameZoneLeft = document.getElementById('react-game-zone-left');
  if (gameZoneLeft && !gameZoneLeft.dataset.mounted) {
    gameZoneLeft.dataset.mounted = 'true';
    ReactDOM.createRoot(gameZoneLeft).render(
      <React.StrictMode>
        <GameZoneLeft />
      </React.StrictMode>
    );
  }

  // Game Zone Right
  const gameZoneRight = document.getElementById('react-game-zone-right');
  if (gameZoneRight && !gameZoneRight.dataset.mounted) {
    gameZoneRight.dataset.mounted = 'true';
    ReactDOM.createRoot(gameZoneRight).render(
      <React.StrictMode>
        <GameZoneRight />
      </React.StrictMode>
    );
  }

  // Gallery
  const galleryRoot = document.getElementById('react-gallery-root');
  if (galleryRoot && !galleryRoot.dataset.mounted) {
    galleryRoot.dataset.mounted = 'true';
    ReactDOM.createRoot(galleryRoot).render(
      <React.StrictMode>
        <GallerySection />
      </React.StrictMode>
    );
  }

  // Translator
  const translatorRoot = document.getElementById('react-translator-root');
  if (translatorRoot && !translatorRoot.dataset.mounted) {
    translatorRoot.dataset.mounted = 'true';
    ReactDOM.createRoot(translatorRoot).render(
      <React.StrictMode>
        <TranslatorWidget />
      </React.StrictMode>
    );
  }

  // 3D Girl AI Assistant
  const aiAssistantRoot = document.getElementById('react-ai-assistant-root');
  if (aiAssistantRoot && !aiAssistantRoot.dataset.mounted) {
    aiAssistantRoot.dataset.mounted = 'true';
    ReactDOM.createRoot(aiAssistantRoot).render(
      <React.StrictMode>
        <AIAssistantWidget />
      </React.StrictMode>
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAll);
} else {
  mountAll();
}
