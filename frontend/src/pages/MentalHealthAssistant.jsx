// import React, { useState, useEffect, useRef } from 'react';

// // Main Component
// const MentalHealthAssistant = () => {
//     // State management
//     const [messages, setMessages] = useState([]);
//     const [isTyping, setIsTyping] = useState(false);
//     const [showCrisisResources, setShowCrisisResources] = useState(false);
//     const [currentExercise, setCurrentExercise] = useState(null);

//     const chatContainerRef = useRef(null);

//     // Data (moved from the original script)
//     const crisisResources = {
//         "National Suicide Prevention Lifeline": "988",
//         "Crisis Text Line": "Text HOME to 741741",
//         "Emergency Services": "911"
//     };

//     const copingStrategies = {
//         "stress": [
//             {
//                 title: "Deep Breathing Exercise",
//                 steps: [
//                     "Find a comfortable position",
//                     "Inhale deeply through your nose for 4 counts",
//                     "Hold your breath for 4 counts",
//                     "Exhale slowly through your mouth for 4 counts",
//                     "Repeat 5 times"
//                 ],
//                 tip: "This exercise helps calm your nervous system and reduce stress hormones."
//             },
//             {
//                 title: "5-4-3-2-1 Grounding Technique",
//                 steps: [
//                     "Look around and name 5 things you can see",
//                     "Focus on 4 things you can touch",
//                     "Listen for 3 things you can hear",
//                     "Notice 2 things you can smell",
//                     "Find 1 thing you can taste"
//                 ],
//                 tip: "This technique helps bring your focus to the present moment and reduce anxiety."
//             },
//         ],
//         "anxiety": [
//             {
//                 title: "Progressive Muscle Relaxation",
//                 steps: [
//                     "Start with your feet, tense muscles for 5 seconds",
//                     "Release and notice the difference",
//                     "Move up to your calves, then thighs",
//                     "Continue with hands, arms, shoulders",
//                     "Finish with face and neck muscles"
//                 ],
//                 tip: "This exercise helps release physical tension that often accompanies anxiety."
//             },
//              {
//                 title: "Box Breathing Technique",
//                 steps: [
//                     "Inhale through your nose for 4 seconds",
//                     "Hold your breath for 4 seconds",
//                     "Exhale through your mouth for 4 seconds",
//                     "Hold your breath for 4 seconds",
//                     "Repeat for 5 cycles"
//                 ],
//                 tip: "This breathing pattern helps regulate your nervous system and reduce anxiety symptoms."
//             },
//         ],
//         "overwhelm": [
//             {
//                 title: "Task Breakdown Method",
//                 steps: [
//                     "Write down all tasks that feel overwhelming",
//                     "Break each task into smaller steps",
//                     "Prioritize the most important tasks",
//                     "Set realistic timeframes for each step",
//                     "Start with the easiest task first"
//                 ],
//                 tip: "Breaking tasks into smaller pieces makes them more manageable and less overwhelming."
//             },
//              {
//                 title: "Time Management Exercise",
//                 steps: [
//                     "Create a daily schedule",
//                     "Include regular breaks",
//                     "Set specific time blocks for tasks",
//                     "Prioritize self-care activities",
//                     "Review and adjust as needed"
//                 ],
//                 tip: "A structured schedule can help reduce feelings of being overwhelmed."
//             },
//         ]
//     };

//     const generalExercises = [
//         {
//             title: "Quick Mood Boost",
//             steps: [
//                 "Take 3 deep breaths",
//                 "Stand up and stretch",
//                 "Drink a glass of water",
//                 "Think of one thing you're grateful for",
//                 "Smile for 30 seconds"
//             ],
//             tip: "These simple actions can help improve your mood quickly."
//         },
//         {
//             title: "Mindful Moment",
//             steps: [
//                 "Pause what you're doing",
//                 "Notice your surroundings",
//                 "Take a deep breath",
//                 "Check in with your body",
//                 "Return to your task with fresh energy"
//             ],
//             tip: "Taking mindful breaks can help maintain mental well-being."
//         }
//     ];

//     const positiveResponses = [
//         "That's wonderful to hear! 😊 I'm glad you're feeling positive. Feel free to reach out if you need any emotional support in the future.",
//         "Great to hear you're doing well! 🌟 Remember, I'm here if you ever need emotional assistance.",
//         "I'm so happy to hear you're feeling good! 💫 Don't hesitate to contact me if you need any support later.",
//         "That's fantastic! 🎉 I'm here for you whenever you need emotional guidance or support."
//     ];
    
//     // Auto-scroll to the bottom of the chat on new messages
//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [messages]);

//     // Send initial greeting
//     useEffect(() => {
//         setTimeout(() => {
//             addMessage("Welcome! I'm here to listen and provide support. How are you feeling today?");
//         }, 500);
//     }, []);

//     // Helper function to add a new message to the state
//     const addMessage = (text, isUser = false, isExercise = false) => {
//         const newMessage = { text, isUser, isExercise };
//         setMessages(prev => [...prev, newMessage]);
//     };

//     // Sentiment analysis
//     const analyzeSentiment = (text) => {
//         const positiveWords = [
//             'happy', 'good', 'great', 'better', 'improve', 'progress', 'hope', 
//             'excited', 'joy', 'peace', 'wonderful', 'amazing', 'fantastic', 
//             'delighted', 'content', 'calm', 'relaxed', 'positive', 'optimistic', 
//             'grateful', 'thank', 'thanks', 'thank you', 'okay', 'ok', 'fine', 
//             'alright', 'all right', 'doing well', 'feeling good', 'appreciate'
//         ];
//         const negativeWords = [
//             'sad', 'bad', 'terrible', 'worse', 'anxious', 'stress', 'overwhelm', 
//             'fear', 'worried', 'depressed', 'angry', 'frustrated', 'tired', 
//             'exhausted', 'nervous', 'scared', 'lonely', 'hurt', 'upset', 
//             'disappointed'
//         ];
        
//         let score = 0;
//         const lowerCaseText = text.toLowerCase();
        
//         positiveWords.forEach(word => {
//             if (lowerCaseText.includes(word)) score++;
//         });
//         negativeWords.forEach(word => {
//             if (lowerCaseText.includes(word)) score--;
//         });
        
//         return score;
//     }
    
//     // Generate response
//     const getResponse = (userInput) => {
//         const lowerCaseInput = userInput.toLowerCase();
//         const crisisKeywords = ["suicide", "kill myself", "end it all", "can't go on", "emergency"];

//         if (crisisKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
//             setShowCrisisResources(true);
//             return "I'm really concerned about your safety. Please consider reaching out to one of these resources immediately. You don't have to go through this alone.";
//         } else {
//              setShowCrisisResources(false);
//         }

//         const sentiment = analyzeSentiment(lowerCaseInput);
//         if(sentiment > 0){
//              return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
//         }

//         let topic = null;
//         if (["stress", "stressed"].some(word => lowerCaseInput.includes(word))) topic = "stress";
//         else if (["anxiety", "anxious", "nervous"].some(word => lowerCaseInput.includes(word))) topic = "anxiety";
//         else if (["overwhelm", "too much", "can't handle"].some(word => lowerCaseInput.includes(word))) topic = "overwhelm";
        
//         if (topic && copingStrategies[topic]) {
//             const strategy = copingStrategies[topic][Math.floor(Math.random() * copingStrategies[topic].length)];
//             return strategy;
//         } else {
//              return generalExercises[Math.floor(Math.random() * generalExercises.length)];
//         }
//     };
    
//     // Handle sending a message
//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         const userInput = e.target.elements.userInput.value.trim();
        
//         if (userInput) {
//             addMessage(userInput, true);
//             e.target.elements.userInput.value = '';
            
//             setIsTyping(true);
            
//             setTimeout(() => {
//                 const response = getResponse(userInput);
//                 setIsTyping(false);
//                 if (typeof response === 'string') {
//                     addMessage(response);
//                 } else {
//                     setCurrentExercise(response); // Temporarily store exercise to render
//                     addMessage(response, false, true); // Add placeholder for exercise
//                 }
//             }, 1500);
//         }
//     };

//     const startExercise = (exercise) => {
//         // Remove the exercise prompt
//         setMessages(prev => prev.slice(0, prev.length -1));

//         // Start showing steps with delays
//         exercise.steps.forEach((step, index) => {
//             setTimeout(() => {
//                 addMessage(`Step ${index + 1}: ${step}`);
//             }, index * 2500);
//         });

//         // Add completion message
//         setTimeout(() => {
//             addMessage("Great job! You've completed the exercise. How do you feel now?");
//         }, exercise.steps.length * 2500);
//     };

//     return (
//         <div className="bg-[#EAECC6] min-h-screen flex flex-col items-center p-5 font-sans">
//             <h1 className="text-3xl font-bold text-[#2BC0E6] text-center my-4 animate-fadeIn">Mental Health Support Assistant</h1>
//             <div className="container bg-white w-full max-w-2xl rounded-lg shadow-xl p-5 flex flex-col animate-fadeIn">
//                 <div id="chat-container" ref={chatContainerRef} className="flex-1 h-96 overflow-y-auto p-3 border border-[#2BC0E6] rounded-md bg-gray-50 mb-4">
//                     {messages.map((msg, index) => {
//                         if (msg.isExercise) {
//                             return <ExerciseMessage key={index} exercise={msg.text} onStartExercise={startExercise} />;
//                         }
//                         return (
//                              <div key={index} className={`message max-w-[80%] my-2 p-3 rounded-lg animate-messageAppear ${
//                                 msg.isUser 
//                                 ? 'bg-[#2BC0E6] text-white ml-auto' 
//                                 : 'bg-[#EAECC6] mr-auto'
//                             }`}>
//                                 {msg.text}
//                             </div>
//                         )
//                     })}
//                     {isTyping && <TypingIndicator />}
//                 </div>

//                 <form onSubmit={handleSendMessage} className="input-container flex gap-3">
//                     <input type="text" name="userInput" id="user-input" placeholder="How are you feeling today?" 
//                            className="flex-1 p-2 border border-[#2BC0E6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BC0E6] transition-all bg-[#EAECC6] animate-slideIn"
//                     />
//                     <button type="submit" 
//                             className="py-2 px-5 bg-[#2BC0E6] text-white rounded-md cursor-pointer text-base transition-all hover:bg-[#1a9cc7] animate-fadeIn hover:animate-buttonPulse"
//                     >Send</button>
//                 </form>
//             </div>
            
//             {showCrisisResources && <CrisisResources resources={crisisResources} />}
//         </div>
//     );
// };


// // Child Components

// const TypingIndicator = () => (
//     <div className="my-2 p-3 bg-gray-100 rounded-lg w-fit animate-messageAppear">
//         <div className="flex space-x-1">
//             <span className="w-2 h-2 bg-[#2BC0E6] rounded-full animate-typing delay-0"></span>
//             <span className="w-2 h-2 bg-[#2BC0E6] rounded-full animate-typing" style={{animationDelay: '0.2s'}}></span>
//             <span className="w-2 h-2 bg-[#2BC0E6] rounded-full animate-typing" style={{animationDelay: '0.4s'}}></span>
//         </div>
//     </div>
// );

// const CrisisResources = ({ resources }) => (
//     <div className="bg-[#fff3cd] w-full max-w-2xl p-4 rounded-md mt-5 border border-[#2BC0E6] animate-slideIn">
//         <h3 className="text-[#856404] font-bold text-lg mt-0">Emergency Resources</h3>
//         <ul className="m-0 pl-5 list-disc">
//             {Object.entries(resources).map(([name, contact]) => (
//                 <li key={name}>{name}: {contact}</li>
//             ))}
//         </ul>
//     </div>
// );

// const ExerciseMessage = ({ exercise, onStartExercise }) => (
//     <div className="bg-[#EAECC6] rounded-lg p-4 my-2 border border-[#2BC0E6] animate-slideIn">
//         <h3 className="text-lg font-bold text-[#2BC0E6] mb-3 flex items-center">
//             📌 {exercise.title}
//         </h3>
        
//         <div className="space-y-2 my-4">
//             {exercise.steps.map((step, index) => (
//                  <div key={index} className="flex items-start gap-3 p-2 bg-white rounded-md shadow-sm border border-[#2BC0E6] hover:translate-x-1 transition-transform">
//                     <div className="flex-shrink-0 w-6 h-6 bg-[#2BC0E6] text-white rounded-full flex items-center justify-center animate-bounce">{index + 1}</div>
//                     <p className="flex-grow">{step}</p>
//                 </div>
//             ))}
//         </div>

//         <div className="bg-[#EAECC6] border-l-4 border-[#2BC0E6] p-3 my-3 rounded-r-md">
//             💡 <strong>Tip:</strong> {exercise.tip}
//         </div>
        
//         <div className="flex gap-3 mt-4">
//              <button 
//                 className="py-2 px-4 bg-[#2BC0E6] text-white rounded-md cursor-pointer text-sm transition-all hover:bg-[#1a9cc7] hover:scale-105"
//                 onClick={() => onStartExercise(exercise)}>
//                 Start Exercise
//             </button>
//             <button 
//                 className="py-2 px-4 bg-[#EAECC6] text-[#2BC0E6] border border-[#2BC0E6] rounded-md cursor-pointer text-sm transition-all hover:bg-[#d8dab4] hover:scale-105">
//                 Skip for Now
//             </button>
//         </div>
//     </div>
// );

// export default MentalHealthAssistant;



import React, { useState, useEffect, useRef } from 'react';

// Main Component
const MentalHealthAssistant = () => {
    // State management
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showCrisisResources, setShowCrisisResources] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(null);

    const chatContainerRef = useRef(null);

    // Data (moved from the original script)
    const crisisResources = {
        "National Suicide Prevention Lifeline": "988",
        "Crisis Text Line": "Text HOME to 741741",
        "Emergency Services": "911"
    };

    const copingStrategies = {
        "stress": [
            {
                title: "Deep Breathing Exercise",
                steps: [
                    "Find a comfortable position",
                    "Inhale deeply through your nose for 4 counts",
                    "Hold your breath for 4 counts",
                    "Exhale slowly through your mouth for 4 counts",
                    "Repeat 5 times"
                ],
                tip: "This exercise helps calm your nervous system and reduce stress hormones."
            },
            {
                title: "5-4-3-2-1 Grounding Technique",
                steps: [
                    "Look around and name 5 things you can see",
                    "Focus on 4 things you can touch",
                    "Listen for 3 things you can hear",
                    "Notice 2 things you can smell",
                    "Find 1 thing you can taste"
                ],
                tip: "This technique helps bring your focus to the present moment and reduce anxiety."
            },
        ],
        "anxiety": [
            {
                title: "Progressive Muscle Relaxation",
                steps: [
                    "Start with your feet, tense muscles for 5 seconds",
                    "Release and notice the difference",
                    "Move up to your calves, then thighs",
                    "Continue with hands, arms, shoulders",
                    "Finish with face and neck muscles"
                ],
                tip: "This exercise helps release physical tension that often accompanies anxiety."
            },
             {
                title: "Box Breathing Technique",
                steps: [
                    "Inhale through your nose for 4 seconds",
                    "Hold your breath for 4 seconds",
                    "Exhale through your mouth for 4 seconds",
                    "Hold your breath for 4 seconds",
                    "Repeat for 5 cycles"
                ],
                tip: "This breathing pattern helps regulate your nervous system and reduce anxiety symptoms."
            },
        ],
        "overwhelm": [
            {
                title: "Task Breakdown Method",
                steps: [
                    "Write down all tasks that feel overwhelming",
                    "Break each task into smaller steps",
                    "Prioritize the most important tasks",
                    "Set realistic timeframes for each step",
                    "Start with the easiest task first"
                ],
                tip: "Breaking tasks into smaller pieces makes them more manageable and less overwhelming."
            },
             {
                title: "Time Management Exercise",
                steps: [
                    "Create a daily schedule",
                    "Include regular breaks",
                    "Set specific time blocks for tasks",
                    "Prioritize self-care activities",
                    "Review and adjust as needed"
                ],
                tip: "A structured schedule can help reduce feelings of being overwhelmed."
            },
        ]
    };

    const generalExercises = [
        {
            title: "Quick Mood Boost",
            steps: [
                "Take 3 deep breaths",
                "Stand up and stretch",
                "Drink a glass of water",
                "Think of one thing you're grateful for",
                "Smile for 30 seconds"
            ],
            tip: "These simple actions can help improve your mood quickly."
        },
        {
            title: "Mindful Moment",
            steps: [
                "Pause what you're doing",
                "Notice your surroundings",
                "Take a deep breath",
                "Check in with your body",
                "Return to your task with fresh energy"
            ],
            tip: "Taking mindful breaks can help maintain mental well-being."
        }
    ];

    const positiveResponses = [
        "That's wonderful to hear! 😊 I'm glad you're feeling positive. Feel free to reach out if you need any emotional support in the future.",
        "Great to hear you're doing well! 🌟 Remember, I'm here if you ever need emotional assistance.",
        "I'm so happy to hear you're feeling good! 💫 Don't hesitate to contact me if you need any support later.",
        "That's fantastic! 🎉 I'm here for you whenever you need emotional guidance or support."
    ];
    
    // Auto-scroll to the bottom of the chat on new messages
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Send initial greeting
    useEffect(() => {
        setTimeout(() => {
            addMessage("Welcome! I'm here to listen and provide support. How are you feeling today?");
        }, 500);
    }, []);

    // Helper function to add a new message to the state
    const addMessage = (text, isUser = false, isExercise = false) => {
        const newMessage = { text, isUser, isExercise };
        setMessages(prev => [...prev, newMessage]);
    };

    // Sentiment analysis
    const analyzeSentiment = (text) => {
        const positiveWords = [
            'happy', 'good', 'great', 'better', 'improve', 'progress', 'hope', 
            'excited', 'joy', 'peace', 'wonderful', 'amazing', 'fantastic', 
            'delighted', 'content', 'calm', 'relaxed', 'positive', 'optimistic', 
            'grateful', 'thank', 'thanks', 'thank you', 'okay', 'ok', 'fine', 
            'alright', 'all right', 'doing well', 'feeling good', 'appreciate'
        ];
        const negativeWords = [
            'sad', 'bad', 'terrible', 'worse', 'anxious', 'stress', 'overwhelm', 
            'fear', 'worried', 'depressed', 'angry', 'frustrated', 'tired', 
            'exhausted', 'nervous', 'scared', 'lonely', 'hurt', 'upset', 
            'disappointed'
        ];
        
        let score = 0;
        const lowerCaseText = text.toLowerCase();
        
        positiveWords.forEach(word => {
            if (lowerCaseText.includes(word)) score++;
        });
        negativeWords.forEach(word => {
            if (lowerCaseText.includes(word)) score--;
        });
        
        return score;
    }
    
    // Generate response
    const getResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();
        const crisisKeywords = ["suicide", "kill myself", "end it all", "can't go on", "emergency"];

        if (crisisKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
            setShowCrisisResources(true);
            return "I'm really concerned about your safety. Please consider reaching out to one of these resources immediately. You don't have to go through this alone.";
        } else {
             setShowCrisisResources(false);
        }

        const sentiment = analyzeSentiment(lowerCaseInput);
        if(sentiment > 0){
             return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
        }

        let topic = null;
        if (["stress", "stressed"].some(word => lowerCaseInput.includes(word))) topic = "stress";
        else if (["anxiety", "anxious", "nervous"].some(word => lowerCaseInput.includes(word))) topic = "anxiety";
        else if (["overwhelm", "too much", "can't handle"].some(word => lowerCaseInput.includes(word))) topic = "overwhelm";
        
        if (topic && copingStrategies[topic]) {
            const strategy = copingStrategies[topic][Math.floor(Math.random() * copingStrategies[topic].length)];
            return strategy;
        } else {
             return generalExercises[Math.floor(Math.random() * generalExercises.length)];
        }
    };
    
    // Handle sending a message
    const handleSendMessage = (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value.trim();
        
        if (userInput) {
            addMessage(userInput, true);
            e.target.elements.userInput.value = '';
            
            setIsTyping(true);
            
            setTimeout(() => {
                const response = getResponse(userInput);
                setIsTyping(false);
                if (typeof response === 'string') {
                    addMessage(response);
                } else {
                    setCurrentExercise(response); 
                    addMessage(response, false, true); 
                }
            }, 1500);
        }
    };

    const startExercise = (exercise) => {
        // Remove the exercise prompt
        setMessages(prev => prev.slice(0, prev.length -1));

        // Start showing steps with delays
        exercise.steps.forEach((step, index) => {
            setTimeout(() => {
                addMessage(`Step ${index + 1}: ${step}`);
            }, index * 2500);
        });

        // Add completion message
        setTimeout(() => {
            addMessage("Great job! You've completed the exercise. How do you feel now?");
        }, exercise.steps.length * 2500);
    };

    return (
        <div className="bg-[#1F223A] min-h-screen flex flex-col items-center p-5 font-sans text-gray-200">
            <h1 className="text-3xl font-bold text-center my-4 animate-fadeIn">
                Your AI <span className="text-[#C061FF]">Mental Health</span> Assistant
            </h1>
            <div className="container bg-[#292D4A] w-full max-w-2xl rounded-lg shadow-2xl p-5 flex flex-col animate-fadeIn">
                <div id="chat-container" ref={chatContainerRef} className="flex-1 h-96 overflow-y-auto p-3 bg-[#1F223A] rounded-md mb-4">
                    {messages.map((msg, index) => {
                        if (msg.isExercise) {
                            return <ExerciseMessage key={index} exercise={msg.text} onStartExercise={startExercise} />;
                        }
                        return (
                             <div key={index} className={`message max-w-[80%] my-2 p-3 rounded-lg animate-messageAppear ${
                                msg.isUser 
                                ? 'bg-[#6B3F97] text-white ml-auto' 
                                : 'bg-[#373B5E] text-gray-200 mr-auto'
                            }`}>
                                {msg.text}
                            </div>
                        )
                    })}
                    {isTyping && <TypingIndicator />}
                </div>

                <form onSubmit={handleSendMessage} className="input-container flex gap-3">
                    <input type="text" name="userInput" id="user-input" placeholder="How are you feeling today?" 
                           className="flex-1 p-3 border border-[#6B3F97] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C061FF] transition-all bg-[#1F223A] text-gray-200 placeholder-gray-500 animate-slideIn"
                    />
                    <button type="submit" 
                            className="py-3 px-6 bg-[#6B3F97] text-white font-semibold rounded-md cursor-pointer transition-all hover:bg-[#C061FF] animate-fadeIn"
                    >Send</button>
                </form>
            </div>
            
            {showCrisisResources && <CrisisResources resources={crisisResources} />}
        </div>
    );
};


// Child Components

const TypingIndicator = () => (
    <div className="my-2 p-3 w-fit animate-messageAppear">
        <div className="flex space-x-1">
            <span className="w-2.5 h-2.5 bg-[#C061FF] rounded-full animate-typing" style={{animationDelay: '0.2s'}}></span>
            <span className="w-2.5 h-2.5 bg-[#C061FF] rounded-full animate-typing" style={{animationDelay: '0.4s'}}></span>
            <span className="w-2.5 h-2.5 bg-[#C061FF] rounded-full animate-typing" style={{animationDelay: '0.6s'}}></span>
        </div>
    </div>
);

const CrisisResources = ({ resources }) => (
    <div className="bg-yellow-500/10 border border-yellow-400 text-yellow-200 w-full max-w-2xl p-4 rounded-md mt-5 animate-slideIn">
        <h3 className="font-bold text-lg text-yellow-300">Emergency Resources</h3>
        <ul className="m-0 pl-5 list-disc mt-2">
            {Object.entries(resources).map(([name, contact]) => (
                <li key={name}><span className="font-semibold">{name}:</span> {contact}</li>
            ))}
        </ul>
    </div>
);

const ExerciseMessage = ({ exercise, onStartExercise }) => (
    <div className="bg-[#1F223A] rounded-lg p-4 my-2 border border-[#6B3F97] animate-slideIn">
        <h3 className="text-lg font-bold text-[#C061FF] mb-3 flex items-center">
            📌 {exercise.title}
        </h3>
        
        <div className="space-y-2 my-4">
            {exercise.steps.map((step, index) => (
                 <div key={index} className="flex items-start gap-3 p-3 bg-[#292D4A] rounded-md shadow-sm border border-transparent hover:border-[#6B3F97] transition-all">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#34D399] text-black font-bold rounded-full flex items-center justify-center animate-bounce">{index + 1}</div>
                    <p className="flex-grow text-gray-300">{step}</p>
                </div>
            ))}
        </div>

        <div className="bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-200 p-3 my-3 rounded-r-md">
            💡 <strong>Tip:</strong> {exercise.tip}
        </div>
        
        <div className="flex gap-3 mt-4">
             <button 
                className="py-2 px-4 bg-[#6B3F97] text-white rounded-md cursor-pointer text-sm font-semibold transition-all hover:bg-[#C061FF] hover:scale-105"
                onClick={() => onStartExercise(exercise)}>
                Start Exercise
            </button>
            <button 
                className="py-2 px-4 bg-transparent text-gray-400 border border-[#6B3F97] rounded-md cursor-pointer text-sm transition-all hover:bg-[#6B3F97] hover:text-white hover:scale-105">
                Skip for Now
            </button>
        </div>
    </div>
);

export default MentalHealthAssistant;