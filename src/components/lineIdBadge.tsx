import { forwardRef, useEffect, useState } from "react";
import canvasTextMeasuring from "../canvasTextMeasuring.ts";

type TextLayout = {
  key: string;
  x: number;
  y: number;
  letterSpacing: number;
};

type LineIdBadgeProps = {
  lineId: number;
  height?: number;
  foreground: string;
  background: string;
};

const LineIdBadge = forwardRef<SVGSVGElement, LineIdBadgeProps>(
  function LineIdBadge({ lineId, height = 100, foreground, background }, ref) {
    const [textLayout, setTextLayout] = useState<TextLayout | null>(null);
    const isValidLineId = lineId >= 0 && lineId < 100;

    const isSingleDigit = lineId < 10;
    const baseWidth = isSingleDigit ? height * 0.85 : height;
    const fontSize = height * 0.9;
    const text = lineId.toString();
    const widthScale = lineId >= 20 && lineId % 10 !== 1 ? 0.9 : 1;
    const layoutKey = `${lineId}-${height}-${foreground}-${background}`;

    useEffect(() => {
      if (!isValidLineId) {
        return undefined;
      }

      const textMeasuring = canvasTextMeasuring();
      const frameId = requestAnimationFrame(() => {
        const measure = textMeasuring.measureText(text, fontSize, "Arial");
        const realWidth =
          measure.actualBoundingBoxRight + measure.actualBoundingBoxLeft;
        const expectedWidth =
          lineId == 11
            ? height * 0.65
            : lineId >= 20 && lineId % 10 === 1
                ? height * 0.74
                : height * 0.81;
        const scaledExpectedWidth = expectedWidth / widthScale;
        const letterSpacing =
          text.length > 1
            ? (scaledExpectedWidth - realWidth) / (text.length - 1)
            : 0;
        const totalLetterSpacing = letterSpacing * Math.max(0, text.length - 1);
        const centerX = lineId == 11 ? baseWidth * 0.49 : baseWidth / 2;
        const centerY = height / 2;
        const x =
          centerX / widthScale -
          (measure.actualBoundingBoxRight +
            totalLetterSpacing -
            measure.actualBoundingBoxLeft) /
            2;
        const y =
          centerY +
          (measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent) /
            2;

        setTextLayout({ key: layoutKey, x, y, letterSpacing });
      });

      return () => cancelAnimationFrame(frameId);
    }, [
      baseWidth,
      fontSize,
      height,
      isValidLineId,
      layoutKey,
      lineId,
      text,
      widthScale,
    ]);

    if (!isValidLineId) {
      return null;
    }

    return (
      <svg
        ref={ref}
        width={baseWidth}
        height={height}
        viewBox={`0 0 ${baseWidth} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width={baseWidth} height={height} fill={background} />
        {textLayout?.key === layoutKey && (
          <text
            x={textLayout.x}
            y={textLayout.y}
            fontFamily="Arial"
            fontSize={fontSize}
            fill={foreground}
            textRendering="geometricPrecision"
            letterSpacing={textLayout.letterSpacing}
            transform={`scale(${widthScale}, 1)`}
          >
            {text}
          </text>
        )}
      </svg>
    );
  },
);

export default LineIdBadge;
