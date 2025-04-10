const TextDropdown = (props: any) => {
  return (
    <div
      className={`absolute mt-[6.3rem] w-[12.5rem] h-[12rem] overflow-hidden z-10 shadow-xl bg-white rounded-xl ${
        props.status ? "animate-dropdown" : "animate-dropdown-out"
      }`}
    >
      <div className="flex flex-col items-start justify-start bg-white">
        <div
          onClick={() => props.setText(1)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">Pretendard</p>
        </div>
        <div
          onClick={() => props.setText(2)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">나눔 고딕</p>
        </div>
        <div
          onClick={() => props.setText(3)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">서울한강체</p>
        </div>
        <div
          onClick={() => props.setText(4)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">Noto Sans KR</p>
        </div>
      </div>
    </div>
  );
};

export default TextDropdown;
