import bgImage from "./assets/default-bg.jpg";
import thumbnail from "./assets/thumbnail.png";
import Reset from "./assets/reset.svg?react";
import Copy from "./assets/copy.svg?react";
import Download from "./assets/download.svg?react";
import Scale from "./assets/scale.svg?react";
import Velog from "./assets/velog.svg?react";
import Youtube from "./assets/youtube.svg?react";
import Layout from "./assets/layout.svg?react";

const App = () => {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 h-full bg-cover w-ful -z-10 blur-xs scale-200"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="flex items-center justify-center">
        <div className="bg-white px-20 pt-11 mt-10 w-[55rem] h-[60rem] z-10 flex justify-start rounded-[3.5rem] flex-col">
          <img src={thumbnail} alt="thumbnail" className="h-[27rem]" />{" "}
          {/* Thumbnail */}
          <div className="flex flex-row items-center justify-between mt-3">
            <div className="flex flex-row items-center">
              {/* 사이즈 입력 */}
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
              {/* 복사, 다운 */}
              <Copy
                width="1.75rem"
                height="1.75rem"
                fill="#A9A9A9"
                className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
              />
              <Download
                width="1.75rem"
                height="1.75rem"
                fill="#A9A9A9"
                className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
              />
            </div>
          </div>
          <div className="flex flex-row items-start justify-between mt-14">
            {/* 비율 + 레이아웃 묶음 */}
            <div className="flex flex-col items-start">
              {/* 비율 */}
              <div className="flex flex-row items-center">
                <Scale width="2rem" height="2rem" />
                <p className="ml-2 text-2xl font-semibold">비율</p>
              </div>
              <div className="flex flex-row items-center justify-between mt-4 w-85">
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-[#F2F2F2] rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200">
                  <Velog width="2rem" height="2rem" />
                  <p className="text-lg text-black">Velog</p>
                </div>
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-[#F2F2F2] rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200">
                  <p className="text-lg text-black">1:1</p>
                </div>
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-[#F2F2F2] rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200">
                  <p className="text-lg text-black">4:3</p>
                </div>
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-[#F2F2F2] rounded-xl hover:cursor-pointer hover:bg-[#F1F3FF] transition-colors duration-200">
                  <Youtube width="2rem" height="2rem" />
                  <p className="text-lg text-black">16:9</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              {/*레이아웃 */}
              <div className="flex flex-row items-center">
                <Layout width="2rem" height="2rem" />
                <p className="ml-2 text-2xl font-semibold">레이아웃</p>
              </div>
              <div className="flex flex-row items-center px-3 bg-[#F2F2F2] rounded-xl w-[17rem] h-12 mt-4">
                <p className="text-xl">제목 + 부제목 + 소제목</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
