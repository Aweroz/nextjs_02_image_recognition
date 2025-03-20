import Image from "next/image"

function ImageSelector({ image, handleSelectFile, isLoading } :
   { image: string, handleSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>, isLoading: boolean }) {
  
  console.log("render >> image selector");
  return (
    <>
      <Image src={image} alt='picture of food' width='400' height='225'/>
      <label htmlFor='file' className="button">Select image</label>
      <input type='file' id='file' style={{display: 'none'}} onChange={handleSelectFile} disabled={isLoading}/>
    </>
  )
}

export default ImageSelector