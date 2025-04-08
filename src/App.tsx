import bgImage from "./assets/default-bg.jpg";
import thumbnail from "./assets/thumbnail.png";
import Reset from "./assets/reset.svg?react";
import copy from "./assets/copy.svg";
import download from "./assets/download.svg";

const App = () => {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 h-full bg-cover w-ful -z-10 blur-xs scale-200"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="flex items-center justify-center">
        <div className="bg-white px-20 pt-11 mt-10 w-[55rem] h-[60rem] z-10 flex justify-start rounded-[3.5rem] flex-col">
          <img src={thumbnail} alt="thumbnail" className="h-[27rem]" />
          <div className="flex flex-row items-center justify-between mt-3">
            <div className="flex flex-row items-center">
              <p className="text-xl text-[#A9A9A9] font-light mr-2">사이즈</p>
              <input
                type="text"
                alt="width"
                className="focus:outline-none px-0.5 py-0.5 bg-white border border-[#A9A9A9] w-14 h-7 rounded-md text-center"
              />
              <p className="text-md text-[#A9A9A9] font-light mx-1">X</p>
              <input
                type="text"
                alt="width"
                className="focus:outline-none px-0.5 py-0.5 bg-white border border-[#A9A9A9] w-14 h-7 rounded-md text-center"
              />
              <Reset
                width="1.75rem"
                height="1.75rem"
                fill="#A9A9A9"
                className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
              />
            </div>
            <div className="flex flex-row items-center">
              <img
                src={copy}
                alt="copy"
                className="mr-1 h-7 hover:cursor-pointer hover:fill-black"
              />
              <img
                src={download}
                alt="download"
                className="h-7 hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
