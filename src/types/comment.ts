export type TReview = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}

export type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TReviewData = {
  rating: number;
  comment: string;
}

export type TReviewRequestData = TReviewData

export type TReviews = TReview[]
