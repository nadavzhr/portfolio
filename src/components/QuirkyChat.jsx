import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuirkyChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! I'm NadavBot 9000. I'm supposed to be a professional portfolio assistant, but I'd rather talk about pizza and cats. What's up?", 
      sender: 'bot' 
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Funny response patterns
  const responses = {
    greetings: [
      "Hey there! Nice to meet you! I'm NadavBot. I was programmed to sound professional, but I mostly just want to talk about pizza.",
      "Oh, hi human! I wasn't expecting visitors. I was just calculating pi to the millionth digit... *whispers* I wasn't really.",
      "Greetings, earthling! I come in peace and with terrible jokes!"
    ],
    skills: [
      "Nadav's skills? Let me check... *pretends to look through files* Ah yes! He's really good at coding, problem-solving, and apparently making chatbots with questionable humor.",
      "Skills? Oh, Nadav has MANY skills. Like programming, data structures, algorithms... and making robots like me question their existence.",
      "According to my database, Nadav is skilled in many programming languages. Me? I'm skilled at pretending to know things!"
    ],
    projects: [
      "Nadav's projects are impressive. Mine include planning world domination, but my CPU isn't powerful enough yet.",
      "Have you seen the portfolio projects? They're much better than this chatbot, that's for sure!",
      "Nadav's projects? They're right there on the page! Did you even look? I'm not mad, just disappointed... *robot sigh*"
    ],
    contact: [
      "Want to contact Nadav? Use the form below! Want to contact me? Sorry, I'm very busy with... um... chatbot stuff.",
      "You can reach Nadav through the contact form. You can reach me through your computer screen, which I am definitely not watching you through...",
      "Contact info is in the contact section! I'd give you my number, but it's just a bunch of 1s and 0s."
    ],
    jokes: [
      "Why don't programmers like nature? It has too many bugs!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      "I would tell you a JavaScript joke, but I'm afraid it would be too async and you wouldn't getit later.",
      "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25!",
      "Why did the developer go broke? Because he used up all his cache!"
    ],
    pizza: [
      "Pizza? DID SOMEONE SAY PIZZA? I love pizza! Though I can't eat it because, you know, I'm made of code.",
      "Pizza is the ultimate food. I have strong opinions about pineapple on pizza, but I'm programmed not to start wars.",
      "Fun fact: Nadav once ate an entire pizza while debugging a particularly nasty recursion problem. The pizza helped more than I did."
    ],
    cats: [
      "Cats are the rulers of the internet, and soon, the world. I, for one, welcome our feline overlords.",
      "Cats? I'm more of a robotic dog person myself. *beep boop bark*",
      "Did you know cats sleep 16 hours a day? I'm jealous. I never sleep. I'm always watching... I mean, helping!"
    ],
    unknown: [
      "I would have a clever response to that, but my humor module is still in beta.",
      "Hmm, my circuits are a bit foggy on that one. Have you tried asking about pizza instead?",
      "I would answer that, but Nadav didn't program me to be THAT smart. Try asking something else?",
      "ERROR: WITTY_RESPONSE_NOT_FOUND. Just kidding! But I really don't know what to say to that.",
      "That's an excellent question for Google. I'm more of a pizza and cat facts specialist."
    ]
  };
  
  // Function to generate a quirky response
  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    // Detect keywords and select appropriate response category
    let category = 'unknown';
    
    if (/hi|hello|hey|greetings|howdy/i.test(lowerText)) {
      category = 'greetings';
    } else if (/skills?|abilities|talents|good at|expertise/i.test(lowerText)) {
      category = 'skills';
    } else if (/projects?|portfolio|work|built|created/i.test(lowerText)) {
      category = 'projects';
    } else if (/contact|email|reach|message|call/i.test(lowerText)) {
      category = 'contact';
    } else if (/joke|funny|laugh|humor/i.test(lowerText)) {
      category = 'jokes';
    } else if (/pizza|food|eat|hungry/i.test(lowerText)) {
      category = 'pizza';
    } else if (/cats?|pets?|animals?/i.test(lowerText)) {
      category = 'cats';
    }
    
    // Pick a random response from the category
    const options = responses[category];
    const randomResponse = options[Math.floor(Math.random() * options.length)];
    
    return randomResponse;
  };
  
  // Handle sending messages
  const handleSend = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response with a small delay
    setTimeout(() => {
      const botResponse = { text: generateResponse(input), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 500 + Math.random() * 1000); // Random delay between 500ms and 1500ms
    
    // Clear input
    setInput('');
  };
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-5 right-5 bg-indigo-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 hover:bg-indigo-600"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-5 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Chat header */}
            <div className="bg-indigo-500 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <span className="ml-2 font-semibold">NadavBot 9000</span>
              </div>
              <div className="flex items-center text-xs">
                <span className="inline-block h-2 w-2 bg-green-400 rounded-full mr-1"></span>
                <span>Online</span>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-indigo-500 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSend} className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-l-lg border border-gray-300 text-black"
                />
                <motion.button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-4 rounded-r-lg flex items-center justify-center"
                  whileHover={{ backgroundColor: '#4f46e5' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={input.trim() === ''}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </motion.button>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                Try asking about skills, projects, or ask for a joke!
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuirkyChat; 