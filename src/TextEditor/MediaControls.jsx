import React, { useState, useEffect } from 'react';
import { ImageIcon } from 'icons';
import StyleButton from './StyleButton';

const MEDIA_TYPES = [
  { icon: <ImageIcon />, title: 'Image', type: 'image' }
];

const MediaControls = ({ confirmMedia }) => {
  const [displayUrlInput, setDisplayUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [urlType, setUrlType] = useState('');

  const onToggle = (mediaType) => {
    setDisplayUrlInput(!displayUrlInput);
    setUrlType(mediaType);
    setUrlValue('');
  };

  useEffect(() => {
    if (!displayUrlInput) setUrlType('');
  }, [displayUrlInput]);
  return (
    <div className="editor-controls text-white d-flex flex-column">
      <div className="d-flex">
      {MEDIA_TYPES.map(({ icon, title, type }) => (
    <StyleButton 
          key={type}
          label={icon || title} 
          style={type}
          active={type === urlType} 
          onToggle={onToggle}
      />
    ))}
    </div>
      {displayUrlInput && (
      <div className="d-inline">
        <input 
          type="text"
          value={urlValue}
          onChange={e => setUrlValue(e.target.value)}
          />
          <button style={{ borderRadius: 0, margin: 0}} className="btn btn-dark btn-sm" onClick={() => confirmMedia(urlValue, urlType)}>
            Confirm
          </button>
      </div>
      )}
    </div>
  );
};

export default MediaControls;