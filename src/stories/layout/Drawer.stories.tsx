import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../form-controls/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the drawer',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the drawer',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close on backdrop click',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on escape key',
    },
    showBackdrop: {
      control: 'boolean',
      description: 'Show backdrop',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface DrawerWrapperProps {
  children: React.ReactNode;
  buttonLabel?: string;
  [key: string]: unknown;
}

const DrawerWrapper = ({ children, buttonLabel = 'Open Drawer', ...args }: DrawerWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} label={buttonLabel} />
      <Drawer
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  args: {
    title: 'Instance Settings',
    position: 'right',
    size: 'medium',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Basic Configuration</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instance Name
              </label>
              <input
                type="text"
                defaultValue="web-server-01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instance Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>t3.micro</option>
                <option>t3.small</option>
                <option>t3.medium</option>
                <option>t3.large</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Monitoring</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              Enable CloudWatch monitoring
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Enable detailed monitoring
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Enable log collection
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Auto Scaling</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Enable auto scaling
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Instances
              </label>
              <input
                type="number"
                defaultValue="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Instances
              </label>
              <input
                type="number"
                defaultValue="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    ),
    footer: (
      <div className="flex justify-between">
        <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
          Reset to Defaults
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    ),
  },
  render: (args) => <DrawerWrapper {...args} />,
};

export const LeftPosition: Story = {
  args: {
    ...Default.args,
    title: 'Navigation Menu',
    position: 'left',
    children: (
      <div className="space-y-1">
        {[
          { icon: '📊', label: 'Dashboard', active: true },
          { icon: '🖥️', label: 'Instances', count: 12 },
          { icon: '💾', label: 'Storage', count: 8 },
          { icon: '🌐', label: 'Networking' },
          { icon: '📈', label: 'Monitoring' },
          { icon: '⚙️', label: 'Settings' },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              item.active
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
            {item.count && (
              <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>
    ),
    footer: undefined,
  },
  render: (args) => <DrawerWrapper {...args} buttonLabel="Open Menu" />,
};

export const TopPosition: Story = {
  args: {
    title: 'Notifications',
    position: 'top',
    size: 'medium',
    children: (
      <div className="space-y-3">
        {[
          {
            type: 'success',
            title: 'Instance Created',
            message: 'web-server-01 has been successfully created and is now running.',
            time: '2 minutes ago',
          },
          {
            type: 'warning',
            title: 'High CPU Usage',
            message: 'Instance db-server-01 is experiencing high CPU usage (85%).',
            time: '5 minutes ago',
          },
          {
            type: 'info',
            title: 'Maintenance Scheduled',
            message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.',
            time: '1 hour ago',
          },
          {
            type: 'error',
            title: 'Backup Failed',
            message: 'Failed to create backup for instance api-server-02.',
            time: '2 hours ago',
          },
        ].map((notification, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className={`
                w-2 h-2 rounded-full mt-2 flex-shrink-0
                ${notification.type === 'success' ? 'bg-green-500' : ''}
                ${notification.type === 'warning' ? 'bg-yellow-500' : ''}
                ${notification.type === 'info' ? 'bg-blue-500' : ''}
                ${notification.type === 'error' ? 'bg-red-500' : ''}
              `} />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Dismiss</span>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Mark all as read
        </button>
      </div>
    ),
  },
  render: (args) => <DrawerWrapper {...args} buttonLabel="Open Notifications" />,
};

export const BottomPosition: Story = {
  args: {
    title: 'Activity Log',
    position: 'bottom',
    size: 'large',
    children: (
      <div className="space-y-2">
        {[
          { time: '14:32:15', action: 'Instance started', user: 'john.doe', resource: 'web-server-01' },
          { time: '14:31:42', action: 'Security group updated', user: 'jane.smith', resource: 'sg-12345678' },
          { time: '14:30:18', action: 'Volume attached', user: 'john.doe', resource: 'vol-abcdef123' },
          { time: '14:29:55', action: 'Instance stopped', user: 'system', resource: 'api-server-02' },
          { time: '14:28:33', action: 'Snapshot created', user: 'jane.smith', resource: 'snap-987654321' },
        ].map((log, index) => (
          <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-500 font-mono">{log.time}</span>
            <span className="text-sm text-gray-900">{log.action}</span>
            <span className="text-sm text-blue-600">{log.resource}</span>
            <span className="text-sm text-gray-500">by {log.user}</span>
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Showing last 5 activities</span>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View all activities
        </button>
      </div>
    ),
  },
  render: (args) => <DrawerWrapper {...args} buttonLabel="Open Activity Log" />,
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
    title: 'Quick Actions',
    children: (
      <div className="space-y-2">
        {[
          'Start Instance',
          'Stop Instance',
          'Restart Instance',
          'Create Snapshot',
          'View Logs',
          'Connect via SSH',
        ].map((action, index) => (
          <button
            key={index}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
          >
            {action}
          </button>
        ))}
      </div>
    ),
    footer: undefined,
  },
  render: (args) => <DrawerWrapper {...args} buttonLabel="Quick Actions" />,
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
    title: 'Detailed Configuration',
  },
  render: (args) => <DrawerWrapper {...args} buttonLabel="Open Large Drawer" />,
};

export const NoBackdrop: Story = {
  args: {
    ...Default.args,
    showBackdrop: false,
    title: 'No Backdrop Drawer',
  },
  render: (args) => <DrawerWrapper {...args} buttonLabel="Open Without Backdrop" />,
};

export const NoCloseButton: Story = {
  args: {
    ...Default.args,
    showCloseButton: false,
    closeOnBackdrop: false,
    closeOnEscape: false,
    title: 'Persistent Drawer',
    children: (
      <div className="space-y-4">
        <p>This drawer cannot be closed by clicking the backdrop or pressing escape.</p>
        <p>Use the Cancel button below to close it.</p>
      </div>
    ),
    footer: (
      <button className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        Cancel
      </button>
    ),
  },
  render: (args) => <DrawerWrapper {...args} buttonLabel="Open Persistent Drawer" />,
};
