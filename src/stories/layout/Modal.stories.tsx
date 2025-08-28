import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../form-controls/Button';

const meta: Meta<typeof Modal> = {
  title: 'Layout/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge', 'fullscreen'],
      description: 'Size of the modal',
    },
    variant: {
      control: 'select',
      options: ['default', 'danger', 'success', 'warning'],
      description: 'Modal variant style',
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
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ModalWrapperProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

const ModalWrapper = ({ children, ...args }: ModalWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} label="Open Modal" />
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  args: {
    title: 'Create New Instance',
    children: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instance Name
          </label>
          <input
            type="text"
            placeholder="web-server-01"
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
    ),
    actions: [
      {
        label: 'Cancel',
        variant: 'secondary',
        onClick: () => console.log('Cancel clicked'),
      },
      {
        label: 'Create Instance',
        variant: 'primary',
        onClick: () => console.log('Create clicked'),
      },
    ],
    size: 'medium',
    variant: 'default',
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const ConfirmationModal: Story = {
  args: {
    title: 'Confirm Deletion',
    variant: 'danger',
    children: (
      <div className="space-y-3">
        <p className="text-gray-700">
          Are you sure you want to delete the instance <strong>web-server-01</strong>?
        </p>
        <p className="text-sm text-red-600">
          This action cannot be undone. All data on this instance will be permanently lost.
        </p>
      </div>
    ),
    actions: [
      {
        label: 'Cancel',
        variant: 'secondary',
        onClick: () => console.log('Cancel clicked'),
      },
      {
        label: 'Delete Instance',
        variant: 'danger',
        onClick: () => console.log('Delete clicked'),
      },
    ],
    size: 'medium',
  },
  render: (args) => <ModalWrapper {...args} />,
};
