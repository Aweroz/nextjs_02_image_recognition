/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import axios from "axios";
import React, { FormEvent, useState } from "react";
import { resizeImageForOpenAI } from "./lib/utlis";
import RecipesList from "./ui/recipes_list";
import { Response } from "./lib/definitions";

export default function Home() {
  const [response, setResponse] = useState<Response>({dishes: []});
  const [image, setImage] = useState<string>('fridge_template.jpg');
  const [imageResized, setImageResized] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type FormData = {
    prompt: string,
    quality: string,
    resize: boolean
  }
  const [formData, setFormData] = useState<FormData>({
    prompt: 'List food products and their amount in the picture.',
    quality: 'low',
    resize: true
  });

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

  async function handleSubmitForm(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // reset previous response
    setResponse({ dishes: [] });
    setIsLoading(true);

    const fd = new FormData();
    fd.append('prompt', formData.prompt);
    fd.append('quality', formData.quality);
    fd.append('image', formData.resize ? imageResized : image);

    const stringData = JSON.stringify(axios.formToJSON(fd));

    try {
      const res = await axios.post('/api/image/fake', stringData, {
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
        headers: {
          "Content-Type": "application/json"
        }
      });

      setIsLoading(false);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className='Home'>
      <section className="left">
        <img src={image} alt='picture of food' width='400' height='225'/>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor='file' className="button">Select image</label>
          <input type='file' id='file' style={{display: 'none'}} onChange={handleSelectFile} disabled={isLoading}/>

          <button type="submit" value="Submit" className="button" disabled={isLoading}>
            Submit
          </button>
        </form>
      </section>

      <section className="right">
        {isLoading ?
          <div>
            <p>Retrieving data from AI...</p>
          </div>
          :
          <div>
            <RecipesList dishes={ response.dishes } />
          </div>
        }
      </section>
    </main>
  );
}
