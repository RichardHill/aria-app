import React from "react";
import { useCompositeState, Composite } from "ariakit/composite";
import { TreeNode } from "./treenode";

export const Tree = ({ data }) => {
  // Using Ariakit's composite state hook to manage the tree state
  const composite = useCompositeState({ orientation: "vertical" });

  return (
    <Composite state={composite} role="tree" className="tree-container">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </Composite>
  );
};

export default Tree;