/**
 * `br` render prop for `t.rich(key, { br: softBreak })`. The line break is
 * tuned for the desktop-width design, so below `sm` it renders a plain space
 * instead — otherwise `break-keep` still lets the manual break force an
 * extra, awkwardly short wrapped line on mobile.
 *
 * Returns an array (not a `<>Fragment</>`) — the `compat.ts` rich-text
 * renderer spreads array results flat into its node list, since React's
 * key-uniqueness check unwraps Fragments regardless of whether they (or their
 * children) already have keys, which would otherwise warn on every call site.
 * No explicit `key` here either: a message can contain multiple `<br></br>`,
 * so a static key would collide once spread flat — `Children.toArray` (called
 * on the full node list in `compat.ts`) assigns positional keys instead.
 */
export function softBreak() {
  return [
    <span className="sm:hidden">{' '}</span>,
    <br className="hidden sm:block" />,
  ]
}
