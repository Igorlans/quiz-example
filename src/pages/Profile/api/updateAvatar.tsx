import { auth, storage } from "@/firebase";
import { updateProfile, User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const updateAvatar = async (avatar: File) => {
    try {
        const user = auth.currentUser;
        if (!user) return;

        const avatarName = `${Date.now()}_${avatar.name}`
        const avatarRef = ref(storage, `avatars/${avatarName}`)
        const metaData = {
            contentType: avatar.type,
            user: user
        }

        await uploadBytes(avatarRef, avatar, metaData);

        const avatarURL = await getDownloadURL(avatarRef);

        updateProfile(user, {
            photoURL: avatarURL
        })

        return avatarURL;
    } catch (error) {
        console.log("🚀 ~ file: updateAvatar.tsx:26 ~ updateAvatar ~ error:", error)
        return null;
    }
}