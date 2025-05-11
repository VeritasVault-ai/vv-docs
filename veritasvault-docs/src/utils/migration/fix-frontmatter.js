const fs = require('fs');
const path = require('path');
const { fixFrontmatter } = require('./document-metadata');

/**
 * Recursively find all markdown files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} [fileList=[]] - Accumulator for found files
 * @returns {string[]} Array of markdown file paths
 */
function findMarkdownFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          findMarkdownFiles(filePath, fileList);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
          fileList.push(filePath);
        }
      } catch (err) {
        console.error(`Error accessing file ${filePath}:`, err.message);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return fileList;
}

/**
 * Fix frontmatter in a markdown file
 * @param {string} filePath - Path to the markdown file
 * @returns {boolean} true if file was modified, false otherwise
 */
function fixMarkdownFrontmatter(filePath) {
  try {
    console.log(`Processing file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file has frontmatter
    if (!content.startsWith('---')) {
      console.log(`  - No frontmatter found in ${filePath}`);
      return false;
    }
    
    // Find the end of frontmatter
    const endOfFrontmatter = content.indexOf('---', 3);
    if (endOfFrontmatter === -1) {
      console.log(`  - Incomplete frontmatter in ${filePath}`);
      return false;
    }
    
    const frontmatter = content.substring(0, endOfFrontmatter + 3);
    const documentContent = content.substring(endOfFrontmatter + 3);
    
    // Check for duplicate date fields in last_update section
    const dateMatches = frontmatter.match(/date:/g);
    if (dateMatches && dateMatches.length > 1) {
      console.log(`  - Found ${dateMatches.length} date fields in ${filePath}`);
    }
    
    // Fix the frontmatter
    const fixedFrontmatter = fixFrontmatter(frontmatter);
    
    // If nothing changed, return false
    if (fixedFrontmatter === frontmatter) {
      console.log(`  - No changes needed for ${filePath}`);
      return false;
    }
    
    // Write the fixed content back to the file
    const fixedContent = fixedFrontmatter + documentContent;
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`  ✓ Fixed frontmatter in: ${filePath}`);
    
    return true;
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err.message);
    return false;
  }
}

/**
 * Main function to fix all markdown files in a directory
 * @param {string} docsDir - Root directory containing markdown files
 */
function fixAllMarkdownFiles(docsDir) {
  console.log(`Searching for markdown files in: ${docsDir}`);
  const markdownFiles = findMarkdownFiles(docsDir);
  let fixedCount = 0;
  
  console.log(`Found ${markdownFiles.length} markdown files.`);
  
  markdownFiles.forEach(filePath => {
    const wasFixed = fixMarkdownFrontmatter(filePath);
    if (wasFixed) {
      fixedCount++;
    }
  });
  
  console.log(`Fixed frontmatter in ${fixedCount} files.`);
}

module.exports = {
  findMarkdownFiles,
  fixMarkdownFrontmatter,
  fixAllMarkdownFiles
};

// Only run if this script is executed directly
if (require.main === module) {
  // Path to your docs directory - adjust as needed
  const docsDirectory = path.resolve(__dirname, '../../../docs');
  
  // Run the script
  fixAllMarkdownFiles(docsDirectory);
}