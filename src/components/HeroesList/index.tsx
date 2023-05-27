import React, { useEffect, useState } from 'react';
import { IHeroResponse } from '../../shared/interfaces';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';
import { fetchHeroes, deleteHero, API_URL } from '../../api/api';
import './styles.css';
import noImage from '../../assets/no_image.png';

function HeroesList() {
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState<IHeroResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem('currentPage')) || 1
  );
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [filterMatches, setFilterMatches] = useState<boolean>(true);
  const [noHeroes, setNoHeroes] = useState<boolean>(false);

  useEffect(() => {
    const savedPage = Number(localStorage.getItem('currentPage'));
    setCurrentPage(savedPage || 1);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    fetchData(currentPage, filter);
  }, [currentPage, filter]);

  const fetchData = async (page: number, nickname: string): Promise<void> => {
    try {
      const { data, totalHeroes: total } = await fetchHeroes(page, 5, nickname);
  
      setHeroes(data);
      setTotalPages(Math.ceil(total / 5));
      setFilterMatches(data.length > 0);
      setNoHeroes(data.length === 0);
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
      fetchData(currentPage, filter);
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(event.target.value);
  };

  return (
    <div className='wrapper'>
      <div className='filter'>
        <input type='text' value={filter} onChange={handleFilterChange} placeholder='Filter by nickname' />
      </div>
      <div className='heroes-list'>
        {noHeroes ? (
          <div className='warning'>No heroes found.</div>
        ) : (
          <>
            {heroes.map((hero) => (
              <div key={hero.id} className='hero-item'>
                <h2 className='hero-nickname'>{hero.nickname}</h2>
                {hero.images ? (
                  <img
                    className='hero-image'
                    src={`${API_URL}/${hero.images}`}
                    alt={hero.nickname}
                  />
                ) : (
                  <img
                    className='hero-image'
                    src={noImage}
                    alt='Not found'
                  />
                )}
                <div className='btn-wrapper'>
                  <button onClick={() => handleDelete(hero.id)}>Delete</button>
                  <button onClick={() => handleHeroDetails(hero.id)}>Details</button>
                </div>
              </div>
            ))}
            {filter && !filterMatches && <div className='warning'>No heroes match the filter.</div>}
          </>
        )}
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
