const path = require('path');
const { fixAllMarkdownFiles } = require('./fix-frontmatter');

// Path to your docs directory - adjust as needed
const docsDirectory = path.resolve(__dirname, '../../../docs');

// Run the script
fixAllMarkdownFiles(docsDirectory);