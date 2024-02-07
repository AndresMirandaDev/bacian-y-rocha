'use client';
import React, { useState } from 'react';
import { FaPlus, FaColumns } from 'react-icons/fa';
import AddRow from '../components/DynamicallyRow';
import AddColumn from '../components/DynamicallyTableCell';

interface FormData {
  [key: string]: string;
}

const DynamicRow: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>([
    {
      campo1: '',
      campo2: '',
      campo3: '',
      campo4: '',
      campo5: '',
      campo6: '',
      campo7: '',
      campo8: '',
    },
  ]);
  const [columnHeaders, setColumnHeaders] = useState<string[]>([
    'Campo 1',
    'Campo 2',
    'Campo 3',
    'Campo 4',
    'Campo 5',
    'Campo 6',
    'Campo 7',
    'Campo 8',
  ]);

  const addRow = () => {
    setFormData([
      ...formData,
      Object.fromEntries(columnHeaders.map((header) => [header, ''])),
    ]);
  };

  const addColumn = () => {
    const newColumnHeader =
      prompt('Ingrese el nombre de la nueva columna') || '';
    setColumnHeaders([...columnHeaders, newColumnHeader]);
    setFormData(formData.map((row) => ({ ...row, [newColumnHeader]: '' })));
  };

  const handleHeaderChange = (index: number, value: string) => {
    const updatedHeaders = [...columnHeaders];
    updatedHeaders[index] = value;
    setColumnHeaders(updatedHeaders);
  };

  const handleInputChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = value;
    setFormData(updatedFormData);
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">OCPage</h1>
      <div className="flex justify-between items-center mb-6">
        <AddRow onAddRow={addRow} />
        <AddColumn onAddColumn={addColumn} />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              {columnHeaders.map((header, index) => (
                <th key={index} className="border px-4 py-2">
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => handleHeaderChange(index, e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                {columnHeaders.map((header, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">
                    <input
                      type="text"
                      value={row[header]}
                      onChange={(e) =>
                        handleInputChange(rowIndex, header, e.target.value)
                      }
                      className="w-full bg-transparent border-none focus:outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicRow;
