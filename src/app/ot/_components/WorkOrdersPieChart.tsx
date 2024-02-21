'use client';
import Spinner from '@/app/components/Spinner';
import { WorkOrder } from '@prisma/client';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from 'recharts';

interface Props {
  delayed: WorkOrder[];
  fullfilled: WorkOrder[];
}

const WorkOrdersPieChart = ({ delayed, fullfilled }: Props) => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const colors = ['#57CC99', '#E76F51'];

  const prepareData = () => {
    setData([
      {
        name: 'Entregadas a tiempo',
        value: fullfilled.length,
      },
      {
        name: 'Retrasadas',
        value: delayed.length,
      },
    ]);
  };

  useEffect(() => {
    prepareData();
    setLoading(false);
  }, [delayed, fullfilled]);

  if (loading)
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    );

  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">O.T cumplidas vs retrasadas</Text>
      </Box>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default WorkOrdersPieChart;
