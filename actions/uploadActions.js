"use server";
import path from "path";
import fs from "fs/promises"
import { v4 as uuidv4 } from "uuid"
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function savePhotosToLocal(formData) {
    const files = formData.getAll("files")
    const multiplyBuffersPromise = files.map(file => (
        file.arrayBuffer()
            .then(data => {
                const buffer = Buffer.from(data);
                const name = uuidv4();
                const ext = file.type.split("/")[1];
                console.log({name, ext})
                
                const tempdir = os.tmpdir();
                const uploadDir = path.join(
                  tempdir,
                  `/${name}.${ext}`
                );
                
                fs.writeFile(uploadDir, buffer)

                return { filepath: uploadDir, filename: file.name }
            })
    ));

    return await Promise.all(multiplyBuffersPromise);
}

async function uploadPhotosToCloudinary(newFiles){
    const multiplePhotosPromise = newFiles.map((file) =>
      cloudinary.v2.uploader.upload(file.filepath, {
        folder: "upload-images",
        public_id: `file_${Date.now()}`,
        resource_type: "auto",
      })
    );
    return await Promise.all(multiplePhotosPromise)
}

export async function uploadPhoto(formData) {
    try {
        const newFiles = await savePhotosToLocal(formData);

        const photos = await uploadPhotosToCloudinary(newFiles)

        newFiles.map(file => fs.unlink(file.filepath))

        revalidatePath("/")
        return { msg: "Uploaded Successfully!"}

    } catch (error) {
        return { errMsg: error.message }
    }
}