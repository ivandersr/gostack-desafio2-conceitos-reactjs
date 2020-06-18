import React, { useState, useEffect } from 'react';


import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`,
      url: `https://github.com/ivandersr/rep${Date.now()}`,
      techs: ["Node.js", "ReactJS"]
    });

    const repository = response.data;

    setRepositories([
      ...repositories,
      repository
    ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepos = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)
        }
      </ul>
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
