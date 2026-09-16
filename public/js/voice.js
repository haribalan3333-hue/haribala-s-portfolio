/* ==========================================================================
   VOICE.JS - Speech Recognition & Synthesis for Futuristic AI Assistant
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const talkBtn = document.getElementById('talkBtn');
  const listenTag = document.getElementById('listenTag');
  const waveBars = document.getElementById('waveBars');

  // Speech Recognition API setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;
  let isListening = false;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    // Recognition event hooks
    recognition.onstart = () => {
      isListening = true;
      if (talkBtn) {
        talkBtn.classList.add('listening');
        talkBtn.innerHTML = '🎙️ Listening...';
      }
      if (listenTag) listenTag.style.display = 'inline-flex';
      if (waveBars) waveBars.classList.add('active');
    };

    recognition.onend = () => {
      isListening = false;
      if (talkBtn) {
        talkBtn.classList.remove('listening');
        talkBtn.innerHTML = '🎙️ Talk With Me';
      }
      if (listenTag) listenTag.style.display = 'none';
      if (waveBars) waveBars.classList.remove('active');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (window.matchIntent && window.assistantSay) {
        const response = window.matchIntent(transcript);
        window.assistantSay(response);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error: ', event.error);
      if (window.assistantSay) {
        window.assistantSay("I couldn't hear that clearly. Could you please try again or type below?");
      }
    };
  }

  // Trigger speech recognition on button click
  if (talkBtn) {
    talkBtn.addEventListener('click', () => {
      if (!SpeechRecognition) {
        if (window.assistantSay) {
          window.assistantSay("Voice input isn't supported in this browser. Please try Chrome/Edge or type your question below.");
        }
        return;
      }

      if (isListening) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (err) {
          console.warn("Recognition already started: ", err);
        }
      }
    });
  }

  // Voice synthesis speaker
  window.assistantVoiceSpeak = function(text) {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get all available system voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a high quality premium/futuristic english voice
      // Usually Google US English, Microsoft David, or Apple Samantha
      const selectedVoice = voices.find(voice => 
        (voice.lang === 'en-US' || voice.lang === 'en-GB') && 
        (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Premium'))
      ) || voices.find(voice => voice.lang.startsWith('en'));

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = 1.05; // Slightly faster for natural futuristic flow
      utterance.pitch = 1.0;
      
      // Trigger voice amplitude bars animation when voice starts
      utterance.onstart = () => {
        if (waveBars) waveBars.classList.add('active');
      };
      
      utterance.onend = () => {
        if (waveBars) waveBars.classList.remove('active');
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Necessary fallback triggers for Chrome getting voice list asynchronously
  if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      // Populate voice options implicitly
      window.speechSynthesis.getVoices();
    };
  }

  // Welcome voice greeting on page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.assistantSay) {
        window.assistantSay("Hi! I'm Hari's digital assistant. Click the microphone button to talk with me, or ask anything!");
      }
    }, 1500);
  });
});
