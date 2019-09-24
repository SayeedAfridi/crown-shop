import React from 'react'
import {connect} from 'react-redux'
import { Route} from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {updateCollections} from '../../redux/shop/shop.actions'
import Collection from '../Collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewSpinner = WithSpinner(CollectionsOverview)
const CollectionSpinner = WithSpinner(Collection)

class Shop extends React.Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionref = firestore.collection('collections')
        const {updateCollections} = this.props
        collectionref.get().then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
            this.setState({loading: false})
        })
    }

    render(){
        const {loading} = this.state
        return(
            <div className='shop-page'>
                <Route exact path='/crown-shop/shop' render={(props)=><CollectionsOverviewSpinner isLoading={loading} {...props}/>} />
                <Route path='/crown-shop/shop/:collection' render={(props) => <CollectionSpinner isLoading={loading} {...props}/>} />
            </div>
        )
    }
} 


 const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
 })

export default connect(null, mapDispatchToProps)(Shop)