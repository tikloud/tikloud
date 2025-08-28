import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    label: 'Instance Creation Progress',
    showPercentage: true,
  },
};

export const ResourceProvisioning: Story = {
  args: {
    value: 40,
    label: 'Provisioning Resources',
    variant: 'primary',
    showPercentage: true,
  },
};

export const DatabaseMigration: Story = {
  args: {
    value: 85,
    label: 'Database Migration',
    variant: 'success',
    showPercentage: true,
  },
};

export const DiskUsage: Story = {
  args: {
    value: 75,
    label: 'Disk Usage',
    variant: 'warning',
    showPercentage: true,
  },
};

export const CriticalAlert: Story = {
  args: {
    value: 95,
    label: 'Memory Usage',
    variant: 'danger',
    showPercentage: true,
  },
};

export const BackupProgress: Story = {
  args: {
    value: 30,
    label: 'Backup in Progress',
    variant: 'info',
    showPercentage: true,
  },
};

export const Striped: Story = {
  args: {
    value: 60,
    label: 'File Transfer',
    variant: 'primary',
    striped: true,
    showPercentage: true,
  },
};

export const AnimatedStriped: Story = {
  args: {
    value: 45,
    label: 'Processing Data',
    variant: 'success',
    striped: true,
    animated: true,
    showPercentage: true,
  },
};

export const Small: Story = {
  args: {
    value: 55,
    size: 'small',
    showPercentage: true,
  },
};

export const Large: Story = {
  args: {
    value: 80,
    label: 'System Update',
    size: 'large',
    variant: 'info',
    showPercentage: true,
  },
};
