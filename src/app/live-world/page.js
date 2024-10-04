import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-[url('/space.gif')] bg-cover bg-center flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-5xl border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl shadow-2xl transition-all duration-300 p-8">
        
        {/* Text Section */}
        <div className="mb-8 p-6 rounded-lg bg-white shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Understanding the Origins and Survival of Microorganisms
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            <strong>How Microorganisms Are First Created:</strong><br />
            Microorganisms first appeared on Earth billions of years ago. Scientists believe that, in the early conditions of Earth, simple molecules formed due to chemical reactions in the warm waters. Over time, these molecules combined to create more complex microorganisms. The first microorganisms were very simple, like bacteria. They reproduced by splitting into two, a process called cell division. This early life is thought to have started about 3.8 billion years ago when the Earths environment had hot water, gases, and various chemicals that supported the creation of life.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            <strong>How Microorganisms Live:</strong><br />
            Microorganisms need certain elements to survive, such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg mb-4">
            <li>Food: Some microorganisms can produce their own food through photosynthesis or chemical reactions.</li>
            <li>Heat and Light: Some prefer warm environments and use sunlight as a source of energy.</li>
            <li>Oxygen or Carbon Dioxide: Microorganisms use these gases from the environment for breathing.</li>
            <li>Water or Moisture: Most microorganisms need water or a moist environment to live and grow.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>Finally, the Ecosystem:</strong><br />
            An ecosystem is a system where different forms of life are connected and depend on each other. Plants, animals, and microorganisms all play a role in the cycle of life, from creation to decomposition, supporting the balance of nature.
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
    </div>
  );
};

export default Page;
