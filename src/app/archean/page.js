import Link from "next/link";

export default function ArcheanPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Video Player */}
      <div className="relative w-full max-w-5xl h-auto overflow-hidden rounded-lg shadow-lg">
        <video
          className="w-full h-auto p-2 rounded-lg"
          controls
          autoPlay
          loop
        >
          <source src="/archean.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
      </div>

      {/* Back Button */}
      <div className="mt-10">
        
        <a href="https://www.figma.com/proto/J5Qn3pK4LzFjj1FnjdAQLp/arcean?node-id=9-2222" className='' target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300">
            Visit New World
          </button>
          </a>
      </div>
    </div>
  );
}
