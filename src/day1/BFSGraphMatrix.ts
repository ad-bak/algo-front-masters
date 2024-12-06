/**
 * Breadth-First Search (BFS) on Weighted Adjacency Matrix Implementation
 * Finds shortest path between source and target nodes in an undirected graph
 *
 * Example matrix:
 * [
 *   [0, 1, 0, 0],  // Node 0 connects to 1
 *   [1, 0, 1, 0],  // Node 1 connects to 0 and 2
 *   [0, 1, 0, 1],  // Node 2 connects to 1 and 3
 *   [0, 0, 1, 0]   // Node 3 connects to 2
 * ]
 *
 * Path from 0 to 3: [0, 1, 2, 3]
 *
 * Time Complexity: O(V^2) where V is number of vertices
 * Space Complexity: O(V) for seen, prev, and queue arrays
 */

/**
 * Performs BFS traversal on adjacency matrix to find path
 *
 * @param graph - Weighted adjacency matrix representing the graph
 * @param source - Starting node
 * @param needle - Target node we're searching for
 * @returns Array representing path from source to needle, or null if no path exists
 */
export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    // Initialize tracking arrays
    // seen: keeps track of visited nodes to avoid cycles
    // prev: stores the previous node in the path to each node
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    // Mark source as seen and add to queue
    // Example: if source is 0, seen[0] = true and queue = [0]
    seen[source] = true;
    const q: number[] = [source];

    // Process nodes in queue until empty
    do {
        // Get next node to process
        // Example: if queue is [0, 1], curr becomes 0
        const curr = q.shift() as number;

        // If we found target node, exit loop
        // Path reconstruction happens later
        if (curr === needle) {
            break;
        }

        // Get all adjacent nodes for current node
        // adjs is array where adjs[i] > 0 means edge exists to node i
        const adjs = graph[curr];

        // Check all possible connections
        for (let i = 0; i < graph.length; i++) {
            // Skip if no edge exists (weight is 0)
            // Example: if adjs[i] is 0, nodes aren't connected
            if (adjs[i] === 0) {
                continue;
            }

            // Skip if we've already seen this node
            // Prevents cycles and redundant processing
            if (seen[i]) {
                continue;
            }

            // Mark node as seen, record previous node, and add to queue
            // Example: for node 2, seen[2] = true, prev[2] = curr, queue.push(2)
            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }
    } while (q.length);

    // If needle wasn't found (prev[needle] is still -1), return null
    // This means there's no path from source to needle
    if (prev[needle] === -1) {
        return null;
    }

    // Reconstruct path from needle back to source
    // Example: if path is 0->1->2->3, we build [3,2,1] then add 0
    let curr = needle;
    const out: number[] = [];

    // Follow prev pointers until we reach source
    // prev[curr] will be -1 when we reach source
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    // Add source to start and reverse path to get correct order
    // Example: [3,2,1] becomes [0,1,2,3]
    return [source].concat(out.reverse());
}

/**
 * Example execution for graph:
 * [
 *   [0, 1, 0, 0],
 *   [1, 0, 1, 0],
 *   [0, 1, 0, 1],
 *   [0, 0, 1, 0]
 * ]
 *
 * Finding path from 0 to 3:
 * 1. Start at 0: seen=[t,f,f,f], q=[0]
 * 2. Process 0: Add 1 to queue
 *    seen=[t,t,f,f], q=[1], prev=[-1,0,-1,-1]
 * 3. Process 1: Add 2 to queue
 *    seen=[t,t,t,f], q=[2], prev=[-1,0,1,-1]
 * 4. Process 2: Add 3 to queue
 *    seen=[t,t,t,t], q=[3], prev=[-1,0,1,2]
 * 5. Process 3: Found needle!
 * 6. Reconstruct path: [0,1,2,3]
 */
