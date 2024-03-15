import React from 'react';
import { ViewMode } from 'gantt-task-react';
type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="ViewContainer">
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Hora
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        Cuarto de día
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        Medio día
      </button>
      <button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
        Día
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Semana
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Mes
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Año
      </button>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Mostrar Lista de actividades
      </div>
    </div>
  );
};
