import {createSelector} from 'reselect'


const selectshop = state => state.shop

export const selectShopCollections = createSelector(
    [selectshop],
    shop => shop.collections
)

export const selectCollection = urlParam => createSelector(   
    [selectShopCollections],
    collections => collections[urlParam]
)