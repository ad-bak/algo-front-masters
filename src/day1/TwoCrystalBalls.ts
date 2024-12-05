/**
 * Two Crystal Balls Problem
 * Given two crystal balls that will break if dropped from high enough distance,
 * determine the exact spot in which it will break in the most optimized way.
 *
 * @param breaks - boolean array where true indicates the ball will break at that height
 * @returns the index at which the ball breaks, or -1 if it never breaks
 * Time Complexity: O(√n)
 */
export default function two_crystal_balls(breaks: boolean[]): number {
    // Calculate the optimal jump amount using square root
    // This gives us O(√n) complexity instead of O(n) or O(log n)
    // Example: if breaks is 100, jmpAmount is 10
    console.log(breaks);
    const jmpAmount = Math.floor(Math.sqrt(breaks.length));

    // Start at the first jump point (example: 10)
    let i = jmpAmount;

    // First phase: Jump by sqrt(n) until we find a breaking point
    // This lets us use the first ball to find the approximate breaking point
    for (; i < breaks.length; i += jmpAmount) {
        if (breaks[i]) {
            break; // Found the first breaking point
        }
    }

    // Go back one jump to start the linear search
    // We know the breaking point must be between i-jmpAmount and i
    i -= jmpAmount;

    // Second phase: Linear search from the last safe jump point
    // Use the second ball to find the exact breaking point
    // j tracks how many steps we've taken, i tracks the actual index
    for (let j = 0; j <= jmpAmount && i < breaks.length; ++j, ++i) {
        if (breaks[i]) {
            return i; // Found the exact breaking point
        }
    }

    // If we never found a breaking point, return -1
    return -1;
}
