/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<any> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for representing users or teams in cloud management interfaces.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<any>;

const teamMembers: any = [
  { name: 'John Doe', src: undefined, status: 'online' },
  { name: 'Jane Smith', src: undefined, status: 'away' },
  { name: 'Bob Wilson', src: undefined, status: 'busy' },
  { name: 'Alice Johnson', src: undefined, status: 'offline' },
  { name: 'Charlie Brown', src: undefined },
  { name: 'Diana Prince', src: undefined },
  { name: 'Eve Adams', src: undefined },
];

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'medium',
    shape: 'circle',
  },
};

export const WithStatus: Story = {
  args: {
    name: 'Jane Smith',
    size: 'large',
    showStatus: true,
    status: 'online',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="XS" size="xs" />
      <Avatar name="Small" size="small" />
      <Avatar name="Med" size="medium" />
      <Avatar name="Large" size="large" />
      <Avatar name="XL" size="xl" />
      <Avatar name="Custom" size={80} />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Circle" shape="circle" size="large" />
      <Avatar name="Square" shape="square" size="large" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
    size: 'large',
    backgroundColor: '#3B82F6',
  },
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Online" showStatus status="online" size="large" />
      <Avatar name="Away" showStatus status="away" size="large" />
      <Avatar name="Busy" showStatus status="busy" size="large" />
      <Avatar name="Offline" showStatus status="offline" size="large" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Team Alpha (5 members)</h3>
        <AvatarGroup
          avatars={teamMembers.slice(0, 5)}
          max={4}
          size="medium"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">All Team Members ({teamMembers.length} total)</h3>
        <AvatarGroup
          avatars={teamMembers}
          max={6}
          size="medium"
          onOverflowClick={() => console.log('Show all members')}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Small Group</h3>
        <AvatarGroup
          avatars={teamMembers.slice(0, 3)}
          size="small"
        />
      </div>
    </div>
  ),
};
