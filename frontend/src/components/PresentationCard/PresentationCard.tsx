import React from 'react';
import './PresentationCard.css';

interface SampleCardProps {
  image: string;
  title: string;
  text: string;
  onSelect?: () => void;
}

const PresentationCard: React.FC<SampleCardProps> = ({ image, title, text, onSelect }) => {
  return (
    <div className='presentation-card'>
      <img src={image} alt={title} className='presentation-card-img' />
      <div className='presentation-card-bottom'>
        <h3 className='presentation-card-title'>{title}</h3>
        <p className='presentation-card-text'>{text}</p>
      </div>
      <button className='presentation-card-button' onClick={onSelect}>
        Выбрать
      </button>
    </div>
  );
};

export default PresentationCard;
