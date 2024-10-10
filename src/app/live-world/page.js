"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { AiOutlineMessage } from "react-icons/ai"; // Importing a chat icon from react-icons

const Page = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Fixed questions list
  const fixedQuestions = [
    "What is the Archean period?",
    "How did microorganisms form in the Archean?",
    "What were the environmental conditions like during the Archean?",
  ];

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    sendChatMessage(chatInput);
    setChatInput(""); // Clear input after sending
  };

  const handleFixedQuestionClick = (question) => {
    sendChatMessage(question);
  };

  const sendChatMessage = async (message) => {
    setLoading(true);
    setChatResponse([...chatResponse, { message, response: "Thinking..." }]);

    try {
      const res = await axios.post("/api/gemini", { prompt: message });
      console.log("Chat API Response:", res.data);

      const result =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      // Replace the last "thinking..." message with the actual response
      setChatResponse((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { message, response: result };
        return updated;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setChatResponse((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          message,
          response: "An error occurred. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom of the chat container whenever chatResponse changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatResponse]);

  return (
    <div className="min-h-screen bg-[url('/space.gif')] bg-cover bg-center flex flex-col justify-center items-center p-6 relative">
      <div className="w-full max-w-5xl border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl shadow-2xl transition-all duration-300 p-8">
        
        {/* Text Section */}
        <div className="mb-8 p-6 rounded-lg bg-white shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Understanding the Origins and Survival of Microorganisms
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            <strong>How Microorganisms Are First Created:</strong><br />
            Microorganisms first appeared on Earth billions of years ago...
          </p>
        </div>

        {/* Video Section */}
        <div className="flex justify-center mb-8">
          <video 
            className="w-full max-w-3xl rounded-xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300" 
            preload="none" 
            controls
          >
            <source src="/real_world1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Button Section */}
        <div className="flex justify-center">
          <Link href={'/all'}>
            <button className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-indigo-500 hover:to-sky-600 transition-colors duration-300 text-white font-bold py-3 px-10 rounded-full text-lg shadow-md hover:shadow-lg">
              Go Archean World
            </button>
          </Link>
        </div>
      </div>

      {/* Chatbot Icon */}
      <div 
        className="fixed bottom-10 right-10 bg-sky-500 p-4 rounded-full cursor-pointer shadow-lg hover:bg-sky-600 transition duration-300" 
        onClick={handleChatToggle}
      >
        <AiOutlineMessage className="text-white text-3xl" />
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-10 w-80 bg-white border border-gray-300 rounded-xl shadow-lg p-4 flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Archean Chatbot</h3>

          {/* Fixed Questions Section */}
          <div className="space-y-2">
            {fixedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleFixedQuestionClick(question)}
                className="text-left bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 w-full"
              >
                {question}
              </button>
            ))}
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto max-h-64 space-y-3 p-2 mt-4">
            {chatResponse.map((chat, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-lg shadow-sm">
                <p className="font-semibold text-blue-600">You:</p>
                <p className="text-gray-700">{chat.message}</p>
                <p className="font-semibold text-green-600 mt-2">Gemini:</p>
                <p className="text-gray-700">{chat.response}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full border rounded-lg p-2 outline-none focus:border-sky-500"
              required
            />
            <button
              type="submit"
              className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition duration-300"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
