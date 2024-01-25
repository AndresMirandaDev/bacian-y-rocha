import React from 'react';

interface AddRowProps {
  onAddRow: () => void;
}

const AddRow: React.FC<AddRowProps> = ({ onAddRow }) => {
  return (
    <button onClick={onAddRow}>Agregar Fila</button>
  );
};

export default AddRow;
