import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Form Controls/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable monitoring',
  },
};

export const Checked: Story = {
  args: {
    label: 'Auto-scaling enabled',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Premium features (requires upgrade)',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'System monitoring (always enabled)',
    checked: true,
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all instances',
    indeterminate: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Enable SSL',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'large',
  },
};
