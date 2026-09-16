/* ==========================================================================
   TRANSLATOR.JS - Free MyMemory Translation API Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const fromLangSelect = document.getElementById('fromLang');
  const toLangSelect = document.getElementById('toLang');
  const swapLangBtn = document.getElementById('swapLang');
  const srcTextarea = document.getElementById('srcText');
  const outTextarea = document.getElementById('outText');
  const translateBtn = document.getElementById('translateBtn');

  if (!fromLangSelect || !toLangSelect || !swapLangBtn || !srcTextarea || !outTextarea || !translateBtn) return;

  // Language Swapping logic
  swapLangBtn.addEventListener('click', () => {
    const fromVal = fromLangSelect.value;
    const toVal = toLangSelect.value;

    // Do not swap if source is auto-detect to prevent invalid destination choices
    if (fromVal !== 'auto') {
      fromLangSelect.value = toVal;
      toLangSelect.value = fromVal;
      
      // Swap content as well
      const srcText = srcTextarea.value.trim();
      const outText = outTextarea.value.trim();
      srcTextarea.value = outText;
      outTextarea.value = srcText;
    } else {
      // Highlight selector warning or animate shake briefly
      swapLangBtn.classList.add('shake');
      setTimeout(() => swapLangBtn.classList.remove('shake'), 400);
    }
  });

  // Translation execution
  translateBtn.addEventListener('click', async () => {
    const text = srcTextarea.value.trim();
    if (!text) {
      outTextarea.value = '';
      return;
    }

    const fromLang = fromLangSelect.value === 'auto' ? 'en' : fromLangSelect.value;
    const toLang = toLangSelect.value;

    // Loading State
    translateBtn.innerHTML = 'Translating <i class="fa-solid fa-spinner fa-spin"></i>';
    translateBtn.disabled = true;
    outTextarea.value = 'Translating content into target language...';
    
    // Add glowing effect on output box
    outTextarea.classList.add('translating-glow');

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
      );
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const translatedText = data?.responseData?.translatedText;
      
      if (translatedText) {
        // Render characters with fade-in typing effect
        animateTranslationOutput(translatedText);
      } else {
        outTextarea.value = 'Could not retrieve translation. Please try again.';
      }
    } catch (err) {
      console.error(err);
      outTextarea.value = 'Translation service unavailable. Please check your internet connection.';
    } finally {
      translateBtn.innerHTML = 'Translate ✨';
      translateBtn.disabled = false;
      outTextarea.classList.remove('translating-glow');
    }
  });

  // Visual text output character typing transition
  function animateTranslationOutput(text) {
    outTextarea.value = '';
    let currentIdx = 0;
    
    function appendWord() {
      // Typing by chunks/words to look like real-time translation loading
      const words = text.split(' ');
      if (currentIdx < words.length) {
        outTextarea.value += (currentIdx === 0 ? '' : ' ') + words[currentIdx];
        currentIdx++;
        // Maintain auto scroll height
        outTextarea.scrollTop = outTextarea.scrollHeight;
        setTimeout(appendWord, 40);
      }
    }
    appendWord();
  }
});
