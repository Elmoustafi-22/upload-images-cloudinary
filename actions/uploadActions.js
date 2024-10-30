"use server";
import path from "path";
import fs from "fs/promises"
import { v4 as uuidv4 } from "uuid"
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import Photo from "@/models/photoModel";

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

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

export async function uploadPhoto(formData) {

    try {
        const newFiles = await savePhotosToLocal(formData);

        const photos = await uploadPhotosToCloudinary(newFiles)

        newFiles.map(file => fs.unlink(file.filepath))

        // await delay(2000)

        // revalidatePath("/")

        const newPhotos = photos.map(photo => {
          const newPhoto = new Photo({
            public_id: photo.public_id,
            secure_url: photo.secure_url,
          })
          return newPhoto;
        })

        await Photo.insertMany(newPhotos)

        return { msg: "Uploaded Successfully!"}

    } catch (error) {
        return { errMsg: error.message }
    }

}

export async function getAllPhotos() {
  try {
    // const {resources} = await cloudinary.v2.search.expression(
    //   "folder:upload-images/*"
    // ).sort_by('created_at', 'desc').max_results(500).execute()

    const photos = await Photo.find().sort('createdAt');
    const resources = photos.map(photo => ({...photo._doc, _id: photo._id.toString() }))
 
    return resources|| [] ;
  } catch (error) {
    return { errMsg: error.message };
  }
}
       
export async function revalidate(path) {
    revalidatePath(path)
} 

export async function deletePhoto(public_id) {
  try {
    await Promise.all([
      Photo.findOneAndDelete({public_id}),
      cloudinary.v2.uploader.destroy(public_id),
    ])

    revalidatePath("/")
    return { msg: 'Delete Success!' };
  } catch (error) {
    return { errMsg: error.message };
  }
}