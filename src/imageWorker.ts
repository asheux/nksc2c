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
            let r = g = b = e = 255;
            if (rgb?.length === 3) {
              [r, g, b] = rgb;
            } else if (rgb?.length === 4) {
              [r, g, b, e] = rgb;
            }

            imageDataArray[index++] = r;
            imageDataArray[index++] = g;
            imageDataArray[index++] = b;
            imageDataArray[index++] = e;
          }
        }

        self.postMessage({ imageDataArray, originalWidth, originalHeight });
      };
    `;
