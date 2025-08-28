import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from './Label';

const meta = {
  title: 'Form Controls/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'section', 'fieldset'],
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Instance Name',
  },
};

export const Required: Story = {
  args: {
    children: 'API Key',
    required: true,
  },
};

export const Section: Story = {
  args: {
    children: 'Network Configuration',
    variant: 'section',
  },
};

export const Fieldset: Story = {
  args: {
    children: 'Instance Settings',
    variant: 'fieldset',
  },
};

export const Small: Story = {
  args: {
    children: 'Port',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: 'Database Configuration',
    size: 'large',
    required: true,
  },
};

export const SectionSmall: Story = {
  args: {
    children: 'Security Settings',
    variant: 'section',
    size: 'small',
  },
};

export const FieldsetLarge: Story = {
  args: {
    children: 'Advanced Configuration',
    variant: 'fieldset',
    size: 'large',
  },
};
