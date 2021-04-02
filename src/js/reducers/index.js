
const initialState = {
	homepage: null,
	artists: [],
	artistDetails: [],
	artist: null,
	artworks: null,
	artworkDetails: [],
	artwork: null,
	news: [],
	about: null,
	articles: [],
	article: null

};

function appReducer(state = initialState, action){

	if (action.type === 'HOMEPAGE_LOADED'){
		return Object.assign({}, state, {
			homepage: action.payload
		});
	} else if (action.type === 'ARTISTS_LOADED'){
		return Object.assign({}, state, {
			artists: action.payload
		});
	} else if (action.type === 'ARTWORKS_LOADED'){
		return Object.assign({}, state, {
			artworks: action.payload
		});
	} else if (action.type === 'NEWS_LOADED'){
		return Object.assign({}, state, {
			news: action.payload
		});
	} else if (action.type === 'ABOUT_LOADED'){
		return Object.assign({}, state, {
			about: action.payload
		});
	} else if (action.type === 'ARTWORK_DETAILS_LOADED'){
		return Object.assign({}, state, {
			artworkDetails: state.artworkDetails.concat(action.payload)
		});
	} else if (action.type === 'SET_ARTWORK'){
		return Object.assign({}, state, {
			artwork: action.payload
		});
	} else if (action.type === 'UNSET_ARTWORK'){
		return Object.assign({}, state, {
			artwork: null
		});
	} else if (action.type === 'ARTIST_DETAILS_LOADED'){
		return Object.assign({}, state, {
			artistDetails: state.artistDetails.concat(action.payload)
		});
	} else if (action.type === 'SET_ARTIST'){
		return Object.assign({}, state, {
			artist: action.payload
		});
	} else if (action.type === 'UNSET_ARTIST'){
		return Object.assign({}, state, {
			artist: null
		});
	}  else if (action.type === 'ARTICLE_LOADED'){
		return Object.assign({}, state, {
			articles: state.articles.concat(action.payload)
		});
	} else if (action.type === 'SET_ARTICLE'){
		return Object.assign({}, state, {
			article: action.payload
		});
	} else if (action.type === 'UNSET_ARTICLE'){
		return Object.assign({}, state, {
			article: null
		});
	} 

	return state;
};

export default appReducer;