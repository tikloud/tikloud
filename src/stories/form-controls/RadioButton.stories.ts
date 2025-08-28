import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { RadioButton } from './RadioButton';

const meta = {
  title: 'Form Controls/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InstanceType: Story = {
  args: {
    name: 'instanceType',
    options: [
      { value: 't2.micro', label: 't2.micro (1 vCPU, 1 GB RAM)' },
      { value: 't2.small', label: 't2.small (1 vCPU, 2 GB RAM)' },
      { value: 't2.medium', label: 't2.medium (2 vCPU, 4 GB RAM)' },
      { value: 't2.large', label: 't2.large (2 vCPU, 8 GB RAM)' },
    ],
    value: 't2.small',
  },
};

export const StorageType: Story = {
  args: {
    name: 'storageType',
    options: [
      { value: 'ssd', label: 'SSD (High Performance)' },
      { value: 'hdd', label: 'HDD (Standard)' },
      { value: 'nvme', label: 'NVMe (Ultra High Performance)', disabled: true },
    ],
    value: 'ssd',
  },
};

export const Horizontal: Story = {
  args: {
    name: 'environment',
    direction: 'horizontal',
    options: [
      { value: 'dev', label: 'Development' },
      { value: 'staging', label: 'Staging' },
      { value: 'prod', label: 'Production' },
    ],
    value: 'dev',
  },
};

export const Small: Story = {
  args: {
    name: 'backup',
    size: 'small',
    options: [
      { value: 'daily', label: 'Daily backups' },
      { value: 'weekly', label: 'Weekly backups' },
      { value: 'monthly', label: 'Monthly backups' },
      { value: 'none', label: 'No backups' },
    ],
    value: 'daily',
  },
};

export const Large: Story = {
  args: {
    name: 'billing',
    size: 'large',
    options: [
      { value: 'hourly', label: 'Pay per hour' },
      { value: 'monthly', label: 'Monthly subscription' },
      { value: 'yearly', label: 'Annual subscription (20% off)' },
    ],
    value: 'monthly',
  },
};
