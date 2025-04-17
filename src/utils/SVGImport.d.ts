import React from 'react';
interface SVGComponentProps {
    src: string;
    width?: string | number;
    height?: string | number;
    fill?: string;
    className?: string;
    onClick?: () => void;
}
/**
 * A component to standardize how SVGs are used in the application.
 * This helps ensure consistent imports across development and production builds.
 */
declare const SVGComponent: React.FC<SVGComponentProps>;
export default SVGComponent;
