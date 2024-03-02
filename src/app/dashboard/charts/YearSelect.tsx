'use client';
import { Select, ScrollArea } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

const YearSelect = () => {
  const [years, setYears] = useState<Number[]>([]);

  const initialize = () => {
    const years = [];

    for (let year = 2020; year <= 3000; year++) {
      years.push(year);
    }

    setYears(years);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        <ScrollArea style={{ height: 300 }}>
          {years.map((year) => (
            <Select.Item key={year.toString()} value={year.toString()}>
              {year.toString()}
            </Select.Item>
          ))}
        </ScrollArea>
      </Select.Content>
    </Select.Root>
  );
};

export default YearSelect;
