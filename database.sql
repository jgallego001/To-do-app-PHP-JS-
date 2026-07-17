CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    completada BOOLEAN DEFAULT FALSE
);
