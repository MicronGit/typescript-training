type Condition = Record<string, any>;

export const filterByCondition = <T>(inputArray: T[], condition: Condition): T[] => {
  if (!Array.isArray(inputArray)) {
    throw new Error(
      'Invalid input: inputArray must be an array and condition must be a non-null object'
    );
  }

  const matchesCondition = (obj: Record<string, any>, condition: Condition): boolean => {
    return Object.entries(condition).every(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return matchesCondition(obj[key], value);
      }
      return obj[key] === value;
    });
  };

  return inputArray.filter(item => matchesCondition(item as Record<string, any>, condition));
};
