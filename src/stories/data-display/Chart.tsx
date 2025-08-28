import { useMemo } from 'react';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface LineDataPoint {
  x: string | number;
  y: number;
}

export interface LineSeriesData {
  name: string;
  data: LineDataPoint[];
  color?: string;
}

export interface ChartProps {
  /** Chart type */
  type: 'line' | 'bar' | 'pie' | 'area' | 'gauge';
  /** Chart data */
  data: ChartDataPoint[] | LineSeriesData[];
  /** Chart title */
  title?: string;
  /** Chart width */
  width?: number;
  /** Chart height */
  height?: number;
  /** Show legend */
  showLegend?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Chart colors */
  colors?: string[];
  /** X-axis label */
  xAxisLabel?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Value formatter */
  valueFormatter?: (value: number) => string;
  /** Gauge-specific props */
  gaugeProps?: {
    min?: number;
    max?: number;
    unit?: string;
    thresholds?: { value: number; color: string }[];
  };
}

const defaultColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
];

/** Simple chart component for visualizing metrics */
export const Chart = ({
  type,
  data,
  title,
  width = 400,
  height = 300,
  showLegend = true,
  showGrid = true,
  colors = defaultColors,
  yAxisLabel,
  valueFormatter = (value) => value.toString(),
  gaugeProps = { min: 0, max: 100, unit: '%' }
}: ChartProps) => {
  const chartData = useMemo(() => {
    if (type === 'line' || type === 'area') {
      return data as LineSeriesData[];
    }
    return data as ChartDataPoint[];
  }, [data, type]);

  const renderBarChart = () => {
    const barData = chartData as ChartDataPoint[];
    const maxValue = Math.max(...barData.map(d => d.value));
    const chartHeight = height - 80; // Account for title and labels

    return (
      <div className="flex flex-col items-center">
        <div className="flex items-end justify-center gap-2 px-4" style={{ height: chartHeight }}>
          {barData.map((item, index) => {
            const barHeight = (item.value / maxValue) * (chartHeight - 40);
            const color = item.color || colors[index % colors.length];
            
            return (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="text-xs text-gray-600">
                  {valueFormatter(item.value)}
                </div>
                <div
                  className="w-8 bg-blue-500 rounded-t transition-all duration-500"
                  style={{ 
                    height: barHeight,
                    backgroundColor: color,
                    minHeight: '4px'
                  }}
                />
                <div className="text-xs text-gray-700 text-center max-w-16 break-words">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
        {yAxisLabel && (
          <div className="text-sm text-gray-600 mt-2">{yAxisLabel}</div>
        )}
      </div>
    );
  };

  const renderPieChart = () => {
    const pieData = chartData as ChartDataPoint[];
    const total = pieData.reduce((sum, item) => sum + item.value, 0);
    const radius = Math.min(width, height) / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    let currentAngle = -90;
    const segments = pieData.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle += angle;

      const largeArcFlag = angle > 180 ? 1 : 0;
      const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'Z'
      ].join(' ');

      return {
        path: pathData,
        color: item.color || colors[index % colors.length],
        label: item.label,
        value: item.value,
        percentage
      };
    });

    return (
      <div className="flex flex-col items-center">
        <svg width={width} height={height}>
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
        {showLegend && (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {segments.map((segment, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-gray-700">
                  {segment.label}: {valueFormatter(segment.value)} ({segment.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderGaugeChart = () => {
    const gaugeData = chartData as ChartDataPoint[];
    const value = gaugeData[0]?.value || 0;
    const { min = 0, max = 100, unit = '%', thresholds = [] } = gaugeProps;
    
    const percentage = ((value - min) / (max - min)) * 100;
    const angle = (percentage / 100) * 180 - 90;
    const radius = Math.min(width, height) / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    // Determine color based on thresholds
    let gaugeColor = colors[0];
    for (const threshold of thresholds) {
      if (value >= threshold.value) {
        gaugeColor = threshold.color;
      }
    }

    const needleX = centerX + (radius - 20) * Math.cos((angle * Math.PI) / 180);
    const needleY = centerY + (radius - 20) * Math.sin((angle * Math.PI) / 180);

    return (
      <div className="flex flex-col items-center">
        <svg width={width} height={height}>
          {/* Background arc */}
          <path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Value arc */}
          <path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${needleX} ${needleY}`}
            fill="none"
            stroke={gaugeColor}
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Center dot */}
          <circle cx={centerX} cy={centerY} r="6" fill={gaugeColor} />
          
          {/* Value text */}
          <text
            x={centerX}
            y={centerY + 40}
            textAnchor="middle"
            className="text-2xl font-bold fill-gray-800"
          >
            {valueFormatter(value)}{unit}
          </text>
        </svg>
        
        <div className="flex justify-between w-full max-w-xs mt-2 text-sm text-gray-600">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    );
  };

  const renderLineChart = () => {
    const lineData = chartData as LineSeriesData[];
    const chartWidth = width - 80;
    const chartHeight = height - 80;
    
    // Get all unique x values and find min/max values
    const allXValues = Array.from(new Set(
      lineData.flatMap(series => series.data.map(point => point.x))
    )).sort();
    
    const allYValues = lineData.flatMap(series => series.data.map(point => point.y));
    const minY = Math.min(...allYValues);
    const maxY = Math.max(...allYValues);
    const yRange = maxY - minY || 1;

    const getXPosition = (x: string | number, index: number) => {
      return (index / (allXValues.length - 1)) * chartWidth + 40;
    };

    const getYPosition = (y: number) => {
      return chartHeight - ((y - minY) / yRange * (chartHeight - 40)) + 20;
    };

    return (
      <div className="flex flex-col">
        <svg width={width} height={height}>
          {/* Grid lines */}
          {showGrid && (
            <g>
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const y = 20 + ratio * (chartHeight - 40);
                return (
                  <line
                    key={`hgrid-${index}`}
                    x1={40}
                    y1={y}
                    x2={width - 20}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                );
              })}
              
              {/* Vertical grid lines */}
              {allXValues.map((x, index) => {
                const xPos = getXPosition(x, index);
                return (
                  <line
                    key={`vgrid-${index}`}
                    x1={xPos}
                    y1={20}
                    x2={xPos}
                    y2={chartHeight - 20}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          )}

          {/* Lines */}
          {lineData.map((series, seriesIndex) => {
            const color = series.color || colors[seriesIndex % colors.length];
            const pathData = series.data
              .map((point, pointIndex) => {
                const xIndex = allXValues.indexOf(point.x);
                const x = getXPosition(point.x, xIndex);
                const y = getYPosition(point.y);
                return `${pointIndex === 0 ? 'M' : 'L'} ${x} ${y}`;
              })
              .join(' ');

            return (
              <g key={series.name}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {series.data.map((point, pointIndex) => {
                  const xIndex = allXValues.indexOf(point.x);
                  const x = getXPosition(point.x, xIndex);
                  const y = getYPosition(point.y);
                  
                  return (
                    <circle
                      key={pointIndex}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={color}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* X-axis labels */}
          {allXValues.map((x, index) => {
            const xPos = getXPosition(x, index);
            return (
              <text
                key={`xlabel-${index}`}
                x={xPos}
                y={height - 5}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {String(x)}
              </text>
            );
          })}

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = 20 + ratio * (chartHeight - 40);
            const value = maxY - ratio * yRange;
            return (
              <text
                key={`ylabel-${index}`}
                x={35}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-gray-600"
              >
                {valueFormatter(value)}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        {showLegend && lineData.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {lineData.map((series, index) => (
              <div key={series.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: series.color || colors[index % colors.length] }}
                />
                <span className="text-sm text-gray-700">{series.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      case 'gauge':
        return renderGaugeChart();
      case 'line':
      case 'area':
        return renderLineChart();
      default:
        return <div className="text-gray-500">Unsupported chart type</div>;
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      {renderChart()}
    </div>
  );
};
