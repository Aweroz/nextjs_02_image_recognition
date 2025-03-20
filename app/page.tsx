'use client';

import axios from "axios";
import React, { FormEvent, useState } from "react";
import RecipesList from "./ui/recipes_list";
import { Response } from "./lib/definitions";
import { useImage } from "./hooks/useImage";
import Image from "next/image";

export default function Home() {
  const [response, setResponse] = useState<Response>({dishes: []});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { image, imageResized, handleSelectFile } = useImage('/fridge_template.jpg');

  async function handleSubmitForm(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // reset previous response
    setResponse({ dishes: [] });
    setIsLoading(true);

    //
    const fd = new FormData();
    fd.append('image', imageResized);

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
        <Image src={image} alt='picture of food' width='400' height='225'/>
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
          <div style={{width: '100%'}}>
            <RecipesList dishes={ response.dishes } />
          </div>
        }
      </section>
    </main>
  );
}
