import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getHeroById } from '../../api/api';
import noImage from '../../assets/no_image.png';
import './styles.css';
import { IHero } from '../../shared/interfaces';

function HeroDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<IHero | null>(null);

  useEffect(() => {
    const fetchHeroDetails = async (): Promise<void> => {
      try {
        const response = await getHeroById(Number(id));
        setHero(response);
      } catch (error) {
        console.error('Error fetching hero details:', error);
      }
    };

    fetchHeroDetails();
  }, [id]);

  const handleBackToList = (): void => {
    navigate('/');
  };

  const handleEditHero = (): void => {
    navigate(`/edit/${id}`);
  };

  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div className='hero-wrapper'>
      <h2 className='description'>{hero.nickname}</h2>
      <p className='description'>Real Name: {hero.realName}</p>
      <p className='description'>Origin Description: {hero.originDescription}</p>
      <p className='description'>Superpowers: {hero.superpowers}</p>
      <p className='description'>Catch Phrase: {hero.catchPhrase}</p>
      <div className="hero-images">
      {hero.images && hero.images.length > 0 ? (
        hero.images.map((image, index) => (
          <img
            key={index}
            className="hero-image"
            src={`${API_URL}/${image}`}
            alt={hero.nickname}
          />
        ))
      ) : (
        <img
          className="hero-image"
          src={noImage}
          alt="Not found"
        />
      )}
      </div>
      <button className='btn' onClick={handleEditHero}>Edit</button>
      <button className='btn' onClick={handleBackToList}>Back to List</button>
    </div>
  );
}

export default HeroDetails;
