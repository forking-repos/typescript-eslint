/**
 * Scroll the target element into view if it is not already visible.
 */
export function scrollIntoViewIfNeeded(target: Element): void {
  const rect = target.getBoundingClientRect();
  const isBelow = rect.top < 0;
  const isAbove = rect.bottom > window.innerHeight;
  if ((isAbove && isBelow) || rect.height > window.innerHeight) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
    return;
  }
  // Target is outside the viewport from the bottom
  if (isAbove) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    return;
  }
  // Target is outside the view from the top
  if (isBelow) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    return;
  }
}
