# Logic Flow Mapper

A React application for building nested IF-THEN condition trees with real-time cycle detection.

## Tech Stack
- **React 18** — UI & state
- **CSS Variables** — theming (warm cream/terracotta editorial palette)
- **Google Fonts** — Syne (display) + DM Sans (body) + DM Mono (code)
- No external UI libraries — 100% custom components

## Setup & Run

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Project Structure

```
/
├── index.html               # Vite entry file
├── vite.config.js           # Vite configuration
└── src/
    ├── index.jsx            # React root injection point
    ├── index.css            # Global styles, CSS variables, animations
    ├── App.jsx              # Root layout, state wiring
    ├── hooks/
    │   └── useNodes.js      # All node state management
    ├── utils/
    │   └── graph.js         # DFS cycle detection + simulation trace
    ├── icons/
    │   └── index.jsx        # Standardized Lucide + Custom SVG module
    └── components/
        ├── Toolbar.jsx      # Top bar with actions and status
        ├── Sidebar.jsx      # Node registry panel
        ├── NodeCard.jsx     # Recursive node component
        ├── SimulatePanel.jsx# Logic trace output
        └── EmptyState.jsx   # Empty canvas illustration
```

## Architecting State: Nested vs. Normalized Data Structures

When dealing with infinite tree structures, developers often default to **Nested Objects** (e.g., a node contains an array of full child objects, which contain children objects, etc.). This application deliberately rejects that pattern in favor of a **Normalized Dictionary** `nodes: { [id]: Node }` and a flat array of `roots: [id]`.

### Why Normalized?
1. **O(1) Updates:** Modifying a deeply nested condition string under a nested state requires expensive recursive deep-cloning (`JSON.parse(JSON.stringify(tree))`) in React. With a dictionary pattern, updating node `N24` only requires shallow cloning the top-level dictionary: `{ ...prev, [id]: { ...prev[id], condition } }`.
2. **Simplified Arbitrary Linking:** Because nodes can dynamically link to nodes outside their immediate tree branch (`linkedTo`), a normalized structure ensures we aren't duplicating node objects. 
3. **Pointers, Not Deep Copies:** Cross-links and child arrays only store ID strings. React recursively maps over these IDs using the `<NodeCard id={childId} />` pattern, resolving the data in real-time without bulky props.

## Algorithm: Cycle Detection via Graph Theory

Since users can link any node to any other node (creating arbitrary graphs instead of pure trees), the app must mathematically prevent infinite loops. We evaluate the logic map as a **Directed Graph**.

The cycle detection algorithm relies on a **Depth-First Search (DFS)** powered by a 3-Color graph marking system executing in **O(V + E)** time:
1. **Unvisited (Color 0)**: The node has not been checked.
2. **On-Stack (Color 1)**: The node is currently in the active recursive traversal.
3. **Explored (Color 2)**: The node and all possible descendants have been proven safe.

**How a Loop is Caught:** 
When the recursive DFS crawls through an edge and hits a node that is currently marked **Color 1 (On-Stack)**, it intercepts a **"back-edge"**. It immediately proves the path has wrapped back onto itself, capturing the offending nodes and locking down the "Simulate" feature until the broken link is resolved by the user.

## Features
- Infinite nesting (recursive NodeCard)
- Cross-node linking
- Real-time cycle detection on every state change
- Cycle highlighting (nodes + edges)
- Logic simulation trace
- Expand/collapse all
- Node registry sidebar
# logic-flow-mapper
