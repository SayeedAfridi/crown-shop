import React from 'react'
import {connect} from 'react-redux'
import { Route} from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions'
import Collection from '../Collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import {createStructuredSelector} from 'reselect'
import {selectIsFetching, isCollectionsLoaded} from '../../redux/shop/shop.selectors'

const CollectionsOverviewSpinner = WithSpinner(CollectionsOverview)
const CollectionSpinner = WithSpinner(Collection)

class Shop extends React.Component {
    
    componentDidMount() {
        this.props.fetchCollections()
    }

    render(){
        const {isFetching, isLoaded} = this.props
        return(
            <div className='shop-page'>
                <Route exact path='/crown-shop/shop' render={(props)=><CollectionsOverviewSpinner isLoading={isFetching} {...props}/>} />
                <Route path='/crown-shop/shop/:collection' render={(props) => <CollectionSpinner isLoading={!isLoaded} {...props}/>} />
            </div>
        )
    }
} 


 const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetching,
    isLoaded: isCollectionsLoaded
 })

 const mapDispatchToProps = dispatch => ({
     fetchCollections: () => dispatch(fetchCollectionsStartAsync())
 })

export default connect(mapStateToProps, mapDispatchToProps)(Shop)