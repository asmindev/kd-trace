"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IconTriangleInfo } from "@irsyadadl/paranoid";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import Header from "./Header";

export default function Content() {
    const inputRef = useRef();
    const [image, setImage] = useState(null);
    const [isNoResults, setIsNoResults] = useState(false);
    const [results, setResults] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const isValidImage = (file) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/jpg",
        ];
        return allowedTypes.includes(file.type);
    };
    const handlePaste = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.clipboardData.files.length) {
            setErrorMessage("Please select an image file.");
            return;
        }
        handleImageUpload(e.clipboardData.files[0]); // only upload first file
    };
    const handleDragDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (!e.dataTransfer.files.length) {
            setErrorMessage("Please select an image file.");
            return;
        }
        handleImageUpload(e.dataTransfer.files[0]); // only upload first file
    };
    const handleImageUpload = (file) => {
        if (isNoResults) {
            setIsNoResults(false);
        }
        if (errorMessage) {
            setErrorMessage(null);
        }

        if (!isValidImage(file)) {
            setErrorMessage("Only images are allowed.");
            return;
        }
        uploadImage(file);
        setImage(file);
    };

    const uploadImage = async (file) => {
        if (results) {
            setResults(null);
        }
        if (!file) {
            setErrorMessage("Please select an image file.");
            return;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/search`,
                formData
            );
            setResults(data);
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 404) {
                setIsNoResults(true);
            }
        }
    };
    const toTwoDigitString = (number) => {
        return String(number).padStart(2, "0");
    };

    useEffect(() => {
        if (image) {
            console.log(image);
        }
    }, [image]);
    return (
        <div
            className="relative w-full h-[40vh]"
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
            onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragActive(true);
            }}
            onDrop={handleDragDrop}
            onPaste={handlePaste}
        >
            <Header />

            {image ? (
                <div className="w-full h-full">
                    <div className="bg-white w-full md:w-8/12 border border-dashed border-gray-400 rounded-xl text-center mx-auto overflow-hidden">
                        {errorMessage && (
                            <span className="flex items-center gap-2">
                                <IconTriangleInfo className="w-5 h-5 text-red-400" />
                                <p className="text-red-400 text-sm">
                                    {errorMessage}
                                </p>
                            </span>
                        )}
                        <input
                            ref={inputRef}
                            className="w-full py-4 px-3 hidden"
                            type="file"
                            onChange={(e) =>
                                handleImageUpload(e.target.files[0])
                            }
                        />
                        <button
                            onClick={() => {
                                inputRef.current.click();
                            }}
                            className="w-full p-3 text-gray-600"
                        >
                            Browse
                        </button>
                    </div>
                    {results && (
                        <div className="flex items-center justify-center mt-4">
                            <div className="w-fit text-sm text-gray-500">
                                Loaded {results.count} frame with{" "}
                                {results.total_time}ms
                            </div>
                        </div>
                    )}
                    <div className="mt-4 h-full flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <ImagePreview image={image} />
                        </div>
                        <div className="flex w-full md:w-1/2 gap-4 flex-col">
                            {isNoResults && (
                                <div className="bg-white w-full p-4 border border-gray-300 rounded-xl">
                                    <p className="text-gray-500">
                                        No results found
                                    </p>
                                </div>
                            )}
                            {results?.metadatas?.length &&
                                results.metadatas.map((result) => (
                                    <div
                                        key={result.index}
                                        className="bg-white flex justify-between w-full p-4 border border-gray-300 rounded-xl"
                                    >
                                        <div className="flex-1">
                                            <h1>{result.series}</h1>
                                            <p className="text-gray-500 text-sm">
                                                Episode : {result.eps}
                                            </p>
                                        </div>
                                        <div className="w-fit h-full flex items-end">
                                            {/* hour:minute:second */}
                                            <p className="text-gray-500">
                                                {toTwoDigitString(result.hour)}:
                                                {toTwoDigitString(
                                                    result.minute
                                                )}
                                                :
                                                {toTwoDigitString(
                                                    result.second
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ) : (
                <ImageUploader
                    image={image}
                    handleImageUpload={handleImageUpload}
                    isDragActive={isDragActive}
                    errorMessage={errorMessage}
                />
            )}
        </div>
    );
}
