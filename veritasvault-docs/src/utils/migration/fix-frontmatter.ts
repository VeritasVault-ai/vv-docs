import fs from 'fs';
import path from 'path';
import { fixFrontmatter } from './document-metadata';

/**
 * Recursively find all markdown files in a directory
 * @param dir - Directory to search
 * @param fileList - Accumulator for found files
 * @returns Array of markdown file paths
 */
function findMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Fix frontmatter in a markdown file
 * @param filePath - Path to the markdown file
 * @returns true if file was modified, false otherwise
 */
function fixMarkdownFrontmatter(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file has frontmatter
  if (!content.startsWith('---')) {
    return false;
  }
  
  // Find the end of frontmatter
  const endOfFrontmatter = content.indexOf('---', 3);
  if (endOfFrontmatter === -1) {
    return false;
  }
  
  const frontmatter = content.substring(0, endOfFrontmatter + 3);
  const documentContent = content.substring(endOfFrontmatter + 3);
  
  // Fix the frontmatter
  const fixedFrontmatter = fixFrontmatter(frontmatter);
  
  // If nothing changed, return false
  if (fixedFrontmatter === frontmatter) {
    return false;
  }
  
  // Write the fixed content back to the file
  const fixedContent = fixedFrontmatter + documentContent;
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  
  return true;
}

/**
 * Main function to fix all markdown files in a directory
 * @param docsDir - Root directory containing markdown files
 */
export function fixAllMarkdownFiles(docsDir: string): void {
  const markdownFiles = findMarkdownFiles(docsDir);
  let fixedCount = 0;
  
  console.log(`Found ${markdownFiles.length} markdown files.`);
  
  markdownFiles.forEach(filePath => {
    const wasFixed = fixMarkdownFrontmatter(filePath);
    if (wasFixed) {
      fixedCount++;
      console.log(`Fixed frontmatter in: ${filePath}`);
    }
  });
  
  console.log(`Fixed frontmatter in ${fixedCount} files.`);
}

// Only run if this script is executed directly
if (require.main === module) {
  // Path to your docs directory - adjust as needed
  const docsDirectory = path.resolve(__dirname, '../../../docs');
  
  // Run the script
  fixAllMarkdownFiles(docsDirectory);
}