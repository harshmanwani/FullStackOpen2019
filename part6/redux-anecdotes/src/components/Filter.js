import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({setFilter}) => {

    const handleChange = (event) => {
        setFilter(event.target.value)
    }

    const style = {
        marginTop: 10
    }

    return(
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}

const mapDispatchToState = {
    setFilter
}

export default connect(null, mapDispatchToState)(Filter)