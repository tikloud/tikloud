import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tooltip } from './Tooltip';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This will create a new cloud instance',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{
        padding: '8px 16px',
        backgroundColor: '#1ea7fd',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Create Instance
      </button>
    </Tooltip>
  ),
};

export const HelpText: Story = {
  args: {
    content: 'Choose the amount of CPU cores for your instance. More cores = better performance but higher cost.',
    size: 'large',
  },
  render: (args) => (
    <Tooltip {...args}>
      <span style={{ textDecoration: 'underline', cursor: 'help' }}>
        CPU Cores (?)
      </span>
    </Tooltip>
  ),
};

export const BottomPosition: Story = {
  args: {
    content: 'Click to delete this resource permanently',
    position: 'bottom',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{
        padding: '8px 16px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Delete
      </button>
    </Tooltip>
  ),
};

export const LeftPosition: Story = {
  args: {
    content: 'Enable monitoring',
    position: 'left',
  },
  render: (args) => (
    <Tooltip {...args}>
      <span style={{
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        📊
      </span>
    </Tooltip>
  ),
};

export const RightPosition: Story = {
  args: {
    content: 'Instance is running',
    position: 'right',
  },
  render: (args) => (
    <Tooltip {...args}>
      <span style={{ color: 'green', fontSize: '20px', cursor: 'pointer' }}>●</span>
    </Tooltip>
  ),
};

export const ClickTrigger: Story = {
  args: {
    content: 'This tooltip appears on click and stays until you click again',
    trigger: 'click',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{
        padding: '8px 16px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Click for Info
      </button>
    </Tooltip>
  ),
};

export const SmallTooltip: Story = {
  args: {
    content: 'Small tip',
    size: 'small',
  },
  render: (args) => (
    <Tooltip {...args}>
      <span style={{ fontSize: '12px', color: '#666', cursor: 'pointer' }}>ℹ️</span>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  args: {
    content: 'This is a much longer tooltip content that demonstrates how the tooltip handles text wrapping and maintains readability even with extensive information.',
    size: 'large',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{
        padding: '8px 16px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Hover for Details
      </button>
    </Tooltip>
  ),
};
