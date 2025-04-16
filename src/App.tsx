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
import { useEffect, useRef, useState } from "react";
import LayoutDropdown from "./components/layout/LayoutDropdown";
import BackgroundDropdown from "./components/background/BackgroundDropdown";
import TextDropdown from "./components/text/TextDropdown";
import TextTypeSelector from "./components/text/TextTypeSelector";
import { Stage, Layer, Image, Text, Line, Rect } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
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
import { HexColorPicker } from "react-colorful";
import disableRightClick from "./utils/disableRightClick";
import { bgImageList } from "./components/background/bgImageList";
import { CnD } from "./utils/CnD/CnD";
import { FullBackground } from "./components/background/FullBackground";
import { Size } from "./utils/Size";
import { ratioList } from "./components/ratio/ratioList";
import { layoutList } from "./components/layout/layoutList";
import ColorPicker from "./components/background/utils/ColorPicker";

// LocalStorage keys
const STORAGE_KEY_RATIO = "thumbs-up-ratio";
const STORAGE_KEY_LAYOUT = "thumbs-up-layout";

const App = () => {
  useEffect(() => {
    disableRightClick();
  }, []);

  /* 비율 로직 */
  type RatioKey = 1 | 2 | 3 | 4;
  const [ratioStatus, setRatioStatus] = useState<RatioKey>(() => {
    // Load from localStorage or default to 1
    const savedRatio = localStorage.getItem(STORAGE_KEY_RATIO);
    return (savedRatio ? parseInt(savedRatio) : 1) as RatioKey;
  });

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
  type BgKey = 1 | 2 | 3 | 4;
  const [bgView, setBgView] = useState(false); // 배경 드롭다운
  const [bg, setBg] = useState<BgKey>(1);
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
    setBgView(!bgView);
  };

  // 랜덤 배경 이미지
  const [index, setIndex] = useState(0);
  const [bgImage] = useImage(bgImageList[index], "anonymous");

  const onClickBgImageReset = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * bgImageList.length);
    } while (newIndex === index);

    setIndex(newIndex);
  };

  // 단색 배경
  const [bgColor, setBgColor] = useState("#256b74");
  const onClickRandomBgColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setBgColor(randomColor);
  };

  // 그라디언트 배경
  const [bgGradientStart, setBgGradientStart] = useState("#256b74");
  const [bgGradientEnd, setBgGradientEnd] = useState("#668fD6");

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

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

  const inSection = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isStartOpen && !inSection.current?.contains(e.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isStartOpen]);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isEndOpen && !inSection.current?.contains(e.target as Node)) {
        setIsEndOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isEndOpen]);

  const [typed, setTyped] = useState("");
  const [bgLink, setBgLink] = useState("");

  const onChangeTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyped(e.target.value);
  };

  const onClickBgLinkConfirm = () => {
    setBgLink(typed);
  };

  const [userBgImage] = useImage(bgLink);

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
  const fontList = {
    1: "Pretendard Variable",
    2: "NanumGothic",
    3: "SeoulHangangM",
    4: "Noto Sans KR",
  };

  const onClickTextDropdown = () => {
    setTextView(!textView);
  };

  const onClickTextDropdownMenu = (i: TextKey) => {
    setText(i);

    // Update the font of the currently selected title
    if (currentTitle === "main") {
      setMainTitle((prev) => ({ ...prev, key: i, font: fontList[i] }));
    } else if (currentTitle === "sub") {
      setSubTitle((prev) => ({ ...prev, key: i, font: fontList[i] }));
    } else if (currentTitle === "small") {
      setSmallTitle((prev) => ({ ...prev, key: i, font: fontList[i] }));
    }

    setTextView(!textView);
  };

  const textSizeList = {
    // 폰트 사이즈 제목, 부제목, 소제목 순서
    1: [55, 35, 23], // Velog
    2: [45, 30, 20], // 1:1
    3: [55, 35, 22], // 4:3
    4: [55, 35, 23], // Youtube 16:9
  };

  type TitleType = "main" | "sub" | "small";
  const [currentTitle, setCurrentTitle] = useState<TitleType>("main");

  const [mainTitle, setMainTitle] = useState({
    font: "Pretendard Variable",
    key: 1 as TextKey,
    size: textSizeList[ratioStatus][0],
    bold: true,
    underline: false,
    align: "left",
    color: "#ffffff",
  });

  const [subTitle, setSubTitle] = useState({
    font: "Pretendard Variable",
    key: 1 as TextKey,
    size: textSizeList[ratioStatus][1],
    bold: false,
    underline: false,
    align: "left",
    color: "#ffffff",
  });

  const [smallTitle, setSmallTitle] = useState({
    font: "Pretendard Variable",
    key: 1 as TextKey,
    size: textSizeList[ratioStatus][2],
    bold: false,
    underline: false,
    align: "left",
    color: "#ffffff",
  });

  useEffect(() => {
    // Update font size based on ratioStatus without changing the font
    setMainTitle((prev) => ({ ...prev, size: textSizeList[ratioStatus][0] }));
    setSubTitle((prev) => ({ ...prev, size: textSizeList[ratioStatus][1] }));
    setSmallTitle((prev) => ({ ...prev, size: textSizeList[ratioStatus][2] }));
  }, [ratioStatus]);

  const onClickTitleType = (type: string) => {
    if (type === "main") {
      setCurrentTitle("main");
    } else if (type === "sub") setCurrentTitle("sub");
    else setCurrentTitle("small");
  };

  /* 캔버스 로직 */
  const stageRef = useRef<Konva.Stage>(null);

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

    setMainTitle({
      font: "Pretendard",
      key: 1,
      size: textSizeList[ratioStatus][0],
      bold: true,
      underline: false,
      align: "left",
      color: "#ffffff",
    });

    setSubTitle({
      font: "Pretendard",
      key: 1,
      size: textSizeList[ratioStatus][1],
      bold: false,
      underline: false,
      align: "left",
      color: "#ffffff",
    });

    setSmallTitle({
      font: "Pretendard",
      key: 1,
      size: textSizeList[ratioStatus][2],
      bold: false,
      underline: false,
      align: "left",
      color: "#ffffff",
    });

    // Increment reset key to force re-render
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {bg === 1 && <FullBackground style={{ backgroundImage: `url(${bgImageList[index]})` }} />}
      {bg === 2 && <FullBackground style={{ backgroundColor: bgColor }} />}
      {bg === 3 && (
        <FullBackground style={{ background: `linear-gradient(to right, ${bgGradientStart}, ${bgGradientEnd})` }} />
      )}
      {bg === 4 && bgLink === "" && <FullBackground style={{ backgroundImage: `url(${bgImage})` }} />}
      {bg === 4 && bgLink !== "" && <FullBackground style={{ backgroundImage: `url(${bgLink})` }} />}
      <div className="flex items-center justify-center py-10">
        <div className="bg-white px-14 py-11 w-[55rem] z-10 flex justify-start rounded-[3.5rem] flex-col shadow-2xl">
          <div className="flex items-center justify-center">
            <Stage width={width} height={height} key={resetKey} ref={stageRef}>
              <Layer>
                {bg === 1 && <Image image={bgImage} width={width} height={height} />}
                {bg === 2 && <Rect width={width} height={height} fill={bgColor} />}
                {bg === 3 && (
                  <Rect
                    width={width}
                    height={height}
                    fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                    fillLinearGradientEndPoint={{ x: width, y: height }}
                    fillLinearGradientColorStops={[0, bgGradientStart, 1, bgGradientEnd]}
                  />
                )}
                {bg === 4 && bgLink === "" && <Image image={bgImage} width={width} height={height} />}
                {bg === 4 && bgLink !== "" && <Image image={userBgImage} width={width} height={height} />}
                <Text
                  x={textPosition[ratioStatus][0]}
                  y={textPosition[ratioStatus][1]}
                  width={width}
                  text="제목을 입력하세요"
                  fontSize={mainTitle.size}
                  fill="#ffffff"
                  textDecoration={mainTitle.underline ? "underline" : "none"}
                  fontStyle={mainTitle.bold ? "700" : "400"}
                  fontFamily={mainTitle.font}
                  align="center"
                  verticalAlign="middle"
                  onDragMove={(e) => {
                    // Check if near horizontal center
                    const centerX = width / 2 - e.target.width() / 2;
                    if (Math.abs(e.target.x() - centerX) < snapThreshold) {
                      e.target.x(centerX);
                    }
                  }}
                  onDragEnd={(e) => {
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
                    fontSize={subTitle.size}
                    fill="#ffffff"
                    textDecoration={subTitle.underline ? "underline" : "none"}
                    fontStyle={subTitle.bold ? "700" : "500"}
                    fontFamily={subTitle.font}
                    align="center"
                    verticalAlign="middle"
                    onDragMove={(e) => {
                      // Check if near horizontal center
                      const centerX = width / 2 - e.target.width() / 2;
                      if (Math.abs(e.target.x() - centerX) < snapThreshold) {
                        e.target.x(centerX);
                      }
                    }}
                    onDragEnd={(e) => {
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
                    fontSize={smallTitle.size}
                    fill="#ffffff"
                    textDecoration={smallTitle.underline ? "underline" : "none"}
                    fontStyle={smallTitle.bold ? "700" : "300"}
                    fontFamily={smallTitle.font}
                    align="center"
                    verticalAlign="middle"
                    onDragMove={(e) => {
                      // Check if near horizontal center
                      const centerX = width / 2 - e.target.width() / 2;
                      if (Math.abs(e.target.x() - centerX) < snapThreshold) {
                        e.target.x(centerX);
                      }
                    }}
                    onDragEnd={(e) => {
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
            <Size width={width} height={height} onClickReset={onClickReset} />
            <CnD ref={stageRef} /> {/* 복사, 다운로드 */}
          </div>
          <div className="flex flex-row items-start justify-between mt-14">
            {/* 비율 + 레이아웃 묶음 */}
            <Ratio ratioStatus={ratioStatus} updateRatio={onClickRatio} width={width} height={height} />
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
              {bg === 2 && <ColorPicker color={bgColor} onChange={setBgColor} onRandomColor={onClickRandomBgColor} />}
              {bg === 3 && (
                <div className="flex flex-col mt-1">
                  <p
                    onClick={() => onClickRandomBGGradient()}
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
                            onClick={() => onClickGradientStart()}
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
                            onClick={() => onClickGradientEnd()}
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
            <div className="flex flex-col items-start">
              <div className="flex flex-row justify-center items-center">
                <TextIcon width="2rem" height="2rem" />
                <p className="ml-2 text-2xl font-semibold">텍스트</p>
              </div>
              <TextTypeSelector layout={layout} currentTitle={currentTitle} onClickTitleType={onClickTitleType} />
              <div className="flex flex-row items-center mt-2">
                <div
                  onClick={() => onClickTextDropdown()}
                  className="flex flex-row items-center justify-between px-3 bg-[#F2F2F2] rounded-xl w-[12.5rem] h-12 hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out"
                >
                  {currentTitle === "main" && <p className="text-xl font-light">{textList[mainTitle.key]}</p>}
                  {currentTitle === "sub" && <p className="text-xl font-light">{textList[subTitle.key]}</p>}
                  {currentTitle === "small" && <p className="text-xl font-light">{textList[smallTitle.key]}</p>}
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
                  value={
                    currentTitle === "main" ? mainTitle.size : currentTitle === "sub" ? subTitle.size : smallTitle.size
                  }
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.value.length > 2) {
                      input.value = input.value.slice(0, 2);
                    }
                  }}
                  onChange={(e) => {
                    if (currentTitle === "main") setMainTitle({ ...mainTitle, size: parseInt(e.target.value) });
                    else if (currentTitle === "sub") setSubTitle({ ...subTitle, size: parseInt(e.target.value) });
                    else if (currentTitle === "small") setSmallTitle({ ...smallTitle, size: parseInt(e.target.value) });
                  }}
                  className="w-[4rem] h-12 ml-2 focus:outline-none px-2 text-xl font-light text-center bg-white border border-[#D9D9D9] rounded-lg"
                />
              </div>
              {textView && <TextDropdown status={textView} setText={onClickTextDropdownMenu} currentText={text} />}
              <div className="flex flex-row mt-3 justify-between w-[12.5rem]">
                <div
                  onClick={() => {
                    const setStateMap = {
                      main: setMainTitle,
                      sub: setSubTitle,
                      small: setSmallTitle,
                    };

                    setStateMap[currentTitle]((prev) => ({ ...prev, bold: !prev.bold }));
                  }}
                  className={`${
                    (
                      currentTitle === "main"
                        ? mainTitle.bold
                        : currentTitle === "sub"
                        ? subTitle.bold
                        : smallTitle.bold
                    )
                      ? "bg-[#DFE3FF]"
                      : "bg-[#F2F2F2]"
                  } flex items-center justify-center w-11 h-11 rounded-lg hover:cursor-pointer hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
                >
                  <Bold width="1.8rem" height="1.8rem" />
                </div>
                <div
                  onClick={() => {
                    const setStateMap = {
                      main: setMainTitle,
                      sub: setSubTitle,
                      small: setSmallTitle,
                    };
                    setStateMap[currentTitle]((prev) => ({ ...prev, underline: !prev.underline }));
                  }}
                  className={`${
                    (
                      currentTitle === "main"
                        ? mainTitle.underline
                        : currentTitle === "sub"
                        ? subTitle.underline
                        : smallTitle.underline
                    )
                      ? "bg-[#DFE3FF]"
                      : "bg-[#F2F2F2]"
                  } flex items-center justify-center w-11 h-11 rounded-lg hover:cursor-pointer hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out`}
                >
                  <Underline width="1.8rem" height="1.8rem" />
                </div>
                <div className="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] rounded-lg hover:cursor-pointer hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out">
                  <AlignLeft width="1.8rem" height="1.8rem" />
                </div>
                <div className="flex items-center justify-center w-11 h-11 bg-[#F2F2F2] rounded-lg hover:cursor-pointer hover:bg-[#d9d9d9] transition-colors duration-200 ease-in-out">
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
