
const yaml = require('js-yaml');

/**
 * Creates a valid last_update object for document front matter
 * @param {string} date - Date string in ISO format (e.g., '2025-05-01')
 * @param {string} [author] - Optional author name
 * @returns {object} A properly formatted last_update object
 */
function createLastUpdate(date, author) {
  if (author) {
    return {
      date: date,
      author: author
    };
  }
  return {
    date: date
  };
}

/**
 * Fixes common pagination issues in the frontmatter
 * @param {object} frontmatter - The frontmatter object to fix
 * @returns {object} The updated frontmatter object
 */
function fixPaginationLinks(frontmatter) {
  // Fix common pagination issues
  if (frontmatter.pagination_prev === 'contributing/style') {
    frontmatter.pagination_prev = 'contributing/style/index';
  }
  
  return frontmatter;
}

/**
 * Script to fix existing frontmatter in markdown files
 * @param {string} frontmatterString - The existing frontmatter string to fix
 * @returns {string} Fixed frontmatter string
 */
function fixFrontmatter(frontmatterString) {
  // Parse the frontmatter string into lines
  const frontmatterLines = frontmatterString.split('\n');
  
  // Create a new array for the fixed frontmatter
  let fixedLines = [];
  let inFrontmatter = false;
  let insideLastUpdate = false;
  let dateAdded = false;
  let madeChanges = false;
  
  // Simple approach: rebuild the frontmatter line by line with careful handling of last_update
  for (let i = 0; i < frontmatterLines.length; i++) {
    const line = frontmatterLines[i].trim();
    
    // Handle frontmatter delimiters
    if (line === '---') {
      inFrontmatter = !inFrontmatter;
      fixedLines.push(line);
      continue;
    }
  
    // Skip empty lines in frontmatter
    if (inFrontmatter && line === '') {
      continue;
}

    // Handle content outside frontmatter
    if (!inFrontmatter) {
      fixedLines.push(frontmatterLines[i]); // Keep original line with whitespace
      continue;
    }
    
    // Check for last_update section
    if (line === 'last_update:') {
      if (!insideLastUpdate) {
        insideLastUpdate = true;
        fixedLines.push(line);
      } else {
        // Skip duplicate last_update declaration
        console.log('  - Skipping duplicate last_update declaration');
        madeChanges = true;
      }
      continue;
    }
    
    // Handle date field inside last_update
    if (insideLastUpdate && line.startsWith('date:')) {
      if (!dateAdded) {
        fixedLines.push('  ' + line); // Add proper indentation
        dateAdded = true;
        console.log(`  - Using date: ${line}`);
      } else {
        // Skip duplicate date fields
        console.log(`  - Skipping duplicate date field: ${line}`);
        madeChanges = true;
      }
      continue;
    }
    
    // Check if we're exiting the last_update section
    if (insideLastUpdate && !line.startsWith('  ')) {
      insideLastUpdate = false;
    }
    
    // Add all other lines
    if (!insideLastUpdate || !line.startsWith('date:')) {
      // Preserve original whitespace for non-last_update lines
      fixedLines.push(frontmatterLines[i]);
    }
  }
  
  // Parse the frontmatter
  const frontmatter = yaml.load(fixedLines.join('\n'));
  
  // Fix pagination links
  fixPaginationLinks(frontmatter);
  
  // Convert the updated frontmatter back to a string
  const updatedFrontmatterString = yaml.dump(frontmatter);
  
  // If no changes were made, return the original string
  if (!madeChanges) {
    console.log('  - No changes needed to frontmatter');
    return frontmatterString;
  }
  
  return updatedFrontmatterString;
}

module.exports = {
  createLastUpdate,
  fixFrontmatter,
  fixPaginationLinks
};