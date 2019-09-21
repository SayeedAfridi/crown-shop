import React from 'react'
import { Route} from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'


const Shop = ({match}) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        
    </div>
)

export default Shop