const NON_EMPTY_COLORS_COUNT = 4;

export const getColorIndex = (commits: number, maxCount: number) => {
  if (commits === 0) return 0;
  const countPerColor = maxCount / NON_EMPTY_COLORS_COUNT;
  const colorIndex = Math.ceil(commits / countPerColor);

  return colorIndex;
};
