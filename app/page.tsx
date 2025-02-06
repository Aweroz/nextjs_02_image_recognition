'use client';

import axios from "axios";
import React, { FormEvent, useState } from "react";
import { resizeImageForOpenAI } from "./lib/utlis";

export default function Home() {
  type Response = {
    ingredients: string,
    recipies: string
  }
  const [response, setResponse] = useState<Response>({ingredients: "", recipies: ""});
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

  const handleChangePrompt = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      prompt: e.target.value
    });
  }

  const handleChangeQuality = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      quality: e.target.value
    });
  }

  const handleChangeResize = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      resize: e.target.value === 'true'
    });
  }

  async function handleSubmitForm(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // reset previous response
    setResponse({ingredients: "", recipies: ""});
    setIsLoading(true);

    const fd = new FormData();
    fd.append('prompt', formData.prompt);
    fd.append('quality', formData.quality);
    fd.append('image', formData.resize ? imageResized : image);

    const stringData = JSON.stringify(axios.formToJSON(fd));

    try {
      const res = await axios.post('/api/image', stringData, {
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

          <br/>
          <h4><p>Enter prompt</p></h4>
          <textarea className='textarea_prompt' id='prompt' name='prompt' rows={5} cols={50} placeholder='Enter prompt for ai'
            value={formData.prompt}
            onChange={handleChangePrompt}
          />

          <div className="options">
            <div>
              <h4><p>Select quality</p></h4>
              <input type="radio" id="low" name="quality" value="low" onChange={handleChangeQuality}
                checked={formData.quality==='low'}
              />
              <label htmlFor="low">low</label><br/>
              <input type="radio" id="high" name="quality" value="high" onChange={handleChangeQuality}
                checked={formData.quality==='high'}
              />
              <label htmlFor="high">high</label><br/>
            </div>

            <div>
              <h4><p>Resize image</p></h4>
              <input type="radio" id="resize_yes" name="resize" value="true" onChange={handleChangeResize}
                checked={formData.resize}
              />
              <label htmlFor="resize_yes">yes</label><br/>
              <input type="radio" id="resize_no" name="resize" value="false" onChange={handleChangeResize}
                checked={!formData.resize}
              />
              <label htmlFor="resize_no">no</label><br/>
            </div>
          </div>

          <button type="submit" value="Submit" className="button" disabled={isLoading}>
            Submit
          </button>
        </form>
      </section>

      <section className="right">
        <h3>Response</h3>
        <br/>
        {isLoading ?
          <div>
            <p>Retrieving data from AI...</p>
          </div>
          :
          <>
            <div style={{width: '100%'}}>
              <h4>List of ingredients</h4>
              <pre className="recipies">{response.ingredients}</pre>
            </div>
            <br/>
            <div style={{width: '100%'}}>
              <h4>Recipies</h4>
              <pre className="recipies">{response.recipies}</pre>
            </div>
          </>
        }
      </section>
    </main>
  );
}
