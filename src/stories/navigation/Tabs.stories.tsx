import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'minimal'],
      description: 'Tab variant style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the tabs',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of tabs',
    },
    scrollable: {
      control: 'boolean',
      description: 'Allow scrolling when tabs overflow',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button on tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: '📊',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Instance Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Status</div>
            <div className="font-semibold text-green-600">Running</div>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Instance Type</div>
            <div className="font-semibold">t3.medium</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: '📈',
    badge: 3,
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Performance Monitoring</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>CPU Usage</span>
            <span className="font-semibold">45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'logs',
    label: 'Logs',
    icon: '📋',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">System Logs</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
          <div>[2025-08-28 10:30:15] INFO: Service started successfully</div>
          <div>[2025-08-28 10:30:16] INFO: Database connection established</div>
          <div>[2025-08-28 10:30:17] INFO: Ready to serve requests</div>
        </div>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Instance Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Instance Name</label>
            <input type="text" defaultValue="web-server-01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Auto-scaling</label>
            <input type="checkbox" className="mt-1" />
          </div>
        </div>
      </div>
    ),
  },
];

const manyItems = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content for Tab 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content for Tab 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content for Tab 3</div> },
  { id: 'tab4', label: 'Tab 4', content: <div>Content for Tab 4</div> },
  { id: 'tab5', label: 'Tab 5', content: <div>Content for Tab 5</div> },
  { id: 'tab6', label: 'Tab 6', content: <div>Content for Tab 6</div> },
  { id: 'tab7', label: 'Tab 7', content: <div>Content for Tab 7</div> },
  { id: 'tab8', label: 'Tab 8', content: <div>Content for Tab 8</div> },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    defaultActiveId: 'overview',
    variant: 'default',
    size: 'medium',
    position: 'top',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
};

export const Pills: Story = {
  args: {
    ...Default.args,
    variant: 'pills',
  },
  decorators: Default.decorators,
};

export const Underline: Story = {
  args: {
    ...Default.args,
    variant: 'underline',
  },
  decorators: Default.decorators,
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
  },
  decorators: Default.decorators,
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
  decorators: Default.decorators,
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
  decorators: Default.decorators,
};

export const BottomPosition: Story = {
  args: {
    ...Default.args,
    position: 'bottom',
  },
  decorators: Default.decorators,
};

export const LeftPosition: Story = {
  args: {
    ...Default.args,
    position: 'left',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl h-96">
        <Story />
      </div>
    ),
  ],
};

export const RightPosition: Story = {
  args: {
    ...Default.args,
    position: 'right',
  },
  decorators: LeftPosition.decorators,
};

export const Scrollable: Story = {
  args: {
    items: manyItems,
    defaultActiveId: 'tab1',
    scrollable: true,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const Closable: Story = {
  args: {
    ...Default.args,
    closable: true,
  },
  decorators: Default.decorators,
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 2),
      {
        id: 'disabled',
        label: 'Disabled',
        icon: '🚫',
        disabled: true,
        content: <div>This tab is disabled</div>,
      },
      ...sampleItems.slice(2),
    ],
    defaultActiveId: 'overview',
  },
  decorators: Default.decorators,
};

export const NoContent: Story = {
  args: {
    items: [
      { id: 'tab1', label: 'Tab 1' },
      { id: 'tab2', label: 'Tab 2' },
      { id: 'tab3', label: 'Tab 3' },
    ],
    defaultActiveId: 'tab1',
  },
  decorators: Default.decorators,
};
