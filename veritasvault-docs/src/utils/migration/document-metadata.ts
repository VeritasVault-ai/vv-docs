export const documentMetadata = {
  title: "VeritasVault.ai Whitepaper",
  subtitle: "Multi-Chain Architecture for Secure Portfolio Management",
  version: "1.0.0",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  authors: [
    {
      name: "Jurie Smit",
      title: "Chief Technology Officer",
      email: "jurie@phoenixvc.tech",
    },
    {
      name: "Eben Mare",
      title: "Chief Executive Officer",
      email: "eben@phoenixvc.tech",
    }
  ],
  contributors: [

  ],
  keywords: [
    "blockchain",
    "multi-chain",
    "portfolio management",
    "DeFi",
    "security",
    "cross-chain",
    "asset management",
    "decentralized finance",
    "risk assessment",
    "interoperability",
  ],
  copyright: "© 2025 VeritasVault.ai. All Rights Reserved.",
  classification: "Confidential",
  documentType: "Technical Whitepaper",
  abstract: `VeritasVault.ai is a cutting-edge multi-chain portfolio management platform designed to provide secure, transparent, and efficient asset management across multiple blockchain networks. Our architecture leverages the unique strengths of various blockchains to create a robust, scalable, and interoperable solution for decentralized finance.`,
}

/**
 * Creates a valid last_update object for document front matter
 * @param date - Date string in ISO format (e.g., '2025-05-01')
 * @param author - Optional author name
 * @returns A properly formatted last_update object
 */
export const createLastUpdate = (date: string, author?: string) => {
  if (author) {
    return {
      date: date,
      author: author
    };
  }
  return {
    date: date
  };
};

/**
 * Author interface for document frontmatter
 */
interface Author {
  name: string;
  title?: string;
  email?: string;
  url?: string;
  imageUrl?: string;
}

/**
 * Frontmatter interface for document metadata
 */
interface DocumentFrontmatter {
  title: string;
  description: string;
  sidebar_label?: string;
  sidebar_position?: number;
  keywords?: string[];
  last_update: { date: string; author?: string };
  authors: Author[];
  custom_related_docs?: string[];
  custom_status?: 'draft' | 'published' | 'archived';
  custom_complexity?: 'beginner' | 'intermediate' | 'advanced';
  custom_prerequisites?: string[];
  custom_assets?: string[];
  custom_interactive?: boolean;
  custom_reading_time?: number;
  custom_audience?: string[];
  custom_doc_type?: 'concept' | 'guide' | 'reference' | 'tutorial' | 'interactive';
}

/**
 * Generate document frontmatter with proper formatting
 * @param params - Document frontmatter parameters
 * @returns Formatted frontmatter string
 */
export const generateFrontmatter = (params: DocumentFrontmatter): string => {
  const {
    title,
    description,
    sidebar_label,
    sidebar_position,
    keywords,
    last_update,
    authors,
    custom_related_docs,
    custom_status,
    custom_complexity,
    custom_prerequisites,
    custom_assets,
    custom_interactive,
    custom_reading_time,
    custom_audience,
    custom_doc_type
  } = params;

  // Start building the frontmatter
  let frontmatter = '---\n';
  
  // Required fields
  frontmatter += `title: ${title}\n`;
  frontmatter += `description: >\n  ${description.replace(/\n/g, '\n  ')}\n`;
  
  // Optional fields
  if (sidebar_label) frontmatter += `sidebar_label: ${sidebar_label}\n`;
  if (sidebar_position !== undefined) frontmatter += `sidebar_position: ${sidebar_position}\n`;
  
  // Keywords array
  if (keywords && keywords.length > 0) {
    frontmatter += 'keywords:\n';
    keywords.forEach(keyword => {
      frontmatter += `  - ${keyword}\n`;
    });
  }
  
  // Last update object (properly formatted)
  frontmatter += 'last_update:\n';
  frontmatter += `  date: '${last_update.date}'\n`;
  if (last_update.author) frontmatter += `  author: '${last_update.author}'\n`;
  
  // Authors array
  if (authors && authors.length > 0) {
    frontmatter += 'authors:\n';
    authors.forEach(author => {
      frontmatter += `  - name: ${author.name}\n`;
      if (author.title) frontmatter += `    title: ${author.title}\n`;
      if (author.email) frontmatter += `    email: ${author.email}\n`;
      if (author.url) frontmatter += `    url: ${author.url}\n`;
      if (author.imageUrl) frontmatter += `    imageUrl: ${author.imageUrl}\n`;
    });
  }
  
  // Custom fields
  if (custom_related_docs && custom_related_docs.length > 0) {
    frontmatter += 'custom_related_docs:\n';
    custom_related_docs.forEach(doc => {
      frontmatter += `  - ${doc}\n`;
    });
  }
  
  if (custom_status) frontmatter += `custom_status: ${custom_status}\n`;
  if (custom_complexity) frontmatter += `custom_complexity: ${custom_complexity}\n`;
  
  if (custom_prerequisites && custom_prerequisites.length > 0) {
    frontmatter += 'custom_prerequisites:\n';
    custom_prerequisites.forEach(prereq => {
      frontmatter += `  - ${prereq}\n`;
    });
  }
  
  if (custom_assets) {
    frontmatter += 'custom_assets: ';
    frontmatter += custom_assets.length > 0 ? '[\n' : '[]\n';
    custom_assets.forEach((asset, index) => {
      frontmatter += `  '${asset}'${index < custom_assets.length - 1 ? ',' : ''}\n`;
    });
    if (custom_assets.length > 0) frontmatter += ']\n';
  }
  
  if (custom_interactive !== undefined) frontmatter += `custom_interactive: ${custom_interactive}\n`;
  if (custom_reading_time !== undefined) frontmatter += `custom_reading_time: ${custom_reading_time}\n`;
  
  if (custom_audience && custom_audience.length > 0) {
    frontmatter += 'custom_audience:\n';
    custom_audience.forEach(audience => {
      frontmatter += `  - ${audience}\n`;
    });
  }
  
  if (custom_doc_type) frontmatter += `custom_doc_type: ${custom_doc_type}\n`;
  
  // Close frontmatter
  frontmatter += '---\n';
  
  return frontmatter;
};

/**
 * Helper function to create a document with frontmatter and content
 * @param frontmatterParams - Document frontmatter parameters
 * @param content - Document content
 * @returns Complete document string with frontmatter and content
 */
export const createDocument = (frontmatterParams: DocumentFrontmatter, content: string): string => {
  return `${generateFrontmatter(frontmatterParams)}\n${content}`;
};

/**
 * Example usage:
 * 
 * const securityDocFrontmatter = generateFrontmatter({
 *   title: "Security Architecture Overview",
 *   description: "Comprehensive overview of the security architecture, threat models, and protection mechanisms in the multi-chain system.",
 *   sidebar_label: "Security",
 *   sidebar_position: 7,
 *   keywords: ["security", "architecture", "threat model", "protection", "audit"],
 *   last_update: createLastUpdate("2025-05-07"),
 *   authors: [{ name: "Security Team", title: "Core Contributors" }],
 *   custom_related_docs: ["architecture", "protocol-overview", "threat-modeling"],
 *   custom_status: "published",
 *   custom_complexity: "advanced",
 *   custom_prerequisites: ["architecture", "protocol-overview"],
 *   custom_assets: [],
 *   custom_interactive: false,
 *   custom_reading_time: 12,
 *   custom_audience: ["security researchers", "developers", "auditors"],
 *   custom_doc_type: "reference"
 * });
 */

/**
 * Script to fix existing frontmatter in markdown files
 * @param frontmatterString - The existing frontmatter string to fix
 * @returns Fixed frontmatter string
 */
export const fixFrontmatter = (frontmatterString: string): string => {
  // Parse the frontmatter string
  const frontmatterLines = frontmatterString.split('\n');
  const fixedLines: string[] = [];
  
  let inFrontmatter = false;
  let lastUpdateFound = false;
  
  for (const line of frontmatterLines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      fixedLines.push(line);
      continue;
    }
    
    if (!inFrontmatter) {
      fixedLines.push(line);
      continue;
    }
    
    // Check if this is the last_update line that needs fixing
    if (line.trim().startsWith('last_update:') && !line.includes('{') && !line.includes('date:')) {
      const dateMatch = line.match(/last_update:\s*['"](.+)['"]/);
      if (dateMatch && dateMatch[1]) {
        fixedLines.push('last_update:');
        fixedLines.push(`  date: '${dateMatch[1]}'`);
        lastUpdateFound = true;
      } else {
        // If we can't parse the date, just keep the original line
        fixedLines.push(line);
      }
    } else {
      fixedLines.push(line);
    }
  }
  
  return fixedLines.join('\n');
};