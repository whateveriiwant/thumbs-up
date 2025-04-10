const BackgroundDropdown = (props: any) => {
  return (
    <div
      className={`absolute mt-[6.3rem] w-[13rem] h-[9rem] overflow-hidden z-10 shadow-xl bg-white rounded-xl ${
        props.status ? "animate-dropdown" : "animate-dropdown-out"
      }`}
    >
      <div className="flex flex-col items-start justify-start bg-white">
        <div
          onClick={() => props.setBg(1)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">랜덤 배경 이미지</p>
        </div>
        <div
          onClick={() => props.setBg(2)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">단색 배경</p>
        </div>
        <div
          onClick={() => props.setBg(3)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">그라디언트 배경</p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundDropdown;
