import React from 'react'
import {connect} from 'react-redux'
import CollectionPreview from '../collection-preview/collection-preview.component'
import {createStructuredSelector} from 'reselect'
import {selectCollectionsPreview} from '../../redux/shop/shop.selectors'

import './collections-overview.style.scss'

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
        {
            collections.map(({id, ...collectionProps}) => (
                <CollectionPreview key={id} {...collectionProps} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsPreview
})


export default connect(mapStateToProps)(CollectionsOverview)