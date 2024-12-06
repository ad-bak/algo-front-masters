/**
 * Dijkstra's Algorithm Implementation using Adjacency List
 * Finds shortest path between source and sink nodes in a weighted graph
 *
 * Example graph:
 *      (1) --- (4) ---- (5)
 *    /  |       |       /|
 * (0)   | ------|------- |
 *    \  |/      |        |
 *      (2) --- (3) ---- (6)
 *
 * Time Complexity: O((V + E) * log V) where V is vertices and E is edges
 * Space Complexity: O(V) for seen, prev and dists arrays
 */

/**
 * Checks if there are any unvisited nodes that are reachable
 */
function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

/**
 * Gets the unvisited node with the lowest distance
 */
function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen = new Array(arr.length).fill(false);
    const prev = new Array(arr.length).fill(-1);
    const dists = new Array(arr.length).fill(Infinity);

    // Distance to source is 0
    dists[source] = 0;

    // While there are unvisited nodes with finite distances
    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true;

        const adjs = arr[curr];
        // Process all adjacent nodes
        for (let i = 0; i < adjs.length; ++i) {
            const edge = adjs[i];

            // Skip if we've already seen this node
            if (seen[edge.to]) {
                continue;
            }

            // Calculate new potential distance
            const dist = dists[curr] + edge.weight;

            // If new distance is shorter, update it
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    // If we can't reach sink, return empty path
    if (prev[sink] === -1) {
        return [];
    }

    // Reconstruct the path
    const out: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }
    out.push(source);

    return out.reverse();
}
