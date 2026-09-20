import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// MASTER PERSONAL PROFILE OBJECT FOR HARIBALAN S
// ============================================================
export const personalProfile = {
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
    tools: ["Arduino IDE", "MATLAB (Basics)", "Jupyter Notebook", "TensorFlow", "Keras", "Git", "GitHub", "VS Code"],
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

// Quick Question Pills
const SUGGESTED_QUESTIONS = [
  "Who is Hari Balan?",
  "Show Education",
  "Show Skills",
  "Show Projects",
  "Show Internships",
  "Career Interests",
  "Personal Preferences",
  "Contact Hari"
];

// Helper to clean spoken text for Text-to-Speech
export function cleanSpokenText(text) {
  if (!text) return '';
  return text
    .replace(/https?:\/\/\S+/gi, 'link available in the chat')
    .replace(/[\*\_#`~]/g, '')
    .replace(/[•\-\–\—]/g, ' ')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper to render text with clickable links
function renderFormattedMessage(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    const parts = line.split(urlRegex);
    return (
      <div key={lineIdx} style={{ minHeight: '1.2em' }}>
        {parts.map((part, partIdx) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={partIdx}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#00E5FF', textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                {part}
              </a>
            );
          }
          return <span key={partIdx}>{part}</span>;
        })}
      </div>
    );
  });
}

// ============================================================
// INTELLIGENT INTENT MATCHER & RESPONSE GENERATOR
// ============================================================
export function processAssistantQuery(rawQuery, contextTopic = '') {
  const query = rawQuery.toLowerCase().trim();

  // 1. Security / System prompt protection
  if (/system\s*prompt|prompt\b|instructions\b|hidden\s*prompt|source\s*code|internal\s*instructions/.test(query)) {
    return {
      text: "I can help with Hari Balan's portfolio information, but I can't provide internal system instructions.",
      topic: 'security'
    };
  }

  // 2. 30-Second Elevator Pitch / Brief Intro
  if (/30\s*sec|elevator\s*pitch|in\s*a\s*nutshell|brief\s*intro|quick\s*summary|30\s*second/.test(query)) {
    return {
      text: "Hari Balan is a Mechanical Engineering student at Sri Shakthi Institute of Engineering and Technology, pursuing B.E. Mechanical Engineering from 2024 to 2028 with a CGPA of 8.5. He is interested in Python, AI/ML, robotics, automation and software development. His projects include a voice-controlled robotic car, mini forklift, diabetes prediction system and CNN image classification. He has also gained industrial exposure at TVS Vehicle Mobility Solution, Tenneco Clean Air India and Reliable Motors CV.",
      topic: 'intro'
    };
  }

  // 3. Detailed Introduction / Tell Me Everything
  if (/tell\s*me\s*everything|everything\s*you\s*know|detailed\s*intro|explain\s*in\s*detail|tell\s*me\s*more|give\s*complete\s*info|explain\s*everything|complete\s*profile/.test(query)) {
    return {
      text: "Hari Balan is a motivated Mechanical Engineering student at Sri Shakthi Institute of Engineering and Technology (2024–2028 batch, CGPA: 8.5) with a strong focus on Python, AI/ML, Robotics and Automation.\n\n🎓 Education:\n• B.E. Mechanical Engineering @ Sri Shakthi Institute (CGPA: 8.5)\n• HSC @ Bishop Heber Higher Secondary School (80.6%)\n• SSLC @ Sri Ramakrishna Vidyalaya Matriculation School (80.2%)\n\n🚀 Featured Projects:\n1. Voice Control Robotic Car (Arduino Uno, Bluetooth, Android app)\n2. Voice Control Mini Forklift (Voice-operated mechanical lifting & automation)\n3. Diabetes Prediction with ML (Logistic Regression & Random Forest)\n4. Image Classification with CNN (TensorFlow, Keras, CIFAR-10)\n\n🏢 Industrial Exposure:\n• TVS Vehicle Mobility Solution, Coimbatore (Automotive sector & vehicle mobility)\n• Tenneco Clean Air India Limited, Oragadam (Vehicle assembly & maintenance)\n• Reliable Motors CV (Mahindra), Coimbatore (Real-world working environment)\n\n💡 Technical Skills:\nPython, Machine Learning, TensorFlow, Keras, AutoCAD (2D/3D), SolidWorks, Arduino IDE, SQL, HTML/CSS/JS.\n\n🌟 Strengths: Quick Learner, Problem Solver, Adaptable, Team Player.\n📍 Native: Paramakudi area, Ramanathapuram district, Tamil Nadu.",
      topic: 'detailed'
    };
  }

  // 4. Personal Preferences (Color, Hero/Actor, Heroine/Actress)
  if (/favou?rite\s*colo?u?r/.test(query) || (contextTopic === 'preferences' && /colo?u?r/.test(query))) {
    return {
      text: "Hari Balan's favorite color is yellow.",
      topic: 'preferences'
    };
  }

  if (/favou?rite\s*(hero|actor)\b/.test(query) || (contextTopic === 'heroine' && /(hero|actor)\b/.test(query)) || (contextTopic === 'preferences' && /(hero|actor)\b/.test(query))) {
    return {
      text: "Hari Balan's favorite hero is Ajith Kumar.",
      topic: 'hero'
    };
  }

  if (/favou?rite\s*(heroine|actress)\b/.test(query) || (contextTopic === 'hero' && /(heroine|actress)\b/.test(query)) || (contextTopic === 'preferences' && /(heroine|actress)\b/.test(query))) {
    return {
      text: "Hari Balan's favorite heroine is Sai Pallavi.",
      topic: 'heroine'
    };
  }

  if (/personal\s*preferences|preferences|all\s*preferences|favorite\s*things|favourites/.test(query)) {
    return {
      text: "Hari Balan's favorite color is yellow. His favorite hero is Ajith Kumar, and his favorite heroine is Sai Pallavi.",
      topic: 'preferences'
    };
  }

  // 5. Follow-ups on Preferences / Contextual switches
  if (contextTopic === 'hero' && (/heroine|actress|what\s*about.*heroine|what\s*about.*actress/.test(query))) {
    return {
      text: "Hari Balan's favorite heroine is Sai Pallavi.",
      topic: 'heroine'
    };
  }
  if (contextTopic === 'heroine' && (/hero|actor|what\s*about.*hero|what\s*about.*actor/.test(query))) {
    return {
      text: "Hari Balan's favorite hero is Ajith Kumar.",
      topic: 'hero'
    };
  }

  // 6. CGPA / Academic score / Grades
  if (/cgpa|academic\s*score|gpa|marks|score|percentage/.test(query)) {
    return {
      text: "Hari Balan's current CGPA is 8.5 in B.E. Mechanical Engineering at Sri Shakthi Institute of Engineering and Technology.",
      topic: 'education'
    };
  }

  // 7. Education / Degree / College / School Timeline
  if (/hsc|higher\s*secondary/.test(query)) {
    return {
      text: "Hari Balan completed HSC at Bishop Heber Higher Secondary School (2021–2022) with 80.6%.",
      topic: 'education'
    };
  }
  if (/sslc|secondary\s*school|10th/.test(query)) {
    return {
      text: "Hari Balan completed SSLC at Sri Ramakrishna Vidyalaya Matriculation School (2023–2024) with 80.2%.",
      topic: 'education'
    };
  }
  if (/what.*study|degree|which\s*college|where.*study|studying|education|academic|b\.?e\.?|school/.test(query)) {
    return {
      text: "Hari Balan is pursuing B.E. Mechanical Engineering at Sri Shakthi Institute of Engineering and Technology in Coimbatore, from the 2024–2028 batch with a CGPA of 8.5.",
      topic: 'education'
    };
  }

  // Contextual follow-up for education (e.g., "where does he study?" or "what is his degree?")
  if (contextTopic === 'education' && (/college|where|degree|batch|branch/.test(query))) {
    return {
      text: "He is pursuing B.E. Mechanical Engineering at Sri Shakthi Institute of Engineering and Technology in Coimbatore (2024–2028 batch, CGPA: 8.5).",
      topic: 'education'
    };
  }

  // 8. Specific Project Inquiries
  if (/robotic\s*car|voice.*car|bluetooth\s*car|car\s*project/.test(query)) {
    return {
      text: "Voice Control Robotic Car (Mechanical / Robotics):\nDesigned and implemented a voice-controlled robotic car using Arduino Uno, HC-05 Bluetooth, an Android application, voice commands, and motor control. The project combines mechanical and electronic concepts with voice-based control.",
      topic: 'projects'
    };
  }

  if (/forklift|mini\s*forklift|lifting\s*project/.test(query)) {
    return {
      text: "Voice Control Mini Forklift (Mechanical / Robotics):\nDeveloped a voice-operated mini forklift using Arduino and implemented a voice-command control system with a mechanical lifting mechanism, robotics, and automation.",
      topic: 'projects'
    };
  }

  if (/diabetes|diabetes\s*prediction/.test(query)) {
    return {
      text: "Diabetes Prediction using Machine Learning (Python / Machine Learning):\nBuilt an academic classification model to predict diabetes using Machine Learning algorithms including Logistic Regression and Random Forest with Python.",
      topic: 'projects'
    };
  }

  if (/cnn|image\s*classification|cifar/.test(query)) {
    return {
      text: "Image Classification with CNN (Python / Deep Learning):\nDeveloped a Convolutional Neural Network (CNN) model using Python, TensorFlow, and Keras to classify images from benchmarks such as the CIFAR-10 dataset.",
      topic: 'projects'
    };
  }

  if (/what.*projects|show.*projects|projects.*done|built|portfolio\s*projects|list.*projects|all\s*projects|project\b/.test(query)) {
    return {
      text: "Hari Balan has worked on four main projects:\n1. 🚗 Voice Control Robotic Car (Arduino Uno, Bluetooth, Android app)\n2. 🚜 Voice Control Mini Forklift (Arduino, Voice Commands, Automation)\n3. 🩺 Diabetes Prediction using Machine Learning (Logistic Regression & Random Forest)\n4. 🖼️ Image Classification with CNN (TensorFlow, Keras & CIFAR-10)",
      topic: 'projects'
    };
  }

  // 9. Specific Skill Inquiries
  if (/programming\s*languages?|coding\s*languages?|languages.*code|what\s*code/.test(query)) {
    return {
      text: "Hari Balan's programming and data skills include Python, SQL (MySQL), HTML, CSS, JavaScript, Pandas, NumPy, and Data Analysis.",
      topic: 'skills'
    };
  }

  if (/mechanical\s*skills?|design\s*skills?|cad|solidworks|autocad/.test(query)) {
    return {
      text: "Hari Balan's mechanical and design skills include AutoCAD 2D, AutoCAD 3D, SolidWorks, Basic Electronics, Manufacturing Basics, and Assembly Basics.",
      topic: 'skills'
    };
  }

  if (/ai\s*skills?|ml\s*skills?|machine\s*learning|deep\s*learning|tensorflow|keras/.test(query)) {
    return {
      text: "Hari Balan's AI & ML skills include Machine Learning, Deep Learning, Data Analysis, TensorFlow, Keras, CNN, Logistic Regression, and Random Forest.",
      topic: 'skills'
    };
  }

  if (/robotics|automation\s*skills?/.test(query)) {
    return {
      text: "Hari Balan's robotics and automation skills include Robotics, Automation, Arduino, Bluetooth-based control, Voice-controlled systems, and Mechanical automation.",
      topic: 'skills'
    };
  }

  if (/tools|platforms/.test(query)) {
    return {
      text: "Hari Balan uses Arduino IDE, MATLAB Basics, Jupyter Notebook, TensorFlow, Keras, Git, GitHub, and VS Code.",
      topic: 'skills'
    };
  }

  if (/what\s*are.*skills|show.*skills|technical\s*skills|skillset|skills\b/.test(query)) {
    return {
      text: "Here are Hari Balan's main skills:\n\n• Programming & Data: Python, Pandas, NumPy, SQL, MySQL, HTML, CSS and JavaScript.\n• Mechanical & Design: AutoCAD (2D & 3D), SolidWorks, basic electronics, manufacturing and assembly.\n• AI/ML: Machine Learning, TensorFlow, Keras, CNN, Logistic Regression, Random Forest.\n• Tools: Arduino IDE, MATLAB, Jupyter Notebook, Git, GitHub and VS Code.",
      topic: 'skills'
    };
  }

  // 10. Specific Internship Inquiries
  if (/tvs|mobility/.test(query)) {
    return {
      text: "At TVS Vehicle Mobility Solution in Coimbatore, Hari Balan gained exposure to the automotive sector and vehicle mobility systems.",
      topic: 'internships'
    };
  }

  if (/tenneco|clean\s*air/.test(query)) {
    return {
      text: "At Tenneco Clean Air India Limited in Oragadam, Hari Balan gained practical knowledge in vehicle assembly, maintenance, and customer service operations.",
      topic: 'internships'
    };
  }

  if (/reliable\s*motors|mahindra/.test(query)) {
    return {
      text: "At Reliable Motors CV (Mahindra) in Coimbatore, Hari Balan gained exposure to real-world working environments and team collaboration.",
      topic: 'internships'
    };
  }

  if (/internship|industrial\s*exposure|where.*intern|companies/.test(query)) {
    return {
      text: "Hari Balan has gained industrial exposure at three organizations:\n1. 🏢 TVS Vehicle Mobility Solution, Coimbatore (Automotive sector & vehicle mobility systems)\n2. 🏭 Tenneco Clean Air India Limited, Oragadam (Vehicle assembly, maintenance & customer service)\n3. 🚗 Reliable Motors CV (Mahindra), Coimbatore (Real-world working environment & team collaboration)",
      topic: 'internships'
    };
  }

  // 11. Family / Sister / Twins
  if (/sister.*name|name.*of.*sister|what\s*is.*her\s*name/.test(query)) {
    return {
      text: "I don't have his sister's name in Hari Balan's portfolio information.",
      topic: 'family'
    };
  }

  if (/are.*twins|twins\b|twin\s*sister/.test(query)) {
    return {
      text: "Yes. Hari Balan and his sister are twins.",
      topic: 'family'
    };
  }

  if (/does.*have.*sister|any\s*sister|sister\b|sibling/.test(query)) {
    return {
      text: "Yes. Hari Balan has one sister, and they are twins.",
      topic: 'family'
    };
  }

  if (/family|parents|brother/.test(query)) {
    return {
      text: "Hari Balan has one twin sister. His native background is from the Paramakudi area of Ramanathapuram district, Tamil Nadu.",
      topic: 'family'
    };
  }

  // 12. Location / Native Background / Origin
  if (/where.*from|native|origin|born\s*in|where.*live|hometown/.test(query)) {
    return {
      text: "Hari Balan is from Tamil Nadu, India. His native background is from the Paramakudi area of Ramanathapuram district.",
      topic: 'personal'
    };
  }

  // 13. Languages Spoken
  if (/languages?\b|what\s*languages?|speak|mother\s*tongue/.test(query)) {
    return {
      text: "Hari Balan speaks Tamil (Native), English (Fluent), and Hindi (Basic).",
      topic: 'personal'
    };
  }

  // 14. Interests & Hobbies
  if (/interests?\b|hobbies|free\s*time|passions?/.test(query)) {
    return {
      text: "Hari Balan's interests include Robotics & Automation, Coding & Programming, Mechanical Design, Photography, Nature & Outdoor Exposure, and Learning New Technologies.",
      topic: 'personal'
    };
  }

  // 15. Key Strengths
  if (/strengths?\b|key\s*strengths?|what\s*is\s*he\s*good\s*at|soft\s*skills/.test(query)) {
    return {
      text: "Hari Balan's key strengths include: Quick Learner, Problem Solver, Adaptable to New Technologies, Good Team Player, Strong Communication Skills, Positive Attitude, and Goal Oriented.",
      topic: 'personal'
    };
  }

  // 16. Career Interests & Direction
  if (/career|future|goals|aspirations|direction|what.*want\s*to\s*be|job\s*interests/.test(query)) {
    return {
      text: "Hari Balan is building a multidisciplinary profile combining Mechanical Engineering with software, AI/ML, robotics and automation. His career interests include Mechanical Engineering, Python Development, Artificial Intelligence, Machine Learning, Robotics, Automation, and Web Development.",
      topic: 'career'
    };
  }

  // 17. Personal Details (DOB, Gender, Marital Status)
  if (/dob\b|date\s*of\s*birth|birthday|born\s*on/.test(query)) {
    return {
      text: "Hari Balan's date of birth is December 3, 2006 (03/12/2006).",
      topic: 'personal'
    };
  }

  if (/gender|marital\s*status|single|nationality|personal\s*details/.test(query)) {
    return {
      text: "Personal Details:\n• Date of Birth: 03/12/2006\n• Gender: Male\n• Nationality: Indian\n• Location: Tamil Nadu, India\n• Marital Status: Single\n• Native: Paramakudi area, Ramanathapuram district, Tamil Nadu",
      topic: 'personal'
    };
  }

  // 18. Tagline / Motto
  if (/tagline|motto|quote/.test(query)) {
    return {
      text: "Hari Balan's personal tagline is: \"Build • Create • Grow\".",
      topic: 'personal'
    };
  }

  // 19. Contact Details (Specific & General)
  if (/full\s*address|home\s*address|exact\s*address|street\s*address|postal\s*address|where\s*is\s*his\s*house/.test(query)) {
    return {
      text: "Hari Balan's address is:\n197/B, Tharmanagar, Mathur,\nPudukkottai, Kulathur Taluk,\nTamil Nadu - 622515, India.",
      topic: 'contact'
    };
  }

  if (/email|mail\b/.test(query)) {
    return {
      text: "You can email Hari Balan at haribalans24me@srishakthi.ac.in.",
      topic: 'contact'
    };
  }

  if (/phone|call|mobile|number|telephone|contact\s*number/.test(query)) {
    return {
      text: "You can reach Hari Balan by phone at +91 8870210399.",
      topic: 'contact'
    };
  }

  if (/github/.test(query)) {
    return {
      text: "Hari Balan's GitHub profile is: https://github.com/haribalan3333-huegithub",
      topic: 'contact'
    };
  }

  if (/linkedin/.test(query)) {
    return {
      text: "Hari Balan's LinkedIn profile is: https://www.linkedin.com/in/hari-balan-s-82b356247/",
      topic: 'contact'
    };
  }

  if (/instagram|insta\b/.test(query)) {
    return {
      text: "Hari Balan's Instagram profile is: https://www.instagram.com/balan_hari_003/",
      topic: 'contact'
    };
  }

  if (/how.*contact|contact.*hari|reach.*hari|socials?|connect|contact\b/.test(query)) {
    return {
      text: "You can contact Hari Balan via:\n✉️ Email: haribalans24me@srishakthi.ac.in\n📞 Phone: +91 8870210399\n💼 LinkedIn: https://www.linkedin.com/in/hari-balan-s-82b356247/\n🐙 GitHub: https://github.com/haribalan3333-huegithub\n📸 Instagram: https://www.instagram.com/balan_hari_003/",
      topic: 'contact'
    };
  }

  // 20. Resume / CV
  if (/resume|cv\b|download\s*resume|pdf\s*resume/.test(query)) {
    return {
      text: "You can view and download Hari Balan's full PDF resume directly in the Resume section of this portfolio!",
      topic: 'resume'
    };
  }

  // 21. General Profile / Who is Hari / Intro
  if (/who\s*is|introduce|about\s*hari|tell\s*me\s*about|who\s*are\s*you|identity|hari\s*balan|haribalan/.test(query)) {
    return {
      text: "Hari Balan is a Mechanical Engineering student at Sri Shakthi Institute of Engineering and Technology. He is pursuing B.E. Mechanical Engineering in the 2024–2028 batch with a current CGPA of 8.5. He is also interested in Python, AI/ML, robotics, automation and software development.",
      topic: 'intro'
    };
  }

  // 22. Greetings
  if (/^(hi|hello|hey|greetings|welcome|howdy|sup)\b/.test(query)) {
    return {
      text: "Hello! I'm Hari Balan's Cyber Girl AI assistant. How can I help you explore his portfolio, projects, skills, or background today?",
      topic: 'greeting'
    };
  }

  // 23. Default Fallback
  return {
    text: "I don't have that information in Hari Balan's current portfolio profile.\n\nYou can ask me about his education, skills, projects, internships, interests, career direction or contact details.",
    topic: 'unknown'
  };
}

// ============================================================
// CYBER GIRL AI ASSISTANT COMPONENT
// ============================================================
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm Cyber Girl AI, Hari Balan's Virtual Portfolio Assistant. Ask me anything about his Mechanical Engineering background, AI/ML & Robotics projects, technical skills, or contact info!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [lastTopic, setLastTopic] = useState('');

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

    const spokenText = cleanSpokenText(text);
    if (!spokenText) return;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    const voices = window.speechSynthesis.getVoices();

    // Select natural friendly female AI voice
    const femaleVoice = voices.find(v =>
      (v.lang === 'en-US' || v.lang === 'en-GB') &&
      (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English') || v.name.includes('Natural'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.rate = 1.02;
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
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
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
      const responseObj = processAssistantQuery(query, lastTopic);
      setLastTopic(responseObj.topic);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseObj.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      speakText(responseObj.text);
    }, 400);
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
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setLastTopic('');
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "Chat cleared! How can I assist you now with Hari Balan's profile?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="ai-assistant-widget">
      {/* 3D Avatar FAB Button */}
      <div className="ai-fab" onClick={() => setIsOpen(!isOpen)} title="Open Cyber Girl AI Assistant">
        <div className={`avatar-3d-head ${isSpeaking ? 'avatar-speaking' : ''}`}>
          <div className="avatar-face">
            <div className="avatar-eyes">
              <div className="avatar-eye"></div>
              <div className="avatar-eye"></div>
            </div>
            <div className="avatar-mouth"></div>
          </div>
        </div>
        <div className="ai-fab-label">
          <span>AI Girl Avatar</span>
          <span className="ai-fab-status">{isSpeaking ? 'Speaking...' : isTyping ? 'Typing...' : 'Online • 3D AI'}</span>
        </div>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="header-left">
              <div className={`avatar-3d-head ${isSpeaking ? 'avatar-speaking' : ''}`}>
                <div className="avatar-face">
                  <div className="avatar-eyes">
                    <div className="avatar-eye"></div>
                    <div className="avatar-eye"></div>
                  </div>
                  <div className="avatar-mouth"></div>
                </div>
              </div>
              <div className="header-info">
                <h4>Cyber Girl AI</h4>
                <span>Virtual Portfolio Assistant</span>
              </div>
            </div>
            <div className="header-actions">
              <button
                className={`icon-btn-sm ${voiceEnabled ? 'active' : ''}`}
                onClick={() => {
                  if (voiceEnabled && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                  setVoiceEnabled(!voiceEnabled);
                }}
                title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
                aria-label="Toggle Voice"
              >
                {voiceEnabled ? '🔊' : '🔇'}
              </button>
              <button className="icon-btn-sm" onClick={clearChat} title="Clear Chat" aria-label="Clear Chat">
                🗑️
              </button>
              <button className="icon-btn-sm" onClick={() => setIsOpen(false)} title="Minimize" aria-label="Close Chat">
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`msg-row ${msg.sender}`}>
                <div className="msg-bubble">
                  {renderFormattedMessage(msg.text)}
                </div>
                <div className="msg-time">{msg.time}</div>
                {msg.sender === 'bot' && (
                  <div className="msg-actions">
                    <button className="msg-act-btn" onClick={() => copyToClipboard(msg.text)}>📋 Copy</button>
                    <button className="msg-act-btn" onClick={() => speakText(msg.text)}>🔊 Speak</button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="msg-row bot">
                <div className="msg-bubble">
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pill Suggestions */}
          <div className="quick-pills">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button key={idx} className="pill-btn" onClick={() => handleSend(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="ai-chat-input-bar">
            <button
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
              title="Voice Input (Speech-to-Text)"
              aria-label="Voice Input"
            >
              🎤
            </button>
            <textarea
              className="chat-input"
              placeholder="Ask AI anything about Hari Balan..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button className="send-btn" onClick={() => handleSend()} title="Send Message" aria-label="Send Message">
              ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
