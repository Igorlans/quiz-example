import { storage } from "@/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react"

export const useDownloadUrls = (storagePath: string) => {
    const [downloadPaths, setDownloadPaths] = useState<string[]>([]);

    useEffect(() => {
        const storageRef = ref(storage, storagePath);
        
        const fetchTemplateAvatars = async () => {
            const itemsList = await listAll(storageRef)

            const paths = await Promise.all(
                itemsList.items.map(async(itemRef) => (
                    await getDownloadURL(itemRef)
                ))
            )

            setDownloadPaths(paths)
        }

        fetchTemplateAvatars();
    }, [storagePath])

    return downloadPaths
}