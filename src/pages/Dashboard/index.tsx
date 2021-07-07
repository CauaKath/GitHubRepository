import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
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
    setNewRepo('');
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
        {/**repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))**/}
        <a href="teste">
          <img src="https://avatars.githubusercontent.com/u/80467897?v=4" alt="CauaKath" />

          <div>
            <strong>CauaKath/ProjetoLoja</strong>
            <p>Sistema de cadastro, edição, exclusão e listagem de produtos em Java.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>

      <Repositories>
        <a href="teste">
          <img src="https://avatars.githubusercontent.com/u/80467897?v=4" alt="CauaKath" />

          <div>
            <strong>CauaKath/ProjetoLoja</strong>
            <p>Sistema de cadastro, edição, exclusão e listagem de produtos em Java.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
