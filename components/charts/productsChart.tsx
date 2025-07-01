"use client";

import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { useQuery } from '@tanstack/react-query';

type DataItem = {
  name: string;
  value: number;
};

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    images: string;
    }


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
    fill = '#6366f1',
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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-semibold">
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
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 12 : -12)} y={ey} textAnchor={textAnchor} fill="#FFFFFF" className="text-sm">
        {`PV ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#cccccc"
        className="text-xs"
      >
        {`(Rate ${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const ProductChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
        },
    });

    const stock: DataItem[] = data?.products?.map((ele: Product) => ({
      name: ele.name,
      value: ele.stock,
    })) || [];




  const onPieEnter = (_: unknown, index: number): void => {
    setActiveIndex(index);
  };

  if(isLoading) return <div className='h-48 w-2/5 bg-gray-400 rounded animate-pulse'></div>
  if(isError) return <h2 className='text-red'>Not Found</h2>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={stock}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#6366f1"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductChart;
