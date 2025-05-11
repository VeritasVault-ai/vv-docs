import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/configuration', 'getting-started/quickstart'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/index',
        'architecture/overview/index',
        'architecture/layers/index',
        'architecture/comparison',
        {
          type: 'category',
          label: 'Diagrams',
          items: [
            'architecture/diagrams/index',
            'architecture/diagrams/high-level-architecture',
            'architecture/diagrams/layered-architecture',
            'architecture/diagrams/data-flow',
            'architecture/diagrams/blockchain-integration',
            'architecture/diagrams/cloud-infrastructure',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Chain Services',
      items: ['chain-services/overview', 'chain-services/event-processing', 'chain-services/integrations'],
    },
    {
      type: 'category',
      label: 'Frontend',
      items: ['frontend/overview', 'frontend/components', 'frontend/theming'],
    },
    {
      type: 'category',
      label: 'Infrastructure',
      items: ['infrastructure/overview', 'infrastructure/deployment', 'infrastructure/monitoring'],
    },
    {
      type: 'category',
      label: 'Overview',
      items: ['overview/index', 'overview/project-overview-interactive'],
    },
    {
      type: 'category',
      label: 'Tokenomics',
      items: ['tokenomics/index', 'tokenomics/distribution/token-distribution', 'tokenomics/utility/token-utility'],
    },
    {
      type: 'category',
      label: 'Security',
      items: ['security/index', 'security/diagram/security-architecture-diagram'],
    },
    {
      type: 'category',
      label: 'Finance Models',
      items: [
        'finmodels/finmodelling-overview', 
        'finmodels/finmodelling-first-phase',
        'finance/index',
        'finance/monte-carlo/monte-carlo-simulation',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: ['integration/overview', 'integration/api-usage', 'integrations/data/data-providers'],
    },
    {
      type: 'category',
      label: 'Operations',
      items: ['operations/deployment', 'operations/monitoring', 'operations/troubleshooting'],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api-reference/overview', 'api-reference/endpoints', 'api-reference/models'],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/style/index',
        'contributing/templates/template-usage-guidelines',
        'migration/style-guide',
      ],
    },
    {
      type: 'category',
      label: 'Documentation',
      items: [
        'documentation/documentation-best-practices',
        'documentation/search-optimization',
        'documentation/url-formatting-and-redirect',
        'documentation/versioning-strategy',
      ],
    },
    {
      type: 'category',
      label: 'Benefits',
      items: ['benefits/index'],
    },
    {
      type: 'category',
      label: 'Gamification',
      items: ['gamification/overview', 'gamification/mechanisms'],
    },
    {
      type: 'category',
      label: 'Governance',
      items: ['governance-framework/index'],
    },
    {
      type: 'category',
      label: 'Protocol',
      items: ['protocol/index'],
    },
    {
      type: 'category',
      label: 'Roadmap',
      items: ['roadmap/index'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/dns-strategy'],
    },
  ],
};

export default sidebars;