"use client";
import React from "react";
import Image from "next/image";

export default function ImagePreview({ image }) {
    return (
        <>
            <Image
                className="rounded-lg w-full h-auto"
                src={URL.createObjectURL(image)}
                alt="Uploaded image"
                width={500}
                height={500}
            />
        </>
    );
}
