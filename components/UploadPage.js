import UploadForm from "./UploadForm";
import { getAllPhotos } from "@/actions/uploadActions";

export default async function UploadPage(){
    const photos = await getAllPhotos();
    return <UploadForm photos={photos} />
}