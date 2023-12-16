import React from "react";

export default function Header() {
    return (
        <div className="w-full flex flex-col items-center my-4">
            <h1 className="text-6xl font-extrabold w-fit bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                KD Scene
            </h1>
            <p className="text-gray-500">
                Find the Korean Drama just with Screenshot
            </p>
        </div>
    );
}
