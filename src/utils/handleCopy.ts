import { RefObject } from "react";
import { Stage } from "konva/lib/Stage";

export const handleCopy = (stageRef: RefObject<Stage>) => {
  if (stageRef.current) {
    try {
      // Convert stage to canvas first
      const canvas = stageRef.current.toCanvas({
        pixelRatio: 2, // Higher resolution for better quality
      });

      // Canvas to Blob, then to clipboard
      canvas.toBlob((blob) => {
        if (blob) {
          // Create a ClipboardItem
          const item = new ClipboardItem({ "image/png": blob });

          // Write to clipboard
          navigator.clipboard
            .write([item])
            .then(() => {
              alert("이미지가 클립보드에 복사되었습니다.");
            })
            .catch((error) => {
              console.error("클립보드 복사 실패:", error);
              alert("클립보드 복사에 실패했습니다. 다시 시도해주세요.");
            });
        }
      }, "image/png");
    } catch (error) {
      console.error("이미지 복사 중 오류:", error);
      alert("이미지 복사 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};
