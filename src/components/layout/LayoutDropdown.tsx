const LayoutDropdown = (props: any) => {
  return (
    <div
      className={`absolute mt-[6.3rem] w-[17rem] h-[12rem] overflow-hidden z-10 shadow-xl bg-white rounded-xl ${
        props.status ? "animate-dropdown" : "animate-dropdown-out"
      }`}
    >
      <div className="flex flex-col items-start justify-start bg-white">
        <div
          onClick={() => props.setLayout(1)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">제목 + 부제목 + 소제목</p>
        </div>
        <div
          onClick={() => props.setLayout(2)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">제목</p>
        </div>
        <div
          onClick={() => props.setLayout(3)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">제목 + 부제목</p>
        </div>
        <div
          onClick={() => props.setLayout(4)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">제목 + 소제목</p>
        </div>
      </div>
    </div>
  );
};

export default LayoutDropdown;
