import React, { useState, FormEvent } from 'react';
import api from '../../service/api';

import { Title, Repositories, Form } from './styles';

interface IRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const response = await api.get<IRepository>(`repos/${newRepo}`);
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  return (
    <>
      <Title>Explore repositórios no GitHub</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </>
        ))}
      </Repositories>

      <Repositories>
        <img src="https://avatars.githubusercontent.com/u/80467897?v=4" alt="Cauã" />

        <div>
          <strong>CauaKath/GitHubRepository</strong>
          <p>Projeto para listar repositórios do GitHub</p>
        </div>
      </Repositories>

      <Repositories>
        <img src="https://avatars.githubusercontent.com/u/80467897?v=4" alt="Cauã" />

        <div>
          <strong>CauaKath/GitHubRepository</strong>
          <p>Projeto para listar repositórios do GitHub</p>
        </div>
      </Repositories>
    </>
  );
};

export default Dashboard;
