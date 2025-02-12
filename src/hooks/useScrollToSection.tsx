import { useCallback, useLayoutEffect, useRef, useState } from "react";

export const useScrollToSection = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSection, setCurrentSection] = useState("");

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const getCurrentSection = useCallback(() => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.pageYOffset + headerHeight;

    let current = "";
    sections.forEach((section) => {
      const sectionEl = section as HTMLElement;
      if (sectionEl) {
        const sectionTop = sectionEl.offsetTop;
        const sectionHeight = sectionEl.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          current = section.id;
        }
      }
    });

    return current || "introduce"; // Default to "introduce" if no section is found
  }, [headerHeight]);

  useLayoutEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        setCurrentSection(getCurrentSection());
      }, 150); // Chờ 150ms sau khi scroll kết thúc
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [getCurrentSection]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);

      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Lắng nghe sự kiện scroll hoàn tất
        const handleScrollEnd = () => {
          setCurrentSection(sectionId);
          window.removeEventListener("scrollend", handleScrollEnd);
        };

        if ("onscrollend" in window) {
          // Trình duyệt hỗ trợ scrollend
          window.addEventListener("scrollend", handleScrollEnd);
        } else {
          // Trình duyệt không hỗ trợ → Dùng timeout mô phỏng
          setTimeout(() => {
            setCurrentSection(sectionId);
          }, 600); // Khoảng thời gian đủ để scroll kết thúc
        }
      }
    },
    [headerHeight]
  );

  return { scrollToSection, headerRef, currentSection };
};
