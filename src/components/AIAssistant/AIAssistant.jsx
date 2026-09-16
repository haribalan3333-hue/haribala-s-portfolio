import React, { useState, useEffect, useRef } from 'react';

const SUGGESTED_QUESTIONS = [
  "Who is Haribalan S?",
  "Show Robotics & Automation Projects",
  "What technical skills do you have?",
  "Explain Mechanical Engineering & Arduino",
  "How to contact Haribalan?"
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm Haribalan's 3D AI Virtual Assistant. Ask me anything about his Mechanical Engineering background, Robotics projects, programming skills, or career guidance!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Speech Synthesis (Text-to-Speech)
  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Friendly female pitch
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition (Speech-to-Text)
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // Intelligent Response Generator
  const generateResponse = (userQuery) => {
    const query = userQuery.toLowerCase();

    if (query.includes('who') || query.includes('haribalan') || query.includes('about')) {
      return "Haribalan S is a motivated Mechanical Engineering student (B.E 2024–2028 @ Sri Shakthi Institute of Engineering and Technology) with a CGPA of 8.5. He specializes in design, automation, robotics, and problem-solving.";
    }

    if (query.includes('project') || query.includes('robot') || query.includes('forklift') || query.includes('car')) {
      return "Haribalan's key Robotics projects are:\n1. 🚗 **Voice Control Robotic Car (SEM 3)**: Designed using Arduino Uno, HC-05 Bluetooth, & Android speech navigation.\n2. 🚜 **Voice Control Mini Forklift (SEM 4)**: Voice-operated industrial automation forklift using Arduino.";
    }

    if (query.includes('skill') || query.includes('tech') || query.includes('autocad') || query.includes('solidworks')) {
      return "Haribalan's technical skills include AutoCAD, SolidWorks, C Programming, Python, Arduino, Basic Electronics, and MS Office.";
    }

    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('mobile')) {
      return "You can reach Haribalan via:\n📞 Phone: +91 8870210399\n✉️ Email: haribalan3333@gmail.com\n💼 LinkedIn: linkedin.com/in/hari-balan-s-82b356247";
    }

    if (query.includes('education') || query.includes('college') || query.includes('school')) {
      return "🎓 **Education Timeline**:\n- B.E. Mechanical Engineering (2024-2028) @ Sri Shakthi Institute (CGPA 8.5)\n- HSC (2023-2024) @ Bishop Heber (80.6%)\n- SSLC (2021-2022) @ Sri Ramakrishna Vidyalaya (80.2%)";
    }

    if (query.includes('arduino') || query.includes('python') || query.includes('react') || query.includes('html') || query.includes('css') || query.includes('javascript')) {
      return "Great technical question! Haribalan utilizes C Programming and Python for embedded Arduino automation, while using HTML5, CSS3, JavaScript, and React to build futuristic web interfaces.";
    }

    return "That's an insightful question! I am Haribalan's 3D AI Assistant. Feel free to ask me about his B.E Mechanical Engineering background, Robotics projects (Voice Control Car & Forklift), AutoCAD/SolidWorks skills, or contact info!";
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponseText = generateResponse(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      speakText(botResponseText);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "Chat cleared! How can I assist you now?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div class="ai-assistant-widget">
      {/* 3D Avatar FAB Button */}
      <div class="ai-fab" onClick={() => setIsOpen(!isOpen)}>
        <div class={`avatar-3d-head ${isSpeaking ? 'avatar-speaking' : ''}`}>
          <div class="avatar-face">
            <div class="avatar-eyes">
              <div class="avatar-eye"></div>
              <div class="avatar-eye"></div>
            </div>
            <div class="avatar-mouth"></div>
          </div>
        </div>
        <div class="ai-fab-label">
          <span>AI Girl Avatar</span>
          <span class="ai-fab-status">{isSpeaking ? 'Speaking...' : isTyping ? 'Typing...' : 'Online • 3D AI'}</span>
        </div>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div class="ai-chat-window">
          {/* Header */}
          <div class="ai-chat-header">
            <div class="header-left">
              <div class={`avatar-3d-head ${isSpeaking ? 'avatar-speaking' : ''}`}>
                <div class="avatar-face">
                  <div class="avatar-eyes">
                    <div class="avatar-eye"></div>
                    <div class="avatar-eye"></div>
                  </div>
                  <div class="avatar-mouth"></div>
                </div>
              </div>
              <div class="header-info">
                <h4>Cyber Girl AI</h4>
                <span>Virtual Portfolio Assistant</span>
              </div>
            </div>
            <div class="header-actions">
              <button
                class={`icon-btn-sm ${voiceEnabled ? 'active' : ''}`}
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
              >
                {voiceEnabled ? '🔊' : '🔇'}
              </button>
              <button class="icon-btn-sm" onClick={clearChat} title="Clear Chat">
                🗑️
              </button>
              <button class="icon-btn-sm" onClick={() => setIsOpen(false)} title="Minimize">
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div class="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} class={`msg-row ${msg.sender}`}>
                <div class="msg-bubble">
                  {msg.text.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
                <div class="msg-time">{msg.time}</div>
                {msg.sender === 'bot' && (
                  <div class="msg-actions">
                    <button class="msg-act-btn" onClick={() => copyToClipboard(msg.text)}>📋 Copy</button>
                    <button class="msg-act-btn" onClick={() => speakText(msg.text)}>🔊 Speak</button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div class="msg-row bot">
                <div class="msg-bubble">
                  <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pill Suggestions */}
          <div class="quick-pills">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button key={idx} class="pill-btn" onClick={() => handleSend(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div class="ai-chat-input-bar">
            <button
              class={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
              title="Voice Input (Speech-to-Text)"
            >
              🎤
            </button>
            <textarea
              class="chat-input"
              placeholder="Ask AI anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button class="send-btn" onClick={() => handleSend()} title="Send Message">
              ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
