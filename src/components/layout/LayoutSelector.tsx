import { useState } from "react";
import Layout from "../../assets/layout.svg?react";
import Darrow from "../../assets/dArrow.svg?react";
import LayoutDropdown from "./LayoutDropdown";
import { layoutList } from "./layoutList";

export type LayoutKey = 1 | 2 | 3 | 4;

interface LayoutSelectorProps {
  layout: LayoutKey;
  setLayout: (layout: LayoutKey) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ layout, setLayout }) => {
  const [layoutView, setLayoutView] = useState(false);

  const onClickLayoutDropdown = () => {
    setLayoutView(!layoutView);
  };

  const onClickLayoutDropdownMenu = (i: LayoutKey) => {
    setLayout(i);
    setLayoutView(false);
  };

  return (
    <div className="flex flex-col items-start ml-6">
      {/*레이아웃 */}
      <div className="flex flex-row items-center">
        <Layout width="2rem" height="2rem" />
        <p className="ml-1 text-2xl font-semibold">레이아웃</p>
      </div>
      {/* 레이아웃 드롭다운 */}
      <div
        onClick={onClickLayoutDropdown}
        className="flex flex-row items-center justify-between px-3 bg-[#f6f6f6] rounded-xl w-[17rem] h-12 mt-4 hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out"
      >
        <p className="text-xl font-light">{layoutList[layout]}</p>
        {layoutView ? (
          <Darrow width="1.8rem" height="1.8rem" className="rotate-180" />
        ) : (
          <Darrow width="1.8rem" height="1.8rem" />
        )}
      </div>
      {layoutView && (
        <LayoutDropdown status={layoutView} setLayout={onClickLayoutDropdownMenu} currentLayout={layout} />
      )}
    </div>
  );
};

export default LayoutSelector;
