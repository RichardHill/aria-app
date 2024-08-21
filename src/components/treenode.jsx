import React, { useState, useRef, useEffect } from "react";
import { CompositeItem } from "ariakit/composite";

export const TreeNode = ({ node, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState("0px");
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const contentRef = useRef(null);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (!node.children) {
      // Only show context menu on leaf nodes
      setContextMenu({ visible: true, x: e.pageX, y: e.pageY });
    }
  };

  const handleClickOutside = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }

    // Add event listener to detect outside clicks
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExpanded]);

  const handleTransitionEnd = () => {
    if (isExpanded) {
      setHeight("auto");
    }
  };

  const indentation = node.children ? (level + 1) * 20 : (level + 1) * 30;

  return (
    <div style={{ marginLeft: `${indentation}px`, overflow: "visible" }}>
      <CompositeItem
        as="div"
        role="treeitem"
        aria-expanded={isExpanded}
        onClick={toggleExpand}
        onContextMenu={handleContextMenu}
        className="tree-node"
      >
        {node.children && (isExpanded ? "▼" : "▶")} {node.name}
      </CompositeItem>

      {/* Render context menu */}
      {contextMenu.visible && (
        <ul
          className="context-menu"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px`, position: "absolute" }}
        >
          <li onClick={() => alert(`Action 1 on ${node.name}`)}>Action 1</li>
          <li onClick={() => alert(`Action 2 on ${node.name}`)}>Action 2</li>
          <li onClick={() => alert(`Action 3 on ${node.name}`)}>Action 3</li>
        </ul>
      )}

      <div
        ref={contentRef}
        style={{
          height: height,
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {isExpanded && node.children && (
          <div role="group" style={{ padding: "8px 0" }}>
            {node.children.map((childNode) => (
              <TreeNode key={childNode.id} node={childNode} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

