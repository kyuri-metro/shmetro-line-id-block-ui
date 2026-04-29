This project uses @umamichi-ui/common-css as its UI foundation.

- For new UI work, import and rely on @umamichi-ui/common-css for shared tokens and base primitives before adding local CSS.
- Do not duplicate shared --site-* tokens, layout primitives like .page-shell/.panel, or common form and button styles inside the app unless the package cannot cover the need.
- Keep src/styles.css limited to project-specific presentation, such as SVG preview sizing or app-only control arrangements.
- If a pattern becomes reusable across projects, prefer moving it into @umamichi-ui/common-css instead of copying it here.