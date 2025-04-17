import { handleCopy } from "../handleCopy";
import { handleDownload } from "../handleDownload";
import Copy from "../../assets/copy.svg?react";
import Download from "../../assets/download.svg?react";

export const CnD = (props: any) => {
  return (
    <div className="flex flex-row items-center">
      {/* 복사, 다운 */}
      <Copy
        onClick={() => handleCopy(props.ref)}
        width="1.75rem"
        height="1.75rem"
        fill="#A9A9A9"
        className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
      />
      <Download
        onClick={() => handleDownload(props.ref)}
        width="1.75rem"
        height="1.75rem"
        fill="#A9A9A9"
        className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
      />
    </div>
  ); //.
};
