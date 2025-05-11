const fs = require('fs');
const path = require('path');
const { fixFrontmatter } = require('./document-metadata');

// Check if a file path was provided as a command line argument
const providedFilePath = process.argv[2];
const filePath = providedFilePath 
  ? path.resolve(providedFilePath)
  : path.resolve(__dirname, '../../../docs/benefits/index.mdx');

// Read the file
try {
  console.log(`Fixing file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file has frontmatter
  if (!content.startsWith('---')) {
    console.log('No frontmatter found');
    process.exit(1);
  }
  
  // Find the end of frontmatter
  const endOfFrontmatter = content.indexOf('---', 3);
  if (endOfFrontmatter === -1) {
    console.log('Incomplete frontmatter');
    process.exit(1);
  }
  
  const frontmatter = content.substring(0, endOfFrontmatter + 3);
  const documentContent = content.substring(endOfFrontmatter + 3);
  
  // Show the current frontmatter
  console.log('Current frontmatter:');
  console.log(frontmatter);
  
  // Fix the frontmatter
  const fixedFrontmatter = fixFrontmatter(frontmatter);
  
  // If nothing changed, exit
  if (fixedFrontmatter === frontmatter) {
    console.log('No changes needed');
    process.exit(0);
  }
  
  // Show the fixed frontmatter
  console.log('Fixed frontmatter:');
  console.log(fixedFrontmatter);
  
  // Write the fixed content back to the file
  const fixedContent = fixedFrontmatter + documentContent;
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log('File updated successfully');
  
  // Verify the fix worked by checking for duplicate date fields
  if (fixedFrontmatter.match(/date:/g)?.length > 1) {
    console.warn('WARNING: There may still be duplicate date fields in the frontmatter!');
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}