import { useState, useCallback } from 'react';

let counter = 0;
const nextId = () => 'N' + String(++counter).padStart(2, '0');

const createNode = (parentId = null) => ({
  id: nextId(),
  condition: '',
  children: [],
  linkedTo: null,
  collapsed: false,
  parentId,
  createdAt: Date.now(),
});

export function useNodes() {
  const [nodes, setNodes] = useState({});
  const [roots, setRoots] = useState([]);

  /** Add a root-level node */
  const addRoot = useCallback(() => {
    const node = createNode(null);
    setNodes(prev => ({ ...prev, [node.id]: node }));
    setRoots(prev => [...prev, node.id]);
    return node.id;
  }, []);

  /** Add a child node under parentId */
  const addChild = useCallback((parentId) => {
    const node = createNode(parentId);
    setNodes(prev => ({
      ...prev,
      [node.id]: node,
      [parentId]: {
        ...prev[parentId],
        children: [...prev[parentId].children, node.id],
        collapsed: false,
      },
    }));
    return node.id;
  }, []);

  /** Update a node's condition text */
  const updateCondition = useCallback((id, value) => {
    setNodes(prev => ({
      ...prev,
      [id]: { ...prev[id], condition: value },
    }));
  }, []);

  /** Delete a node and all its descendants, clean up stale links */
  const deleteNode = useCallback((id) => {
    setNodes(prev => {
      function collectAll(nid) {
        const n = prev[nid];
        if (!n) return [];
        return [nid, ...n.children.flatMap(c => collectAll(c))];
      }
      const toDelete = new Set(collectAll(id));
      const next = { ...prev };

      // Detach from parent
      const pid = prev[id]?.parentId;
      if (pid && next[pid]) {
        next[pid] = { ...next[pid], children: next[pid].children.filter(c => !toDelete.has(c)) };
      }

      // Clear stale links pointing to deleted nodes
      Object.keys(next).forEach(nid => {
        if (!toDelete.has(nid) && next[nid] && toDelete.has(next[nid].linkedTo)) {
          next[nid] = { ...next[nid], linkedTo: null };
        }
      });

      toDelete.forEach(nid => delete next[nid]);
      return next;
    });
    setRoots(prev => prev.filter(r => r !== id));
  }, []);

  /** Set or clear a link */
  const setLink = useCallback((fromId, toId) => {
    setNodes(prev => ({
      ...prev,
      [fromId]: { ...prev[fromId], linkedTo: toId || null },
    }));
  }, []);

  /** Toggle collapsed state */
  const toggleCollapse = useCallback((id) => {
    setNodes(prev => ({
      ...prev,
      [id]: { ...prev[id], collapsed: !prev[id].collapsed },
    }));
  }, []);

  const expandAll = useCallback(() => {
    setNodes(prev => {
      const next = {};
      Object.keys(prev).forEach(id => { next[id] = { ...prev[id], collapsed: false }; });
      return next;
    });
  }, []);

  const collapseAll = useCallback(() => {
    setNodes(prev => {
      const next = {};
      Object.keys(prev).forEach(id => { next[id] = { ...prev[id], collapsed: true }; });
      return next;
    });
  }, []);

  return {
    nodes, roots,
    addRoot, addChild,
    updateCondition,
    deleteNode,
    setLink,
    toggleCollapse,
    expandAll, collapseAll,
  };
}
