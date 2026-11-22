import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('Connexion...');

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(response => {
        if (!response.ok) throw new Error('Erreur API');
        return response.json();
      })
      .then(data => {
        setTasks(data.tasks);
        setStatus('connectée à PostgreSQL');
      })
      .catch(() => setStatus('déconnectée'));
  }, []);

  return (
    <main className="container">
      <h1>TP04 - Docker Compose</h1>
      <h2>API : {status}</h2>

      <h3>Liste des tâches</h3>

      {tasks.map(task => (
        <div className="task" key={task.id}>
          <span>{task.titre}</span>
          <strong>{task.fait ? 'Terminée' : 'En cours'}</strong>
        </div>
      ))}
    </main>
  );
}

export default App;
