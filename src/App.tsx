import Reset from "./assets/reset.svg?react";
import Copy from "./assets/copy.svg?react";
import Download from "./assets/download.svg?react";
import Scale from "./assets/scale.svg?react";
import Layout from "./assets/layout.svg?react";
import BackGround from "./assets/bg.svg?react";
import ResetBG from "./assets/resetBg.svg?react";
import TextIcon from "./assets/text.svg?react";
import Bold from "./assets/bold.svg?react";
import Underline from "./assets/underline.svg?react";
import AlignLeft from "./assets/alignLeft.svg?react";
import Palette from "./assets/palette.svg?react";
import Darrow from "./assets/dArrow.svg?react";
import Ratio from "./components/ratio/Ratio";
import { useEffect, useState } from "react";
import LayoutDropdown from "./components/layout/LayoutDropdown";
import BackgroundDropdown from "./components/background/BackgroundDropdown";
import TextDropdown from "./components/text/TextDropdown";
import { Stage, Layer, Image, Text, Line } from "react-konva";
import useImage from "use-image";
import {
  textPositionList1,
  textPositionList2,
  textPositionList3,
  textPositionList4,
} from "./components/layout/TextPositionList";
import {
  linePositionList1,
  linePositionList2,
  linePositionList3,
  linePositionList4,
} from "./components/layout/LinePositionList";
import Footer from "./components/footer/Footer";

// LocalStorage keys
const STORAGE_KEY_RATIO = "thumbs-up-ratio";
const STORAGE_KEY_LAYOUT = "thumbs-up-layout";

const App = () => {
  useEffect(() => {
    /* 우클릭 방지 */
    document.oncontextmenu = function () {
      return false;
    };
  }, []);

  /* 비율 로직 */
  type RatioKey = 1 | 2 | 3 | 4;
  const [ratioStatus, setRatioStatus] = useState<RatioKey>(() => {
    // Load from localStorage or default to 1
    const savedRatio = localStorage.getItem(STORAGE_KEY_RATIO);
    return (savedRatio ? parseInt(savedRatio) : 1) as RatioKey;
  });

  const ratioList = {
    1: [768, 402.094], // Velog
    2: [400, 400], // 1:1
    3: [533.3333, 400], // 4:3
    4: [640, 340], // Youtube
  };

  const [width, setWidth] = useState<number>(ratioList[ratioStatus][0]);
  const [height, setHeight] = useState<number>(ratioList[ratioStatus][1]);
  useEffect(() => {
    setWidth(ratioList[ratioStatus][0]);
    setHeight(ratioList[ratioStatus][1]);
  }, [ratioStatus]);

  const onClickRatio = (status: RatioKey) => {
    setRatioStatus(status);
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY_RATIO, status.toString());

    const newWidth = ratioList[status][0];
    const newHeight = ratioList[status][1];
    setWidth(newWidth);
    setHeight(newHeight);
  };

  /* 레이아웃 로직 */
  type LayoutKey = 1 | 2 | 3 | 4;
  const [layoutView, setLayoutView] = useState(false); // 드롭다운
  const [layout, setLayout] = useState<LayoutKey>(() => {
    // Load from localStorage or default to 1
    const savedLayout = localStorage.getItem(STORAGE_KEY_LAYOUT);
    return (savedLayout ? parseInt(savedLayout) : 1) as LayoutKey;
  });

  useEffect(() => {
    // Create mappings for position lists
    const positionMappings = {
      text: {
        1: textPositionList1,
        2: textPositionList2,
        3: textPositionList3,
        4: textPositionList4,
      },
      line: {
        1: linePositionList1,
        2: linePositionList2,
        3: linePositionList3,
        4: linePositionList4,
      },
    };

    // Set positions directly using the ratioStatus as a key
    setTextPosition(positionMappings.text[layout]);
    setLinePosition(positionMappings.line[layout]);
  }, [layout, ratioStatus]); // 레이아웃, 비율 바뀔 때 마다 위치 재설정

  const layoutList = {
    1: "제목 + 부제목 + 소제목",
    2: "제목",
    3: "제목 + 부제목",
    4: "제목 + 소제목",
  };

  const onClickLayoutDropdown = () => {
    setLayoutView(!layoutView);
  };

  const onClickLayoutDropdownMenu = (i: LayoutKey) => {
    setLayout(i);
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY_LAYOUT, i.toString());
    setLayoutView(!layoutView);
  };

  /* 배경 로직 */
  type BgKey = 1 | 2 | 3;
  const [bgView, setBgView] = useState(false); // 배경 드롭다운
  const [bg, setBg] = useState<BgKey>(1);
  const bgList = {
    1: "랜덤 배경 이미지",
    2: "단색 배경",
    3: "그라디언트 배경",
  };

  const onClickBgDropdown = () => {
    setBgView(!bgView);
  };

  const onClickBgDropdownMenu = (i: BgKey) => {
    setBg(i);
    setBgView(!bgView);
  };

  const bgImageList = [
    "https://i.ibb.co/yng1dRz2/default-bg.jpg",
    "https://i.ibb.co/F4JJMm76/richard-horvath-n-Wae-TF6qo0-unsplash.jpg",
    "https://i.ibb.co/8DSHtRvT/milad-fakurian-u8-Jn2rz-YIps-unsplash.jpg",
    "https://i.ibb.co/svqwBfCW/pawel-czerwinski-FAl-YVt-V1k-Rg-unsplash.jpg",
    "https://i.ibb.co/F4YrW3kZ/engin-akyurt-Hlkuojv-P6-I-unsplash.jpg",
    "https://i.ibb.co/0yFdX6QX/shapelined-JBKdviwe-XI-unsplash.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [bgImage] = useImage(bgImageList[index]);

  const onClickBgImageReset = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * bgImageList.length);
    } while (newIndex === index);

    setIndex(newIndex);
  };

  /* 텍스트 로직 */
  type TextKey = 1 | 2 | 3 | 4;
  const [textView, setTextView] = useState(false); // 텍스트 드롭다운
  const [text, setText] = useState<TextKey>(1);
  const textList = {
    1: "Pretendard",
    2: "나눔 고딕",
    3: "서울한강체",
    4: "Noto Sans KR",
  };

  const onClickTextDropdown = () => {
    setTextView(!textView);
  };

  const onClickTextDropdownMenu = (i: TextKey) => {
    setText(i);
    setTextView(!textView);
  };

  /* 캔버스 로직 */
  const textSizeList = {
    // 폰트 사이즈 제목, 부제목, 소제목 순서
    1: [55, 35, 23], // Velog
    2: [45, 30, 20], // 1:1
    3: [55, 35, 22], // 4:3
    4: [55, 35, 23], // Youtube 16:9
  };
  const [isDragging, setIsDragging] = useState(false);
  const [textPosition, setTextPosition] = useState({
    1: [0, 402.094 / 2 - 70, 0, 402.094 / 2 + 20, 0, 402.094 / 2 + 160], // Velog
    2: [0, 400 / 2 - 60, 0, 400 / 2 + 20, 0, 400 / 2 + 160], // 1:1
    3: [0, 400 / 2 - 70, 0, 400 / 2 + 20, 0, 400 / 2 + 160], // 4:3
    4: [0, 340 / 2 - 90, 0, 340 / 2, 0, 340 / 2 + 135], // Youtube
  });
  const [linePosition, setLinePosition] = useState({
    1: [768 / 2 - 150, 402.094 / 2, 768 / 2 + 150, 402.094 / 2],
    2: [400 / 2 - 130, 400 / 2, 400 / 2 + 130, 400 / 2],
    3: [533.3333 / 2 - 155, 400 / 2, 533.3333 / 2 + 155, 400 / 2],
    4: [640 / 2 - 155, 340 / 2 - 20, 640 / 2 + 150, 340 / 2 - 20],
  });

  // Snap threshold in pixels - how close to center before snapping
  const snapThreshold = 15;

  // Add a key state to force re-renders
  const [resetKey, setResetKey] = useState(0);

  const onClickReset = () => {
    const positionMappings = {
      text: {
        1: textPositionList1,
        2: textPositionList2,
        3: textPositionList3,
        4: textPositionList4,
      },
      line: {
        1: linePositionList1,
        2: linePositionList2,
        3: linePositionList3,
        4: linePositionList4,
      },
    };

    // Set positions directly using the ratioStatus as a key
    setTextPosition(positionMappings.text[layout]);
    setLinePosition(positionMappings.line[layout]);

    // Increment reset key to force re-render
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover w-full h-full -z-10 blur-xs scale-150"
        style={{ backgroundImage: `url(${bgImageList[index]})` }}
      />
      <div className="flex items-center justify-center py-10">
        <div className="bg-white px-14 py-11 w-[55rem] z-10 flex justify-start rounded-[3.5rem] flex-col">
          <div className="flex items-center justify-center">
            <Stage width={width} height={height} key={resetKey}>
              <Layer>
                <Image image={bgImage} width={width} height={height} />
                <Text
                  x={textPosition[ratioStatus][0]}
                  y={textPosition[ratioStatus][1]}
                  width={width}
                  text="제목을 입력하세요"
                  fontSize={textSizeList[ratioStatus][0]}
                  fill="#ffffff"
                  fontStyle="700"
                  fontFamily="Pretendard Variable"
                  align="center"
                  verticalAlign="middle"
                  onDragStart={() => setIsDragging(true)}
                  onDragMove={(e) => {
                    // Check if near horizontal center
                    const centerX = width / 2 - e.target.width() / 2;
                    if (Math.abs(e.target.x() - centerX) < snapThreshold) {
                      e.target.x(centerX);
                    }
                  }}
                  onDragEnd={(e) => {
                    setIsDragging(false);
                    setTextPosition({
                      ...textPosition,
                      [ratioStatus]: [
                        e.target.x(),
                        e.target.y(),
                        textPosition[ratioStatus][2],
                        textPosition[ratioStatus][3],
                        textPosition[ratioStatus][4],
                        textPosition[ratioStatus][5],
                      ],
                    });
                  }}
                  draggable
                />
                {(layout === 1 || layout === 3) && (
                  <Line
                    points={[
                      linePosition[ratioStatus][0],
                      linePosition[ratioStatus][1],
                      linePosition[ratioStatus][2],
                      linePosition[ratioStatus][3],
                    ]}
                    stroke="#ffffff"
                    strokeWidth={2}
                    onDragStart={() => setIsDragging(true)}
                    onDragMove={(e) => {
                      const line = e.target as import("konva/lib/shapes/Line").Line;
                      const points = line.points();

                      // Calculate center Y position
                      const centerY = height / 2;
                      const currentY = points[1]; // Y position of first point

                      // If near vertical center, snap to it
                      if (Math.abs(currentY - centerY) < snapThreshold) {
                        line.points([points[0], centerY, points[2], centerY]);
                      }
                    }}
                    onDragEnd={(e) => {
                      setIsDragging(false);
                      const line = e.target as import("konva/lib/shapes/Line").Line;
                      setLinePosition({
                        ...linePosition,
                        [ratioStatus]: [line.points()[0], line.points()[1], line.points()[2], line.points()[3]],
                      });
                    }}
                    draggable
                  />
                )}
                {(layout === 1 || layout === 3) && (
                  <Text
                    x={textPosition[ratioStatus][2]}
                    y={textPosition[ratioStatus][3]}
                    width={width}
                    text="부제목을 입력하세요"
                    fontSize={textSizeList[ratioStatus][1]}
                    fill="#ffffff"
                    fontStyle="500"
                    fontFamily="Pretendard Variable"
                    align="center"
                    verticalAlign="middle"
                    onDragStart={() => setIsDragging(true)}
                    onDragMove={(e) => {
                      // Check if near horizontal center
                      const centerX = width / 2 - e.target.width() / 2;
                      if (Math.abs(e.target.x() - centerX) < snapThreshold) {
                        e.target.x(centerX);
                      }
                    }}
                    onDragEnd={(e) => {
                      setIsDragging(false);
                      setTextPosition({
                        ...textPosition,
                        [ratioStatus]: [
                          textPosition[ratioStatus][0],
                          textPosition[ratioStatus][1],
                          e.target.x(),
                          e.target.y(),
                          textPosition[ratioStatus][4],
                          textPosition[ratioStatus][5],
                        ],
                      });
                    }}
                    draggable
                  />
                )}
                {(layout === 1 || layout === 4) && (
                  <Text
                    x={textPosition[ratioStatus][4]}
                    y={textPosition[ratioStatus][5]}
                    width={width}
                    text="소제목을 입력하세요"
                    fontSize={textSizeList[ratioStatus][2]}
                    fill="#ffffff"
                    fontStyle="300"
                    fontFamily="Pretendard Variable"
                    align="center"
                    verticalAlign="middle"
                    onDragStart={() => setIsDragging(true)}
                    onDragMove={(e) => {
                      // Check if near horizontal center
                      const centerX = width / 2 - e.target.width() / 2;
                      if (Math.abs(e.target.x() - centerX) < snapThreshold) {
                        e.target.x(centerX);
                      }
                    }}
                    onDragEnd={(e) => {
                      setIsDragging(false);
                      setTextPosition({
                        ...textPosition,
                        [ratioStatus]: [
                          textPosition[ratioStatus][0],
                          textPosition[ratioStatus][1],
                          textPosition[ratioStatus][2],
                          textPosition[ratioStatus][3],
                          e.target.x(),
                          e.target.y(),
                        ],
                      });
                    }}
                    draggable
                  />
                )}
              </Layer>
            </Stage>
          </div>
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
                onClick={() => {
                  onClickReset();
                }}
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
              <Ratio ratioStatus={ratioStatus} updateRatio={onClickRatio} width={width} height={height} />
            </div>
            <div className="flex flex-col items-start ml-6">
              {/*레이아웃 */}
              <div className="flex flex-row items-center">
                <Layout width="2rem" height="2rem" />
                <p className="ml-1 text-2xl font-semibold">레이아웃</p>
              </div>
              {/* 레이아웃 드롭다운 */}
              <div
                onClick={() => onClickLayoutDropdown()}
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
          </div>
          <div className="flex flex-row items-start mt-10 justify-between">
            {/* 배경 + 텍스트 묶음 */}
            <div className="flex flex-col items-start justify-between">
              <div className="flex flex-row items-start -ml-1">
                <BackGround width="2.4rem" height="2.4rem" />
                <p className="ml-1 text-2xl font-semibold">배경</p>
              </div>
              <div className="flex flex-row place-items-center mt-3">
                <div
                  onClick={() => onClickBgDropdown()}
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
                    onClick={() => onClickBgImageReset()}
                    width="2rem"
                    height="2rem"
                    fill="#A9A9A9"
                    className="ml-2 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:fill-black"
                  />
                )}
              </div>
              {bgView && <BackgroundDropdown status={bgView} setBg={onClickBgDropdownMenu} currentBg={bg} />}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-row justify-center items-center">
                <TextIcon width="2rem" height="2rem" />
                <p className="ml-2 text-2xl font-semibold">텍스트</p>
              </div>
              <div className="flex flex-row items-center mt-4">
                <div
                  onClick={() => onClickTextDropdown()}
                  className="flex flex-row items-center justify-between px-3 bg-[#F2F2F2] rounded-xl w-[12.5rem] h-12 hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out"
                >
                  <p className="text-xl font-light">{textList[text]}</p>
                  {textView ? (
                    <Darrow width="1.8rem" height="1.8rem" className="rotate-180" />
                  ) : (
                    <Darrow width="1.8rem" height="1.8rem" />
                  )}
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
              {textView && <TextDropdown status={textView} setText={onClickTextDropdownMenu} currentText={text} />}
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
