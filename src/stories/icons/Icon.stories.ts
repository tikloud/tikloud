import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { Icon } from './Icon';

const meta = {
  title: 'Icons/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['check', 'cross', 'warning', 'info', 'loading', 'play', 'pause', 'stop', 'refresh', 'settings', 'user', 'cloud', 'database', 'network', 'security', 'monitor'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    name: 'check',
    color: '#28a745',
  },
};

export const Error: Story = {
  args: {
    name: 'cross',
    color: '#dc3545',
  },
};

export const Warning: Story = {
  args: {
    name: 'warning',
    color: '#ffc107',
  },
};

export const Info: Story = {
  args: {
    name: 'info',
    color: '#17a2b8',
  },
};

export const Loading: Story = {
  args: {
    name: 'loading',
    color: '#6c757d',
  },
};

export const Clickable: Story = {
  args: {
    name: 'settings',
    clickable: true,
    color: '#007bff',
  },
};

export const CloudServices: Story = {
  args: {
    name: 'cloud',
    size: 'large',
    color: '#1ea7fd',
  },
};

export const Database: Story = {
  args: {
    name: 'database',
    size: 'large',
    color: '#28a745',
  },
};

export const Network: Story = {
  args: {
    name: 'network',
    size: 'large',
    color: '#17a2b8',
  },
};

export const Security: Story = {
  args: {
    name: 'security',
    size: 'large',
    color: '#dc3545',
  },
};

export const Monitor: Story = {
  args: {
    name: 'monitor',
    size: 'large',
    color: '#6f42c1',
  },
};

export const Small: Story = {
  args: {
    name: 'user',
    size: 'small',
    color: '#6c757d',
  },
};
