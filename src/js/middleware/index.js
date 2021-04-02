export function loadHomepageData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_HOMEPAGE'){
				const sendState = function(action, state){
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
					var timestamp = new Date().getTime();
					return fetch('https://derive.art/wp-json/derive/v1/home?v='+timestamp)
					.then(response => response.json())
					.then(json => {
						dispatch({ type: 'HOMEPAGE_LOADED', payload: json.data});
					})
					.catch(error => {
						dispatch({ type: 'HOMEPAGE_ERROR', payload: error});
					})
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}

export function loadAboutData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_ABOUT'){
				const sendState = function(action, state){
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
					var timestamp = new Date().getTime();
					return fetch('https://derive.art/wp-json/derive/v1/about?v='+timestamp)
					.then(response => response.json())
					.then(json => {
						dispatch({ type: 'ABOUT_LOADED', payload: json.data});
					})
					.catch(error => {
						dispatch({ type: 'ABOUT_ERROR', payload: error});
					})
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}

export function loadArtistsData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_ARTISTS'){
				const sendState = function(action, state){
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
					var timestamp = new Date().getTime();
					return fetch('https://derive.art/wp-json/derive/v1/artist?v='+timestamp)
					.then(response => response.json())
					.then(json => {
						dispatch({ type: 'ARTISTS_LOADED', payload: json.data});
					})
					.catch(error => {
						dispatch({ type: 'ARTISTS_ERROR', payload: error});
					})
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}

export function loadArtworksData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_ARTWORKS'){
				const sendState = function(action, state){
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
					var timestamp = new Date().getTime();
					return fetch('https://derive.art/wp-json/derive/v1/artwork?v='+timestamp)
					.then(response => response.json())
					.then(json => {
						dispatch({ type: 'ARTWORKS_LOADED', payload: json});
					})
					.catch(error => {
						dispatch({ type: 'ARTWORKS_ERROR', payload: error});
					})
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}

export function loadNewsData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_NEWS'){
				const sendState = function(action, state){
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
					var timestamp = new Date().getTime();
					return fetch('https://derive.art/wp-json/derive/v1/blog?v='+timestamp)
					.then(response => response.json())
					.then(json => {
						dispatch({ type: 'NEWS_LOADED', payload: json.data});
					})
					.catch(error => {
						dispatch({ type: 'NEWS_ERROR', payload: error});
					})
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}

export function loadArtworkDetailsData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_ARTWORK_DETAILS'){
				const sendState = function(action, state){
					if(action.payload.id && action.payload.id !== null){
						const artwork = state.app.artworkDetails.find((f) => f.id === parseInt(action.payload.id))

						if(artwork === undefined) {
							dispatch({ type: 'UNSET_ARTWORK', payload: artwork});
							
							var timestamp = new Date().getTime();
							return fetch('https://derive.art/wp-json/derive/v1/artwork/'+action.payload.id+'?v='+timestamp)
							.then(response => response.json())
							.then(json => {
								dispatch({ type: 'ARTWORK_DETAILS_LOADED', payload: json.data});
								dispatch({ type: 'SET_ARTWORK', payload: json.data});
							})
							.catch(error => {
								dispatch({ type: 'ARTWORK_DETAILS_ERROR', payload: error});
							})
						}else {
							dispatch({ type: 'SET_ARTWORK', payload: artwork});
						}
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
				
					}
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}

export function loadArtistDetailsData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_ARTIST_DETAILS'){
				const sendState = function(action, state){
					if(action.payload.id && action.payload.id !== null){
						const artist = state.app.artistDetails.find((f) => f.id === parseInt(action.payload.id));

						if(artist === undefined) {
							dispatch({ type: 'UNSET_ARTIST'});

							var timestamp = new Date().getTime();
							return fetch('https://derive.art/wp-json/derive/v1/artist/'+action.payload.id+'?v='+timestamp)
							.then(response => response.json())
							.then(json => {
								dispatch({ type: 'ARTIST_DETAILS_LOADED', payload: json.data});
								dispatch({ type: 'SET_ARTIST', payload: json.data});
							})
							.catch(error => {
								dispatch({ type: 'ARTIST_DETAILS_ERROR', payload: error});
							})
						}else {
							dispatch({ type: 'SET_ARTIST', payload: artist});
						}
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
				
					}
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}

export function loadArticleData({ dispatch, getState }){
	return function(next) {
		return function(action) {
			if(action.type === 'LOAD_ARTICLE'){
				const sendState = function(action, state){
					if(action.payload.id && action.payload.id !== null){
						const article = state.app.articles.find((f) => f.id === parseInt(action.payload.id));

						if(article === undefined) {
							dispatch({ type: 'UNSET_ARTICLE'});

							var timestamp = new Date().getTime();
							return fetch('https://derive.art/wp-json/derive/v1/blog/'+action.payload.id+'?v='+timestamp)
							.then(response => response.json())
							.then(json => {
								dispatch({ type: 'ARTICLE_LOADED', payload: json.data});
								dispatch({ type: 'SET_ARTICLE', payload: json.data});
							})
							.catch(error => {
								dispatch({ type: 'ARTICLE_ERROR', payload: error});
							})
						}else {
							dispatch({ type: 'SET_ARTICLE', payload: article});
						}
					// var queryString = '';
					// if(state.localize.options.defaultLanguage){
					// 	queryString = '?lang='+state.localize.options.defaultLanguage;
					// }
				
					}
						
				}
				setTimeout(() => sendState(action, getState()), 0);
			}
			return next(action);
		}
	}
}