import React from 'react'
import {connect} from 'react-redux'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'
import {createStructuredSelector} from 'reselect'
import {selectShopCollections} from '../../redux/shop/shop.selectors'

const Shop = ({collections}) => (
    <div className='shop-page'>
        {
            collections.map(({id, ...collectionProps}) => (
                <CollectionPreview key={id} {...collectionProps} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
})

export default connect(mapStateToProps)(Shop)