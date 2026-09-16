/* ==========================================================================
   ASSISTANT.JS - AI Chat Assistant UI & Natural Intent Matching
   ========================================================================== */

// Knowledge base definitions
const KNOWLEDGE_BASE = {
  greetings: [
    "Hello! I'm Haribalan S's AI Agent. How can I assist you today?",
    "Welcome! Feel free to ask about my Mechanical Engineering background, Robotics projects, or technical skills."
  ],
  about: "I'm Haribalan S, a motivated Mechanical Engineering student (B.E 2024-2028) at Sri Shakthi Institute of Engineering and Technology. I specialize in design, automation, robotics, and problem-solving.",
  skills: "My technical skills include AutoCAD, SolidWorks, C Programming, Python, Arduino, Basic Electronics, and MS Office.",
  projects: "My featured robotics projects include: 1) Voice Control Robotic Car (SEM 3 using Arduino & HC-05 Bluetooth), 2) Voice Control Mini Forklift (SEM 4 using Arduino automation).",
  contact: "You can reach me via Phone (+91 8870210399), Email (haribalan3333@gmail.com), or LinkedIn (linkedin.com/in/hari-balan-s).",
  education: "I am pursuing B.E Mechanical Engineering (2024-2028) at Sri Shakthi Institute of Engineering and Technology with a CGPA of 8.5. HSC: 80.6%, SSLC: 80.2%.",
  resume: "You can download my full PDF resume directly in the Resume section of this site!",
  default: "I'm still learning that! You can try asking me about my 'skills', 'projects', 'resume', 'contact details', or 'education'."
};

// Natural language intent matcher
window.matchIntent = function(text) {
  text = text.toLowerCase().trim();
  
  if (/hi|hello|hey|greetings|welcome/.test(text)) return knowledge.hello;
  if (/about|who are you|yourself|identity|who is/.test(text)) return knowledge.about;
  if (/skill|technology|stack|tech|framework|languages|code/.test(text)) return knowledge.skills;
  if (/project|work|portfolio|built|create|experience/.test(text)) return knowledge.projects;
  if (/contact|reach|email|linkedin|github|connect|leetcode|phone/.test(text)) return knowledge.contact;
  if (/resume|cv|download/.test(text)) return knowledge.resume;
  
  return knowledge.default;
};

document.addEventListener('DOMContentLoaded', () => {
  const bubble = document.getElementById('chatBubble');
  const assistantSayBox = document.getElementById('assistantSay');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatClear = document.getElementById('chatClear');
  
  let clearBubbleTimeout;

  // Speak response out loud and type it on screen
  window.assistantSay = function(text) {
    if (!text) return;

    // Type text animation in status bar
    if (assistantSayBox) {
      assistantSayBox.innerHTML = '';
      const prefix = document.createElement('span');
      prefix.textContent = '🗣 ';
      assistantSayBox.appendChild(prefix);
      
      const textSpan = document.createElement('span');
      assistantSayBox.appendChild(textSpan);
      
      let charIdx = 0;
      function typeChar() {
        if (charIdx < text.length) {
          textSpan.textContent += text.charAt(charIdx);
          charIdx++;
          setTimeout(typeChar, 25);
        }
      }
      typeChar();
    }

    // Show popup speech bubble
    if (bubble) {
      bubble.textContent = text;
      bubble.classList.add('show');
      
      // Auto-hide bubble after 6 seconds of idle
      clearTimeout(clearBubbleTimeout);
      clearBubbleTimeout = setTimeout(() => {
        bubble.classList.remove('show');
      }, 6000);
    }

    // Speech Synthesis output
    if (window.assistantVoiceSpeak) {
      window.assistantVoiceSpeak(text);
    }

    // Auto-scroll to section if mentioned in the query
    if (/project/i.test(text)) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (/skill/i.test(text)) {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (/contact|reach/i.test(text)) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (/about|who/i.test(text)) {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (/resume/i.test(text)) {
      document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick Action Buttons
  document.querySelectorAll('.qa-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const intentKey = btn.getAttribute('data-say');
      const response = knowledge[intentKey] || knowledge.default;
      window.assistantSay(response);
    });
  });

  // Chat sending handling
  if (chatSend && chatInput) {
    chatSend.addEventListener('click', processChatInput);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') processChatInput();
    });
  }

  function processChatInput() {
    const text = chatInput.value.trim();
    if (!text) return;

    const matchedResponse = window.matchIntent(text);
    window.assistantSay(matchedResponse);
    chatInput.value = '';
  }

  // Clear chat logs
  if (chatClear) {
    chatClear.addEventListener('click', () => {
      if (assistantSayBox) assistantSayBox.textContent = '';
      if (bubble) bubble.classList.remove('show');
      if (chatInput) chatInput.value = '';
      // Cancel speech synthesizers
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    });
  }
});
