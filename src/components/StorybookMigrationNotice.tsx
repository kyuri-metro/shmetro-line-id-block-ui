type StorybookLink = {
  label: string
  href: string
}

type StorybookMigrationNoticeProps = {
  links: readonly StorybookLink[]
}

const storybookHome = 'https://kyuri-metro-storybook.umamichi.moe/'

export function StorybookMigrationNotice({ links }: StorybookMigrationNoticeProps) {
  return (
    <section className="storybook-migration-notice" role="note" aria-label="预览迁移说明">
      <p className="storybook-migration-notice-eyebrow">npm 包预览已迁至 Storybook</p>
      <p className="storybook-migration-notice-lead">
        交互预览请使用{' '}
        <a href={storybookHome} target="_blank" rel="noreferrer">
          kyuri-metro Storybook
        </a>
        ：可调参数、实时预览，并支持下载 SVG、PNG、JPG、WebP。
      </p>
      {links.length === 1 ? (
        <p className="storybook-migration-notice-cta">
          <a className="storybook-migration-notice-button" href={links[0].href} target="_blank" rel="noreferrer">
            在 Storybook 中打开{links[0].label}
          </a>
        </p>
      ) : (
        <ul className="storybook-migration-notice-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="storybook-migration-notice-footnote">本独立预览页面仍保持部署，但不再更新。</p>
    </section>
  )
}
