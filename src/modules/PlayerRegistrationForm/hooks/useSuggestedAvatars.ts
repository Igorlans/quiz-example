import { useDownloadUrls } from "@/hooks/useDownloadtUrls"

export const useSuggestedAvatars = () => {
    const avatars = useDownloadUrls('template_avatars/');

    return avatars;
}