import Image from 'next/image';
import React from 'react';

const images = [
    { src: "/img1.jpg", title: "Team Leader", name: "Al Asmoule Chawdhary Ornob" },
    { src: "/img2.jpg", title: "Developer", name: "Md. Muhtasim Fuad Rahat" },
    { src: "/img3.jpg", title: "Ui/Ux Designer", name: "Mahbub Alahi Munna" },
    { src: "/img4.jpg", title: "Video Editor", name: "Snigdha Rani Das" },
    { src: "/img5.jpg", title: "Researcher", name: "Md Morshadul Islam" }
];

const Page = () => {
    return (
        <div className="p-8 bg-gray-50">
            {/* Header Section */}
            <div className="mb-16 mt-16 text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Meet the Archean Pioneers</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We are a dedicated team working on the Archean project for NASA’s Space Apps Challenge 2024. Our mission is to explore the possibilities of life beyond Earth, and through our game-based app, we aim to combine entertainment with education.
                </p>
            </div>

            {/* Mission and Vision Section */}
            <div className="md:flex justify-between items-start mb-16 space-y-8 md:space-y-0">
                <div className="md:w-1/2 md:pr-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our team, the Archean Pioneers, is developing a game-based app called Archean that takes you to a world where life exists without sunlight. In this game, players can create tiny microorganisms and help them evolve into more complex life forms. Just like deep in Earth’s oceans where life thrives near hydrothermal vents using chemical energy, the game shows how creatures survive in a dark environment. 
                        <br />
                        Archean isn’t just about playing a game—it’s a way to explore new possibilities for life beyond Earth. It could help us find solutions for space survival, medical breakthroughs, and ways to protect our environment. 
                    </p>
                </div>
                <div className="md:w-1/2 md:pl-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Through this game, people of all ages will gain insights into a sunless world and the concept of a new ecosystem. We aim to create new opportunities in fields like medicine, biotechnology, and environmental science by exploring chemosynthetic ecosystems.
                        <br />
                        We seek to inspire curiosity and innovative thinking, showing how life can thrive in unexpected conditions. Our goal is to blend science with engaging gameplay, encouraging players to discover unknown possibilities and envision a future where science and creativity converge.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {images.map((image, index) => (
                        <div key={index} className="relative group w-64 h-64 mx-auto">
                            <div className="w-full h-full overflow-hidden rounded-full shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                                <Image
                                    src={image.src}
                                    width={256}
                                    height={256}
                                    className="object-cover w-full h-full"
                                    alt={image.title}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center p-4 z-10 rounded-full transition duration-300 ease-in-out group-hover:bg-opacity-80 group-hover:scale-110">
                                <div className="text-white text-center opacity-0 group-hover:opacity-100">
                                    <p className="text-lg font-semibold">{image.name}</p>
                                    <p className="text-sm font-medium">{image.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
