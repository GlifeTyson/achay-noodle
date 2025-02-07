// import { useCallback, useRef, useEffect, useState } from "react";

// export const useScrollToSection = () => {
//   const headerRef = useRef<HTMLElement | null>(null);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [currentSection, setCurrentSection] = useState("");

//   const getCurrentSection = useCallback(() => {
//     const sections = document.querySelectorAll("section[id]");
//     const scrollPosition = window.pageYOffset + headerHeight;

//     let current = "";
//     sections.forEach((section) => {
//       const sectionEl = section as HTMLElement;
//       if (sectionEl) {
//         const sectionTop = sectionEl.offsetTop;
//         const sectionHeight = sectionEl.offsetHeight;

//         if (
//           scrollPosition >= sectionTop &&
//           scrollPosition < sectionTop + sectionHeight
//         ) {
//           current = section.id;
//         }
//       }
//     });

//     return current || "introduce"; // Default to "introduce" if no section is found
//   }, [headerHeight]);

//   useEffect(() => {
//     setHeaderHeight(headerRef.current?.offsetHeight || 0);

//     const handleScroll = () => {
//       setCurrentSection(getCurrentSection());
//     };

//     // Set initial current section
//     setCurrentSection(getCurrentSection());

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [headerHeight, getCurrentSection]);

//   const scrollToSection = useCallback(
//     (sectionId: string) => {
//       const element = document.getElementById(sectionId);

//       if (element) {
//         const elementPosition = element.offsetTop;
//         const offsetPosition = elementPosition - headerHeight;
//         window.scrollBy({
//           top: offsetPosition - window.pageYOffset,
//           behavior: "smooth",
//         });

//         setCurrentSection(sectionId);
//       }
//     },
//     [headerHeight]
//   );

//   console.log(currentSection, "currentSection");
//   return { scrollToSection, headerRef, currentSection };
// };
import { useCallback, useRef, useEffect, useState } from "react";

export const useScrollToSection = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSection, setCurrentSection] = useState("introduce");

  const getCurrentSection = useCallback(() => {
    const h1Elements = document.querySelectorAll("h1");
    const scrollPosition = window.pageYOffset + headerHeight;

    let current = "";
    h1Elements.forEach((h1) => {
      const h1El = h1 as HTMLElement;
      if (h1El) {
        const sectionTop = h1El.offsetTop;
        const nextH1 = h1El.nextElementSibling as HTMLElement;
        const sectionBottom = nextH1
          ? nextH1.offsetTop
          : document.body.scrollHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          current =
            h1El.id || h1El.innerText.toLowerCase().replace(/\s+/g, "-");
        }
      }
    });

    return current; // Default to "introduce" if no section is found
  }, [headerHeight]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return;
      setHeaderHeight(headerRef.current?.offsetHeight);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    const handleScroll = () => {
      setCurrentSection(getCurrentSection());
    };

    // Set initial current section
    setCurrentSection(getCurrentSection());

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [getCurrentSection]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const h1Element =
        document.querySelector(`h1#${sectionId}`) ||
        (document.querySelector(
          `h1:contains('${sectionId.replace(/-/g, " ")}')`
        ) as HTMLElement);

      if (h1Element) {
        const elementPosition = (h1Element as HTMLElement).offsetTop;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        console.log(sectionId);
        setCurrentSection(sectionId);
      }
    },
    [headerHeight]
  );

  return { scrollToSection, headerRef, currentSection };
};
