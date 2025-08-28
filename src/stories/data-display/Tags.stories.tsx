/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tags, Tag } from './Tags';

const meta: Meta<any> = {
  title: 'Data Display/Tags',
  component: Tags,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tags component for categorizing and labeling resources in cloud management.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<any>;

const resourceTags = [
  { id: '1', label: 'production', variant: 'success' as const },
  { id: '2', label: 'web-server', variant: 'primary' as const },
  { id: '3', label: 'critical', variant: 'danger' as const },
  { id: '4', label: 'team-alpha', variant: 'info' as const },
];

const environmentTags = ['production', 'staging', 'development', 'testing'];

const teamTags = [
  { id: '1', label: 'team-frontend', variant: 'primary' as const, icon: '🌐' },
  { id: '2', label: 'team-backend', variant: 'success' as const, icon: '⚙️' },
  { id: '3', label: 'team-devops', variant: 'warning' as const, icon: '🔧' },
  { id: '4', label: 'team-qa', variant: 'info' as const, icon: '🧪' },
];

export const Default: Story = {
  args: {
    tags: resourceTags,
    onRemove: (tag: any) => console.log('Remove:', tag),
    onTagClick: (tag: any) => console.log('Clicked:', tag),
  },
};

export const SimpleStrings: Story = {
  args: {
    tags: environmentTags,
    defaultVariant: 'secondary',
    addable: true,
    onAdd: (tag: string) => console.log('Add:', tag),
    onRemove: (tag: any) => console.log('Remove:', tag),
  },
};

export const WithIcons: Story = {
  args: {
    tags: teamTags,
    onTagClick: (tag: any) => console.log('Clicked:', tag),
  },
};

export const Addable: Story = {
  args: {
    tags: ['production', 'web', 'database'],
    addable: true,
    maxTags: 5,
    options: ['production', 'staging', 'development', 'web', 'api', 'database', 'cache', 'critical', 'high-priority'],
    onAdd: (tag: string) => console.log('Add:', tag),
    onRemove: (tag: any) => console.log('Remove:', tag),
  },
};

// Individual Tag component stories
export const IndividualTag: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="danger" closable onClose={() => console.log('Close')}>
        Closable
      </Tag>
      <Tag variant="warning" icon="⚠️">
        With Icon
      </Tag>
      <Tag color="#8B5CF6">Custom Color</Tag>
    </div>
  ),
};
