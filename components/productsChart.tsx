
"use client"
import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

type DataItem = {
  name: string;
  value: number;
};

const data: DataItem[] = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderActiveShape = (props: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle = 0,
    endAngle = 0,
    fill = '#8884d8',
    payload = { name: 'Unknown' },
    percent = 0,
    value = 0,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor: 'start' | 'end' = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }} />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 12 : -12)} y={ey} textAnchor={textAnchor} fill="#FFFFFF">{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const ProductChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onPieEnter = (_: unknown, index: number): void => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductChart;
