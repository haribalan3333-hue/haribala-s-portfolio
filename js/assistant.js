/* ==========================================================================
   ASSISTANT.JS - AI Chat Assistant UI & Natural Intent Matching
   ========================================================================== */

// MASTER PERSONAL PROFILE OBJECT FOR HARIBALAN S
const personalProfile = {
  name: "Haribalan S",
  displayName: "Hari Balan",
  tagline: "Build • Create • Grow",
  professionalIdentity: [
    "Mechanical Engineering Student",
    "Python Developer",
    "AI/ML Enthusiast",
    "Problem Solver"
  ],
  about: "Hari Balan is a motivated and versatile Mechanical Engineering student with a strong interest in Python, Artificial Intelligence and Automation. He is interested in combining Mechanical Engineering with software, Artificial Intelligence, Machine Learning, Robotics and Automation. He has a strong problem-solving mindset and enjoys learning new technologies. He wants to apply his technical skills, problem-solving ability and continuous learning mindset to contribute to innovative projects and build a successful career in engineering and IT.",
  education: {
    degree: "B.E. Mechanical Engineering",
    college: "Sri Shakthi Institute of Engineering and Technology",
    location: "Coimbatore, Tamil Nadu, India",
    batch: "2024–2028",
    cgpa: "8.5"
  },
  academicHistory: {
    hsc: {
      institution: "Bishop Heber Higher Secondary School",
      year: "2021–2022",
      percentage: "80.6%"
    },
    sslc: {
      institution: "Sri Ramakrishna Vidyalaya Matriculation School",
      year: "2023–2024",
      percentage: "80.2%"
    }
  },
  personalBackground: {
    native: "Paramakudi area, Ramanathapuram district, Tamil Nadu, India",
    location: "Tamil Nadu, India",
    dob: "03/12/2006",
    gender: "Male",
    nationality: "Indian",
    maritalStatus: "Single",
    family: {
      sister: true,
      count: 1,
      twins: true,
      sisterName: "I don't have his sister's name in Hari Balan's portfolio information."
    }
  },
  personalPreferences: {
    favoriteColor: "Yellow",
    favoriteHero: "Ajith Kumar",
    favoriteHeroine: "Sai Pallavi"
  },
  contact: {
    phone: "+91 8870210399",
    email: "haribalans24me@srishakthi.ac.in",
    address: "197/B, Tharmanagar, Mathur, Pudukkottai, Kulathur Taluk, Tamil Nadu - 622515, India",
    social: {
      github: "https://github.com/haribalan3333-huegithub",
      linkedin: "https://www.linkedin.com/in/hari-balan-s-82b356247/",
      instagram: "https://www.instagram.com/balan_hari_003/"
    }
  },
  skills: {
    programming: ["Python", "HTML", "CSS", "JavaScript", "SQL", "MySQL"],
    data: ["Pandas", "NumPy", "Data Analysis"],
    mechanical: ["AutoCAD 2D", "AutoCAD 3D", "SolidWorks", "Basic Electronics", "Manufacturing Basics", "Assembly Basics"],
    ai_ml: ["Artificial Intelligence", "Machine Learning", "Data Analysis", "Deep Learning", "TensorFlow", "Keras", "CNN", "Logistic Regression", "Random Forest"],
    tools: ["Arduino IDE", "MATLAB Basics", "Jupyter Notebook", "TensorFlow", "Keras", "Git", "GitHub", "VS Code"],
    robotics: ["Robotics", "Automation", "Arduino", "Bluetooth-based control", "Voice-controlled systems", "Mechanical automation"]
  },
  internships: [
    {
      company: "TVS Vehicle Mobility Solution",
      location: "Coimbatore",
      experience: "Exposure to the automotive sector and vehicle mobility systems."
    },
    {
      company: "Tenneco Clean Air India Limited",
      location: "Oragadam",
      experience: "Gained practical knowledge in vehicle assembly, maintenance and customer service operations."
    },
    {
      company: "Reliable Motors CV (Mahindra)",
      location: "Coimbatore",
      experience: "Exposure to real-world working environment and team collaboration."
    }
  ],
  projects: [
    {
      id: "car",
      title: "Voice Control Robotic Car",
      category: "Mechanical / Robotics",
      description: "Designed and implemented a voice-controlled robotic car using Arduino Uno, HC-05 Bluetooth, Android application, voice commands, and motor control. The project combines mechanical and electronic concepts with voice-based control."
    },
    {
      id: "forklift",
      title: "Voice Control Mini Forklift",
      category: "Mechanical / Robotics",
      description: "Developed a voice-operated mini forklift using Arduino and implemented a voice-command control system with a mechanical lifting mechanism, robotics, and automation."
    },
    {
      id: "diabetes",
      title: "Diabetes Prediction using Machine Learning",
      category: "Python / Machine Learning",
      description: "Built an academic classification model to predict diabetes using Machine Learning algorithms including Logistic Regression and Random Forest with Python."
    },
    {
      id: "cnn",
      title: "Image Classification with CNN",
      category: "Python / Deep Learning",
      description: "Developed a Convolutional Neural Network (CNN) model using Python, TensorFlow, and Keras to classify images such as CIFAR-10 datasets."
    }
  ],
  strengths: [
    "Quick Learner",
    "Problem Solver",
    "Adaptable to New Technologies",
    "Good Team Player",
    "Strong Communication Skills",
    "Positive Attitude",
    "Goal Oriented"
  ],
  languages: {
    Tamil: "Native",
    English: "Fluent",
    Hindi: "Basic"
  },
  interests: [
    "Robotics & Automation",
    "Coding & Programming",
    "Mechanical Design",
    "Photography",
    "Nature & Outdoor Exposure"
  ],
  careerDirection: "Hari Balan is building a multidisciplinary profile combining Mechanical Engineering with software, AI/ML, robotics and automation. His career interests include Mechanical Engineering, Python Development, Artificial Intelligence, Machine Learning, Robotics, Automation, Software Development, Web Development, and Technical Problem Solving."
};

let lastIntentTopic = '';

// Natural language intent matcher
window.matchIntent = function(rawText) {
  if (!rawText) return "How can I assist you with Hari Balan's portfolio?";
  const query = rawText.toLowerCase().trim();

  // 1. Security / System prompt protection
  if (/system\s*prompt|prompt\b|instructions\b|hidden\s*prompt|source\s*code|internal\s*instructions/.test(query)) {
    lastIntentTopic = 'security';
    return "I can help with Hari Balan's portfolio information, but I can't provide internal system instructions.";
  }

  // 2. 30-Second Elevator Pitch / Brief Intro
  if (/30\s*sec|elevator\s*pitch|in\s*a\s*nutshell|brief\s*intro|quick\s*summary|30\s*second/.test(query)) {
    lastIntentTopic = 'intro';
    return "Hari Balan is a Mechanical Engineering student at Sri Shakthi Institute of Engineering and Technology, pursuing B.E. Mechanical Engineering from 2024 to 2028 with a CGPA of 8.5. He is interested in Python, AI/ML, robotics, automation and software development. His projects include a voice-controlled robotic car, mini forklift, diabetes prediction system and CNN image classification. He has also gained industrial exposure at TVS Vehicle Mobility Solution, Tenneco Clean Air India and Reliable Motors CV.";
  }

  // 3. Detailed Introduction / Tell Me Everything
  if (/tell\s*me\s*everything|everything\s*you\s*know|detailed\s*intro|explain\s*in\s*detail|tell\s*me\s*more|give\s*complete\s*info|explain\s*everything|complete\s*profile/.test(query)) {
    lastIntentTopic = 'detailed';
    return "Hari Balan is a motivated Mechanical Engineering student at Sri Shakthi Institute of Engineering and Technology (2024–2028 batch, CGPA: 8.5) with a strong focus on Python, AI/ML, Robotics and Automation.\n\nEducation:\n- B.E. Mechanical Engineering @ Sri Shakthi Institute (CGPA: 8.5)\n- HSC @ Bishop Heber Higher Secondary School (80.6%)\n- SSLC @ Sri Ramakrishna Vidyalaya Matriculation School (80.2%)\n\nProjects:\n1. Voice Control Robotic Car\n2. Voice Control Mini Forklift\n3. Diabetes Prediction using Machine Learning\n4. Image Classification with CNN\n\nIndustrial Exposure:\n- TVS Vehicle Mobility Solution (Coimbatore)\n- Tenneco Clean Air India Limited (Oragadam)\n- Reliable Motors CV Mahindra (Coimbatore)\n\nSkills: Python, Machine Learning, TensorFlow, Keras, AutoCAD (2D/3D), SolidWorks, Arduino IDE, SQL, HTML/CSS/JS.\nNative: Paramakudi area, Ramanathapuram district, Tamil Nadu.";
  }

  // 4. Personal Preferences (Color, Hero/Actor, Heroine/Actress)
  if (/favou?rite\s*colo?u?r/.test(query) || (lastIntentTopic === 'preferences' && /colo?u?r/.test(query))) {
    lastIntentTopic = 'preferences';
    return "Hari Balan's favorite color is yellow.";
  }

  if (/favou?rite\s*(hero|actor)\b/.test(query) || (lastIntentTopic === 'heroine' && /(hero|actor)\b/.test(query)) || (lastIntentTopic === 'preferences' && /(hero|actor)\b/.test(query))) {
    lastIntentTopic = 'hero';
    return "Hari Balan's favorite hero is Ajith Kumar.";
  }

  if (/favou?rite\s*(heroine|actress)\b/.test(query) || (lastIntentTopic === 'hero' && /(heroine|actress)\b/.test(query)) || (lastIntentTopic === 'preferences' && /(heroine|actress)\b/.test(query))) {
    lastIntentTopic = 'heroine';
    return "Hari Balan's favorite heroine is Sai Pallavi.";
  }

  if (/personal\s*preferences|preferences|all\s*preferences|favorite\s*things|favourites/.test(query)) {
    lastIntentTopic = 'preferences';
    return "Hari Balan's favorite color is yellow. His favorite hero is Ajith Kumar, and his favorite heroine is Sai Pallavi.";
  }

  // Follow-ups on Preferences
  if (lastIntentTopic === 'hero' && (/heroine|actress|what\s*about.*heroine|what\s*about.*actress/.test(query))) {
    lastIntentTopic = 'heroine';
    return "Hari Balan's favorite heroine is Sai Pallavi.";
  }
  if (lastIntentTopic === 'heroine' && (/hero|actor|what\s*about.*hero|what\s*about.*actor/.test(query))) {
    lastIntentTopic = 'hero';
    return "Hari Balan's favorite hero is Ajith Kumar.";
  }

  // 5. CGPA / Academic score / Grades
  if (/cgpa|academic\s*score|gpa|marks|score|percentage/.test(query)) {
    lastIntentTopic = 'education';
    return "Hari Balan's current CGPA is 8.5 in B.E. Mechanical Engineering at Sri Shakthi Institute of Engineering and Technology.";
  }

  // 6. Education / Degree / College / School
  if (/hsc|higher\s*secondary/.test(query)) {
    lastIntentTopic = 'education';
    return "Hari Balan completed HSC at Bishop Heber Higher Secondary School (2021–2022) with 80.6%.";
  }
  if (/sslc|secondary\s*school|10th/.test(query)) {
    lastIntentTopic = 'education';
    return "Hari Balan completed SSLC at Sri Ramakrishna Vidyalaya Matriculation School (2023–2024) with 80.2%.";
  }
  if (/what.*study|degree|which\s*college|where.*study|studying|education|academic|b\.?e\.?|school/.test(query)) {
    lastIntentTopic = 'education';
    return "Hari Balan is pursuing B.E. Mechanical Engineering at Sri Shakthi Institute of Engineering and Technology in Coimbatore, from the 2024–2028 batch with a CGPA of 8.5.";
  }

  // 7. Specific Projects
  if (/robotic\s*car|voice.*car|bluetooth\s*car|car\s*project/.test(query)) {
    lastIntentTopic = 'projects';
    return "Voice Control Robotic Car (Mechanical / Robotics): Designed and implemented a voice-controlled robotic car using Arduino Uno, HC-05 Bluetooth, an Android app, voice commands, and motor control, combining mechanical and electronic concepts with voice-based control.";
  }

  if (/forklift|mini\s*forklift|lifting\s*project/.test(query)) {
    lastIntentTopic = 'projects';
    return "Voice Control Mini Forklift (Mechanical / Robotics): Developed a voice-operated mini forklift using Arduino and implemented a voice-command control system with a mechanical lifting mechanism, robotics, and automation.";
  }

  if (/diabetes|diabetes\s*prediction/.test(query)) {
    lastIntentTopic = 'projects';
    return "Diabetes Prediction using Machine Learning (Python / Machine Learning): Built an academic classification model to predict diabetes using Machine Learning algorithms including Logistic Regression and Random Forest with Python.";
  }

  if (/cnn|image\s*classification|cifar/.test(query)) {
    lastIntentTopic = 'projects';
    return "Image Classification with CNN (Python / Deep Learning): Developed a Convolutional Neural Network model using Python, TensorFlow, and Keras to classify images from benchmarks such as the CIFAR-10 dataset.";
  }

  if (/what.*projects|show.*projects|projects.*done|built|portfolio\s*projects|list.*projects|all\s*projects|project\b/.test(query)) {
    lastIntentTopic = 'projects';
    return "Hari Balan has worked on four main projects: 1) Voice Control Robotic Car, 2) Voice Control Mini Forklift, 3) Diabetes Prediction using Machine Learning, and 4) Image Classification using CNN.";
  }

  // 8. Specific Skills
  if (/programming\s*languages?|coding\s*languages?|languages.*code|what\s*code/.test(query)) {
    lastIntentTopic = 'skills';
    return "Hari Balan's programming and data skills include Python, SQL (MySQL), HTML, CSS, JavaScript, Pandas, NumPy, and Data Analysis.";
  }

  if (/mechanical\s*skills?|design\s*skills?|cad|solidworks|autocad/.test(query)) {
    lastIntentTopic = 'skills';
    return "Hari Balan's mechanical and design skills include AutoCAD 2D, AutoCAD 3D, SolidWorks, Basic Electronics, Manufacturing Basics, and Assembly Basics.";
  }

  if (/ai\s*skills?|ml\s*skills?|machine\s*learning|deep\s*learning|tensorflow|keras/.test(query)) {
    lastIntentTopic = 'skills';
    return "Hari Balan's AI & ML skills include Machine Learning, Deep Learning, Data Analysis, TensorFlow, Keras, CNN, Logistic Regression, and Random Forest.";
  }

  if (/robotics|automation\s*skills?/.test(query)) {
    lastIntentTopic = 'skills';
    return "Hari Balan's robotics and automation skills include Robotics, Automation, Arduino, Bluetooth-based control, Voice-controlled systems, and Mechanical automation.";
  }

  if (/tools|platforms/.test(query)) {
    lastIntentTopic = 'skills';
    return "Hari Balan uses Arduino IDE, MATLAB Basics, Jupyter Notebook, TensorFlow, Keras, Git, GitHub, and VS Code.";
  }

  if (/what\s*are.*skills|show.*skills|technical\s*skills|skillset|skills\b/.test(query)) {
    lastIntentTopic = 'skills';
    return "Here are Hari Balan's main skills:\n\nProgramming & Data: Python, Pandas, NumPy, SQL, MySQL, HTML, CSS and JavaScript.\nMechanical & Design: AutoCAD (2D & 3D), SolidWorks, basic electronics, manufacturing and assembly.\nAI/ML: Machine Learning, TensorFlow, Keras, CNN, Logistic Regression, Random Forest.\nTools: Arduino IDE, MATLAB, Jupyter Notebook, Git, GitHub and VS Code.";
  }

  // 9. Internships
  if (/tvs|mobility/.test(query)) {
    lastIntentTopic = 'internships';
    return "At TVS Vehicle Mobility Solution in Coimbatore, Hari Balan gained exposure to the automotive sector and vehicle mobility systems.";
  }

  if (/tenneco|clean\s*air/.test(query)) {
    lastIntentTopic = 'internships';
    return "At Tenneco Clean Air India Limited in Oragadam, Hari Balan gained practical knowledge in vehicle assembly, maintenance, and customer service operations.";
  }

  if (/reliable\s*motors|mahindra/.test(query)) {
    lastIntentTopic = 'internships';
    return "At Reliable Motors CV (Mahindra) in Coimbatore, Hari Balan gained exposure to real-world working environments and team collaboration.";
  }

  if (/internship|industrial\s*exposure|where.*intern|companies/.test(query)) {
    lastIntentTopic = 'internships';
    return "Hari Balan has gained industrial exposure at three organizations:\n1. TVS Vehicle Mobility Solution, Coimbatore (Automotive sector & vehicle mobility)\n2. Tenneco Clean Air India Limited, Oragadam (Vehicle assembly & maintenance)\n3. Reliable Motors CV (Mahindra), Coimbatore (Real-world working environment & team collaboration)";
  }

  // 10. Family / Sister / Twins
  if (/sister.*name|name.*of.*sister|what\s*is.*her\s*name/.test(query)) {
    lastIntentTopic = 'family';
    return "I don't have his sister's name in Hari Balan's portfolio information.";
  }

  if (/are.*twins|twins\b|twin\s*sister/.test(query)) {
    lastIntentTopic = 'family';
    return "Yes. Hari Balan and his sister are twins.";
  }

  if (/does.*have.*sister|any\s*sister|sister\b|sibling/.test(query)) {
    lastIntentTopic = 'family';
    return "Yes. Hari Balan has one sister, and they are twins.";
  }

  if (/family|parents|brother/.test(query)) {
    lastIntentTopic = 'family';
    return "Hari Balan has one twin sister. His native background is from the Paramakudi area of Ramanathapuram district, Tamil Nadu.";
  }

  // 11. Location / Native
  if (/where.*from|native|origin|born\s*in|where.*live|hometown/.test(query)) {
    lastIntentTopic = 'personal';
    return "Hari Balan is from Tamil Nadu, India. His native background is from the Paramakudi area of Ramanathapuram district.";
  }

  // 12. Languages
  if (/languages?\b|what\s*languages?|speak|mother\s*tongue/.test(query)) {
    lastIntentTopic = 'personal';
    return "Hari Balan speaks Tamil (Native), English (Fluent), and Hindi (Basic).";
  }

  // 13. Interests & Hobbies
  if (/interests?\b|hobbies|free\s*time|passions?/.test(query)) {
    lastIntentTopic = 'personal';
    return "Hari Balan's interests include Robotics & Automation, Coding & Programming, Mechanical Design, Photography, Nature & Outdoor Exposure, and Learning New Technologies.";
  }

  // 14. Strengths
  if (/strengths?\b|key\s*strengths?|what\s*is\s*he\s*good\s*at|soft\s*skills/.test(query)) {
    lastIntentTopic = 'personal';
    return "Hari Balan's key strengths include: Quick Learner, Problem Solver, Adaptable to New Technologies, Good Team Player, Strong Communication Skills, Positive Attitude, and Goal Oriented.";
  }

  // 15. Career Interests
  if (/career|future|goals|aspirations|direction|what.*want\s*to\s*be|job\s*interests/.test(query)) {
    lastIntentTopic = 'career';
    return "Hari Balan is building a multidisciplinary profile combining Mechanical Engineering with software, AI/ML, robotics and automation. His career interests include Mechanical Engineering, Python Development, Artificial Intelligence, Machine Learning, Robotics, Automation, and Web Development.";
  }

  // 16. Personal Details
  if (/dob\b|date\s*of\s*birth|birthday|born\s*on/.test(query)) {
    lastIntentTopic = 'personal';
    return "Hari Balan's date of birth is December 3, 2006 (03/12/2006).";
  }

  if (/gender|marital\s*status|single|nationality|personal\s*details/.test(query)) {
    lastIntentTopic = 'personal';
    return "Personal Details:\n- Date of Birth: 03/12/2006\n- Gender: Male\n- Nationality: Indian\n- Location: Tamil Nadu, India\n- Marital Status: Single\n- Native: Paramakudi area, Ramanathapuram district, Tamil Nadu";
  }

  // 17. Tagline
  if (/tagline|motto|quote/.test(query)) {
    lastIntentTopic = 'personal';
    return "Hari Balan's personal tagline is: \"Build • Create • Grow\".";
  }

  // 18. Contact & Socials
  if (/full\s*address|home\s*address|exact\s*address|street\s*address|postal\s*address|where\s*is\s*his\s*house/.test(query)) {
    lastIntentTopic = 'contact';
    return "Hari Balan's address is: 197/B, Tharmanagar, Mathur, Pudukkottai, Kulathur Taluk, Tamil Nadu - 622515, India.";
  }

  if (/email|mail\b/.test(query)) {
    lastIntentTopic = 'contact';
    return "You can email Hari Balan at haribalans24me@srishakthi.ac.in.";
  }

  if (/phone|call|mobile|number|telephone|contact\s*number/.test(query)) {
    lastIntentTopic = 'contact';
    return "You can reach Hari Balan by phone at +91 8870210399.";
  }

  if (/github/.test(query)) {
    lastIntentTopic = 'contact';
    return "Hari Balan's GitHub profile is: https://github.com/haribalan3333-huegithub";
  }

  if (/linkedin/.test(query)) {
    lastIntentTopic = 'contact';
    return "Hari Balan's LinkedIn profile is: https://www.linkedin.com/in/hari-balan-s-82b356247/";
  }

  if (/instagram|insta\b/.test(query)) {
    lastIntentTopic = 'contact';
    return "Hari Balan's Instagram profile is: https://www.instagram.com/balan_hari_003/";
  }

  if (/how.*contact|contact.*hari|reach.*hari|socials?|connect|contact\b/.test(query)) {
    lastIntentTopic = 'contact';
    return "You can contact Hari Balan via:\nEmail: haribalans24me@srishakthi.ac.in\nPhone: +91 8870210399\nLinkedIn: https://www.linkedin.com/in/hari-balan-s-82b356247/\nGitHub: https://github.com/haribalan3333-huegithub\nInstagram: https://www.instagram.com/balan_hari_003/";
  }

  // 19. Resume
  if (/resume|cv\b|download\s*resume|pdf\s*resume/.test(query)) {
    lastIntentTopic = 'resume';
    return "You can view and download Hari Balan's full PDF resume directly in the Resume section of this portfolio!";
  }

  // 20. General Profile
  if (/who\s*is|introduce|about\s*hari|tell\s*me\s*about|who\s*are\s*you|identity|hari\s*balan|haribalan/.test(query)) {
    lastIntentTopic = 'intro';
    return "Hari Balan is a Mechanical Engineering student at Sri Shakthi Institute of Engineering and Technology. He is pursuing B.E. Mechanical Engineering in the 2024–2028 batch with a current CGPA of 8.5. He is also interested in Python, AI/ML, robotics, automation and software development.";
  }

  // 21. Greetings
  if (/^(hi|hello|hey|greetings|welcome|howdy|sup)\b/.test(query)) {
    lastIntentTopic = 'greeting';
    return "Hello! I'm Hari Balan's Cyber Girl AI assistant. How can I help you explore his portfolio, projects, skills, or background today?";
  }

  // 22. Unknown fallback
  lastIntentTopic = 'unknown';
  return "I don't have that information in Hari Balan's current portfolio profile.\n\nYou can ask me about his education, skills, projects, internships, interests, career direction or contact details.";
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
          setTimeout(typeChar, 20);
        }
      }
      typeChar();
    }

    // Show popup speech bubble
    if (bubble) {
      bubble.textContent = text;
      bubble.classList.add('show');

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
    } else if (/contact|reach|phone|email/i.test(text)) {
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
      const response = window.matchIntent(intentKey);
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
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    });
  }
});
