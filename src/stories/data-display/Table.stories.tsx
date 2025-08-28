/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table } from './Table';
import { Badge } from './Badge';

const meta: Meta<any> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile table component for displaying lists of resources with sorting, selection, and customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
    bordered: {
      control: { type: 'boolean' },
    },
    striped: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for all stories
const sampleData = [
  {
    id: 'vm-001',
    name: 'web-server-01',
    type: 'Virtual Machine',
    status: 'running',
    region: 'us-east-1',
    cpu: '2 vCPUs',
    memory: '4 GB',
    storage: '50 GB SSD',
    lastModified: '2024-01-15',
  },
  {
    id: 'db-002',
    name: 'postgres-main',
    type: 'Database',
    status: 'running',
    region: 'us-west-2',
    cpu: '4 vCPUs',
    memory: '16 GB',
    storage: '200 GB SSD',
    lastModified: '2024-01-14',
  },
  {
    id: 'vm-003',
    name: 'api-server-02',
    type: 'Virtual Machine',
    status: 'stopped',
    region: 'eu-west-1',
    cpu: '1 vCPU',
    memory: '2 GB',
    storage: '25 GB SSD',
    lastModified: '2024-01-13',
  },
  {
    id: 'lb-004',
    name: 'load-balancer-01',
    type: 'Load Balancer',
    status: 'running',
    region: 'us-east-1',
    cpu: 'N/A',
    memory: 'N/A',
    storage: 'N/A',
    lastModified: '2024-01-12',
  },
  {
    id: 'vm-005',
    name: 'worker-node-01',
    type: 'Virtual Machine',
    status: 'maintenance',
    region: 'ap-southeast-1',
    cpu: '8 vCPUs',
    memory: '32 GB',
    storage: '100 GB SSD',
    lastModified: '2024-01-11',
  },
];

const basicColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'type', header: 'Type', sortable: true },
  { 
    key: 'status', 
    header: 'Status', 
    sortable: true,
    render: (value: string) => (
      <Badge 
        variant={value === 'running' ? 'success' : value === 'stopped' ? 'danger' : 'warning'}
      >
        {value}
      </Badge>
    )
  },
  { key: 'region', header: 'Region', sortable: true },
  { key: 'lastModified', header: 'Last Modified', sortable: true },
];

const detailedColumns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'type', header: 'Type', sortable: true },
  { 
    key: 'status', 
    header: 'Status', 
    sortable: true,
    render: (value: string) => (
      <Badge 
        variant={value === 'running' ? 'success' : value === 'stopped' ? 'danger' : 'warning'}
      >
        {value}
      </Badge>
    )
  },
  { key: 'region', header: 'Region', sortable: true },
  { key: 'cpu', header: 'CPU', sortable: false },
  { key: 'memory', header: 'Memory', sortable: false },
  { key: 'storage', header: 'Storage', sortable: false },
  { key: 'lastModified', header: 'Last Modified', sortable: true },
];

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
  },
};

export const WithSelection: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    selectable: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns: detailedColumns,
    data: [...sampleData, ...sampleData, ...sampleData], // More data to show pagination
    pagination: {
      enabled: true,
      pageSize: 5,
    },
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: 'striped',
  },
};

export const Bordered: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: 'bordered',
  },
};

export const Compact: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    columns: detailedColumns,
    data: sampleData,
    size: 'lg',
  },
};

export const WithSortingAndSelection: Story = {
  args: {
    columns: detailedColumns,
    data: sampleData,
    selectable: true,
    pagination: {
      enabled: true,
      pageSize: 3,
    },
    variant: 'striped',
  },
};

export const EmptyState: Story = {
  args: {
    columns: basicColumns,
    data: [],
  },
};

export const VirtualMachinesOnly: Story = {
  args: {
    columns: detailedColumns,
    data: sampleData.filter(item => item.type === 'Virtual Machine'),
    selectable: true,
  },
};
