import { useState } from "react";
import { resizeImageForOpenAI } from "../lib/utlis";

export function useImage(defaultImage: string) {
  const [image, setImage] = useState<string>(defaultImage);
  const [imageResized, setImageResized] = useState<string>('');

  const handleSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e:ProgressEvent<FileReader>) {
          const img = document.createElement("img");
          img.onload = async function () {
            setImageResized(resizeImageForOpenAI(img));
          }
          img.src = e.target?.result as string;
          setImage(e.target?.result as string);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  return { image, imageResized, handleSelectFile };
}