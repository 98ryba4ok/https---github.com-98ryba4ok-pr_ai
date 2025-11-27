
import React from 'react';
import './SampleCard.css';

interface SampleCardProps {
  image: string;    
  title: string;        
  text: string;     
}

const SampleCard: React.FC<SampleCardProps> = ({ image, title, text }) => {
  return (
    <div className='sample-card'>
      <img src={image} alt={title} />
      <div className='sample-card-bottom'>
        <h3 className='sample-card-title'>{title}</h3>
        <p className='sample-card-text'>{text}</p>
      </div>
    </div>
  );
};

export default SampleCard;
