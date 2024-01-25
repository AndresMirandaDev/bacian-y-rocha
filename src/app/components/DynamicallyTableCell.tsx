import React from 'react';

interface AddColumnProps {
  onAddColumn: () => void;
}

const AddColumn: React.FC<AddColumnProps> = ({ onAddColumn }) => {
  return (
    <button onClick={onAddColumn}>Agregar Columna</button>
  );
};

export default AddColumn;