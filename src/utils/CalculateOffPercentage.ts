
export const calculateOffPercentage = (price: number, discount: number) => {
    return Math.round((price - discount) / price * 100);
}