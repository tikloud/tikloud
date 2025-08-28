import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { Dropdown } from './Dropdown';

const meta = {
  title: 'Form Controls/Dropdown',
  component: Dropdown,
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
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Region: Story = {
  args: {
    label: 'Region',
    placeholder: 'Select a region...',
    options: [
      { value: 'us-east-1', label: 'US East (N. Virginia)' },
      { value: 'us-west-1', label: 'US West (N. California)' },
      { value: 'us-west-2', label: 'US West (Oregon)' },
      { value: 'eu-west-1', label: 'Europe (Ireland)' },
      { value: 'eu-central-1', label: 'Europe (Frankfurt)' },
      { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
    ],
  },
};

export const OSImage: Story = {
  args: {
    label: 'Operating System',
    value: 'ubuntu-20.04',
    options: [
      { value: 'ubuntu-20.04', label: 'Ubuntu 20.04 LTS' },
      { value: 'ubuntu-22.04', label: 'Ubuntu 22.04 LTS' },
      { value: 'centos-7', label: 'CentOS 7' },
      { value: 'debian-11', label: 'Debian 11' },
      { value: 'windows-2019', label: 'Windows Server 2019', disabled: true },
      { value: 'windows-2022', label: 'Windows Server 2022', disabled: true },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: 'Availability Zone',
    error: true,
    options: [
      { value: 'us-east-1a', label: 'us-east-1a' },
      { value: 'us-east-1b', label: 'us-east-1b' },
      { value: 'us-east-1c', label: 'us-east-1c' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Network',
    value: 'default-vpc',
    disabled: true,
    options: [
      { value: 'default-vpc', label: 'Default VPC' },
      { value: 'custom-vpc', label: 'Custom VPC' },
    ],
  },
};

export const Small: Story = {
  args: {
    label: 'Protocol',
    size: 'small',
    value: 'https',
    options: [
      { value: 'http', label: 'HTTP' },
      { value: 'https', label: 'HTTPS' },
      { value: 'tcp', label: 'TCP' },
      { value: 'udp', label: 'UDP' },
    ],
  },
};

export const Large: Story = {
  args: {
    label: 'Database Engine',
    size: 'large',
    options: [
      { value: 'mysql', label: 'MySQL 8.0' },
      { value: 'postgresql', label: 'PostgreSQL 14' },
      { value: 'mongodb', label: 'MongoDB 5.0' },
      { value: 'redis', label: 'Redis 7.0' },
    ],
  },
};
