import { RefObject } from "react";
import { Stage } from "konva/lib/Stage";
import { downloadURI } from "./downloadURI";

export const handleDownload = (stageRef: RefObject<Stage>) => {
  if (stageRef.current) {
    try {
      // Convert stage to canvas first
      const canvas = stageRef.current.toCanvas({
        pixelRatio: 2, // Higher resolution for better quality
      });

      // Create data URL from canvas with explicit image/png MIME type
      const uri = canvas.toDataURL("image/png", 1.0);

      downloadURI(uri, "thumbs-up-image.png");
    } catch (error) {
      console.error("Error during image download:", error);
      alert("이미지 다운로드 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};
