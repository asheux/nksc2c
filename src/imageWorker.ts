export const workerCode = `
      self.onmessage = function (e) {
        const { rgbData } = e.data;
        const originalHeight = rgbData.length;
        const originalWidth = rgbData[0].length;

        const imageDataArray = new Uint8ClampedArray(originalWidth * originalHeight * 4);

        let index = 0;
        for (let y = 0; y < originalHeight; y++) {
          for (let x = 0; x < originalWidth; x++) {
            let rgb = rgbData[y][x];
            if (!isNaN(rgb)) {
              rgb = [rgb, rgb,rgb]
            }
            const [r, g, b] = rgb;

            imageDataArray[index++] = r;
            imageDataArray[index++] = g;
            imageDataArray[index++] = b;
            imageDataArray[index++] = 255;
          }
        }

        self.postMessage({ imageDataArray, originalWidth, originalHeight });
      };
    `;
