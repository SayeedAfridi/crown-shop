import {createSelector} from 'reselect'

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

const selectshop = state => state.shop

export const selectShopCollections = createSelector(
    [selectshop],
    shop => shop.collections
)

export const selectCollection = urlParam => createSelector(   
    [selectShopCollections],
    collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[urlParam]) 
)