/* ==========================================================================
   TRANSLATION SERVICE - Clean Abstraction for Multi-Language Translation
   ========================================================================== */

/**
 * Supported Language Map with Display Names & ISO codes
 */
const SUPPORTED_LANGUAGES = {
  auto: 'Detect Language',
  en: 'English',
  ta: 'Tamil',
  si: 'Sinhala',
  hi: 'Hindi',
  ml: 'Malayalam',
  te: 'Telugu',
  kn: 'Kannada',
  bn: 'Bengali',
  mr: 'Marathi',
  gu: 'Gujarati',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  ja: 'Japanese',
  ko: 'Korean',
  'zh-CN': 'Chinese'
};

/**
 * Translates text from sourceLanguage to targetLanguage
 * Uses Google Translate API with MyMemory as resilient fallback
 *
 * @param {string} text - Text to translate
 * @param {string} sourceLanguage - Source ISO code or 'auto'
 * @param {string} targetLanguage - Target ISO code
 * @returns {Promise<string>} - Translated text
 */
async function translateText(text, sourceLanguage = 'auto', targetLanguage = 'en') {
  const trimmed = (text || '').trim();
  if (!trimmed) {
    return '';
  }

  // If source and target are identical and not auto, return source text directly
  if (sourceLanguage !== 'auto' && sourceLanguage === targetLanguage) {
    return trimmed;
  }

  const src = sourceLanguage || 'auto';
  const target = targetLanguage || 'en';

  // 1. Check if an environment-configured or proxy translation API is provided
  const customApiUrl = (typeof window !== 'undefined' && window.__VITE_TRANSLATION_API_URL__) || '';
  if (customApiUrl) {
    try {
      const customRes = await fetch(customApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: trimmed, source: src, target: target })
      });
      if (customRes.ok) {
        const customData = await customRes.json();
        const result = customData.translatedText || customData.translation || customData.result;
        if (result) return result;
      }
    } catch (e) {
      console.warn('Custom translation API fallback to public engine:', e);
    }
  }

  // 2. Primary Engine: Google Translate Public Endpoint (fast, browser-safe, high accuracy)
  try {
    const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
      src
    )}&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(trimmed)}`;

    const response = await fetch(googleUrl);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const combined = data[0]
          .map((chunk) => (Array.isArray(chunk) ? chunk[0] : ''))
          .filter(Boolean)
          .join('');
        if (combined && combined.trim()) {
          return combined;
        }
      }
    }
  } catch (primaryError) {
    console.warn('Primary translation provider error, attempting fallback:', primaryError);
  }

  // 3. Resilient Secondary Engine: MyMemory Translation API
  try {
    const fallbackSrc = src === 'auto' ? 'en' : src;
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      trimmed
    )}&langpair=${encodeURIComponent(fallbackSrc)}|${encodeURIComponent(target)}`;

    const response = await fetch(myMemoryUrl);
    if (response.ok) {
      const data = await response.json();
      const result = data?.responseData?.translatedText;
      // Filter out MyMemory quota warning strings
      if (
        result &&
        !result.startsWith('MYMEMORY WARNING') &&
        data.responseStatus === 200
      ) {
        return result;
      }
    }
  } catch (fallbackError) {
    console.warn('Fallback translation provider error:', fallbackError);
  }

  // If both fail, throw user-friendly error
  throw new Error('Translation service is currently unavailable. Please try again.');
}

// Attach to global window object for script tag loading
if (typeof window !== 'undefined') {
  window.translateText = translateText;
  window.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
}

// Also support ES module exports
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translateText, SUPPORTED_LANGUAGES };
}
