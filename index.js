const WIDTH = 800;

document.getElementById('file').addEventListener('change', (e) => {
  const image_file = e.target.files[0];

  if (!image_file) {
    return;
  }
  const reader = new FileReader();

  reader.readAsDataURL(image_file);
  reader.onload = (e) => {
   // original image
   const image_url = event.target.result;
   let image = document.createElement("img");
   image.src = image_url;

   image.onload = e => {

    const canvas = document.createElement("canvas");
    // resize
    let ratio = WIDTH / e.target.width;
    canvas.width = WIDTH;
    canvas.height = e.target.height * ratio;
    // canvas
    const context = canvas.getContext("2d");
    context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
    
    // new image of canvas -  quality 0-100
    const new_image_url = canvas.toDataURL("image/jpeg",90);
    let new_image = document.createElement("img");
    new_image.src = new_image_url;
    new_image.alt = image_file.name;

    // download link
    let link = document.createElement("a");
    link.href = new_image_url;
    link.download = "new_image.jpg";
    link.appendChild(new_image);
    document.getElementById('wrapper').appendChild(link);
   }
  };
});
