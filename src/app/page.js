import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex gap-10 m-5">
      <Link href={'/home'}>
      <div>
      <video 
                className=" rounded-xl" 
                preload="none" 
                autoPlay 
                muted 
                loop
            >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="flex justify-center ">
              <button className="bg-sky-300 p-2 m-4 rounded-xl text-red-600 text-4xl">Archean</button>
            </div>
    </div>
      </Link>
   <Link href={'/live-world'}>
   <div>
      <video  
                className="rounded-xl" 
                preload="none" 
                autoPlay 
                muted 
                loop
            >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="flex justify-center ">
            <button className="bg-sky-300 p-2 m-4 rounded-xl text-red-600 text-4xl">Live World</button>
            </div>
    </div></Link>
      </div>
    </div>
  );
}
