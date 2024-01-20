import { atom } from 'recoil';

export const CommentCount = atom({
  key: 'CommentCount',
  default: 0,
});

export const IsAuthenticated = atom({
  key: 'IsAuthenticated',
  default: false,
});

export const IsActive = atom({
  key: 'IsActive',
  default: true,
});
