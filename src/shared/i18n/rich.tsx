/**
 * `br` render prop for `t.rich(key, { br: softBreak })`. The line break is
 * tuned for the desktop-width design, so below `sm` it renders a plain space
 * instead — otherwise `break-keep` still lets the manual break force an
 * extra, awkwardly short wrapped line on mobile.
 */
export function softBreak() {
  return (
    <>
      <span className="sm:hidden"> </span>
      <br className="hidden sm:block" />
    </>
  )
}
