
/**
 * Scrolls the window to the top with a smooth animation
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Scrolls to a specific element by ID with a smooth animation
 * @param elementId The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Scrolls to a specific element with a delay (useful after page transitions)
 * @param elementId The ID of the element to scroll to
 * @param delay The delay in milliseconds before scrolling
 */
export const scrollToElementWithDelay = (elementId: string, delay: number = 100) => {
  setTimeout(() => {
    scrollToElement(elementId);
  }, delay);
};
