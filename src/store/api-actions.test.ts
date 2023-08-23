import { createAPI } from '../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { TState } from '../types/state.ts';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeOffer,
  makeFakePreviewOffer, makeFakeReview,
  makeFakeServerReplay
} from '../mocks/test-mocks.ts';
import { APIRoute } from '../const.ts';
import * as userDataStorage from '../services/user-data.ts';
import {
  checkAuthAction,
  getFavoriteOffersAction,
  getNearOffersAction,
  getOfferAction,
  getOffersAction, getReviewsAction,
  loginAction, logoutAction
} from './api-actions.ts';
import { TAuthData } from '../types/auth-data.ts';
describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [ thunk.withExtraArgument(axios) ];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { offers: [] }});
  });

  describe('getOffersAction', () => {
    it('should dispatch "getOffersAction.pending", "getOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [ makeFakePreviewOffer() ];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(getOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof getOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getOffersAction.pending.type,
        getOffersAction.fulfilled.type,
      ]);

      expect(getOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "getOffersAction.pending", "getOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(getOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersAction.pending.type,
        getOffersAction.rejected.type,
      ]);
    });
  });
  describe('getOfferAction', () => {
    it('should dispatch "getOfferAction.pending", "getOfferAction.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${ APIRoute.Offers }/${ mockOffer.id }`).reply(200, mockOffer);

      await store.dispatch(getOfferAction({ offerId: mockOffer.id }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof getOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getOfferAction.pending.type,
        getOfferAction.fulfilled.type,
      ]);

      expect(getOffersActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "getOfferAction.pending", "getOfferAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${ APIRoute.Offers }/${ mockOffer.id }`).reply(400, []);

      await store.dispatch(getOfferAction({ offerId: mockOffer.id }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOfferAction.pending.type,
        getOfferAction.rejected.type,
      ]);
    });
  });
  describe('getReviewsAction', () => {
    it('should dispatch "getReviewsAction.pending", "getReviewsAction.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakeOffer();
      const mockReviews = [ makeFakeReview() ];
      mockAxiosAdapter.onGet(`${ APIRoute.Reviews }/${ mockOffer.id }`).reply(200, mockReviews);

      await store.dispatch(getReviewsAction({ offerId: mockOffer.id }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getReviewsAction.pending.type,
        getReviewsAction.fulfilled.type,
      ]);

      expect(getReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "getReviewsAction.pending", "getReviewsAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${ APIRoute.Reviews }/${ mockOffer.id }`).reply(400, []);

      await store.dispatch(getReviewsAction({ offerId: mockOffer.id }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getReviewsAction.pending.type,
        getReviewsAction.rejected.type,
      ]);
    });
  });
  describe('getFavoriteOffersAction', () => {
    it('should dispatch "getFavoriteOffersAction.pending", "getFavoriteOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [ makeFakePreviewOffer() ];
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, mockOffers);

      await store.dispatch(getFavoriteOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFavoriteOffersAction.pending.type,
        getFavoriteOffersAction.fulfilled.type,
      ]);

      expect(getReviewsActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "getFavoriteOffersAction.pending", "getFavoriteOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400, []);

      await store.dispatch(getFavoriteOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoriteOffersAction.pending.type,
        getFavoriteOffersAction.rejected.type,
      ]);
    });
  });
  describe('getNearOffersAction', () => {
    it('should dispatch "getNearOffersAction.pending", "getNearOffersAction.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakePreviewOffer();
      const mockOffers = [ mockOffer ];
      mockAxiosAdapter.onGet(`${ APIRoute.Offers }/${ mockOffer.id }/nearby`).reply(200, mockOffers);

      await store.dispatch(getNearOffersAction({ offerId: mockOffer.id }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getNearOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getNearOffersAction.pending.type,
        getNearOffersAction.fulfilled.type,
      ]);

      expect(getReviewsActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "getNearOffersAction.pending", "getNearOffersAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakePreviewOffer();
      mockAxiosAdapter.onGet(`${ APIRoute.Offers }/${ mockOffer.id }/nearby`).reply(400, []);

      await store.dispatch(getNearOffersAction({ offerId: mockOffer.id }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getNearOffersAction.pending.type,
        getNearOffersAction.rejected.type,
      ]);
    });
  });
  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        getFavoriteOffersAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });
  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: TAuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = makeFakeServerReplay();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        getOffersAction.pending.type,
        getFavoriteOffersAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveUserData" once with the received user data', async () => {
      const fakeUser: TAuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = makeFakeServerReplay();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveUserData = vi.spyOn(userDataStorage, 'setUserData');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveUserData).toBeCalledTimes(1);
      expect(mockSaveUserData).toBeCalledWith(fakeServerReplay);
    });
  });
  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        getOffersAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "removeUserData" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropUserData = vi.spyOn(userDataStorage, 'removeUserData');

      await store.dispatch(logoutAction());

      expect(mockDropUserData).toBeCalledTimes(1);
    });
  });
});
