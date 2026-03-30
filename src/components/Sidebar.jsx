import { IconNode, IconWarning } from "../icons";

export default function Sidebar({ nodes, roots, cycleNodes }) {
  const allIds = Object.keys(nodes);

  function scrollTo(id) {
    document
      .getElementById(`node-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: "1.5px solid #EDE8DF",
        background: "#F7F3ED",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 16px 12px",
          borderBottom: "1px solid #EDE8DF",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            fontWeight: 700,
            color: "#9E9181",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Node Registry
        </div>
        <div style={{ fontSize: 11, color: "#C4B89E", marginTop: 2 }}>
          {allIds.length} node{allIds.length !== 1 ? "s" : ""} · {roots.length}{" "}
          root{roots.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Node list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
        {allIds.length === 0 ? (
          <div
            style={{
              padding: "12px 8px",
              fontSize: 12,
              color: "#C4B89E",
              fontStyle: "italic",
            }}
          >
            No nodes yet
          </div>
        ) : (
          allIds.map((id) => {
            const n = nodes[id];
            const isCycle = cycleNodes.has(id);
            const isRoot = roots.includes(id);
            return (
              <div
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  padding: "7px 8px",
                  borderRadius: 8,
                  cursor: "pointer",
                  marginBottom: 2,
                  background: isCycle ? "#FDF0EE" : "transparent",
                  border: `1px solid ${isCycle ? "#E8896A44" : "transparent"}`,
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (!isCycle) e.currentTarget.style.background = "#EDE8DF";
                }}
                onMouseLeave={(e) => {
                  if (!isCycle)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    marginTop: 2,
                    color: isCycle ? "#C4623A" : isRoot ? "#2C2018" : "#9E9181",
                    flexShrink: 0,
                  }}
                >
                  {isCycle ? <IconWarning size={11} /> : <IconNode size={11} />}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 500,
                        color: isCycle ? "#C4623A" : "#6B5E4E",
                      }}
                    >
                      {id}
                    </span>
                    {isRoot && !isCycle && (
                      <span
                        style={{
                          fontSize: 9,
                          color: "#9E9181",
                          background: "#EDE8DF",
                          padding: "0 4px",
                          borderRadius: 3,
                          letterSpacing: "0.04em",
                        }}
                      >
                        root
                      </span>
                    )}
                    {isCycle && (
                      <span
                        style={{
                          fontSize: 9,
                          color: "#9B4828",
                          background: "#F4C5B4",
                          padding: "0 4px",
                          borderRadius: 3,
                        }}
                      >
                        cycle
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: n.condition ? "#6B5E4E" : "#C4B89E",
                      fontStyle: n.condition ? "normal" : "italic",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginTop: 1,
                    }}
                  >
                    {n.condition || "untitled"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint */}
      <div
        style={{
          padding: "10px 14px",
          borderTop: "1px solid #EDE8DF",
          fontSize: 10,
          color: "#C4B89E",
          lineHeight: 1.5,
        }}
      >
        Click any node to scroll into view
      </div>
    </aside>
  );
}
