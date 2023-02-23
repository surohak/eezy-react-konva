export const imageDataToBlackAndWhite = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i + 1] = data[i + 2] = (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
}

export const downloadFile = (file, name) => {
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", file);
  dlAnchorElem.setAttribute("download", name);
  dlAnchorElem.click();
  dlAnchorElem.remove();
}

export const convertImageToBlackAndWhite = (src, cb) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;
    imageDataToBlackAndWhite(data);
    ctx.putImageData(imageData, 0, 0);

    cb(canvas.toDataURL());
  };
  image.src = src;
}
