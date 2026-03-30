import { useState, useMemo } from 'react';
import { useNodes } from './hooks/useNodes';
import { detectCycles } from './utils/graph';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import NodeCard from './components/NodeCard';
import SimulatePanel from './components/SimulatePanel';
import EmptyState from './components/EmptyState';
import { IconLoopAlert, IconAddRoot } from './icons';
import './index.css';

export default function App() {
  const {
    nodes, roots,
    addRoot, addChild,
    updateCondition, deleteNode,
    setLink, toggleCollapse,
    expandAll, collapseAll,
  } = useNodes();

  const [simOpen, setSimOpen] = useState(false);

  const { cycleEdges, cycleNodes } = useMemo(
    () => detectCycles(nodes),
    [nodes]
  );

  const hasCycle = cycleEdges.size > 0;
  const nodeCount = Object.keys(nodes).length;

  function handleAddRoot() {
    addRoot();
    setSimOpen(false);
  }

  function handleDeleteNode(id) {
    deleteNode(id);
    setSimOpen(false);
  }

  function handleSimulate() {
    if (!hasCycle && nodeCount > 0) setSimOpen(v => !v);
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflow: 'hidden',
      background: 'var(--cream)',
    }}>

      <Toolbar
        hasCycle={hasCycle}
        nodeCount={nodeCount}
        simOpen={simOpen}
        onAddRoot={handleAddRoot}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        onSimulate={handleSimulate}
      />

      {hasCycle && (
        <div style={{
          background: '#FBF0EC',
          borderBottom: '1px solid #E8896A44',
          padding: '8px 24px',
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 12, color: '#9B4828',
          animation: 'fadeIn 0.2s ease',
        }}>
          <IconLoopAlert />
          <strong>Logic loop detected.</strong>
          &nbsp;Nodes involved in cycles are highlighted in orange. Remove the offending link to continue.
          &nbsp;The Simulate button is disabled until all cycles are resolved.
        </div>
      )}

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar nodes={nodes} roots={roots} cycleNodes={cycleNodes} />

        <main style={{
          flex: 1, overflowY: 'auto',
          padding: nodeCount === 0 ? 0 : '24px',
          background: '#F2EEE8',
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #D9CEBC 1px, transparent 0)
          `,
          backgroundSize: '24px 24px',
        }}>
          {nodeCount === 0 ? (
            <EmptyState onAddRoot={handleAddRoot} />
          ) : (
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              {roots.map(id => (
                <NodeCard
                  key={id}
                  id={id}
                  nodes={nodes}
                  cycleNodes={cycleNodes}
                  cycleEdges={cycleEdges}
                  onUpdate={updateCondition}
                  onAddChild={addChild}
                  onDelete={handleDeleteNode}
                  onLink={setLink}
                  onRemoveLink={id => setLink(id, null)}
                  onToggleCollapse={toggleCollapse}
                  depth={0}
                />
              ))}

              <button
                onClick={handleAddRoot}
                style={{
                  width: '100%', marginTop: 8,
                  padding: '12px',
                  background: 'transparent',
                  border: '1.5px dashed #C4B89E',
                  borderRadius: 12, cursor: 'pointer',
                  color: '#9E9181', fontSize: 13,
                  fontFamily: 'var(--font-body)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EDE8DF'; e.currentTarget.style.borderColor = '#9E9181'; e.currentTarget.style.color = '#6B5E4E'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#C4B89E'; e.currentTarget.style.color = '#9E9181'; }}
              >
                <IconAddRoot />
                Add another root node
              </button>
            </div>
          )}
        </main>

        {simOpen && (
          <SimulatePanel
            nodes={nodes}
            roots={roots}
            onClose={() => setSimOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
