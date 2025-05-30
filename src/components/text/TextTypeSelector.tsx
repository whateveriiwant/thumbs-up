import React from "react";

interface TextTypeSelectorProps {
  currentTitle: string;
  onClickTitleType: (type: string) => void;
  layout: number;
}

const TextTypeSelector: React.FC<TextTypeSelectorProps> = ({ currentTitle, onClickTitleType, layout }) => {
  return (
    <div className="flex flex-row mt-4 w-[12.5rem] gap-2">
      <div
        onClick={() => onClickTitleType("main")}
        className={`hover:cursor-pointer w-15 h-9 ${
          currentTitle === "main" ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
        } rounded-lg flex items-center justify-center hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
      >
        <p className="font-light text-lg">제목</p>
      </div>
      {(layout === 1 || layout === 3) && (
        <div
          onClick={() => onClickTitleType("sub")}
          className={`hover:cursor-pointer w-15 h-9 ${
            currentTitle === "sub" ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } rounded-lg flex items-center justify-center hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
        >
          <p className="font-light text-lg">부제목</p>
        </div>
      )}
      {(layout === 1 || layout === 4) && (
        <div
          onClick={() => onClickTitleType("small")}
          className={`hover:cursor-pointer w-15 h-9 ${
            currentTitle === "small" ? "bg-[#DFE3FF]" : "bg-[#F2F2F2]"
          } rounded-lg flex items-center justify-center hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
        >
          <p className="font-light text-lg">소제목</p>
        </div>
      )}
    </div>
  );
};

export default TextTypeSelector;
