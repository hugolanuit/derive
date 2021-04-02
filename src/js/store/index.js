import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';

import appReducer from "../reducers/index";
import { loadHomepageData, loadArtistsData, loadArtworksData, loadNewsData, loadAboutData, loadArtworkDetailsData, loadArtistDetailsData, loadArticleData } from "../middleware/index";

const rootReducer = combineReducers({
  app: appReducer
});

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(loadHomepageData, loadArtistsData, loadArtworksData, loadNewsData, loadAboutData, loadArtworkDetailsData, loadArtistDetailsData, loadArticleData, thunk)));

export default store;