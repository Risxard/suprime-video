import React, { useEffect, useState } from 'react';

const AverageColorImage = ({ imageTarget }) => {
  const [averageColor, setAverageColor] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'Anonymous'; // Permitir o carregamento de imagens de domínios externos (CORS)

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      for (let i = 0; i < data.length; i += 4) {
        totalRed += data[i];
        totalGreen += data[i + 1];
        totalBlue += data[i + 2];
      }

      const pixelCount = data.length / 4;
      const averageRed = Math.round(totalRed / pixelCount);
      const averageGreen = Math.round(totalGreen / pixelCount);
      const averageBlue = Math.round(totalBlue / pixelCount);

      setAverageColor({ red: averageRed, green: averageGreen, blue: averageBlue });
    };

    image.src = imageTarget;
  }, [imageTarget]);

  return (
    <div className='averageImage'>
      {averageColor && (
          <div 
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: `rgb(${averageColor.red}, ${averageColor.green}, ${averageColor.blue})`,
          }}
        ></div>
      )}
    </div>
  );
};

export default AverageColorImage;
