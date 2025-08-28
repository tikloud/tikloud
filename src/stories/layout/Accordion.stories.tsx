import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple panels to be open',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the accordion',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated', 'minimal'],
      description: 'Accordion variant style',
    },
    animationDuration: {
      control: 'number',
      description: 'Animation duration in ms',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'server-config',
    title: 'Server Configuration',
    icon: '⚙️',
    content: (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Server Name</label>
          <input type="text" defaultValue="web-server-01" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instance Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option>t3.micro</option>
            <option>t3.small</option>
            <option>t3.medium</option>
          </select>
        </div>
      </div>
    ),
  },
  {
    id: 'network-settings',
    title: 'Network Settings',
    icon: '🌐',
    badge: 'New',
    content: (
      <div className="space-y-3">
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Auto-assign public IP
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Security Group</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option>default</option>
            <option>web-servers</option>
            <option>database-servers</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subnet</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option>subnet-12345</option>
            <option>subnet-67890</option>
          </select>
        </div>
      </div>
    ),
  },
  {
    id: 'storage-options',
    title: 'Storage Options',
    icon: '💾',
    content: (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Root Volume Size (GB)</label>
          <input type="number" defaultValue="20" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Volume Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option>gp3</option>
            <option>gp2</option>
            <option>io1</option>
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Encrypt volume
          </label>
        </div>
      </div>
    ),
  },
  {
    id: 'advanced-settings',
    title: 'Advanced Settings',
    icon: '🔧',
    content: (
      <div className="space-y-3">
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable detailed monitoring
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable termination protection
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">User Data Script</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="#!/bin/bash&#10;# Your startup script here"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'disabled-section',
    title: 'Disabled Section',
    icon: '🚫',
    disabled: true,
    content: <div>This section is disabled</div>,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems.slice(0, 4), // Exclude disabled item for default story
    allowMultiple: false,
    size: 'medium',
    variant: 'default',
    animationDuration: 300,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const AllowMultiple: Story = {
  args: {
    ...Default.args,
    allowMultiple: true,
    defaultExpanded: ['server-config', 'network-settings'],
  },
  decorators: Default.decorators,
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    variant: 'bordered',
  },
  decorators: Default.decorators,
};

export const Separated: Story = {
  args: {
    ...Default.args,
    variant: 'separated',
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

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
  decorators: Default.decorators,
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
  decorators: Default.decorators,
};

export const WithDisabledItem: Story = {
  args: {
    items: sampleItems, // Include all items including disabled
    allowMultiple: false,
    size: 'medium',
    variant: 'default',
  },
  decorators: Default.decorators,
};

export const DefaultExpanded: Story = {
  args: {
    ...Default.args,
    defaultExpanded: ['server-config'],
  },
  decorators: Default.decorators,
};

export const FastAnimation: Story = {
  args: {
    ...Default.args,
    animationDuration: 150,
  },
  decorators: Default.decorators,
};

export const SlowAnimation: Story = {
  args: {
    ...Default.args,
    animationDuration: 600,
  },
  decorators: Default.decorators,
};
