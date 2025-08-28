/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { List } from './List';
import { Badge } from './Badge';

const meta: Meta<any> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible list component for displaying activities, items, and other content in vertical or horizontal layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    selectable: {
      control: { type: 'boolean' },
    },
    hoverable: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for recent activities
const recentActivities = [
  {
    id: 'activity-1',
    title: 'Virtual Machine Created',
    description: 'web-server-01 was created in us-east-1 region',
    timestamp: '2 minutes ago',
    icon: '🖥️',
    status: 'success',
    user: 'John Doe',
  },
  {
    id: 'activity-2',
    title: 'Database Backup Completed',
    description: 'postgres-main backup completed successfully',
    timestamp: '15 minutes ago',
    icon: '💾',
    status: 'success',
    user: 'System',
  },
  {
    id: 'activity-3',
    title: 'API Server Maintenance',
    description: 'api-server-02 is under scheduled maintenance',
    timestamp: '1 hour ago',
    icon: '🔧',
    status: 'warning',
    user: 'Infrastructure Team',
  },
  {
    id: 'activity-4',
    title: 'Storage Quota Alert',
    description: 'storage-bucket-01 is 85% full',
    timestamp: '2 hours ago',
    icon: '⚠️',
    status: 'warning',
    user: 'System',
  },
  {
    id: 'activity-5',
    title: 'User Access Granted',
    description: 'jane.smith@company.com granted access to prod environment',
    timestamp: '3 hours ago',
    icon: '👤',
    status: 'info',
    user: 'Admin',
  },
];

// Sample data for resource list
const resourceList = [
  {
    id: 'res-1',
    title: 'Production Web Servers',
    description: '5 active instances',
    icon: '🌐',
    action: 'Manage',
  },
  {
    id: 'res-2',
    title: 'Database Clusters',
    description: '3 running clusters',
    icon: '🗄️',
    action: 'View',
  },
  {
    id: 'res-3',
    title: 'Load Balancers',
    description: '2 configured balancers',
    icon: '⚖️',
    action: 'Configure',
  },
  {
    id: 'res-4',
    title: 'Storage Buckets',
    description: '12 buckets (450 GB used)',
    icon: '🪣',
    action: 'Browse',
  },
];

// Sample navigation items
const navigationItems = [
  { id: 'nav-1', title: 'Dashboard', icon: '📊' },
  { id: 'nav-2', title: 'Compute', icon: '💻' },
  { id: 'nav-3', title: 'Storage', icon: '💾' },
  { id: 'nav-4', title: 'Networking', icon: '🌐' },
  { id: 'nav-5', title: 'Security', icon: '🔒' },
  { id: 'nav-6', title: 'Monitoring', icon: '📈' },
];

export const Default: Story = {
  args: {
    items: recentActivities.map(activity => ({
      id: activity.id,
      content: (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span>{activity.icon}</span>
            <span className="font-medium">{activity.title}</span>
            <Badge variant={activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'warning' : 'info'}>
              {activity.status}
            </Badge>
          </div>
          <div className="text-sm text-gray-600">{activity.description}</div>
          <div className="text-xs text-gray-400 mt-1">{activity.timestamp} • {activity.user}</div>
        </div>
      ),
    })),
  },
};

export const RecentActivities: Story = {
  args: {
    items: recentActivities.map(activity => ({
      id: activity.id,
      content: (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span>{activity.icon}</span>
            <span className="font-medium">{activity.title}</span>
            <Badge variant={activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'warning' : 'info'}>
              {activity.status}
            </Badge>
          </div>
          <div className="text-sm text-gray-600">{activity.description}</div>
          <div className="text-xs text-gray-400 mt-1">{activity.timestamp} • {activity.user}</div>
        </div>
      ),
    })),
    hoverable: true,
  },
};

export const ResourceOverview: Story = {
  args: {
    items: resourceList.map(resource => ({
      id: resource.id,
      content: (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{resource.icon}</span>
            <div>
              <div className="font-medium">{resource.title}</div>
              <div className="text-sm text-gray-600">{resource.description}</div>
            </div>
          </div>
          <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            {resource.action}
          </button>
        </div>
      ),
    })),
    hoverable: true,
  },
};

export const HorizontalNavigation: Story = {
  args: {
    items: navigationItems.map(item => ({
      id: item.id,
      content: (
        <div className="flex items-center gap-2">
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </div>
      ),
    })),
    orientation: 'horizontal',
    hoverable: true,
  },
};

export const SelectableList: Story = {
  args: {
    items: resourceList.map(resource => ({
      id: resource.id,
      content: (
        <div className="flex items-center gap-3">
          <span className="text-xl">{resource.icon}</span>
          <div>
            <div className="font-medium">{resource.title}</div>
            <div className="text-sm text-gray-600">{resource.description}</div>
          </div>
        </div>
      ),
    })),
    selectable: true,
    hoverable: true,
  },
};

export const CompactList: Story = {
  args: {
    items: navigationItems.map(item => ({
      id: item.id,
      content: (
        <div className="flex items-center gap-2">
          <span>{item.icon}</span>
          <span className="text-sm">{item.title}</span>
        </div>
      ),
    })),
    size: 'sm',
    hoverable: true,
  },
};

export const LargeList: Story = {
  args: {
    items: recentActivities.slice(0, 3).map(activity => ({
      id: activity.id,
      content: (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{activity.icon}</span>
            <span className="text-lg font-medium">{activity.title}</span>
            <Badge variant={activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'warning' : 'info'}>
              {activity.status}
            </Badge>
          </div>
          <div className="text-gray-600 mb-2">{activity.description}</div>
          <div className="text-sm text-gray-400">{activity.timestamp} • {activity.user}</div>
        </div>
      ),
    })),
    size: 'lg',
    hoverable: true,
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
  },
};
