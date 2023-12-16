import React from "react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full py-12 bg-indigo-50">
            <div className="w-11/12 md:w-10/12 mx-auto">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-gray-700">
                        KD Scene
                    </h1>
                </div>
            </div>
        </nav>
    );
}
