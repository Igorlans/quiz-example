export const inRange = (min: number, max: number, value: number) => {
    return min <= value && max >= value;
}