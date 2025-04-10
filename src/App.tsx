import bgImage from "./assets/default-bg.jpg";
import thumbnail from "./assets/thumbnail.png";
import Reset from "./assets/reset.svg?react";
import Copy from "./assets/copy.svg?react";
import Download from "./assets/download.svg?react";
import Scale from "./assets/scale.svg?react";
import Layout from "./assets/layout.svg?react";
import BackGround from "./assets/bg.svg?react";
import ResetBG from "./assets/resetBg.svg?react";
import Text from "./assets/text.svg?react";
import Bold from "./assets/bold.svg?react";
import Underline from "./assets/underline.svg?react";
import AlignLeft from "./assets/alignLeft.svg?react";
import Palette from "./assets/palette.svg?react";
import GithubFooter from "./assets/footer/githubFooter.svg?react";
import LinkedInFooter from "./assets/footer/linkedinFooter.svg?react";
import VelogFooter from "./assets/footer/velogFooter.svg?react";
import Darrow from "./assets/dArrow.svg?react";
import Ratio from "./components/ratio/Ratio";
import { useEffect, useState } from "react";
import LayoutDropdown from "./components/layout/LayoutDropdown";

const App = () => {
  useEffect(() => {
    /* 우클릭 방지 */
    document.oncontextmenu = function () {
      return false;
    };
  }, []);

  /* 비율 로직 */
  type RatioKey = 1 | 2 | 3 | 4;
  let [ratioStatus, setRatioStatus] = useState<RatioKey>(1);
  const ratioList = {
    1: [768, 402.094], // Velog
    2: [400, 400], // 1:1
    3: [533.3333, 400], // 4:3
    4: [640, 340], // Youtube
  };

  const onClickRatio = (status: RatioKey) => {
    setRatioStatus(status);
  };

  let width = ratioList[ratioStatus][0];
  let height = ratioList[ratioStatus][1];

  /* 레이아웃 로직 */
  const [layoutView, setLayoutView] = useState(false);

  const onClickLayout = () => {
    if (!layoutView) setLayoutView(true);
    else {
      setLayoutView(false);
      // setTimeout(() => {
      //   setLayoutView(false);
      // }, 400);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover w-full h-full -z-10 blur-xs scale-400"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="flex items-center justify-center py-10">
        <div className="bg-white px-20 py-11 w-[55rem] z-10 flex justify-start rounded-[3.5rem] flex-col">
          <img src={thumbnail} alt="thumbnail" className="h-[27rem]" />
          {/* Thumbnail */}
          <div className="flex flex-row items-center justify-between mt-3">
            <div className="flex flex-row items-center">
              {/* 사이즈 입력 */}
              <p className="text-xl text-[#D9D9D9] font-light mr-2">사이즈</p>
              <input
                type="text"
                alt="width"
                value={width}
                className="focus:outline-none focus:border-[#A9A9A9] transition-colors duration-200 px-0.5 py-0.5 bg-white border border-[#D9D9D9] w-20 h-7 rounded-md text-center text-black font-light text-md"
              />
              <p className="text-md text-[#D9D9D9] font-light mx-1">X</p>
              <input
                type="text"
                alt="height"
                value={height}
                className="focus:outline-none focus:border-[#A9A9A9] transition-colors duration-200 px-0.5 py-0.5 bg-white border border-[#D9D9D9] w-20 h-7 rounded-md text-center text-black font-light text-md"
              />
              <Reset
                width="1.75rem"
                height="1.75rem"
                fill="#D9D9D9"
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
              <Ratio
                ratioStatus={ratioStatus}
                updateRatio={onClickRatio}
                width={width}
                height={height}
              />
            </div>
            <div className="flex flex-col items-start ml-6">
              {/*레이아웃 */}
              <div className="flex flex-row items-center">
                <Layout width="2rem" height="2rem" />
                <p className="ml-1 text-2xl font-semibold">레이아웃</p>
              </div>
              {/* 레이아웃 드롭다운 */}
              <div
                onClick={() => onClickLayout()}
                className="flex flex-row items-center justify-between px-3 bg-[#f6f6f6] rounded-xl w-[17rem] h-12 mt-4 hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out"
              >
                <p className="text-xl font-light">제목 + 부제목 + 소제목</p>
                {layoutView ? (
                  <Darrow
                    width="1.8rem"
                    height="1.8rem"
                    className="rotate-180"
                  />
                ) : (
                  <Darrow width="1.8rem" height="1.8rem" />
                )}
              </div>
              {layoutView && <LayoutDropdown status={layoutView} />}
            </div>
          </div>
          <div className="flex flex-row items-start mt-10 justify-between">
            {/* 배경 + 텍스트 묶음 */}
            <div className="flex flex-col items-start justify-between">
              <div className="flex flex-row items-start -ml-1">
                <BackGround width="2.4rem" height="2.4rem" />
                <p className="ml-1 text-2xl font-semibold">배경</p>
              </div>
              <div className="flex flex-row place-items-center mt-3">
                <div className="flex flex-row items-center px-3 bg-[#F2F2F2] rounded-xl w-[13rem] h-12">
                  <p className="text-xl font-light">랜덤 배경 이미지</p>
                </div>
                <ResetBG
                  width="2rem"
                  height="2rem"
                  fill="#A9A9A9"
                  className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-row justify-center items-center">
                <Text width="2rem" height="2rem" />
                <p className="ml-2 text-2xl font-semibold">텍스트</p>
              </div>
              <div className="flex flex-row items-center mt-3">
                <div className="flex flex-row items-center px-3 bg-[#F2F2F2] rounded-xl w-[12.5rem] h-12">
                  <p className="text-xl font-light">Pretendard</p>
                </div>
                <input
                  type="number"
                  max={99}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.value.length > 2) {
                      input.value = input.value.slice(0, 2);
                    }
                  }}
                  className="w-[4rem] h-12 ml-2 focus:outline-none px-2 text-xl font-light text-center bg-white border border-[#D9D9D9] rounded-lg"
                />
              </div>
              <div className="flex flex-row mt-3 justify-between w-[12.5rem]">
                <div className="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] rounded-lg">
                  <Bold width="1.8rem" height="1.8rem" />
                </div>
                <div className="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] rounded-lg">
                  <Underline width="1.8rem" height="1.8rem" />
                </div>
                <div className="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] rounded-lg">
                  <AlignLeft width="1.8rem" height="1.8rem" />
                </div>
                <div className="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] rounded-lg">
                  <Palette width="1.8rem" height="1.8rem" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-10 items-end mb-2">
            {/* Footer */}
            <div className="flex flex-col items-start">
              <p className="text-2xl font-semibold text-[#C5C3C3]">
                Thumbs Up! 👍
              </p>
              <p className="text-sm font-extralight text-[#C5C3C3]">
                Your Best Thumbnail Maker
              </p>
              <p className="text-md font-light text-[#C5C3C3]">
                Made by Seungjun Jeong With ❤️
              </p>
            </div>
            <div className="flex flex-row ml-3 justify-between items-center w-[7.5rem]">
              <GithubFooter
                fill="#C5C3C3"
                width="2.5rem"
                height="2.5rem"
                className="transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-[#24292E]"
              />
              <LinkedInFooter
                fill="#C5C3C3"
                width="2.5rem"
                height="2.5rem"
                className="-ml-[0.24rem] transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-[#0077B5]"
              />
              <VelogFooter
                fill="#C5C3C3"
                width="1.9rem"
                height="1.9rem"
                className="transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-[#20C997]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
