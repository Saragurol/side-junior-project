import React, { Component } from 'react'
import {fetchBeers, postBeer} from '../reducers/subBeerReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PostBeer from './PostBeer'

export class AllBeers extends Component {    
    async componentDidMount () {
        await this.props.fetchInitialBeers()
    }
    
    render() {
        const beers = this.props.beers
        const addBeer = this.props.addBeer
        return (
        <div id="beer-list">
            <div className="row">
            {
                beers.map(beer =>
                    (<div key={beer.id}>
                        <div className="col s12 m4">
                        <div className="card">
                            <div className="card-image">
                            <img src={beer.imageUrl} />
                            <span className="card-title">{beer.name}</span>
                            <Link className="btn-floating halfway-fab waves-effect waves-light red" to={`/beers/${beer.id}`}><i className="material-icons">add</i></Link>
                            </div>
                            <div className="card-content">
                            <p>{beer.name}</p>
                            </div>
                        </div>
                        </div>
                     </div>))
            }
            </div>
            <PostBeer addBeer={addBeer} />
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        beers: state.beerSubReducer.beers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitialBeers: () => dispatch(fetchBeers()),
        addBeer: (beer) => dispatch(postBeer(beer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBeers)
