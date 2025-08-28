import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { InputField } from './InputField';

const meta = {
  title: 'Form Controls/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'password', 'email'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Resource Name',
    placeholder: 'Enter resource name',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Instance Name',
    value: 'my-instance-01',
    placeholder: 'Enter instance name',
  },
};

export const Required: Story = {
  args: {
    label: 'API Key',
    placeholder: 'Enter your API key',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Server Port',
    value: 'invalid-port',
    error: 'Please enter a valid port number',
    type: 'number',
  },
};

export const WithHelp: Story = {
  args: {
    label: 'Memory (GB)',
    placeholder: '4',
    helpText: 'Minimum 1GB, maximum 64GB',
    type: 'number',
  },
};

export const Password: Story = {
  args: {
    label: 'Database Password',
    type: 'password',
    placeholder: 'Enter secure password',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Region',
    value: 'us-west-1',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'CPU Cores',
    size: 'small',
    type: 'number',
    placeholder: '2',
  },
};

export const Large: Story = {
  args: {
    label: 'Description',
    size: 'large',
    placeholder: 'Enter detailed description',
  },
};
