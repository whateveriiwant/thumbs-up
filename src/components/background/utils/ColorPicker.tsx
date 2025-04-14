import React from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onRandomColor: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, onRandomColor }) => {
  return (
    <div className="flex flex-col mt-1">
      <p
        onClick={onRandomColor}
        className="text-sm text-[#bbbbbb] hover:cursor-pointer hover:text-[#A9A9A9] transition-colors duration-200"
      >
        무작위 색 선택
      </p>
      <div className="flex flex-row items-start justify-start mt-2">
        <HexColorPicker color={color} onChange={onChange} className="mr-2" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            <p className="text-md text-[#A9A9A9] mr-2">HEX</p>
            <input
              type="text"
              name="bgColor"
              value={color}
              onChange={(e) => {
                // Validate hex color format (optional)
                const value = e.target.value;
                if (value.startsWith("#") || value === "") {
                  onChange(value);
                } else {
                  onChange("#" + value);
                }
              }}
              className="focus:outline-none focus:border-[#A9A9A9] transition-colors duration-200 px-0.5 py-0.5 bg-white border border-[#D9D9D9] w-20 h-7 rounded-md text-center text-black font-light text-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
