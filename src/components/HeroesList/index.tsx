import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IHeroResponse } from '../../shared/interfaces';

function HeroesList() {
  const [heroes, setHeroes] = useState<IHeroResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/heroes', {
          params: {
            page: 1,
            limit: 5,
          },
        });
  
        const { data } = response;
        setHeroes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      {heroes.map(hero => (
        <div key={hero.id}>
          <h2>{hero.nickname}</h2>
          {hero.images && <img src={hero.images} alt={hero.nickname} />}
        </div>
      ))}
    </div>
  );
  
}

export default HeroesList;
