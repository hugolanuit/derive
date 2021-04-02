export function loadHomepage(){
	return { type: 'LOAD_HOMEPAGE'}
}

export function loadAbout(){
	return { type: 'LOAD_ABOUT'}
}

export function loadArtists(){
	return { type: 'LOAD_ARTISTS'}
}

export function getArtistDetails(id){
	if(id && id !== null){
		return { type: 'LOAD_ARTIST_DETAILS', payload: {id}}
	} else {
		return { type: 'UNSET_ARTIST'}
	}
}

export function loadArtworks(){
	return { type: 'LOAD_ARTWORKS'}
}

export function getArtworkDetails(id){
	if(id && id !== null){
		return { type: 'LOAD_ARTWORK_DETAILS', payload: {id}}
	} else {
		return { type: 'UNSET_ARTWORK'}
	}
	
}

export function loadNews(){
	return { type: 'LOAD_NEWS'}
}

export function getArticle(id){
	if(id && id !== null){
		return { type: 'LOAD_ARTICLE', payload: {id}}
	} else {
		return { type: 'UNSET_ARTICLE'}
	}
}