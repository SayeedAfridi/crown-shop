import {createSelector} from 'reselect'


const selectshop = state => state.shop

export const selectShopCollections = createSelector(
    [selectshop],
    shop => shop.collections
)

export const selectCollectionsPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = urlParam => createSelector(   
    [selectShopCollections],
    collections => collections[urlParam]
)