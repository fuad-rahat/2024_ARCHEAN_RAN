import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[url('/s2.jpg')]">
      <div className="absolute pt-32 flex pl-96 flex-col justify-center items-center">
        <p className="text-green-400 text-6xl text-center pt-5 -mb-10">Welcome to the new world</p>
        
        {/* Applying Mukta Font */}
        <p className="text-green-200 text-center text-xl font-bold mt-4 pt-10 -mb-10" style={{ fontFamily: 'Mukta, sans-serif' }}>
        Have you ever wondered how life would live without the sun or how an ecosystem would be formed?
        </p>
      </div>

      <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
        <div className="flex absolute left-14 flex-col gap-2">
          <p className="p-2 text-2xl text-center rounded-xl text-green-400 bg-gray-500">Resources</p>
        <a href="https://oceanworlds.space/storyboard/">
        <Image
                src={`/resources1.jpg`}
                
                width={240}
                height={240}
                className="  w-40 m-1 h-40 object-cover mx-auto rounded-lg shadow-md"
              />
        </a>
        <a href="https://science.nasa.gov/toolkit/oceanworlds/">
        <Image
                src={`/resources2.jpg`}
                
                width={240}
                height={240}
                className="  w-40 m-1 h-40 object-cover mx-auto rounded-lg shadow-md"
              />
        </a>
        <a href="https://oceanworlds.space/storyboard/">
        <Image
                src={`/resources3.jpg`}
                
                width={240}
                height={240}
                className="  w-40 m-1 h-40 object-cover mx-auto rounded-lg shadow-md"
              />
        </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-3 mt-44 max-w-5xl mx-auto">
          
          {/* Archean Section */}
          <Link href={'/archean'}>
            <div className="group border-[0.1rem] relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
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
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl text-2xl">Archean</button>
              </div>
            </div>
          </Link>

          {/* Live World Section */}
          <Link href={'/live-world'}>
            <div className="group border-[0.1rem] relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
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
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl text-2xl">Live World</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
