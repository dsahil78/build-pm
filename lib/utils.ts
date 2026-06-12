/** Join truthy class names into a space-separated string (no conflict resolution). */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
