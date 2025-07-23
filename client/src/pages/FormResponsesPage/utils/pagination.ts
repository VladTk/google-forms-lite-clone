export const getValidIndexFromParam = (
  param: string | undefined,
  total: number,
): number => {
  const index = Number(param);
  if (isNaN(index) || index < 1 || index > total) {
    return 0;
  }
  return index - 1;
};

export const indexToParam = (index: number): string => (index + 1).toString();
