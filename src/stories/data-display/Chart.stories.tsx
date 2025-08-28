/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chart } from './Chart';

const meta: Meta<any> = {
  title: 'Data Display/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chart component for visualizing cloud metrics and data.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<any>;

const cpuData = [
  { label: 'CPU 1', value: 65 },
  { label: 'CPU 2', value: 45 },
  { label: 'CPU 3', value: 80 },
  { label: 'CPU 4', value: 30 },
];

const regionData = [
  { label: 'US East', value: 45, color: '#3B82F6' },
  { label: 'US West', value: 30, color: '#EF4444' },
  { label: 'EU West', value: 20, color: '#10B981' },
  { label: 'Asia', value: 5, color: '#F59E0B' },
];

const trafficData = [
  {
    name: 'Requests',
    data: [
      { x: '00:00', y: 120 },
      { x: '04:00', y: 80 },
      { x: '08:00', y: 200 },
      { x: '12:00', y: 350 },
      { x: '16:00', y: 280 },
      { x: '20:00', y: 180 },
    ],
    color: '#3B82F6'
  },
  {
    name: 'Errors',
    data: [
      { x: '00:00', y: 5 },
      { x: '04:00', y: 2 },
      { x: '08:00', y: 8 },
      { x: '12:00', y: 15 },
      { x: '16:00', y: 12 },
      { x: '20:00', y: 6 },
    ],
    color: '#EF4444'
  }
];

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: cpuData,
    title: 'CPU Usage by Server',
    width: 400,
    height: 300,
    valueFormatter: (value: number) => `${value}%`,
  },
};

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: regionData,
    title: 'Traffic by Region',
    width: 400,
    height: 300,
    showLegend: true,
  },
};

export const LineChart: Story = {
  args: {
    type: 'line',
    data: trafficData,
    title: 'Network Traffic Over Time',
    width: 500,
    height: 300,
    showGrid: true,
    showLegend: true,
  },
};

export const GaugeChart: Story = {
  args: {
    type: 'gauge',
    data: [{ label: 'Memory Usage', value: 75 }],
    title: 'Memory Usage',
    width: 300,
    height: 200,
    gaugeProps: {
      min: 0,
      max: 100,
      unit: '%',
      thresholds: [
        { value: 50, color: '#10B981' },
        { value: 75, color: '#F59E0B' },
        { value: 90, color: '#EF4444' },
      ],
    },
  },
};
