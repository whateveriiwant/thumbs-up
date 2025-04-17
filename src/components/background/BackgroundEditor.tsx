import { useState, useRef, useEffect } from "react";
import BackGround from "../../assets/bg.svg?react";
import ResetBG from "../../assets/resetBg.svg?react";
import Darrow from "../../assets/dArrow.svg?react";
import BackgroundDropdown from "./BackgroundDropdown";
import ColorPicker from "./utils/ColorPicker";
import { HexColorPicker } from "react-colorful";
import { bgImageList } from "./bgImageList";

export type BgKey = 1 | 2 | 3 | 4;

interface BackgroundEditorProps {
  bg: BgKey;
  setBg: (bg: BgKey) => void;
  index: number;
  setIndex: (index: number) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  bgGradientStart: string;
  setBgGradientStart: (color: string) => void;
  bgGradientEnd: string;
  setBgGradientEnd: (color: string) => void;
  bgLink: string;
  setBgLink: (link: string) => void;
}

const BackgroundEditor: React.FC<BackgroundEditorProps> = ({
  bg,
  setBg,
  index,
  setIndex,
  bgColor,
  setBgColor,
  bgGradientStart,
  setBgGradientStart,
  bgGradientEnd,
  setBgGradientEnd,
  bgLink,
  setBgLink,
}) => {
  const [bgView, setBgView] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const inSection = useRef<HTMLDivElement>(null);

  const bgList = {
    1: "랜덤 배경 이미지",
    2: "단색 배경",
    3: "그라디언트 배경",
    4: "이미지 삽입",
  };

  const onClickBgDropdown = () => {
    setBgView(!bgView);
  };

  const onClickBgDropdownMenu = (i: BgKey) => {
    setBg(i);
    setBgView(false);
  };

  const onClickBgImageReset = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * bgImageList.length);
    } while (newIndex === index);

    setIndex(newIndex);
  };

  const onClickRandomBgColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setBgColor(randomColor);
  };

  const onClickGradientStart = () => {
    setIsStartOpen(!isStartOpen);
  };

  const onClickGradientEnd = () => {
    setIsEndOpen(!isEndOpen);
  };

  const onClickRandomBGGradient = () => {
    const randomColorStart =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    const randomColorEnd =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setBgGradientStart(randomColorStart);
    setBgGradientEnd(randomColorEnd);
  };

  const onChangeTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyped(e.target.value);
  };

  const onClickBgLinkConfirm = () => {
    setBgLink(typed);
  };

  // Handle outside clicks for color pickers
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if ((isStartOpen || isEndOpen) && !inSection.current?.contains(e.target as Node)) {
        if (isStartOpen) setIsStartOpen(false);
        if (isEndOpen) setIsEndOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isStartOpen, isEndOpen]);

  return (
    <div className="flex flex-col items-start justify-between">
      <div className="flex flex-row items-start -ml-1">
        <BackGround width="2.4rem" height="2.4rem" />
        <p className="ml-1 text-2xl font-semibold">배경</p>
      </div>
      <div className="flex flex-row place-items-center mt-3">
        <div
          onClick={onClickBgDropdown}
          className="flex flex-row items-center justify-between px-3 bg-[#F2F2F2] rounded-xl w-[13rem] h-12 hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out"
        >
          <p className="text-xl font-light">{bgList[bg]}</p>
          {bgView ? (
            <Darrow width="1.8rem" height="1.8rem" className="rotate-180" />
          ) : (
            <Darrow width="1.8rem" height="1.8rem" />
          )}
        </div>
        {bg === 1 && (
          <ResetBG
            onClick={onClickBgImageReset}
            width="2rem"
            height="2rem"
            fill="#A9A9A9"
            className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
          />
        )}
      </div>
      {bgView && <BackgroundDropdown status={bgView} setBg={onClickBgDropdownMenu} currentBg={bg} />}

      {/* Background options based on selected type */}
      {bg === 2 && <ColorPicker color={bgColor} onChange={setBgColor} onRandomColor={onClickRandomBgColor} />}

      {bg === 3 && (
        <div className="flex flex-col mt-1">
          <p
            onClick={onClickRandomBGGradient}
            className="text-sm text-[#bbbbbb] hover:cursor-pointer hover:text-[#A9A9A9] transition-colors duration-200"
          >
            무작위 색 선택
          </p>
          <div className="flex flex-row items-start justify-start mt-1">
            <div className="flex flex-col items-start justify-start">
              <div
                className="w-[13rem] h-10 rounded-lg"
                style={{
                  background: `linear-gradient(to right, ${bgGradientStart}, ${bgGradientEnd})`,
                }}
              />
              <div className="w-[13rem] mt-2 flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <div
                    onClick={onClickGradientStart}
                    className="w-8 h-8 rounded-lg shadow hover:cursor-pointer"
                    style={{ backgroundColor: bgGradientStart }}
                  />
                  {isStartOpen && (
                    <div
                      ref={inSection}
                      className={`z-10 absolute mt-9 overflow-hidden w-auto h-auto animate-dropdown transition-opacity duration-1000 ease-in-out`}
                    >
                      <HexColorPicker color={bgGradientStart} onChange={setBgGradientStart} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <div
                    onClick={onClickGradientEnd}
                    className="w-8 h-8 rounded-lg shadow hover:cursor-pointer"
                    style={{ backgroundColor: bgGradientEnd }}
                  />
                  {isEndOpen && (
                    <div
                      ref={inSection}
                      className={`z-10 absolute mt-9 overflow-hidden w-auto h-auto animate-dropdown transition-opacity duration-1000 ease-in-out`}
                    >
                      <HexColorPicker color={bgGradientEnd} onChange={setBgGradientEnd} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {bg === 4 && (
        <div className="flex flex-row mt-2">
          <input
            type="text"
            name="link"
            onChange={onChangeTyped}
            placeholder="이미지 링크 입력"
            className="focus:outline-none focus:border-[#A9A9A9] transition-colors duration-200 px-2 py-0.5 bg-white border border-[#D9D9D9] w-[13rem] h-10 rounded-xl text-left text-black font-light text-md"
          />
          <button
            onClick={onClickBgLinkConfirm}
            className={`ml-2 items-center justify-center flex w-14 h-10 bg-[#f6f6f6] rounded-xl ${
              typed === "" ? "cursor-not-allowed" : "cursor-pointer"
            } hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
          >
            <p
              className={`text-lg ${
                typed === "" ? "text-gray-500" : "text-black"
              } font-light duration-200 transition-colors`}
            >
              확인
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default BackgroundEditor;
