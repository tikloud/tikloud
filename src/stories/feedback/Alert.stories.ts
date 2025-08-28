import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onDismiss: fn() },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Instance Created Successfully',
    children: 'Your cloud instance "web-server-01" has been created and is now running.',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'High CPU Usage Detected',
    children: 'Your instance is using 85% CPU. Consider upgrading to a larger instance type.',
    dismissible: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Deployment Failed',
    children: 'Failed to deploy application due to insufficient memory. Please check your configuration.',
    dismissible: true,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Maintenance Scheduled',
    children: 'System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM UTC.',
    dismissible: true,
  },
};

export const SimpleMessage: Story = {
  args: {
    type: 'success',
    children: 'Operation completed successfully.',
  },
};

export const AutoDismiss: Story = {
  args: {
    type: 'info',
    title: 'Auto-dismissing Alert',
    children: 'This alert will automatically disappear after 3 seconds.',
    autoDismiss: 3000,
  },
};

export const Toast: Story = {
  args: {
    type: 'success',
    title: 'File Uploaded',
    children: 'Your file has been uploaded successfully.',
    toast: true,
    dismissible: true,
    autoDismiss: 5000,
  },
};

export const SmallAlert: Story = {
  args: {
    type: 'warning',
    size: 'small',
    children: 'Please save your work before proceeding.',
    dismissible: true,
  },
};

export const LargeAlert: Story = {
  args: {
    type: 'error',
    title: 'Critical System Error',
    size: 'large',
    children: 'A critical error has occurred in the system. Please contact support immediately with error code: ERR_SYS_001.',
    dismissible: true,
  },
};
