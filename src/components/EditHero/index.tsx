import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHeroById, updateHero, uploadPhotos } from '../../api/api';
import noImage from '../../assets/no_image.png';
import './styles.css';
import { IHero } from '../../shared/interfaces';

function EditHero() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<IHero | null>(null);
  const [textValues, setTextValues] = useState({
    nickname: '',
    realName: '',
    originDescription: '',
    superpowers: '',
    catchPhrase: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);

  useEffect(() => {
    const fetchHeroDetails = async (): Promise<void> => {
      try {
        const response = await getHeroById(Number(id));
        setHero(response);
        setTextValues({
          nickname: response.nickname,
          realName: response.realName,
          originDescription: response.originDescription,
          superpowers: response.superpowers,
          catchPhrase: response.catchPhrase,
        });
      } catch (error) {
        console.error('Error fetching hero details:', error);
      }
    };

    fetchHeroDetails();
  }, [id]);

  const handleTextValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTextValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []) as File[];
    setPhotos(files);
  };

  const handleUpdateHero = async () => {
    try {
      if (hero) {
        const updatedHeroData = {...textValues};

        await updateHero(hero.id, updatedHeroData);

        if (photos.length > 0) {
          await uploadPhotos(hero.id, photos);
        }

        navigate('/');
      }
    } catch (error) {
      console.error('Error updating hero:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/');
  };

  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-wrapper">
      <h2>Edit Hero: {hero.nickname}</h2>
      <div>
        <h3>Step 1: Update Text Values</h3>
        <form className="inputs-form">
          <label>
            Nickname:
            <br />
            <input
              type="text"
              name="nickname"
              value={textValues.nickname}
              onChange={handleTextValueChange}
            />
          </label>
          <label>
            Real name:
            <br />
            <input
              type="text"
              name="realName"
              value={textValues.realName}
              onChange={handleTextValueChange}
            />
          </label>
          <label>
            Origin description:
            <br />
            <input
              type="text"
              name="originDescription"
              value={textValues.originDescription}
              onChange={handleTextValueChange}
            />
          </label>
          <label>
            Superpowers:
            <br />
            <input
              type="text"
              name="superpowers"
              value={textValues.superpowers}
              onChange={handleTextValueChange}
            />
          </label>
          <label>
            Catch phrase:
            <br />
            <input
              type="text"
              name="catchPhrase"
              value={textValues.catchPhrase}
              onChange={handleTextValueChange}
            />
          </label>
        </form>
      </div>
      <div className="load-file-wrapper">
        <h3>Step 2: Upload New Photos</h3>
        <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} />
      </div>
      <div className="existing-images-wrapper">
        <h3>Existing Photos</h3>
        <div className="existing-images">
          {hero.images && hero.images.length > 0 ? (
            hero.images.map((image, index) => (
              <img
                key={index}
                className="existing-image"
                src={`http://localhost:5000/${image}`}
                alt={hero.nickname}
              />
            ))
          ) : (
            <img className="existing-image" src={noImage} alt="Not found" />
          )}
        </div>
      </div>
      <button className="btn" onClick={handleUpdateHero}>
        Update Hero
      </button>
      <button className="btn" onClick={handleBackToList}>
        Back to List
      </button>
    </div>
  );
}

export default EditHero;
