import React, { useEffect, useState } from 'react';
import { IHeroResponse } from '../../shared/interfaces';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';
import { fetchHeroes, deleteHero } from '../../api/api';
import './styles.css';
import noImage from '../../assets/no_image.png';

function HeroesList() {
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState<IHeroResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number): Promise<void> => {
    try {
      const { data, totalHeroes: total } = await fetchHeroes(page, 5);

      setHeroes(data);
      setTotalPages(Math.ceil(total / 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteHero(id);
      fetchData(currentPage);
    } catch (error) {
      console.error('Error deleting hero:', error);
    }
  };

  const handleHeroDetails = async (id: number): Promise<void> => {
    try {
      navigate(`/hero/${id}`);
    } catch (error) {
      console.error('Error getting hero details:', error);
    }
  };

  const handleCreateHero = (): void => {
    navigate('/create');
  };

  return (
    <div className='wrapper'>
      <div className='heroes-list'>
        {heroes.map((hero) => (
          <div key={hero.id} className='hero-item'>
            <h2>{hero.nickname}</h2>
            {hero.images ? (
              <img
                className='hero-image'
                src={`http://localhost:5000/${hero.images}`}
                alt={hero.nickname}
              />
            ) : (
              <img
                className='hero-image'
                src={noImage}
                alt='Not found'
              />
            )}
            <button onClick={() => handleDelete(hero.id)}>Delete</button>
            <button onClick={() => handleHeroDetails(hero.id)}>Details</button>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <button onClick={handleCreateHero}>Create New Hero</button>
    </div>
  );
}

export default HeroesList;
