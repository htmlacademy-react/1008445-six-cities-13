import { TReview } from '../types/comment.ts';

export const comments: TReview[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://picsum.photos/200',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62b',
    date: '2019-03-08T14:13:56.569Z',
    user: {
      name: 'Max Payne',
      avatarUrl: 'https://picsum.photos/200',
      isPro: true
    },
    comment: 'Lol crazy.',
    rating: 5
  }
];

