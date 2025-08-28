import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { Badge } from './Badge';

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onRemove: fn() },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Running: Story = {
  args: {
    children: 'Running',
    variant: 'success',
  },
};

export const Stopped: Story = {
  args: {
    children: 'Stopped',
    variant: 'danger',
  },
};

export const Pending: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
};

export const Maintenance: Story = {
  args: {
    children: 'Maintenance',
    variant: 'info',
  },
};

export const Production: Story = {
  args: {
    children: 'Production',
    variant: 'primary',
  },
};

export const Development: Story = {
  args: {
    children: 'Development',
    variant: 'secondary',
  },
};

export const Tag: Story = {
  args: {
    children: 'web-server',
    variant: 'light',
  },
};

export const RemovableTag: Story = {
  args: {
    children: 'database',
    variant: 'light',
    removable: true,
  },
};

export const SmallBadge: Story = {
  args: {
    children: 'v2.1.0',
    variant: 'dark',
    size: 'small',
  },
};

export const LargeBadge: Story = {
  args: {
    children: 'Critical Alert',
    variant: 'danger',
    size: 'large',
  },
};
