import Reset from "../assets/reset.svg?react";

export const Size = (props: any) => {
  return (
    <div className="flex flex-row items-center">
      {/* 사이즈 입력 */}
      <p className="text-xl text-[#A9A9A9] font-light mr-2">사이즈</p>
      <input
        type="text"
        alt="width"
        value={props.width}
        readOnly
        className="focus:outline-none focus:border-[#A9A9A9] transition-colors duration-200 px-0.5 py-0.5 bg-white border border-[#D9D9D9] w-20 h-7 rounded-md text-center text-black font-light text-md"
      />
      <p className="text-md text-[#D9D9D9] font-light mx-1">X</p>
      <input
        type="text"
        alt="height"
        value={props.height}
        readOnly
        className="focus:outline-none focus:border-[#A9A9A9] transition-colors duration-200 px-0.5 py-0.5 bg-white border border-[#D9D9D9] w-20 h-7 rounded-md text-center text-black font-light text-md"
      />
      <Reset
        width="1.75rem"
        height="1.75rem"
        fill="#D9D9D9"
        className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
        onClick={() => {
          props.onClickReset();
        }}
      />
    </div>
  );
};
