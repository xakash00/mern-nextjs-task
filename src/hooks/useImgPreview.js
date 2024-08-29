import { useEffect, useRef, useState } from "react";
import { ALLOWED_IMG_TYPES } from "../constants";

export default function useImgPreview(defaultPreview = null, allowImgTypes = ALLOWED_IMG_TYPES) {
    const [imgPreview, setImgPreview] = useState(defaultPreview ?? null);
    const [imgPath, setImgPath] = useState(null);
    const base64ImgRef = useRef(null);
    const imgPathRef = useRef(null);
    const imgPreviewRef = useRef(null);
    const [fileExtensionErr, setFileExtensionErr] = useState(null);

    imgPathRef.current = imgPath;
    imgPreviewRef.current = imgPreview;

    const convertToBase64 = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
        });
    };

    const handleChange = (event, onChange, cb) => {
        setFileExtensionErr(null);
        const file = event.target.files[0];
        if (file) {
            // get the last part of the file
            // example - image.name.jpg -> then get only "jpg" part
            const file_ext = file.name?.split(".").at(-1);
            if (!allowImgTypes.includes(file_ext)) {
                setFileExtensionErr("." + file_ext + " file type not allowed.");
                return;
            }
        }
        setImgPath(file);
        // needed for react-hook-form
        onChange?.(file);
        if (file && file.type.substring(0, 5) === "image") {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (event) => {
                setImgPreview(fileReader.result);
            };
        } else {
            setImgPreview(null);
        }
        // additional callback
        cb?.(event);
    };

    useEffect(() => {
        setImgPreview(defaultPreview);
    }, [defaultPreview]);

    useEffect(() => {
        if (imgPath) {
            convertToBase64(imgPath).then((res) => {
                base64ImgRef.current = res;
            });
        }
    }, [imgPath]);
    return { handleChange, imgPreview, imgPath, imgPathRef, base64ImgRef, imgPreviewRef, setImgPreview, fileExtensionErr };
}
