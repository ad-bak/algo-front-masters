/**
 * Directions we can move in the maze
 * Example: If we're at position [5,5]
 * [-1, 0] means: move left  -> [4,5]
 * [1, 0]  means: move right -> [6,5]
 * [0, -1] means: move up    -> [5,4]
 * [0, 1]  means: move down  -> [5,6]
 */
const dir = [
    [-1, 0], // left
    [1, 0], // right
    [0, -1], // up
    [0, 1], // down
];

/**
 * Recursive function to walk through the maze
 *
 * Example maze:
 * ["xxxxxxxxxx x",  // 0
 *  "x        x x",  // 1
 *  "x        x x",  // 2
 *  "x xxxxxxxx x",  // 3
 *  "x          x",  // 4
 *  "x xxxxxxxxxx"]  // 5
 *
 * where:
 * 'x' is a wall
 * ' ' is a path we can walk on
 * start might be {x: 10, y: 0} (the top opening)
 * end might be {x: 1, y: 5} (the bottom opening)
 */
function walk(
    maze: string[], // The maze layout
    wall: string, // What character represents a wall (e.g., 'x')
    curr: Point, // Current position (e.g., {x: 10, y: 0})
    end: Point, // End position (e.g., {x: 1, y: 5})
    seen: boolean[][], // Tracks positions we've already visited
    path: Point[], // Stores the successful path
): boolean {
    // Check if we've walked outside the maze
    if (
        curr.x < 0 || // Went too far left
        curr.x >= maze[0].length || // Went too far right
        curr.y < 0 || // Went too far up
        curr.y >= maze.length // Went too far down
    ) {
        return false;
    }

    // Check if we've hit a wall
    // Example: if maze[2][3] === 'x', we hit a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // Check if we've reached the end
    // Example: if curr is {x: 1, y: 5} and end is {x: 1, y: 5}
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // Check if we've already been here
    // Example: if seen[2][3] is true, we've already visited this spot
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // Mark current spot as seen and add to path
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // Try all four directions
    // Example: if we're at [5,5], we'll try:
    // [4,5], [6,5], [5,4], [5,6]
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x, // New x position
                    y: curr.y + y, // New y position
                },
                end,
                seen,
                path,
            )
        ) {
            return true;
        }
    }

    // If no direction worked, remove this position from path
    path.pop();

    return false;
}

/**
 * Main function to solve the maze
 *
 * Example usage:
 * const maze = [
 *   "xxxxxxxxxx x",
 *   "x        x x",
 *   "x        x x",
 *   "x xxxxxxxx x",
 *   "x          x",
 *   "x xxxxxxxxxx"
 * ];
 * const result = solve(maze, "x", {x: 10, y: 0}, {x: 1, y: 5});
 */
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    // Initialize seen array with false values
    // Example: for a 6x12 maze, creates a 6x12 array of false
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
