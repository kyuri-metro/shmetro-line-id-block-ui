export default function canvasTextMeasuring() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("Failed to create canvas context");
    }

    return {
        measureText(text: string, fontSize: number, fontFamily: string) {
            context.font = `${fontSize}px ${fontFamily}`;
            const metrics = context.measureText(text);
            return {
                width: metrics.width,
                actualBoundingBoxAscent: metrics.actualBoundingBoxAscent,
                actualBoundingBoxDescent: metrics.actualBoundingBoxDescent,
                actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
                actualBoundingBoxRight: metrics.actualBoundingBoxRight,
            };
        }
    };
}