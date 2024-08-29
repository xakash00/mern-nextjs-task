import { useEffect, useRef, useState } from "react";
import { ALLOWED_FONT_TYPES } from "../constants";

export default function useFontPreview(defaultPreview = null, allowImgTypes = ALLOWED_FONT_TYPES) {
    const [fontPreview, setFontPreview] = useState(defaultPreview ?? null);
    const [fontPath, setFontPath] = useState(null);
    const base64FontRef = useRef(null);
    const fontPathRef = useRef(null);
    const fontPreviewRef = useRef(null);
    const [fileExtensionErr, setFileExtensionErr] = useState(null);

    fontPathRef.current = fontPath;
    fontPreviewRef.current = fontPreview;

    const convertToBase64 = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
        });
    };

    const handleFontChange = (event, onChange, cb) => {
        setFileExtensionErr(null);
        const file = event.target.files[0];
        if (file) {
            // get the last part of the file
            // example - image.name.jpg -> then get only "jpg" part
            const file_ext = file.name?.split(".").at(-1);
            console.log({ file_ext })
            if (!allowImgTypes.includes(file_ext)) {
                setFileExtensionErr("Please upload .ttf or .woff font file");
                return;
            }
        }
        setFontPath(file);
        // needed for react-hook-form
        onChange?.(file);
        // if (file && file.name.includes(".ttf")) {
        //     setFontPreview(file.name)
        // }
        if (file) {
            if (file.type === "application/font-woff" || file.name.includes(".ttf")) {
                setFontPreview(file.name);
                // let fileReader = new FileReader();
                // fileReader.readAsDataURL(file);
                // fileReader.onload = (event) => {
                //     setFontPreview(fileReader.result);
                // };
            } else {
                setFontPreview(null);
            }
        }
        // additional callback
        cb?.(event);
    };

    useEffect(() => {
        setFontPreview(defaultPreview);
    }, [defaultPreview]);

    useEffect(() => {
        if (fontPath) {
            convertToBase64(fontPath).then((res) => {
                base64FontRef.current = res;
            });
        }
    }, [fontPath]);
    return { handleFontChange, fontPreview, fontPath, fontPathRef, base64FontRef, fontPreviewRef, setFontPreview, fileExtensionErr };
}
