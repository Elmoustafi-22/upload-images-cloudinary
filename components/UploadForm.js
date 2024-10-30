"use client";
import React, { useRef, useState, useCallback } from "react";
import PhotoCard from "./PhotoCard";
import ButtonSubmit from "./ButtonSubmit";
import toast from "react-hot-toast";
import { deletePhoto, revalidate, uploadPhoto } from "@/actions/uploadActions";
import { debounce } from "lodash";

function UploadForm({ photos }) {
  const formRef = useRef();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced file handler
  const handleInputFiles = useCallback(
    debounce((e) => {
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
    }, 300), // 300ms debounce time
    [files]
  );

  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true at the start

    if (!files.length) {
      toast.error("No image files are selected! ❌");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await uploadPhoto(formData);
      if (res?.msg) toast.success(`${res?.msg}!`);
      if (res?.errMsg) toast.error(`Error ${res.errMsg}`);
    } catch (error) {
      toast.error("An error occurred during upload.");
    } finally {
      setFiles([]);
      formRef.current.reset();
      revalidate("/");
      setLoading(false); // Set loading to false after the upload completes
    }
  }

  async function handleDeletePhoto(public_id) {
    await deletePhoto(public_id);
  }

  return (
    <div className="flex flex-col mt-20">
      <form
        onSubmit={handleUpload}
        ref={formRef}
        className="bg-white p-16 rounded-xl shadow-lg max-w-[600px]"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-bold">
            NextJS Server Actions Upload Images
          </h1>
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
                (*) Only accepts image files less than 1MB in size. Up to 3
                photo files.
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
      <div className="max-w-[600px]">
        <h1 className="text-xl mt-5 font-bold">All Photos</h1>
        <div className="grid grid-cols-4 justify-center gap-2 grow">
          {photos.map((photo) => (
            <PhotoCard
              key={photo?.public_id}
              url={photo?.secure_url}
              onClick={() => handleDeletePhoto(photo?.public_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadForm;