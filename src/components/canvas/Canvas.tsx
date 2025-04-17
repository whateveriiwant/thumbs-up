import { useRef } from "react";
import { Stage, Layer, Image, Text, Line, Rect } from "react-konva";
import Konva from "konva";
import { TitleState } from "../text/TitleEditor";
import { BgKey } from "../background/BackgroundEditor";

interface CanvasProps {
  width: number;
  height: number;
  resetKey: number;
  ratioStatus: number;
  layout: number;
  bg: BgKey;
  bgImage: HTMLImageElement | undefined;
  bgColor: string;
  bgGradientStart: string;
  bgGradientEnd: string;
  bgLink: string;
  userBgImage: HTMLImageElement | undefined;
  mainTitle: TitleState;
  subTitle: TitleState;
  smallTitle: TitleState;
  textPosition: { [key: number]: number[] };
  setTextPosition: React.Dispatch<React.SetStateAction<{ [key: number]: number[] }>>;
  linePosition: { [key: number]: number[] };
  setLinePosition: React.Dispatch<React.SetStateAction<{ [key: number]: number[] }>>;
  snapThreshold: number;
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  resetKey,
  ratioStatus,
  layout,
  bg,
  bgImage,
  bgColor,
  bgGradientStart,
  bgGradientEnd,
  bgLink,
  userBgImage,
  mainTitle,
  subTitle,
  smallTitle,
  textPosition,
  setTextPosition,
  linePosition,
  setLinePosition,
  snapThreshold,
}) => {
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <Stage width={width} height={height} key={resetKey} ref={stageRef}>
      <Layer>
        {/* Background rendering */}
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

        {/* Main title */}
        <Text
          x={textPosition[ratioStatus][0]}
          y={textPosition[ratioStatus][1]}
          width={width}
          text={mainTitle.text}
          fontSize={mainTitle.size}
          fill={mainTitle.color}
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
            setTextPosition((prevPosition) => ({
              ...prevPosition,
              [ratioStatus]: [
                e.target.x(),
                e.target.y(),
                prevPosition[ratioStatus][2],
                prevPosition[ratioStatus][3],
                prevPosition[ratioStatus][4],
                prevPosition[ratioStatus][5],
              ],
            }));
          }}
          draggable
        />

        {/* Line (for layouts 1 and 3) */}
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
              setLinePosition((prevPosition) => ({
                ...prevPosition,
                [ratioStatus]: [line.points()[0], line.points()[1], line.points()[2], line.points()[3]],
              }));
            }}
            draggable
          />
        )}

        {/* Sub title (for layouts 1 and 3) */}
        {(layout === 1 || layout === 3) && (
          <Text
            x={textPosition[ratioStatus][2]}
            y={textPosition[ratioStatus][3]}
            width={width}
            text={subTitle.text}
            fontSize={subTitle.size}
            fill={subTitle.color}
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
              setTextPosition((prevPosition) => ({
                ...prevPosition,
                [ratioStatus]: [
                  prevPosition[ratioStatus][0],
                  prevPosition[ratioStatus][1],
                  e.target.x(),
                  e.target.y(),
                  prevPosition[ratioStatus][4],
                  prevPosition[ratioStatus][5],
                ],
              }));
            }}
            draggable
          />
        )}

        {/* Small title (for layouts 1 and 4) */}
        {(layout === 1 || layout === 4) && (
          <Text
            x={textPosition[ratioStatus][4]}
            y={textPosition[ratioStatus][5]}
            width={width}
            text={smallTitle.text}
            fontSize={smallTitle.size}
            fill={smallTitle.color}
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
              setTextPosition((prevPosition) => ({
                ...prevPosition,
                [ratioStatus]: [
                  prevPosition[ratioStatus][0],
                  prevPosition[ratioStatus][1],
                  prevPosition[ratioStatus][2],
                  prevPosition[ratioStatus][3],
                  e.target.x(),
                  e.target.y(),
                ],
              }));
            }}
            draggable
          />
        )}
      </Layer>
    </Stage>
  );
};

export default Canvas;
