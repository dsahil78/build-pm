/**
 * Spam honeypot. Visually hidden + off-screen + skipped by keyboard and AT, so
 * real users never fill it — but naive bots that fill every field will. The API
 * routes drop any submission where `company_url` is non-empty.
 *
 * Must be rendered INSIDE the <form> so it's part of form.elements.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="company_url">Company URL (leave this blank)</label>
      <input
        type="text"
        id="company_url"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
