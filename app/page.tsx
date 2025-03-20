'use client';

import axios from "axios";
import React, { useState } from "react";
import RecipesList from "./ui/recipes_list";
import { Response } from "./lib/definitions";
import { useImage } from "./hooks/useImage";
import ImageSelector from "./components/ImageSelector";

export default function Home() {
  console.log("render >> home");
  const [response, setResponse] = useState<Response>({dishes: []});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { image, imageResized, handleSelectFile } = useImage('/fridge_template.jpg');

  async function handleSubmitImage() {

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
        <ImageSelector image={image} handleSelectFile={handleSelectFile} isLoading={isLoading}/>
        <button type="button" value="Submit" className="button" disabled={isLoading} onClick={handleSubmitImage}>
          Submit
        </button>
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
