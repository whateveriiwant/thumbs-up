import React from "react";

// This is a helper to standardize SVG imports across different build environments
interface SVGComponentProps {
  src: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
  className?: string;
  onClick?: () => void;
  // Add any other common props you need
}

/**
 * A component to standardize how SVGs are used in the application.
 * This helps ensure consistent imports across development and production builds.
 */
const SVGComponent: React.FC<SVGComponentProps> = ({ src, ...props }) => {
  return <img src={src} alt="" {...(props as any)} />;
};

export default SVGComponent;
