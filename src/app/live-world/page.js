import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-[url('/space.gif')] flex flex-col  justify-center items-center">
      <div className="w-full border-[0.1rem] rounded-xl md:w-4/5 lg:w-4/5 transition-all duration-300 p-5">
        <div className="flex flex-col md:flex-row justify-center gap-5  rounded-2xl shadow-lg overflow-hidden">
          
          {/* Video Section */}
          <div className="w-full bg-white rounded-xl h-full md:w-3/5">
            <video 
              className="rounded-xl w-full object-cover" 
              preload="none" 
              controls
            >
              <source src="/real_world1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Text Section */}
          <div className="w-full md:w-2/5 bg-sky-200 p-5 rounded-xl flex items-center justify-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, eveniet! Laboriosam, consectetur. Sed animi exercitationem vero, excepturi dignissimos illum in suscipit corporis non doloremque corrupti fugiat, sit dolorum aliquam? Vero! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-6">
        <Link href={'/all'}>
          <button className="bg-sky-500 hover:bg-sky-600 transition-colors duration-300 text-white font-bold py-3 px-8 rounded-xl text-2xl shadow-md">
            Subset Bade World
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
