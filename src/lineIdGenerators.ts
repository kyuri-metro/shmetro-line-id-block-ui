import { generateLineIdBlock2020Svg } from '@kyuri-metro/shmetro-line-id-block-2020-svg-generator'
import { generateLineIdBlock2020Type2Svg } from '@kyuri-metro/shmetro-line-id-block-2020-type-2-svg-generator'
import {
  generateLineIdBlock2025Svg,
  type LineIdBlockProps,
} from '@kyuri-metro/shmetro-line-id-block-2025-svg-generator'

export type { LineIdBlockProps } from '@kyuri-metro/shmetro-line-id-block-2025-svg-generator'
export { generateLineIdBlock2020Svg } from '@kyuri-metro/shmetro-line-id-block-2020-svg-generator'
export { generateLineIdBlock2020Type2Svg } from '@kyuri-metro/shmetro-line-id-block-2020-type-2-svg-generator'
export { generateLineIdBlock2025Svg } from '@kyuri-metro/shmetro-line-id-block-2025-svg-generator'

export type BadgeVersion = '2020' | '2020-type-2' | '2025'

type GenerateLineBadgeOptions = LineIdBlockProps & {
  version: BadgeVersion
}

export function generateLineBadgeSvg({ version, ...props }: GenerateLineBadgeOptions) {
  if (version === '2020') {
    return generateLineIdBlock2020Svg(props)
  }

  if (version === '2020-type-2') {
    return generateLineIdBlock2020Type2Svg(props)
  }

  return generateLineIdBlock2025Svg(props)
}
