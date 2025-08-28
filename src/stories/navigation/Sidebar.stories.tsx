import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeId: {
      control: 'text',
      description: 'Currently active item ID',
    },
    collapsed: {
      control: 'boolean',
      description: 'Is sidebar collapsed',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow collapsible sidebar',
    },
    width: {
      control: 'select',
      options: ['narrow', 'medium', 'wide'],
      description: 'Sidebar width when expanded',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the sidebar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    href: '/dashboard',
  },
  {
    id: 'instances',
    label: 'Instances',
    icon: '🖥️',
    badge: 3,
    children: [
      { id: 'instances-vm', label: 'Virtual Machines', href: '/instances/vm' },
      { id: 'instances-containers', label: 'Containers', href: '/instances/containers' },
      { id: 'instances-templates', label: 'Templates', href: '/instances/templates' },
    ],
  },
  {
    id: 'storage',
    label: 'Storage',
    icon: '💾',
    children: [
      { id: 'storage-volumes', label: 'Volumes', href: '/storage/volumes' },
      { id: 'storage-snapshots', label: 'Snapshots', href: '/storage/snapshots' },
      { id: 'storage-backups', label: 'Backups', badge: 12, href: '/storage/backups' },
    ],
  },
  {
    id: 'networking',
    label: 'Networking',
    icon: '🌐',
    children: [
      { id: 'networking-vpc', label: 'VPC', href: '/networking/vpc' },
      { id: 'networking-subnets', label: 'Subnets', href: '/networking/subnets' },
      { id: 'networking-security', label: 'Security Groups', href: '/networking/security' },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: '📈',
    href: '/monitoring',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    href: '/settings',
  },
  {
    id: 'disabled',
    label: 'Disabled Item',
    icon: '🚫',
    disabled: true,
  },
];

const brandElement = (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
      T
    </div>
    <span className="font-bold text-lg">TikLoud</span>
  </div>
);

const footerElement = (
  <div className="text-sm text-gray-400">
    <div>Version 1.0.0</div>
    <div>&copy; 2025 TikLoud</div>
  </div>
);

export const Default: Story = {
  args: {
    items: sampleItems,
    activeId: 'dashboard',
    collapsed: false,
    collapsible: true,
    width: 'medium',
    position: 'left',
    brand: brandElement,
    footer: footerElement,
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

export const Collapsed: Story = {
  args: {
    ...Default.args,
    collapsed: true,
  },
  decorators: Default.decorators,
};

export const Wide: Story = {
  args: {
    ...Default.args,
    width: 'wide',
  },
  decorators: Default.decorators,
};

export const Narrow: Story = {
  args: {
    ...Default.args,
    width: 'narrow',
  },
  decorators: Default.decorators,
};

export const RightPosition: Story = {
  args: {
    ...Default.args,
    position: 'right',
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-gray-100 flex justify-end">
        <Story />
      </div>
    ),
  ],
};

export const WithoutBrand: Story = {
  args: {
    ...Default.args,
    brand: undefined,
  },
  decorators: Default.decorators,
};

export const NotCollapsible: Story = {
  args: {
    ...Default.args,
    collapsible: false,
  },
  decorators: Default.decorators,
};
