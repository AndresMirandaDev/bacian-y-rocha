'use  client';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Item {
  [key: string]: any;
}

interface Props<T extends Item, K extends keyof T> {
  items: T[]; // Data array of type T
  dataKey: K; // Key of the item in data array
  dataToRetrieve: K;
  getValue: Dispatch<SetStateAction<T[K]>>;
}

const AutoCompleteSelect = <T extends Item, K extends keyof T>({
  items,
  dataKey,
  dataToRetrieve,
  getValue,
}: Props<T, K>) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [data, setData] = useState(items);

  useEffect(() => {
    setData(items);
  }, [items]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setValue(inputValue);
    setOpen(true); // Open the dropdown when input changes
    // Filter data based on input value
    setData(
      items.filter((item) =>
        item[dataKey].toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };
  return (
    <>
      <div className="border border-zinc-300 rounded-md">
        <div className="flex items-center p-2">
          <Box className="text-slate-500 pr-3 ">
            <FaSearch />
          </Box>
          <input
            value={value}
            type="text"
            className="w-full border-0"
            onChange={handleInputChange}
          />
          {!open && (
            <Box className="hover:bg-slate-200 cursor-pointer p-1 rounded-full">
              <ChevronDownIcon onClick={() => setOpen(!open)} />
            </Box>
          )}
          {open && (
            <Box className="hover:bg-slate-200 cursor-pointer p-1 rounded-full">
              <ChevronUpIcon onClick={() => setOpen(!open)} />
            </Box>
          )}
        </div>
        <ul
          className={classNames({
            hidden: !open,
            'block transition-all duration-700 h-4/6 no-scrollbar overflow-y-scroll':
              true,
          })}
        >
          {data &&
            data.map((item, index) => {
              return (
                <li
                  key={index}
                  className="px-3 hover:bg-blue-200 cursor-pointer py-1"
                  onClick={() => {
                    setValue(item[dataKey]);
                    setOpen(false);
                    getValue(item[dataToRetrieve]);
                  }}
                >
                  {item[dataKey]}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default AutoCompleteSelect;
