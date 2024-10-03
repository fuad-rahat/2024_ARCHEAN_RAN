import Link from "next/link";

const page = () => {
    return (
        <div>
          <div className="flex justify-center gap-5 m-4">
          <div className=" w-3/5 rounded-2xl ">
            <video  
                className="rounded-xl" 
                preload="none" 
                controls 
                
            >
                <source src="/real_world1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            </div> 
            <div className="w-2/5 bg-sky-200 p-3 rounded-xl">
           <p className=" text-xl"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, eveniet! Laboriosam, consectetur. Sed animi exercitationem vero, excepturi dignissimos illum in suscipit corporis non doloremque corrupti fugiat, sit dolorum aliquam? Vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, eveniet! Laboriosam, consectetur. Sed animi exercitationem vero, excepturi dignissimos illum in suscipit corporis non doloremque corrupti fugiat, sit dolorum aliquam? Vero!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, eveniet! Laboriosam, consectetur. Sed animi exercitationem vero, excepturi dignissimos illum in suscipit corporis non doloremque corrupti fugiat, sit dolorum aliquam? Vero!   </p>    
            </div> 

          </div>
          <div className="flex justify-center ">
            <Link href={'/live-world/all'}>
            
            <button className="bg-sky-300 p-2 m-4 rounded-xl text-red-600 text-4xl">Subset Bade world</button></Link>
            </div>
        </div>
    );
};

export default page;
