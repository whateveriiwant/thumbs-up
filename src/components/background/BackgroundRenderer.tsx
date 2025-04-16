import { FullBackground } from "./FullBackground";

interface BackgroundRendererProps {
  bg: 1 | 2 | 3 | 4;
  bgImage: HTMLImageElement | undefined;
  bgColor: string;
  bgGradientStart: string;
  bgGradientEnd: string;
  userBgImage: HTMLImageElement | undefined;
  bgLink: string;
  index: number;
}

export const BackgroundRenderer = ({
  bg,
  bgImage,
  bgColor,
  bgGradientStart,
  bgGradientEnd,
  bgLink,
}: BackgroundRendererProps) => {
  return (
    <>
      {bg === 1 && <FullBackground style={{ backgroundImage: `url(${bgImage?.src})` }} />}
      {bg === 2 && <FullBackground style={{ backgroundColor: bgColor }} />}
      {bg === 3 && (
        <FullBackground style={{ background: `linear-gradient(to right, ${bgGradientStart}, ${bgGradientEnd})` }} />
      )}
      {bg === 4 && bgLink === "" && <FullBackground style={{ backgroundImage: `url(${bgImage?.src})` }} />}
      {bg === 4 && bgLink !== "" && <FullBackground style={{ backgroundImage: `url(${bgLink})` }} />}
    </>
  );
};
