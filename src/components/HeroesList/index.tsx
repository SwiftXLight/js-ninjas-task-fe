import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IHeroResponse } from '../../shared/interfaces';
import Pagination from '../Pagination';
import './styles.css';

function HeroesList() {
  const [heroes, setHeroes] = useState<IHeroResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:5000/heroes', {
        params: {
          page,
          limit: 5,
        },
      });

      const { data, totalHeroes: total } = response.data;
      setHeroes(data);
      setTotalPages(Math.ceil(total / 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className='heroes-list'>
      {heroes.map((hero) => (
        <div key={hero.id}>
          <h2>{hero.nickname}</h2>
          {hero.images && (
            <img
              className='list-image'
              src={`http://localhost:5000/${hero.images}`}
              alt={hero.nickname}
            />
          )}
        </div>
      ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default HeroesList;
