import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '../../static/stylesheets/transition.scss';


const childFactoryCreator = (props) => child => React.cloneElement(child, props)

export default ({ transition = 'normal', duration = 300, pageKey, children }) => (
  <TransitionGroup
    childFactory={childFactoryCreator({ classNames: transition, timeout: duration })}
  >
    <CSSTransition key={pageKey}>
      <div>{ children }</div>
    </CSSTransition>

  </TransitionGroup>
)

