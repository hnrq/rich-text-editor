import React from 'react';

export function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Media = ({ block, contentState }) => {
  const entity = contentState.getEntity(
    block.getEntityAt(0)
  );
  const { src } = entity.getData();
  const type = entity.getType();

  switch (type) {
    case 'image':
      return <img style={{maxWidth: 300}} src={src} alt="inserted" />;
    default:
      return null;
  }
};