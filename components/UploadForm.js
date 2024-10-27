"use client";
import React, { useRef, useState } from "react";
import PhotoCard from "./PhotoCard";
import ButtonSubmit from "./ButtonSubmit";
import toast from "react-hot-toast";
import { uploadPhoto } from "@/actions/uploadActions";

function UploadForm() {
  const formRef = useRef();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleInputFiles(e) {
    e.preventDefault();

    // Check if the total files exceed 3
    if (files.length >= 3) {
      toast.error("You can only upload up to 3 images! ❌");
      return;
    }

    const newFiles = [...e.target.files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        return file;
      }
    });

    // Check if adding new files will exceed the limit of 3
    if (files.length + newFiles.length > 3) {
      toast.error("Uploading these files would exceed the 3-image limit. ❌");
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
    formRef.current.reset();
  }

  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    if (!files.length) return toast.error("No image files are selected! ❌");

    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file)
    })

    const res = await uploadPhoto(formData)
    toast.success("Image uploaded successfully! ✌")

    setLoading(false); // Set loading to false after the upload completes
  }

  return (
    <form
      onSubmit={handleUpload}
      ref={formRef}
      className="bg-white p-16 rounded-xl shadow-lg max-w-[600px]"
    >
      <div className="flex flex-col gap-6">
        <h1>NextJS Server Actions Upload Images</h1>
        <div>
          <div className="p-2 border-2 border-dashed border-purple-300 flex">
            <input
              type="file"
              accept="image/*"
              multiple
              className="cursor-pointer"
              onChange={handleInputFiles}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96M17 13l-5 5l-5-5h3V9h4v4z"
              ></path>
            </svg>
          </div>
          {!loading && (
            <h5 className="text-xs text-orange-700 mt-2">
              (*) Only accepts image files less than 1mb in size. Up to 3 photo
              files.
            </h5>
          )}

          {/* Preview Images */}
          <div className="grid grid-cols-3 gap-3">
            {files.map((file, index) => (
              <PhotoCard
                key={index}
                url={URL.createObjectURL(file)}
                onClick={() => handleDeleteFile(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <ButtonSubmit value="Upload to Cloudinary" loading={loading} />
    </form>
  );
}

export default UploadForm;
