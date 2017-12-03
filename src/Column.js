import React, { Component } from 'react'
import cn from 'classnames'
import { compose } from 'redux'
import { DragSource, DropTarget } from 'react-dnd'
import { withStyles } from 'material-ui'
import DeleteIcon from 'material-ui-icons/Delete'

import Card from './Card'
import AddCard from './AddCard'

const styles = {
  container: {
    position: 'relative',
    background: '#e2e4e6',
    borderRadius: 5,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    height: 34,
    overflow: 'hidden',
    boxSizing: 'border-box',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    padding: '8px 40px 10px 8px'
  },
  cards: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginBottom: '0',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 4px',
    padding: '0 4px',
    zIndex: 1,
  },
  addCard: {
    margin: '0 4px',
    padding: '10px 4px'
  },
  remove: {
    cursor: 'pointer',
    backgroundColor: '#c5cccf',
    backgroundClip: 'padding-box',
    backgroundOrigin: 'padding-box',
    borderRadius: '3px',
    zIndex: '40',
    opacity: '.8',
    padding: '4px',
    position: 'absolute',
    height: 16,
    width: 16,
    textAlign: 'center',
    right: '3px',
    top: '3px',
  },
  removeIcon: {
    width: 14,
    height: 14,
    color: '#999'
  }
}

class Column extends Component {
  static defaultProps = {
    cards: [],
    cardsOrder: []
  }

  state = {
    addValue: ''
  }

  handleAddChange = event => {
    this.setState({ addValue: event.target.value })
  }

  handleAddClick = event => {
    this.props.onRequestAddCard(event, this.state.addValue)
    this.setState({ addValue: '' })
  }


  renderContent() {
    const {
      col,
      name,
      width,
      cards,
      classes,
      className,
      onRequestRemove,
      onCardRequestMove,
      onCardRequestRemove,
      onCardRequestColorChange,
    } = this.props

    const { addValue } = this.state

    return (
      <div className={cn(classes.container, className)} style={{ width }}>
        <div className={classes.remove} onClick={onRequestRemove}>
          <DeleteIcon className={classes.removeIcon} />
        </div>
        <div className={classes.name} title={name}>
          {name}
        </div>
        <div className={classes.cards}>
          {cards.map((item, index) => (
            <Card
              key={index}
              col={col}
              index={index}
              onRequestMove={onCardRequestMove}
              onRequestRemove={event => onCardRequestRemove(event, index)}
              onRequestColorChange={color => onCardRequestColorChange(index, color)}
              {...item}
            />
          ))}
        </div>
        <div className={classes.addCard}>
          <AddCard
            multiline
            value={addValue}
            onChange={this.handleAddChange}
            onAddClick={this.handleAddClick}
          />
        </div>
      </div>
    )
  }

  render() {
    const { connectColumnDropTarget, connectColumnDragSource, connectCardDropTarget } = this.props
    return connectCardDropTarget(connectColumnDropTarget(connectColumnDragSource(this.renderContent())))
  }
}

const cardTarget = {
  drop(props, monitor) {
    const { cards, index } = props
    const { col: draggedCol, index: draggedIndex } = monitor.getItem()

    if (cards.length === 0 && props.onCardRequestRemove) {
      props.onCardRequestMove(draggedCol, draggedIndex, index, 0)
    }
  }
}

const columnSource = {
  beginDrag(props) {
    return { index: props.index }
  },
}

const columnTarget = {
  drop(props, monitor) {
    const { index: draggedIndex } = monitor.getItem()
    const { index: overIndex } = props

    if (draggedIndex !== overIndex && props.onRequestMove) {
      props.onRequestMove(draggedIndex, overIndex)
    }
  }
}


export default compose(
  DropTarget('card', cardTarget, connect => ({
    connectCardDropTarget: connect.dropTarget(),
  })),
  DropTarget('column', columnTarget, connect => ({
    connectColumnDropTarget: connect.dropTarget(),
  })),
  DragSource('column', columnSource, (connect, monitor) => ({
    connectColumnDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  withStyles(styles)
)(Column)
