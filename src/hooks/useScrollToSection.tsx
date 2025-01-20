import { useCallback, useRef, useEffect, useState } from "react";

export const useScrollToSection = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight || 0);

    const handleScroll = () => {
      let current = "";
      const sections = document.querySelectorAll("section[id]"); // Select all sections with IDs

      sections.forEach((section) => {
        const sectionEl = section as HTMLElement;
        if (sectionEl) {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const scrollPosition = window.pageYOffset + headerHeight; // Account for header

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            current = section.id;
          }
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, [headerHeight]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);

      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollBy({
          top: offsetPosition - window.pageYOffset,
          behavior: "smooth",
        });

        // Update currentSection immediately after scrolling (optional)
        setCurrentSection(sectionId);
      }
    },
    [headerHeight]
  );

  console.log(currentSection, "currentSection");
  return { scrollToSection, headerRef, currentSection };
};
