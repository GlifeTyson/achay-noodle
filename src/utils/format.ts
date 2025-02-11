export function classNameObject(classNameString: string) {
  if (!classNameString) return {};
  return classNameString.split(" ").reduce(
    (prev, className) => ({
      ...prev,
      [className]: true,
    }),
    {}
  );
}
