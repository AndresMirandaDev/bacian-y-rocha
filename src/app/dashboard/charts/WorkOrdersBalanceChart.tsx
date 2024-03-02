'use client';
import colors from '@/app/styles/colors';
import { WorkOrder } from '@prisma/client';
import { Box, Card, Flex, ScrollArea, Select, Text } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  workOrders: WorkOrder[];
}

const months = [
  { month: 0 },
  { month: 1 },
  { month: 2 },
  { month: 3 },
  { month: 4 },
  { month: 5 },
  { month: 6 },
  { month: 7 },
  { month: 8 },
  { month: 9 },
  { month: 10 },
  { month: 11 },
];

const WorkOrdersBalanceChart = ({ workOrders }: Props) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([
    {
      month: 'Ene',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Feb',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Mar',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Abr',
      negative: 0,
      positive: 0,
    },
    {
      month: 'May',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Jun',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Jul',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Ago',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Sep',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Oct',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Nov',
      negative: 0,
      positive: 0,
    },
    {
      month: 'Dic',
      negative: 0,
      positive: 0,
    },
  ]);

  const prepareData = (month: number) => {
    const yearFilterWo = workOrders.filter((wo) => {
      return new Date(wo.startDate).getFullYear() === year;
    });

    const monthWo = yearFilterWo.filter((wo) => {
      return new Date(wo.startDate).getMonth() == month;
    });

    const positive = monthWo.filter((wo) => {
      const balance =
        wo.workPrice -
        (wo.activities.reduce((accumulator, activity) => {
          return (
            accumulator +
            activity.subTasks.reduce((acc, st) => {
              return acc + st.hours * st.hourPrice;
            }, 0)
          );
        }, 0) +
          wo.materials.reduce((accumulator, m) => {
            return (
              m.quantity * m.unitPrice -
              m.quantity * m.unitPrice * (m.discount / 100) +
              accumulator
            );
          }, 0));
      return balance >= 0;
    });

    const negative = monthWo.filter((wo) => {
      const balance =
        wo.workPrice -
        (wo.activities.reduce((accumulator, activity) => {
          return (
            accumulator +
            activity.subTasks.reduce((acc, st) => {
              return acc + st.hours * st.hourPrice;
            }, 0)
          );
        }, 0) +
          wo.materials.reduce((accumulator, m) => {
            return (
              m.quantity * m.unitPrice -
              m.quantity * m.unitPrice * (m.discount / 100) +
              accumulator
            );
          }, 0));
      return balance < 0;
    });

    const updatedData = [...data];
    updatedData[month].negative = negative.length;
    updatedData[month].positive = positive.length;
    setData(updatedData);
  };

  const initialize = () => {
    months.forEach((m) => {
      prepareData(m.month);
    });
  };

  const years = [];
  for (let year = 2020; year <= 2120; year++) {
    years.push(year);
  }

  useEffect(() => {
    initialize();
  }, [year]);

  return (
    <Flex direction="column" gap="4">
      <Flex>
        <Text className="text-xl">
          Balance de ordenes de trabajo año {year}
        </Text>
      </Flex>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
          data={data}
          margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="positive"
            name="Balance positivo"
            stroke={colors.buttonColors.green}
          />
          <Line
            type="monotone"
            dataKey="negative"
            name="Balance negativo"
            stroke={colors.buttonColors.danger}
          />
        </LineChart>
      </ResponsiveContainer>
      <Flex gap="2">
        <Text className="text-slate-500 p-1">Año</Text>
        <Box>
          <Select.Root
            value={year.toString()}
            onValueChange={(value) => {
              setYear(parseInt(value));
            }}
          >
            <Select.Trigger />
            <Select.Content>
              <ScrollArea style={{ height: 300 }}>
                {years.map((y) => (
                  <Select.Item key={y} value={y.toString()}>
                    {y}
                  </Select.Item>
                ))}
              </ScrollArea>
            </Select.Content>
          </Select.Root>
        </Box>
      </Flex>
    </Flex>
  );
};

export default WorkOrdersBalanceChart;
