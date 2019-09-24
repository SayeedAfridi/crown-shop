import React from 'react'
import {connect} from 'react-redux'
import { Route} from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {updateCollections} from '../../redux/shop/shop.actions'
import Collection from '../Collection/collection.component'

class Shop extends React.Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionref = firestore.collection('collections')
        const {updateCollections} = this.props
        collectionref.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
            this.setState({loading: false})
        })
    }

    render(){
        return(
            <div className='shop-page'>
                <Route exact path='/crown-shop/shop' render={(props)=><CollectionsOverview/>} />
                <Route path='/crown-shop/shop/:collection' component={Collection} />
            </div>
        )
    }
} 


 const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
 })

export default connect(null, mapDispatchToProps)(Shop)