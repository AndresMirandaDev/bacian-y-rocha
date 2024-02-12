export const mockTasks = [
    {
      id: 1,
      description: "Proyecto A",
      category: "Desarrollo",
      assignedTo: "Equipo A",
      progress: 20,
      startDate: "2024-01-01",
      durationInDays: 30,
      subTasks: [
        {
          id: 2,
          description: "Tarea A1",
          category: "Diseño",
          assignedTo: "Persona A",
          progress: 50,
          startDate: "2024-01-02",
          durationInDays: 5,
        },
        {
          id: 3,
          description: "Tarea A2",
          category: "Implementación",
          assignedTo: "Persona B",
          progress: 30,
          startDate: "2024-01-12",
          durationInDays: 5,
        },
      ],
    },
    // Otros proyectos y tareas...
  ];
  