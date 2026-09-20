/* ==========================================================================
   TRANSLATOR.JS - Interactive Language Translator Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const fromLangSelect = document.getElementById('fromLang');
  const toLangSelect = document.getElementById('toLang');
  const swapLangBtn = document.getElementById('swapLang');
  const srcTextarea = document.getElementById('srcText');
  const outTextarea = document.getElementById('outText');
  const translateBtn = document.getElementById('translateBtn');
  const copyBtn = document.getElementById('copyTransBtn');
  const clearBtn = document.getElementById('clearTransBtn');

  if (!fromLangSelect || !toLangSelect || !swapLangBtn || !srcTextarea || !outTextarea || !translateBtn) {
    return;
  }

  // 1. Language Swapping logic
  swapLangBtn.addEventListener('click', () => {
    const fromVal = fromLangSelect.value;
    const toVal = toLangSelect.value;

    if (fromVal === 'auto') {
      // If auto-detect was selected, swap by setting source to the previous target and target to 'en'
      fromLangSelect.value = toVal;
      toLangSelect.value = toVal === 'en' ? 'ta' : 'en';
    } else {
      fromLangSelect.value = toVal;
      toLangSelect.value = fromVal;
    }

    // Swap textarea contents as well if text is present
    const srcVal = srcTextarea.value;
    const outVal = outTextarea.value;
    if (srcVal || outVal) {
      srcTextarea.value = outVal;
      outTextarea.value = srcVal;
    }

    // Trigger visual spin feedback
    swapLangBtn.classList.add('swapping');
    setTimeout(() => swapLangBtn.classList.remove('swapping'), 400);
  });

  // 2. Translation Execution
  translateBtn.addEventListener('click', async () => {
    const text = srcTextarea.value.trim();
    if (!text) {
      outTextarea.value = '';
      outTextarea.setAttribute('placeholder', 'Please enter some text to translate first.');
      srcTextarea.focus();
      return;
    }

    const fromLang = fromLangSelect.value || 'auto';
    const toLang = toLangSelect.value || 'en';

    // Loading State
    const originalBtnHtml = translateBtn.innerHTML;
    translateBtn.innerHTML = 'Translating <i class="fa-solid fa-spinner fa-spin"></i>';
    translateBtn.disabled = true;
    outTextarea.value = '';
    outTextarea.setAttribute('placeholder', 'Translating content into target language...');
    outTextarea.classList.add('translating-glow');

    try {
      let translatedText = '';
      if (typeof window.translateText === 'function') {
        translatedText = await window.translateText(text, fromLang, toLang);
      } else {
        // Direct fallback if service script loaded late
        const fallbackUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
          fromLang
        )}&tl=${encodeURIComponent(toLang)}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(fallbackUrl);
        const data = await res.json();
        translatedText = data[0].map((c) => c[0]).filter(Boolean).join('');
      }

      if (translatedText) {
        animateTranslationOutput(translatedText);
      } else {
        outTextarea.value = '';
        outTextarea.setAttribute('placeholder', 'Translation service is currently unavailable. Please try again.');
      }
    } catch (err) {
      console.error('Translation error:', err);
      outTextarea.value = '';
      outTextarea.setAttribute('placeholder', 'Translation service is currently unavailable. Please try again.');
    } finally {
      translateBtn.innerHTML = originalBtnHtml;
      translateBtn.disabled = false;
      outTextarea.classList.remove('translating-glow');
    }
  });

  // 3. Smooth animated output display
  function animateTranslationOutput(text) {
    outTextarea.value = '';
    const words = text.split(' ');
    let currentIdx = 0;

    // For short text, show immediately to prevent lag
    if (words.length <= 4) {
      outTextarea.value = text;
      return;
    }

    function appendWord() {
      if (currentIdx < words.length) {
        outTextarea.value += (currentIdx === 0 ? '' : ' ') + words[currentIdx];
        currentIdx++;
        outTextarea.scrollTop = outTextarea.scrollHeight;
        setTimeout(appendWord, 25);
      }
    }
    appendWord();
  }

  // 4. Copy Translation to Clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = outTextarea.value.trim();
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied! ✓</span>';
        copyBtn.classList.add('btn-copied');
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.classList.remove('btn-copied');
        }, 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
    });
  }

  // 5. Clear Functionality
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      srcTextarea.value = '';
      outTextarea.value = '';
      outTextarea.setAttribute('placeholder', 'Translation will appear here...');
      srcTextarea.focus();
    });
  }
});
