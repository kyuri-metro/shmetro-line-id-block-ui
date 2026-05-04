import { SHMETRO_LINE_COLORS } from '@kyuri-metro/shmetro-palette'

type BadgePalette = {
  background: string
  foreground: string
}

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

  const palette = SHMETRO_LINE_COLORS[parsed.lineId]

  if (!palette) {
    return null
  }

  return {
    background: palette.background,
    foreground: palette.foreground,
  }
}