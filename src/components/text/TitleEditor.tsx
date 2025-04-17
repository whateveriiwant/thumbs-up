import { useState, useRef, useEffect } from "react";
import Darrow from "../../assets/dArrow.svg?react";
import Bold from "../../assets/bold.svg?react";
import Underline from "../../assets/underline.svg?react";
import Palette from "../../assets/palette.svg?react";
import TextIcon from "../../assets/text.svg?react";
import TextDropdown from "./TextDropdown";
import TextTypeSelector from "./TextTypeSelector";
import { HexColorPicker } from "react-colorful";

export type TextKey = 1 | 2 | 3 | 4;
export type TitleType = "main" | "sub" | "small";

export interface TitleState {
  font: string;
  text: string;
  key: TextKey;
  size: number;
  bold: boolean;
  underline: boolean;
  align: string;
  color: string;
}

interface TitleEditorProps {
  layout: number;
  currentTitle: TitleType;
  mainTitle: TitleState;
  subTitle: TitleState;
  smallTitle: TitleState;
  textList: Record<number, string>;
  onClickTitleType: (type: string) => void;
  setMainTitle: (value: React.SetStateAction<TitleState>) => void;
  setSubTitle: (value: React.SetStateAction<TitleState>) => void;
  setSmallTitle: (value: React.SetStateAction<TitleState>) => void;
  onClickTextDropdownMenu: (i: TextKey) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({
  layout,
  currentTitle,
  mainTitle,
  subTitle,
  smallTitle,
  textList,
  onClickTitleType,
  setMainTitle,
  setSubTitle,
  setSmallTitle,
  onClickTextDropdownMenu,
}) => {
  const [textView, setTextView] = useState(false);
  const [textColorShow, setTextColorShow] = useState(false);
  const inSection = useRef<HTMLDivElement>(null);

  const onClickTextDropdown = () => {
    setTextView(!textView);
  };

  // Handle outside clicks for color picker
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (textColorShow && !inSection.current?.contains(e.target as Node)) {
        setTextColorShow(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [textColorShow]);

  const currentTitleState = currentTitle === "main" ? mainTitle : currentTitle === "sub" ? subTitle : smallTitle;

  const setCurrentTitleState = (updates: Partial<TitleState>) => {
    if (currentTitle === "main") {
      setMainTitle((prev) => ({ ...prev, ...updates }));
    } else if (currentTitle === "sub") {
      setSubTitle((prev) => ({ ...prev, ...updates }));
    } else {
      setSmallTitle((prev) => ({ ...prev, ...updates }));
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row justify-center items-center">
        <TextIcon width="2rem" height="2rem" />
        <p className="ml-2 text-2xl font-semibold">텍스트</p>
      </div>
      <TextTypeSelector layout={layout} currentTitle={currentTitle} onClickTitleType={onClickTitleType} />

      {/* Text input */}
      <div className="mt-2 flex flex-col">
        <input
          type="text"
          value={currentTitleState.text}
          onChange={(e) => {
            setCurrentTitleState({ text: e.target.value });
          }}
          onFocus={() => {
            const placeholders = {
              main: "제목을 입력하세요",
              sub: "부제목을 입력하세요",
              small: "소제목을 입력하세요",
            };

            if (currentTitleState.text === placeholders[currentTitle]) {
              setCurrentTitleState({ text: "" });
            }
          }}
          className="focus:outline-none focus:border-[#A9A9A9] transition-colors duration-200 px-2 py-2 bg-white border border-[#D9D9D9] w-[17rem] h-11 rounded-lg text-left text-black font-light text-lg"
        />
      </div>

      {/* Font selector and size */}
      <div className="flex flex-row items-center mt-2">
        <div
          onClick={onClickTextDropdown}
          className="flex flex-row items-center justify-between px-3 bg-[#F2F2F2] rounded-xl w-[12.5rem] h-12 hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out"
        >
          <p className="text-xl font-light">{textList[currentTitleState.key]}</p>
          {textView ? (
            <Darrow width="1.8rem" height="1.8rem" className="rotate-180" />
          ) : (
            <Darrow width="1.8rem" height="1.8rem" />
          )}
        </div>
        <input
          type="number"
          name="textSize"
          max={99}
          value={currentTitleState.size}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            if (input.value.length > 2) {
              input.value = input.value.slice(0, 2);
            }
          }}
          onChange={(e) => {
            setCurrentTitleState({ size: parseInt(e.target.value) });
          }}
          className="w-[4rem] h-12 ml-2 focus:outline-none px-2 text-xl font-light text-center bg-white border border-[#D9D9D9] rounded-lg"
        />
      </div>

      {textView && (
        <TextDropdown
          status={textView}
          setText={onClickTextDropdownMenu}
          currentText={currentTitleState.key}
          closeDropdown={() => setTextView(false)}
        />
      )}

      {/* Text formatting tools */}
      <div className="flex flex-row mt-2 gap-2">
        <div
          onClick={() => setCurrentTitleState({ bold: !currentTitleState.bold })}
          className={`${
            currentTitleState.bold ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } flex items-center justify-center w-11 h-11 rounded-lg hover:cursor-pointer hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
        >
          <Bold width="1.8rem" height="1.8rem" />
        </div>
        <div
          onClick={() => setCurrentTitleState({ underline: !currentTitleState.underline })}
          className={`${
            currentTitleState.underline ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } flex items-center justify-center w-11 h-11 rounded-lg hover:cursor-pointer hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
        >
          <Underline width="1.8rem" height="1.8rem" />
        </div>
        <div
          onClick={() => setTextColorShow(!textColorShow)}
          className="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] rounded-lg hover:cursor-pointer hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out"
        >
          <Palette width="1.8rem" height="1.8rem" />
        </div>
      </div>

      {/* Color picker */}
      {textColorShow && (
        <div
          ref={inSection}
          className="z-10 absolute mt-[12.5rem] overflow-hidden animate-dropdown transition-opacity duration-300 ease-in-out"
        >
          <HexColorPicker
            color={currentTitleState.color}
            onChange={(color) => {
              setCurrentTitleState({ color });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TitleEditor;
