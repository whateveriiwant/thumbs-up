import { useEffect, useRef, useState } from "react";
import useImage from "use-image";
import Konva from "konva";
import Footer from "./components/footer/Footer";
import disableRightClick from "./utils/disableRightClick";
import { bgImageList } from "./components/background/bgImageList";
import { CnD } from "./utils/CnD/CnD";
import { BackgroundRenderer } from "./components/background/BackgroundRenderer";
import { Size } from "./utils/Size";
import { ratioList } from "./components/ratio/ratioList";
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
import Ratio from "./components/ratio/Ratio";
import BackgroundEditor, { BgKey } from "./components/background/BackgroundEditor";
import TitleEditor, { TextKey, TitleType, TitleState } from "./components/text/TitleEditor";
import LayoutSelector, { LayoutKey } from "./components/layout/LayoutSelector";
import Canvas from "./components/canvas/Canvas";

// LocalStorage keys
const STORAGE_KEY_RATIO = "thumbs-up-ratio";
const STORAGE_KEY_LAYOUT = "thumbs-up-layout";

const App = () => {
  useEffect(() => {
    disableRightClick();
  }, []);

  // Add effect to initialize UI on first page load
  useEffect(() => {
    // Call the reset function when the page first loads
    initializeUI();
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

  /* 배경 로직 */
  const [bg, setBg] = useState<BgKey>(1);
  const [index, setIndex] = useState(0);
  const [bgImage] = useImage(bgImageList[index], "anonymous");
  const [bgColor, setBgColor] = useState("#256b74");
  const [bgGradientStart, setBgGradientStart] = useState("#256b74");
  const [bgGradientEnd, setBgGradientEnd] = useState("#668fD6");
  const [bgLink, setBgLink] = useState("");
  const [userBgImage] = useImage(bgLink);

  /* 텍스트 로직 */
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

  const textSizeList = {
    // 폰트 사이즈 제목, 부제목, 소제목 순서
    1: [55, 35, 23], // Velog
    2: [45, 30, 20], // 1:1
    3: [55, 35, 22], // 4:3
    4: [55, 35, 23], // Youtube 16:9
  };

  const [currentTitle, setCurrentTitle] = useState<TitleType>("main");

  const [mainTitle, setMainTitle] = useState<TitleState>({
    font: "Pretendard Variable",
    text: "제목을 입력하세요",
    key: 1 as TextKey,
    size: textSizeList[ratioStatus][0],
    bold: true,
    underline: false,
    align: "left",
    color: "#ffffff",
  });

  const [subTitle, setSubTitle] = useState<TitleState>({
    font: "Pretendard Variable",
    key: 1 as TextKey,
    text: "부제목을 입력하세요",
    size: textSizeList[ratioStatus][1],
    bold: false,
    underline: false,
    align: "left",
    color: "#ffffff",
  });

  const [smallTitle, setSmallTitle] = useState<TitleState>({
    font: "Pretendard Variable",
    key: 1 as TextKey,
    text: "소제목을 입력하세요",
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

  const onClickTextDropdownMenu = (i: TextKey) => {
    // Update the font of the currently selected title
    if (currentTitle === "main") {
      setMainTitle((prev) => ({ ...prev, key: i, font: fontList[i] }));
    } else if (currentTitle === "sub") {
      setSubTitle((prev) => ({ ...prev, key: i, font: fontList[i] }));
    } else if (currentTitle === "small") {
      setSmallTitle((prev) => ({ ...prev, key: i, font: fontList[i] }));
    }
  };

  /* 캔버스 로직 */
  const stageRef = useRef<Konva.Stage>(null);

  const [textPosition, setTextPosition] = useState<{ [key: number]: number[] }>({
    1: [0, 402.094 / 2 - 70, 0, 402.094 / 2 + 20, 0, 402.094 / 2 + 160], // Velog
    2: [0, 400 / 2 - 60, 0, 400 / 2 + 20, 0, 400 / 2 + 160], // 1:1
    3: [0, 400 / 2 - 70, 0, 400 / 2 + 20, 0, 400 / 2 + 160], // 4:3
    4: [0, 340 / 2 - 90, 0, 340 / 2, 0, 340 / 2 + 135], // Youtube
  });

  const [linePosition, setLinePosition] = useState<{ [key: number]: number[] }>({
    1: [768 / 2 - 150, 402.094 / 2, 768 / 2 + 150, 402.094 / 2],
    2: [400 / 2 - 130, 400 / 2, 400 / 2 + 130, 400 / 2],
    3: [533.3333 / 2 - 155, 400 / 2, 533.3333 / 2 + 155, 400 / 2],
    4: [640 / 2 - 155, 340 / 2 - 20, 640 / 2 + 150, 340 / 2 - 20],
  });

  // Snap threshold in pixels - how close to center before snapping
  const snapThreshold = 15;

  // Add a key state to force re-renders
  const [resetKey, setResetKey] = useState(0);

  // Initialize UI function
  const initializeUI = () => {
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

    // Reset to default layout (1)
    const defaultLayout = 1 as LayoutKey;
    setLayout(defaultLayout);
    localStorage.setItem(STORAGE_KEY_LAYOUT, defaultLayout.toString());

    // Reset to default ratio (1)
    const defaultRatio = 1 as RatioKey;
    setRatioStatus(defaultRatio);
    localStorage.setItem(STORAGE_KEY_RATIO, defaultRatio.toString());
    setWidth(ratioList[defaultRatio][0]);
    setHeight(ratioList[defaultRatio][1]);

    // Reset background
    setBg(1);
    setIndex(0);
    setBgColor("#256b74");
    setBgGradientStart("#256b74");
    setBgGradientEnd("#668fD6");
    setBgLink("");

    // Set positions directly using the default layout
    setTextPosition(positionMappings.text[defaultLayout]);
    setLinePosition(positionMappings.line[defaultLayout]);

    setMainTitle({
      font: "Pretendard Variable",
      text: "제목을 입력하세요",
      key: 1,
      size: textSizeList[defaultRatio][0],
      bold: true,
      underline: false,
      align: "left",
      color: "#ffffff",
    });

    setSubTitle({
      font: "Pretendard Variable",
      text: "부제목을 입력하세요",
      key: 1,
      size: textSizeList[defaultRatio][1],
      bold: false,
      underline: false,
      align: "left",
      color: "#ffffff",
    });

    setSmallTitle({
      font: "Pretendard Variable",
      text: "소제목을 입력하세요",
      key: 1,
      size: textSizeList[defaultRatio][2],
      bold: false,
      underline: false,
      align: "left",
      color: "#ffffff",
    });

    // Set current title to main
    setCurrentTitle("main");

    // Increment reset key to force re-render
    setResetKey((prev) => prev + 1);
  };

  const onClickReset = () => {
    // Use the same initialization function for the reset button
    initializeUI();
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <BackgroundRenderer
        bg={bg}
        bgImage={bgImage}
        bgColor={bgColor}
        bgGradientStart={bgGradientStart}
        bgGradientEnd={bgGradientEnd}
        bgLink={bgLink}
        userBgImage={userBgImage}
        index={index}
      />
      <div className="flex items-center justify-center py-10">
        <div className="bg-white px-14 py-11 w-[55rem] z-10 flex justify-start rounded-[3.5rem] flex-col shadow-2xl">
          <div className="flex items-center justify-center">
            <Canvas
              width={width}
              height={height}
              resetKey={resetKey}
              ratioStatus={ratioStatus}
              layout={layout}
              bg={bg}
              bgImage={bgImage}
              bgColor={bgColor}
              bgGradientStart={bgGradientStart}
              bgGradientEnd={bgGradientEnd}
              bgLink={bgLink}
              userBgImage={userBgImage}
              mainTitle={mainTitle}
              subTitle={subTitle}
              smallTitle={smallTitle}
              textPosition={textPosition}
              setTextPosition={setTextPosition}
              linePosition={linePosition}
              setLinePosition={setLinePosition}
              snapThreshold={snapThreshold}
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-3">
            <Size width={width} height={height} onClickReset={onClickReset} />
            <CnD ref={stageRef} /> {/* 복사, 다운로드 */}
          </div>
          <div className="flex flex-row items-start justify-between mt-14">
            {/* 비율 + 레이아웃 묶음 */}
            <Ratio ratioStatus={ratioStatus} updateRatio={onClickRatio} width={width} height={height} />
            <LayoutSelector layout={layout} setLayout={setLayout} />
          </div>
          <div className="flex flex-row items-start mt-10 justify-between">
            {/* 배경 + 텍스트 묶음 */}
            <BackgroundEditor
              bg={bg}
              setBg={setBg}
              index={index}
              setIndex={setIndex}
              bgColor={bgColor}
              setBgColor={setBgColor}
              bgGradientStart={bgGradientStart}
              setBgGradientStart={setBgGradientStart}
              bgGradientEnd={bgGradientEnd}
              setBgGradientEnd={setBgGradientEnd}
              bgLink={bgLink}
              setBgLink={setBgLink}
            />
            <TitleEditor
              layout={layout}
              currentTitle={currentTitle}
              mainTitle={mainTitle}
              subTitle={subTitle}
              smallTitle={smallTitle}
              textList={textList}
              onClickTitleType={onClickTitleType}
              setMainTitle={setMainTitle}
              setSubTitle={setSubTitle}
              setSmallTitle={setSmallTitle}
              onClickTextDropdownMenu={onClickTextDropdownMenu}
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
