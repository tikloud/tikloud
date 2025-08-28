import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'minimal'],
      description: 'Card variant style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the card',
    },
    status: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Status indicator',
    },
    clickable: {
      control: 'boolean',
      description: 'Is card clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Is card disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleActions = [
  { label: 'Start', variant: 'primary' as const, onClick: () => console.log('Start clicked') },
  { label: 'Stop', variant: 'secondary' as const, onClick: () => console.log('Stop clicked') },
  { label: 'Delete', variant: 'danger' as const, onClick: () => console.log('Delete clicked') },
];

export const Default: Story = {
  args: {
    title: 'Web Server Instance',
    subtitle: 't3.medium • us-east-1a',
    children: (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">CPU Usage:</span>
          <span className="font-medium">45%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Memory:</span>
          <span className="font-medium">2.1 GB / 4 GB</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Status:</span>
          <span className="font-medium text-green-600">Running</span>
        </div>
      </div>
    ),
    variant: 'default',
    size: 'medium',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: sampleActions,
  },
  decorators: Default.decorators,
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop',
    imageAlt: 'Server room',
  },
  decorators: Default.decorators,
};

export const WithStatus: Story = {
  args: {
    ...Default.args,
    status: 'success',
    statusText: 'Healthy',
  },
  decorators: Default.decorators,
};

export const WithBadge: Story = {
  args: {
    ...Default.args,
    badge: 'New',
  },
  decorators: Default.decorators,
};

export const Clickable: Story = {
  args: {
    ...Default.args,
    clickable: true,
    onClick: () => console.log('Card clicked'),
  },
  decorators: Default.decorators,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    actions: sampleActions,
  },
  decorators: Default.decorators,
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  decorators: Default.decorators,
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
  },
  decorators: Default.decorators,
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    variant: 'elevated',
  },
  decorators: Default.decorators,
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
  },
  decorators: Default.decorators,
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const DatabaseCard: Story = {
  args: {
    title: 'PostgreSQL Database',
    subtitle: 'db.t3.micro • Production',
    status: 'success',
    statusText: 'Available',
    badge: '3',
    children: (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Connections:</span>
          <span className="font-medium">12 / 100</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Storage:</span>
          <span className="font-medium">45 GB / 100 GB</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Version:</span>
          <span className="font-medium">14.9</span>
        </div>
      </div>
    ),
    actions: [
      { label: 'Connect', variant: 'primary', icon: '🔗', onClick: () => console.log('Connect') },
      { label: 'Backup', variant: 'secondary', icon: '💾', onClick: () => console.log('Backup') },
    ],
  },
  decorators: Default.decorators,
};

export const ErrorCard: Story = {
  args: {
    title: 'Failed Instance',
    subtitle: 't3.medium • us-west-2b',
    status: 'error',
    statusText: 'Failed',
    children: (
      <div className="space-y-2">
        <p className="text-sm text-red-600">
          Instance failed to start due to insufficient capacity in the availability zone.
        </p>
        <div className="text-xs text-gray-500">
          Last attempted: 2 minutes ago
        </div>
      </div>
    ),
    actions: [
      { label: 'Retry', variant: 'primary', onClick: () => console.log('Retry') },
      { label: 'Change AZ', variant: 'secondary', onClick: () => console.log('Change AZ') },
    ],
  },
  decorators: Default.decorators,
};

export const CustomHeader: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            VM
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Custom Header</h3>
            <p className="text-xs text-gray-500">With icon and metadata</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Region</div>
          <div className="text-sm font-medium">US-East-1</div>
        </div>
      </div>
    ),
    children: 'This card has a custom header component instead of the default title/subtitle.',
  },
  decorators: Default.decorators,
};
