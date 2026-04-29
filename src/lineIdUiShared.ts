type BadgePalette = {
  background: string
  foreground: string
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

export function parseLineNumber(lineNumber: string | number) {
  const lineString = String(lineNumber).trim()

  if (!/^\d{1,2}$/.test(lineString)) {
    return null
  }

  const lineId = Number(lineString)

  if (!Number.isInteger(lineId) || lineId < 0 || lineId > 99) {
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