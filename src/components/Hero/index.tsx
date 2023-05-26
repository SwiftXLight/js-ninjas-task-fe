import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../../api/api';
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

  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div className='hero-wrapper'>
      <h2>{hero.nickname}</h2>
      <p>Real Name: {hero.realName}</p>
      <p>Origin Description: {hero.originDescription}</p>
      <p>Superpowers: {hero.superpowers}</p>
      <p>Catch Phrase: {hero.catchPhrase}</p>
      <div className="hero-images">
        {hero.images && hero.images.map((image, index) => (
          <img
            key={index}
            className="hero-image"
            src={`http://localhost:5000/${image}`}
            alt={hero.nickname}
          />
        ))}
        {!hero.images && (
          <img
            className="hero-image"
            src={noImage}
            alt="Not found"
          />
        )}
      </div>
      <button onClick={handleBackToList}>Back to List</button>
    </div>
  );
}

export default HeroDetails;
