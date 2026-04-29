import { generateLineIdBlock2020Svg } from '@kyuri-metro/shmetro-line-id-block-2020-svg-generator'
import {
  generateLineIdBlock2024Svg,
  type LineIdBlockProps,
} from '@kyuri-metro/shmetro-line-id-block-2024-svg-generator'

export type { LineIdBlockProps } from '@kyuri-metro/shmetro-line-id-block-2024-svg-generator'
export { generateLineIdBlock2020Svg } from '@kyuri-metro/shmetro-line-id-block-2020-svg-generator'
export { generateLineIdBlock2024Svg } from '@kyuri-metro/shmetro-line-id-block-2024-svg-generator'

export type BadgeVersion = '2020' | '2024'

type GenerateLineBadgeOptions = LineIdBlockProps & {
  version: BadgeVersion
}

export function generateLineBadgeSvg({ version, ...props }: GenerateLineBadgeOptions) {
  return version === '2020' ? generateLineIdBlock2020Svg(props) : generateLineIdBlock2024Svg(props)
}
