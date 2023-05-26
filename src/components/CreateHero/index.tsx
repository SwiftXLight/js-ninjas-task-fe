import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { createHero, uploadPhotos } from '../../api/api';

function CreateHero() {
  const navigate = useNavigate();
  const [textValues, setTextValues] = useState({
    nickname: '',
    realName: '',
    originDescription: '',
    superpowers: '',
    catchPhrase: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const handleTextValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTextValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    setPhotos(files);
  };

  const handleCreateHero = async (): Promise<void> => {
    try {
      const createdHero = await createHero(textValues);
      
      const heroId = createdHero.id;

      if (photos.length > 0) {
        await uploadPhotos(heroId, photos);
      }

      navigate('/');
    } catch (error) {
      console.error('Error creating hero:', error);
    }
  };

  const handleBackToList = (): void => {
    navigate('/');
  };

  return (
    <div className='create-wrapper'>
      <h2>Create a New Hero</h2>
      <div>
        <h3>Step 1: Fill in Text Values</h3>
        <form className='inputs-form'>
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
      <div className='load-file-wrapper'>
        <h3>Step 2: Upload Photos</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
        />
      </div>
      <button className='btn' onClick={handleCreateHero}>Create Hero</button>
      <button className='btn' onClick={handleBackToList}>Back to List</button>
    </div>
  );
}

export default CreateHero;
