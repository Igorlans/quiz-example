export const fillArray = <T>(value: T, to: number): T[] => {
    const result: T[] = [];

    for (let i: number = 0; i < to; i++) {
      result.push(value);
    }
    return result;
  }