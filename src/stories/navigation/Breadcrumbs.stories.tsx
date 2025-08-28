import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the breadcrumbs',
    },
    showHomeIcon: {
      control: 'boolean',
      description: 'Show home icon for first item',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items to show before collapsing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Instances', href: '/instances' },
  { label: 'Virtual Machines', href: '/instances/vm' },
  { label: 'Instance Details' },
];

const longSampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Cloud Services', href: '/cloud' },
  { label: 'Compute', href: '/cloud/compute' },
  { label: 'Instances', href: '/cloud/compute/instances' },
  { label: 'Virtual Machines', href: '/cloud/compute/instances/vm' },
  { label: 'Region US-East', href: '/cloud/compute/instances/vm/us-east' },
  { label: 'Instance Details' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    separator: '/',
    size: 'medium',
    showHomeIcon: false,
  },
};

export const WithHomeIcon: Story = {
  args: {
    ...Default.args,
    showHomeIcon: true,
  },
};

export const CustomSeparator: Story = {
  args: {
    ...Default.args,
    separator: '→',
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Instances', href: '/instances', icon: '🖥️' },
      { label: 'Virtual Machines', href: '/instances/vm', icon: '💻' },
      { label: 'Instance Details', icon: '📋' },
    ],
    separator: '/',
    size: 'medium',
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Instances', href: '/instances' },
      { label: 'Maintenance', disabled: true },
      { label: 'Instance Details' },
    ],
    separator: '/',
    size: 'medium',
  },
};

export const Collapsed: Story = {
  args: {
    items: longSampleItems,
    separator: '/',
    size: 'medium',
    maxItems: 4,
  },
};

export const CollapsedWithHomeIcon: Story = {
  args: {
    ...Collapsed.args,
    showHomeIcon: true,
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
    separator: '/',
    size: 'medium',
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard' },
    ],
    separator: '/',
    size: 'medium',
  },
};
