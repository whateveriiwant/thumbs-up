const TextDropdown = (props: any) => {
  // 드롭다운 항목 클릭시 텍스트를 설정하고 드롭다운을 닫는 함수
  const handleTextSelection = (textKey: number) => {
    props.setText(textKey);
    // 드롭다운을 닫기 위해 부모 컴포넌트에 상태 변경을 요청
    if (props.closeDropdown) {
      props.closeDropdown();
    }
  };

  return (
    <div
      className={`absolute mt-[12.2rem] w-[12.5rem] h-[12rem] overflow-hidden z-10 shadow-xl bg-white rounded-xl ${
        props.status ? "animate-dropdown" : "animate-dropdown-out"
      }`}
    >
      <div className="flex flex-col items-start justify-start bg-white">
        <div
          onClick={() => handleTextSelection(1)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">Pretendard</p>
        </div>
        <div
          onClick={() => handleTextSelection(2)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">나눔 고딕</p>
        </div>
        <div
          onClick={() => handleTextSelection(3)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">서울한강체</p>
        </div>
        <div
          onClick={() => handleTextSelection(4)}
          className="flex items-center w-full h-12 px-3 bg-white hover:bg-[#DFE3FF] transition-colors duration-200 ease-in-out rounded-xl"
        >
          <p className="text-xl font-light">Noto Sans KR</p>
        </div>
      </div>
    </div>
  );
};

export default TextDropdown;
