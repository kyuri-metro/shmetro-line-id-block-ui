import canvasTextMeasuring from './canvasTextMeasuring'

export type BadgeVersion = '2020' | '2024'

type BadgePalette = {
  background: string
  foreground: string
}

type TextLayout = {
  x: number
  y: number
  fontSize: number
  letterSpacing?: number
  transform?: string
}

type BadgeLayout = {
  width: number
  height: number
  text: string
  textLayout: TextLayout
}

type GenerateLineBadgeOptions = {
  version: BadgeVersion
  lineNumber: string | number
  background?: string
  foreground?: string
}

const SHMETRO_LINE_COLORS: Record<number, string> = {
  1: '#E3002B',
  2: '#8CC220',
  3: '#FCD600',
  4: '#461D84',
  5: '#944D9A',
  6: '#D40068',
  7: '#ED6F00',
  8: '#0094D8',
  9: '#87CAED',
  10: '#C6AFD4',
  11: '#871C2B',
  12: '#007B61',
  13: '#E999C0',
  14: '#626020',
  15: '#BCA886',
  16: '#98D1C0',
  17: '#BC796F',
  18: '#C4984F',
  19: '#F5AB78',
  20: '#009F65',
  21: '#F7AF00',
  22: '#5F376F',
  23: '#B0D478',
}

const WHITE_TEXT_LINES = new Set([1, 4, 5, 6, 8, 11, 12, 14, 17, 20, 22])
const FALLBACK_BACKGROUND = '#666666'
const FALLBACK_FOREGROUND = '#000000'

function parseLineNumber(lineNumber: string | number) {
  const lineString = String(lineNumber).trim()

  if (!/^\d{1,2}$/.test(lineString)) {
    return null
  }

  const lineId = Number(lineString)

  if (!Number.isInteger(lineId) || lineId < 1 || lineId > 29) {
    return null
  }

  return {
    lineId,
    lineString,
  }
}

export function getShanghaiMetroPalette(lineNumber: string | number): BadgePalette | null {
  const parsed = parseLineNumber(lineNumber)

  if (!parsed) {
    return null
  }

  const background = SHMETRO_LINE_COLORS[parsed.lineId]

  if (!background) {
    return null
  }

  return {
    background,
    foreground: WHITE_TEXT_LINES.has(parsed.lineId) ? '#ffffff' : '#000000',
  }
}

function getBadgePalette(lineNumber: string | number, foreground?: string, background?: string) {
  const standardPalette = getShanghaiMetroPalette(lineNumber)

  return {
    background: background ?? standardPalette?.background ?? FALLBACK_BACKGROUND,
    foreground: foreground ?? standardPalette?.foreground ?? FALLBACK_FOREGROUND,
  }
}

function get2020Layout(lineId: number, lineString: string): BadgeLayout {
  const layoutMap = {
    single_1: {
      width: 86,
      textLayout: { x: 7.5, y: 88.8, fontSize: 104 },
    },
    single_4: {
      width: 86,
      textLayout: { x: 14.9, y: 88.8, fontSize: 104 },
    },
    double_11: {
      width: 105,
      textLayout: { x: 3.6, y: 88.6, fontSize: 104, letterSpacing: -10.2 },
    },
    double_1x: {
      width: 105,
      textLayout: { x: -3.3, y: 88.6, fontSize: 104, letterSpacing: -14 },
    },
    double_21: {
      width: 105,
      textLayout: { x: 7.4, y: 88.6, fontSize: 104, letterSpacing: -9.5 },
    },
    double_2x: {
      width: 105,
      textLayout: { x: 0.7, y: 86.8, fontSize: 102, letterSpacing: -5.2, transform: 'scale(.98 1)' },
    },
  } as const

  if (lineString === '1') {
    return { width: layoutMap.single_1.width, height: 100, text: lineString, textLayout: layoutMap.single_1.textLayout }
  }

  if (lineId >= 2 && lineId <= 9) {
    return { width: layoutMap.single_4.width, height: 100, text: lineString, textLayout: layoutMap.single_4.textLayout }
  }

  if (lineString === '11') {
    return { width: layoutMap.double_11.width, height: 100, text: lineString, textLayout: layoutMap.double_11.textLayout }
  }

  if (lineId >= 10 && lineId <= 19) {
    return { width: layoutMap.double_1x.width, height: 100, text: lineString, textLayout: layoutMap.double_1x.textLayout }
  }

  if (lineString === '21') {
    return { width: layoutMap.double_21.width, height: 100, text: lineString, textLayout: layoutMap.double_21.textLayout }
  }

  return { width: layoutMap.double_2x.width, height: 100, text: lineString, textLayout: layoutMap.double_2x.textLayout }
}

function get2024Layout(lineId: number, lineString: string): BadgeLayout {
  const height = 100
  const isSingleDigit = lineId < 10
  const width = isSingleDigit ? 85 : 100
  const fontSize = height * 0.9
  const widthScale = lineId >= 20 && lineId % 10 !== 1 ? 0.9 : 1
  const measureText = canvasTextMeasuring().measureText(lineString, fontSize, 'Arial')
  const realWidth = measureText.actualBoundingBoxRight + measureText.actualBoundingBoxLeft
  const expectedWidth =
    lineId === 11 ? 65 : lineId >= 20 && lineId % 10 === 1 ? 74 : 81
  const scaledExpectedWidth = expectedWidth / widthScale
  const letterSpacing =
    lineString.length > 1 ? (scaledExpectedWidth - realWidth) / (lineString.length - 1) : 0
  const totalLetterSpacing = letterSpacing * Math.max(0, lineString.length - 1)
  const centerX = lineId === 11 ? width * 0.49 : width / 2
  const centerY = height / 2
  const x =
    centerX / widthScale -
    (measureText.actualBoundingBoxRight + totalLetterSpacing - measureText.actualBoundingBoxLeft) / 2
  const y = centerY + (measureText.actualBoundingBoxAscent - measureText.actualBoundingBoxDescent) / 2

  return {
    width,
    height,
    text: lineString,
    textLayout: {
      x,
      y,
      fontSize,
      letterSpacing,
      transform: widthScale === 1 ? undefined : `scale(${widthScale} 1)`,
    },
  }
}

function getBadgeLayout(version: BadgeVersion, lineNumber: string | number) {
  const parsed = parseLineNumber(lineNumber)

  if (!parsed) {
    return null
  }

  return version === '2020'
    ? get2020Layout(parsed.lineId, parsed.lineString)
    : get2024Layout(parsed.lineId, parsed.lineString)
}

function buildSvg(layout: BadgeLayout, innerContent: string) {
  return `<svg width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}" xmlns="http://www.w3.org/2000/svg">${innerContent}</svg>`
}

function formatLetterSpacing(letterSpacing?: number) {
  if (letterSpacing === undefined) {
    return ''
  }

  return ` letter-spacing="${letterSpacing}px"`
}

function formatTransform(transform?: string) {
  if (!transform) {
    return ''
  }

  return ` transform="${transform}"`
}

export function generateLineBadgeSvg({
  version,
  lineNumber,
  foreground,
  background,
}: GenerateLineBadgeOptions) {
  const layout = getBadgeLayout(version, lineNumber)

  if (!layout) {
    return ''
  }

  const palette = getBadgePalette(lineNumber, foreground, background)
  const innerContent = `<rect x="0" y="0" width="${layout.width}" height="${layout.height}" fill="${palette.background}"/><text x="${layout.textLayout.x}" y="${layout.textLayout.y}" fill="${palette.foreground}" font-family="Arial" font-size="${layout.textLayout.fontSize}px"${formatLetterSpacing(layout.textLayout.letterSpacing)}${formatTransform(layout.textLayout.transform)}>${layout.text}</text>`

  return buildSvg(layout, innerContent)
}
