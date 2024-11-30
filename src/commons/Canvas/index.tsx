import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { Loader } from "src/commons/Loader";
import { workerCode } from "src/imageWorker";
import { colorMap } from "src/helpers";

const imageCache = new Map();

export const ImageCanvas = ({
  rgbData,
  fixedWidth = 50,
  fixedHeight = 50,
  imageKey,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!rgbData || rgbData.length === 0) {
      return;
    }
    let isMounted = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));

    if (imageCache.has(imageKey)) {
      const cachedImage = imageCache.get(imageKey);
      canvas.width = fixedWidth;
      canvas.height = fixedHeight;
      ctx.drawImage(cachedImage, 0, 0, fixedWidth, fixedHeight);
      if (isMounted) {
        setIsLoaded(true);
      }
    } else {
      worker.postMessage({ rgbData });
      worker.onmessage = function (e) {
        const { imageDataArray, originalWidth, originalHeight } = e.data;
        const imageData = new ImageData(
          imageDataArray,
          originalWidth,
          originalHeight,
        );

        const fixedWidth = 50;
        const fixedHeight = originalHeight <= 50 ? originalHeight : 50;

        canvas.width = fixedWidth;
        canvas.height = fixedHeight;

        const offCanvas = document.createElement("canvas");
        offCanvas.width = originalWidth;
        offCanvas.height = originalHeight;
        const offCtx = offCanvas.getContext("2d");
        offCtx.putImageData(imageData, 0, 0);

        ctx.drawImage(
          offCanvas,
          0,
          0,
          originalWidth,
          originalHeight,
          0,
          0,
          fixedWidth,
          fixedHeight,
        );
        imageCache.set(imageKey, offCanvas);

        if (isMounted) {
          setIsLoaded(true);
        }
        worker.terminate();
      };
    }

    worker.onerror = function (error) {
      console.error("Worker error:", error);
      worker.terminate();
    };

    return () => {
      isMounted = false;
      worker.terminate();
    };
  }, [rgbData]);

  return (
    <Box sx={{ padding: 2, height: 50 }}>
      {!isLoaded && (
        <Box sx={{ padding: 0 }}>
          <Loader size={50} numberOfBars={4} />
        </Box>
      )}
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          display: !isLoaded ? "none" : "block",
        }}
        width={fixedWidth}
        height={fixedHeight}
      />
    </Box>
  );
};

export const PageStatus = (props) => {
  const { status } = props;

  const statusComponent = (key) => {
    const components = {
      unapproved: (
        <CancelIcon
          color="primary"
          fontSize="small"
          sx={{
            color: colorMap.unapproved,
            position: "absolute",
            top: -10,
            right: -10,
          }}
        />
      ),
      approved: (
        <CheckCircleIcon
          color="primary"
          fontSize="small"
          sx={{
            color: colorMap.approved,
            position: "absolute",
            top: -10,
            right: -10,
          }}
        />
      ),
      good: (
        <CheckCircleIcon
          color="primary"
          fontSize="small"
          sx={{
            color: colorMap.good,
            position: "absolute",
            top: -10,
            right: -10,
          }}
        />
      ),
      untouched: (
        <CancelIcon
          color="primary"
          fontSize="small"
          sx={{
            color: colorMap.untouched,
            position: "absolute",
            top: -10,
            right: -10,
          }}
        />
      ),
      pending: (
        <CheckCircleIcon
          color="primary"
          fontSize="small"
          sx={{
            color: colorMap.pending,
            position: "absolute",
            top: -10,
            right: -10,
          }}
        />
      ),
    };
    return components[key];
  };

  return <>{statusComponent(status)}</>;
};
