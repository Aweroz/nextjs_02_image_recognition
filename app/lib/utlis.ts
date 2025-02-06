export function base64ToBuffer(str: string) {
  str = window.atob(str);
  const buffer = new ArrayBuffer(str.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < str.length; i++) {
    view[i] = str.charCodeAt(i);
  }
  return buffer;
}

export function resizeImageForOpenAI(img: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = 2048;
  const maxSize2 = 768;
  let width = img.width;
  let height = img.height;

  // resize to fit max size 2048x2048
  if (img.width > maxSize || img.height > maxSize) {
    const scale = Math.min(maxSize / img.width, maxSize / img.height);
    width = img.width * scale;
    height = img.height * scale;
  }
  // resize to smaller edge fit 768
  if (img.width > maxSize2 || img.height > maxSize2) {
    const scale2 = width > height ? maxSize2 / height : maxSize2 / width;
    width *= scale2;
    height *= scale2;
  }

  // resize the canvas to the new dimensions
  canvas.width = width;
  canvas.height = height;
  // scale & draw the image onto the canvas
  ctx?.drawImage(img, 0, 0, width, height);

  // just to preview
  // document.body.appendChild(canvas);

  // Get the binary (aka blob) and save locally
  // const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 1));
  // const link = document.createElement("a");
  // link.download = "image.jpg";
  // link.href = URL.createObjectURL(blob as Blob);
  // link.click();

  // returns base64 encoded image
  const base64 = canvas.toDataURL('image/jpeg', 1);
  return base64;
}

export function cleanupAnswer(answer:string):string {
  answer = answer.replace('```json', '');
  answer = answer.replace('\n', '');
  answer = answer.replace('```', '');
  console.log(answer);
  return answer;
}