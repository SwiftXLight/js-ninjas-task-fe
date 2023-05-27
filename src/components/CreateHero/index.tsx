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
  const [errMessage, setErrMessage] = useState<string | null>();

  const handleTextValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setTextValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    setPhotos(files);
  };

  const handleCreateHero = async (): Promise<void> => {
    try {
      if (
        !textValues.nickname ||
        !textValues.realName ||
        !textValues.originDescription ||
        !textValues.superpowers ||
        !textValues.catchPhrase
      ) {
        setErrMessage('You should fill all required fields!');
        return;
      }
  
      const createdHero = await createHero(textValues);
      const heroId = createdHero.id;
  
      if (photos.length > 0) {
        await uploadPhotos(heroId, photos);
      }
  
      setErrMessage(null);
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
        <h3 className='step-first-header'>Step 1: Fill in Text Values</h3>
        <form className='inputs-form'>
          <label>
            Nickname:
            <br />
            <input
              type="text"
              name="nickname"
              className='input'
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
              className='input'
              value={textValues.realName}
              onChange={handleTextValueChange}
            />
          </label>
          <label>
            Origin description:
            <br />
            <textarea
              name="originDescription"
              value={textValues.originDescription}
              onChange={handleTextValueChange}
              className='textarea'
            />
          </label>
          <label>
            Superpowers:
            <br />
            <textarea
              name="superpowers"
              value={textValues.superpowers}
              onChange={handleTextValueChange}
              className='textarea'
            />
          </label>
          <label>
            Catch phrase:
            <br />
            <textarea
              name="catchPhrase"
              value={textValues.catchPhrase}
              onChange={handleTextValueChange}
              className='textarea'
            />
          </label>
        </form>
      </div>
      <div className='load-file-wrapper'>
        <h3>Step 2: Upload Photos (optional)</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
        />
      </div>
      <button className='btn' onClick={handleCreateHero}>Create Hero</button>
      {errMessage && 
      <p className='error'>{errMessage}</p>}
      <button className='btn' onClick={handleBackToList}>Back to List</button>
    </div>
  );
}

export default CreateHero;
