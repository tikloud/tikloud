/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tree } from './Tree';

const meta: Meta<any> = {
  title: 'Data Display/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tree component for displaying hierarchical data like folder structures or resource hierarchies.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<any>;

const resourceHierarchy = [
  {
    id: 'prod',
    label: 'Production Environment',
    icon: '🏭',
    children: [
      {
        id: 'prod-web',
        label: 'Web Servers',
        icon: '🌐',
        children: [
          { id: 'web-1', label: 'web-server-01', icon: '💻' },
          { id: 'web-2', label: 'web-server-02', icon: '💻' },
          { id: 'web-3', label: 'web-server-03', icon: '💻' },
        ]
      },
      {
        id: 'prod-db',
        label: 'Databases',
        icon: '🗄️',
        children: [
          { id: 'db-1', label: 'primary-db', icon: '💾' },
          { id: 'db-2', label: 'replica-db-1', icon: '💾' },
          { id: 'db-3', label: 'replica-db-2', icon: '💾' },
        ]
      }
    ]
  },
  {
    id: 'staging',
    label: 'Staging Environment',
    icon: '🧪',
    children: [
      {
        id: 'staging-web',
        label: 'Web Server',
        icon: '🌐',
        children: [
          { id: 'staging-web-1', label: 'staging-web-01', icon: '💻' },
        ]
      },
      {
        id: 'staging-db',
        label: 'Database',
        icon: '🗄️',
        children: [
          { id: 'staging-db-1', label: 'staging-db', icon: '💾' },
        ]
      }
    ]
  },
  {
    id: 'dev',
    label: 'Development Environment',
    icon: '🔧',
    children: [
      { id: 'dev-1', label: 'dev-sandbox', icon: '💻' },
      { id: 'dev-2', label: 'dev-testing', icon: '💻' },
    ]
  }
];

const folderStructure = [
  {
    id: 'src',
    label: 'src',
    icon: '📁',
    children: [
      {
        id: 'components',
        label: 'components',
        icon: '📁',
        children: [
          { id: 'button', label: 'Button.tsx', icon: '📄' },
          { id: 'input', label: 'Input.tsx', icon: '📄' },
          { id: 'modal', label: 'Modal.tsx', icon: '📄' },
        ]
      },
      {
        id: 'utils',
        label: 'utils',
        icon: '📁',
        children: [
          { id: 'helpers', label: 'helpers.ts', icon: '📄' },
          { id: 'constants', label: 'constants.ts', icon: '📄' },
        ]
      },
      { id: 'index', label: 'index.tsx', icon: '📄' },
    ]
  },
  {
    id: 'public',
    label: 'public',
    icon: '📁',
    children: [
      { id: 'favicon', label: 'favicon.ico', icon: '🖼️' },
      { id: 'logo', label: 'logo.png', icon: '🖼️' },
    ]
  },
  { id: 'package', label: 'package.json', icon: '📄' },
  { id: 'readme', label: 'README.md', icon: '📄' },
];

export const Default: Story = {
  args: {
    data: resourceHierarchy,
    showExpandIcon: true,
    defaultExpandAll: false,
    size: 'medium',
  },
};

export const ExpandedByDefault: Story = {
  args: {
    data: folderStructure,
    showExpandIcon: true,
    defaultExpandAll: true,
    size: 'medium',
  },
};

export const Selectable: Story = {
  args: {
    data: resourceHierarchy,
    selectable: true,
    multiple: true,
    selectedKeys: ['prod-web', 'staging-db-1'],
    onSelect: (keys: string[]) => console.log('Selected:', keys),
  },
};

export const WithLines: Story = {
  args: {
    data: folderStructure,
    showLines: true,
    showExpandIcon: true,
    defaultExpandAll: true,
    size: 'small',
  },
};
