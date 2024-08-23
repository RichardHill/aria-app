import React from "react";
import { useCompositeState, Composite } from "ariakit/composite";
import { TreeNode } from "./treenode";

export const Tree = ({ nodes }) => {
    const compositeState = useCompositeState({ orientation: "vertical", loop: true });
  
    return (
      <Composite
        {...compositeState}
        as="div"
        role="tree"
        aria-label="Tree Navigation"
        aria-multiselectable="false"
        className="tree"
      >
        {nodes.map((node) => (
          <TreeNode key={node.id} node={node} compositeState={compositeState} />
        ))}
      </Composite>
    );
  };

