"use client";
import React, { useState } from "react";
import { IconTriangleInfo } from "@irsyadadl/paranoid";

const FileInput = ({ disabled, onChange, errorMessage }) => {
    return (
        <>
            <input
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                disabled={disabled}
                onChange={onChange}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </>
    );
};

const ImageUploader = ({
    image,
    isDragActive,
    handleImageUpload,
    errorMessage,
}) => {
    return (
        <div className={`w-full h-full flex items-center justify-center`}>
            <div
                className={`flex flex-col gap-4 p-8 border-dashed border border-indigo-300 rounded-xl transition-all duration-300 ${
                    isDragActive ? "bg-indigo-500" : "bg-white"
                } `}
            >
                <div>
                    <h2
                        className={`text-sm ${
                            isDragActive ? "text-gray-100" : "text-gray-500 "
                        }`}
                    >
                        Paste, or drag and drop an image or browse on your
                        device
                    </h2>
                </div>
                {errorMessage && (
                    <span className="flex items-center gap-2">
                        <IconTriangleInfo className="w-5 h-5 text-red-400" />
                        <p className="text-red-400 text-sm">{errorMessage}</p>
                    </span>
                )}
                <FileInput
                    disabled={isDragActive}
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                />
                {/* {image && <ImagePreview src={image} />} */}
            </div>
        </div>
    );
};

export default ImageUploader;
