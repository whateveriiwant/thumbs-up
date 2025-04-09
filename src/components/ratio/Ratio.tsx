import { useState } from "react";
import Velog from "../../assets/velog.svg?react";
import Youtube from "../../assets/youtube.svg?react";

const Ratio = () => {
  let [ratioStatus, setRatioStatus] = useState(1);
  const ratioList = {
    1: [768, 402.094], // Velog
    2: [400, 400], // 1:1
    3: [533.3333, 400], // 4:3
    4: [640, 340], // Youtube
  };

  return (
    <div className="flex flex-row items-center justify-between mt-4 w-85">
      <div
        onClick={() => setRatioStatus(1)}
        className={`flex flex-col items-center justify-center w-20 h-20 ${
          ratioStatus === 1 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
        } rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200`}
      >
        <Velog width="2rem" height="2rem" />
        <p className="text-lg text-black font-light">Velog</p>
      </div>
      <div
        onClick={() => setRatioStatus(2)}
        className={`flex flex-col items-center justify-center w-20 h-20 ${
          ratioStatus === 2 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
        } rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200`}
      >
        <p className="text-lg text-black font-light">1:1</p>
      </div>
      <div
        onClick={() => setRatioStatus(3)}
        className={`flex flex-col items-center justify-center w-20 h-20 ${
          ratioStatus === 3 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
        } rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200`}
      >
        <p className="text-lg text-black font-light">4:3</p>
      </div>
      <div
        onClick={() => setRatioStatus(4)}
        className={`flex flex-col items-center justify-center w-20 h-20 ${
          ratioStatus === 4 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
        } rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200`}
      >
        <Youtube width="2rem" height="2rem" />
        <p className="text-lg text-black font-light">16:9</p>
      </div>
    </div>
  );
};

export default Ratio;
