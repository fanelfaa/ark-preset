export function rehypeCustomCodeBlock() {
  return (tree) => {
    function visit(node, index, parent) {
      if (node.type === 'element' && node.tagName === 'pre') {
        const newNode = {
          type: 'element',
          tagName: 'custom-code-block',
          properties: {},
          children: [{...node}] // copy the node to avoid mutating the object we are replacing
        };
        parent.children[index] = newNode;
        return; // skip visiting children of this pre
      }

      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          visit(node.children[i], i, node);
        }
      }
    }
    
    visit(tree, null, null);
  };
}
