import { useCallback } from "react";

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    const header = document.getElementsByTagName("header");

    if (element && header) {
      const elementPosition = element.getBoundingClientRect().top;
      const headerHeight = header[0].offsetHeight;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return scrollToSection;
};
