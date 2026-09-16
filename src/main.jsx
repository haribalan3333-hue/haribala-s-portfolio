import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameZoneLeft, GameZoneRight, GallerySection, TranslatorWidget, AIAssistantWidget } from './App';

// Import CSS
import './styles/games.css';
import './styles/gallery.css';
import './styles/translator.css';
import './styles/assistant.css';

document.addEventListener('DOMContentLoaded', () => {
  // Game Zone Left
  const gameZoneLeft = document.getElementById('react-game-zone-left');
  if (gameZoneLeft) {
    ReactDOM.createRoot(gameZoneLeft).render(
      <React.StrictMode>
        <GameZoneLeft />
      </React.StrictMode>
    );
  }

  // Game Zone Right
  const gameZoneRight = document.getElementById('react-game-zone-right');
  if (gameZoneRight) {
    ReactDOM.createRoot(gameZoneRight).render(
      <React.StrictMode>
        <GameZoneRight />
      </React.StrictMode>
    );
  }

  // Gallery
  const galleryRoot = document.getElementById('react-gallery-root');
  if (galleryRoot) {
    ReactDOM.createRoot(galleryRoot).render(
      <React.StrictMode>
        <GallerySection />
      </React.StrictMode>
    );
  }

  // Translator
  const translatorRoot = document.getElementById('react-translator-root');
  if (translatorRoot) {
    ReactDOM.createRoot(translatorRoot).render(
      <React.StrictMode>
        <TranslatorWidget />
      </React.StrictMode>
    );
  }

  // 3D Girl AI Assistant
  const aiAssistantRoot = document.getElementById('react-ai-assistant-root');
  if (aiAssistantRoot) {
    ReactDOM.createRoot(aiAssistantRoot).render(
      <React.StrictMode>
        <AIAssistantWidget />
      </React.StrictMode>
    );
  }
});
