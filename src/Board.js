import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { DragDropContext } from 'react-dnd'
import { withStyles } from 'material-ui'
import HTML5Backend from 'react-dnd-html5-backend'

import { actions } from './ducks'
import Column from './Column'
import AddColumn from './AddColumn'

const styles = {
  container: {
    overflow: 'scroll',
    boxSizing: 'border-box',
    display: 'flex',
    padding: '20px 20px 20px 0',
    width: '100%',
    height: '100%',
    background: 'rgb(0, 121, 191)',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  column: {
    marginLeft: 20,
    flex: '0 0 250px'
  }
}

class Board extends PureComponent {
  static defaultProps = {
    columns: []
  }

  state = {
    addValue: ''
  }

  handleAddChange = event => {
    this.setState({ addValue: event.target.value })
  }

  handleAddClick = () => {
    this.props.createColumn({ name: this.state.addValue })
    this.setState({ addValue: '' })
  }

  handleCardRequestRemove = (event, col, card) => {
    this.props.removeCard({ col, card })
  }

  handleCardRequestColorChange = (col, card, color) => {
    this.props.updateCard({ col, card, data: { color } })
  }

  handleColumnRequestAddCard = (event, col, details) => {
    this.props.createCard({ col, data: { details } })
  }

  handleColumnRequestRemove = (event, col) => {
    this.props.removeColumn(col)
  }

  handleCardRequestMove = (srcCol, srcCard, tgtCol, tgtCard) => {
    this.props.moveCard({
      src: { col: srcCol, crd: srcCard },
      tgt: { col: tgtCol, crd: tgtCard }
    })
  }

  handleColumnRequestMove = (src, tgt) => {
    this.props.moveColumn({ src, tgt })
  }

  render() {
    const { classes, columns } = this.props
    const { addValue } = this.state

    return (
      <div className={classes.container}>
        {columns.map((item, index) => (
          <Column
            key={index}
            col={index}
            width={250}
            index={index}
            className={classes.column}
            onRequestMove={this.handleColumnRequestMove}
            onRequestRemove={event => this.handleColumnRequestRemove(event, index)}
            onRequestAddCard={(event, value) => this.handleColumnRequestAddCard(event, index, value)}
            onCardRequestMove={this.handleCardRequestMove}
            onCardRequestRemove={(event, cardIndex) => this.handleCardRequestRemove(event, index, cardIndex)}
            onCardRequestColorChange={(cardIndex, color) => this.handleCardRequestColorChange(index, cardIndex, color)}
            {...item}
          />
        ))}
        <div className={classes.column}>
          <AddColumn
            value={addValue}
            onChange={this.handleAddChange}
            onAddClick={this.handleAddClick}
          />
        </div>
      </div>
    )
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(state => state, actions),
  withStyles(styles)
)(Board)
