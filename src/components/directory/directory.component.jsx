import React from 'react'
import {connect} from 'react-redux'
import MenuItem from '../menu-item/menu-item.component'
import './directory.style.scss'
import {selectDirectorySections} from '../../redux/directory/directory.selectors'
import {createStructuredSelector} from 'reselect'

const Directory = ({sections}) => (
  <div className='directory-menu'>
      {
          this.state.sections.map(({id, ...sectionProps}) => (
              <MenuItem key={id} {...sectionProps} />
          ))
      }
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)