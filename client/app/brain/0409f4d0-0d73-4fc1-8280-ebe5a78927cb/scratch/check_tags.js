const fs = require('fs');
const content = fs.readFileSync('c:/Users/devda/OneDrive/Desktop/harkirat/BharatOrigin/client/app/components/Navbar.tsx', 'utf8');

function checkTags(text) {
  const stack = [];
  const tagRegex = /<(\/)?([a-zA-Z0-9\.]+)(?:\s+[^>]*)?(\/)?>/g;
  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    const [full, isClosing, tagName, isSelfClosing] = match;
    if (isSelfClosing) continue;
    if (isClosing) {
      if (stack.length === 0) {
        console.log(`Unexpected closing tag: ${tagName} at position ${match.index}`);
        return;
      }
      const top = stack.pop();
      if (top.name !== tagName) {
        console.log(`Mismatch: opened ${top.name} at ${top.pos}, but closed ${tagName} at ${match.index}`);
      }
    } else {
      stack.push({ name: tagName, pos: match.index });
    }
  }
  if (stack.length > 0) {
    stack.forEach(t => console.log(`Unclosed tag: ${t.name} opened at ${t.pos}`));
  } else {
    console.log('All tags are balanced (roughly, regex isn\'t perfect for JSX)');
  }
}

checkTags(content);
