import compress from 'compress-base64'

export const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
        

        // @ts-ignore
        await compress(event.target?.result, {
            width: 120,
            max: 50,
            min: 10,
            quality: .8
        }).then(result => {
            resolve(result as string)
        })
    };
    reader.onerror = error => reject(error);

    reader.readAsDataURL(file);
});