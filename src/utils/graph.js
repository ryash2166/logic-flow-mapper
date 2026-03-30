export function detectCycles(nodes) {
  const color = {};
  const cycleEdges = new Set();   
  const cycleNodes = new Set();   // node ids in any cycle

  Object.keys(nodes).forEach(id => (color[id] = 0));

  // Adjacency: tree children + linkedTo edge
  function adj(id) {
    const n = nodes[id];
    if (!n) return [];
    const result = [...n.children];
    if (n.linkedTo && nodes[n.linkedTo]) result.push(n.linkedTo);
    return result;
  }

  function dfs(id, path) {
    color[id] = 1; // on current stack

    for (const next of adj(id)) {
      if (!nodes[next]) continue;

      if (color[next] === 1) {
        // Back-edge cycle detected
        cycleEdges.add(`${id}→${next}`);

        // Mark all nodes in the cycle path
        const start = path.indexOf(next);
        if (start !== -1) {
          for (let i = start; i < path.length; i++) cycleNodes.add(path[i]);
        }
        cycleNodes.add(id);
        cycleNodes.add(next);
      } else if (color[next] === 0) {
        dfs(next, [...path, id]);
      }
    }

    color[id] = 2; // fully explored
  }

  Object.keys(nodes).forEach(id => {
    if (color[id] === 0) dfs(id, []);
  });

  return { cycleEdges, cycleNodes };
}

export function simulateTrace(nodes, roots) {
  const lines = [];
  const visited = new Set();

  function walk(id, depth) {
    if (!nodes[id]) return;
    if (visited.has(id)) {
      lines.push({ type: 'ref', depth, text: `↩ already evaluated: ${id}` });
      return;
    }
    visited.add(id);
    const n = nodes[id];

    lines.push({ type: 'if', depth, text: n.condition || '(no condition)' });

    if (n.children.length > 0) {
      lines.push({ type: 'then', depth, text: 'THEN' });
      n.children.forEach(cid => walk(cid, depth + 1));
    }

    if (n.linkedTo && nodes[n.linkedTo]) {
      lines.push({ type: 'link', depth, text: `→ continue at ${n.linkedTo}` });
      walk(n.linkedTo, depth + 1);
    }

    if (!n.children.length && !n.linkedTo) {
      lines.push({ type: 'end', depth, text: 'PASS' });
    }
  }

  roots.forEach(id => walk(id, 0));
  return lines;
}
