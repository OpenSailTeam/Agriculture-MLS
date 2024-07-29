import React, { useState } from "react";

export const MarkerIcon = (color: string, size: number) => {
  return (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 21.0001 21.0001"
      xmlns="http://www.w3.org/2000/svg"
      id="fi_14090313"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <g id="图层_x0020_1">
        <path d="m0 0h21v21h-21z" fill="none"></path>
        <path
          d="m10.5 1.31566c4.00193 0 7.24635 3.24419 7.24635 7.24612 0 3.07158-4.26833 8.37025-6.25329 10.6681-.25811.29896-.59807.45444-.99306.45444s-.73495-.15549-.99306-.45444c-1.98496-2.29787-6.25329-7.59654-6.25329-10.6681 0-4.00193 3.24442-7.24612 7.24635-7.24612zm0 4.36723c1.51734 0 2.74781 1.23047 2.74781 2.74797 0 1.51726-1.23047 2.74766-2.74781 2.74766s-2.74781-1.2304-2.74781-2.74766c0-1.5175 1.23047-2.74797 2.74781-2.74797z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};
