'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // State for toggling minimize/maximize

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/gemini', { prompt });
      console.log("Full API Response:", res.data);

      const result = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      const paragraphs = result.split(/\n\s*\n/).filter(paragraph => paragraph.trim() !== "");
      setResponse(paragraphs);
      setPrompt(''); // Clear input box on success
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse(["An error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black  via-gray-900 to-purple-900 min-h-screen">
      <div className="relative flex top-20 max-w-[90rem] mx-auto flex-col justify-center items-center">
        <p className="text-cyan-400 text-5xl text-center pt-5 -mb-10 font-bold">
        Welcome to the new world  </p>
        
        <p className="text-gray-300 text-center text-xl font-semibold mt-4 pt-10 -mb-10 max-w-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Have you ever wondered how life would live without the sun or how an ecosystem would be formed?        </p>
      </div>

      <div className="bg-cover  bg-center flex  items-center justify-center">
        <div className="flex relative  left-16 flex-col gap-3">
          <p className="p-2 text-2xl text-center rounded-xl text-cyan-400 bg-gray-800 shadow-md">Resources</p>
          <a
            href="https://oceanworlds.space/storyboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/resources1.jpg"
              width={240}
              height={240}
              className="w-40 border-[0.1rem] m-1 h-40 object-cover mx-auto rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            />
          </a>
          <a
            href="https://science.nasa.gov/toolkit/oceanworlds/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/resources2.jpg"
              width={240}
              height={240}
              className="w-40 border-[0.1rem] m-1 h-40 object-cover mx-auto rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            />
          </a>
          <a
            href="https://oceanworlds.space/storyboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/resources3.jpg"
              width={240}
              height={240}
              className="w-40 border-[0.1rem] m-1 h-40 object-cover mx-auto rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            />
          </a>
        </div>

        <div className="flex relative  justify-center items-center gap-10 p-3  max-w-5xl mx-auto">
          <Link href={'/archean'}>
            <div className="group border-[0.1rem] border-cyan-400 relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
              <video 
                className="w-full h-auto rounded-xl object-cover" 
                preload="none" 
                autoPlay 
                muted 
                loop
              >
                <source src="/archean.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl text-2xl">
                  Archean
                </button>
              </div>
            </div>
          </Link>

          <Link href={'/live-world'}>
            <div className="group border-[0.1rem] border-cyan-400 relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
              <video 
                className="w-full h-auto rounded-xl object-cover" 
                preload="none" 
                autoPlay 
                muted 
                loop
              >
                <source src="/real_world1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl text-2xl">
                  Live World
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="absolute bottom-6 w-full max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-cyan-500">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full rounded-lg text-black p-3 outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>

          {response.length > 0 && (
            <div className="relative mt-4 max-w-4xl p-3 bg-gray-800 text-cyan-300 rounded-lg shadow-lg border border-cyan-500">
              {/* Toggle minimize/maximize buttons */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="absolute top-2 right-2 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-full"
              >
                {isMinimized ? 'Maximize' : 'Minimize'}
              </button>

              {/* Response Content with Maximize/Minimize Logic */}
              <div
                className={`overflow-y-auto transition-all duration-300 ease-in-out ${isMinimized ? 'max-h-12' : 'max-h-72'} space-y-4`}
              >
                {response.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`leading-relaxed ${index === 0 ? 'font-bold text-xl text-white' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
