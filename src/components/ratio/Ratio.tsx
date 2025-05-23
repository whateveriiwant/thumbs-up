import Velog from "../../assets/velog.svg?react";
import Youtube from "../../assets/youtube.svg?react";
import Scale from "../../assets/scale.svg?react";

const Ratio = (props: any) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row items-center">
        <Scale width="2rem" height="2rem" />
        <p className="ml-2 text-2xl font-semibold">비율</p>
      </div>
      <div className="flex flex-row items-center justify-between mt-4 w-85">
        <div
          onClick={() => props.updateRatio(1)}
          className={`flex flex-col items-center justify-center w-20 h-20 ${
            props.ratioStatus === 1 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } rounded-xl hover:cursor-pointer hover:bg-[#d9d9d9] ease-in-out transition-colors duration-200`}
        >
          <Velog width="2rem" height="2rem" />
          <p className="text-lg text-black font-light">Velog</p>
        </div>
        <div
          onClick={() => props.updateRatio(2)}
          className={`flex flex-col items-center justify-center w-20 h-20 ${
            props.ratioStatus === 2 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } rounded-xl hover:cursor-pointer hover:bg-[#d9d9d9] ease-in-out transition-colors duration-200`}
        >
          <p className="text-lg text-black font-light">1:1</p>
        </div>
        <div
          onClick={() => props.updateRatio(3)}
          className={`flex flex-col items-center justify-center w-20 h-20 ${
            props.ratioStatus === 3 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } rounded-xl hover:cursor-pointer hover:bg-[#d9d9d9] ease-in-out transition-colors duration-200`}
        >
          <p className="text-lg text-black font-light">4:3</p>
        </div>
        <div
          onClick={() => props.updateRatio(4)}
          className={`flex flex-col items-center justify-center w-20 h-20 ${
            props.ratioStatus === 4 ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } rounded-xl hover:cursor-pointer hover:bg-[#d9d9d9] ease-in-out transition-colors duration-200`}
        >
          <Youtube width="2rem" height="2rem" />
          <p className="text-lg text-black font-light">16:9</p>
        </div>
      </div>
    </div>
  );
};

export default Ratio;
