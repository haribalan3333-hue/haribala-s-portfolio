import React from 'react';
import SnakeGame from './components/GameZone/SnakeGame';
import LudoGame from './components/GameZone/LudoGame';
import TicTacToe from './components/GameZone/TicTacToe';
import PhotoGallery from './components/Gallery/PhotoGallery';
import VideoGallery from './components/Gallery/VideoGallery';
import Translator from './components/Translator/Translator';
import AIAssistant from './components/AIAssistant/AIAssistant';

export function GameZoneLeft() {
  return (
    <>
      <SnakeGame />
      <LudoGame />
    </>
  );
}

export function GameZoneRight() {
  return (
    <TicTacToe />
  );
}

export function GallerySection() {
  return (
    <>
      <PhotoGallery />
      <VideoGallery />
    </>
  );
}

export function TranslatorWidget() {
  return (
    <Translator />
  );
}

export function AIAssistantWidget() {
  return (
    <AIAssistant />
  );
}

export default function App() {
  return null;
}
