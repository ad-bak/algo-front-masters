/**
 * Depth-First Search (DFS) on Weighted Adjacency List Implementation
 * Finds path between source and target nodes in a directed graph
 *
 * Example graph:
 *     >(1)<--->(4) ---->(5)
 *    /          |       /|
 * (0)     ------|------- |
 *    \   v      v        v
 *     >(2) --> (3) <----(6)
 *
 * Time Complexity: O(V + E) where V is vertices and E is edges
 * Space Complexity: O(V) for seen and path arrays
 */

function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // If we've already seen this node, don't process it again
    if (seen[curr]) {
        return false;
    }

    // Mark current node as seen and add to path
    seen[curr] = true;
    path.push(curr);

    // If we found the target node, we're done
    if (curr === needle) {
        return true;
    }

    // Get all edges for current node
    const list = graph[curr];

    // Try each edge/neighbor
    for (let i = 0; i < list.length; i++) {
        const edge = list[i];

        // Recursively walk to the neighbor
        // If we find the needle, propagate true back up
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // If we didn't find the needle in this path,
    // remove current node and return false
    path.pop();
    return false;
}

/**
 * Main function to initiate DFS
 *
 * @param graph - Weighted adjacency list representing the graph
 * @param source - Starting node
 * @param needle - Target node we're searching for
 * @returns Array representing path from source to needle, or null if no path exists
 */
export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    if (path.length === 0 || path[path.length - 1] !== needle) {
        return null;
    }

    return path;
}
