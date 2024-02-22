const useTheme = (theme: string) => {
  const isValidHexCode = (value: string) =>
    /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value);

  if (isValidHexCode(theme)) {
    const root = document.documentElement;
    root?.style.setProperty("--theme-color", theme);
  }
};

export default useTheme;
