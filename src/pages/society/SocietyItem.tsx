import React from 'react';
export type HandleClickType=(x:string)=>void
export const SocietyItem = ({ data: soceity }: { data: SoceityModel }) => {
  return (
    <div key={soceity.id} >
      <h2>{soceity.name}</h2>
      <p>President: {soceity.president}</p>
      <p>Members: {soceity.members}</p>
      <p>Meeting Day: {soceity.meetingDay}</p>
      <p>{soceity.description}</p>
      <img
        src={soceity.photo}
        alt={soceity.name}
        style={{ width: '100px', height: 'auto' }}
      />
    </div>
  );
};
