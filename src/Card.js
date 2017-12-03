import React, { Component } from 'react'
import cn from 'classnames'
import { compose } from 'redux'
import DeleteIcon from 'material-ui-icons/Delete'
import ColorLensIcon from 'material-ui-icons/ColorLens'
import { CirclePicker } from 'react-color'
import { DragSource, DropTarget } from 'react-dnd'
import { withStyles, Popover } from 'material-ui'

const styles = theme => ({
  container: {
    minHeight: 30,
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    borderRadius: '3px',
    marginBottom: '6px',
    maxWidth: '300px',
    textDecoration: 'none',
    zIndex: '0',
    cursor: 'pointer',
    display: 'block',
    position: 'relative',
  },
  details: {
    overflow: 'hidden',
    padding: '6px 6px 6px 8px',
    position: 'relative',
    zIndex: '10',
    wordWrap: 'break-word'
  },
  action: {
    backgroundColor: '#edeff0',
    backgroundClip: 'padding-box',
    backgroundOrigin: 'padding-box',
    borderRadius: '3px',
    zIndex: '40',
    opacity: '.8',
    padding: '4px',
    position: 'absolute',
    height: 16,
    width: 16,
    textAlign: 'center'
  },
  action__delete: {
    right: '3px',
    top: '3px',
  },
  action__color: {
    top: 3,
    right: 30
  },
  icon: {
    width: 14,
    height: 14,
    color: '#999'
  },
  colorPopover: {
  },
  colorPopover__paper: {
    padding: theme.spacing.unit,
  },
})

class Card extends Component {
  state = {
    isActionsVisible: false,
    isColorPopoverOpen: false,
    colorPopoverAnchorEl: null
  }


  handleColorPopoverRequestOpen = event => {
    this.setState({ isColorPopoverOpen: true, colorPopoverAnchorEl: event.currentTarget })
  }

  handleColorPopoverRequestClose = () => {
    this.setState({ isColorPopoverOpen: false })
  }

  handleColorPickerChangeComplete = color => {
    this.props.onRequestColorChange(color.hex)
    this.setState({ isColorPopoverOpen: false, isActionsVisible: false })
  }

  handleMouseOut = () => {
    this.setState({ isActionsVisible: false })
  }

  handleMouseOver = () => {
    this.setState({ isActionsVisible: true })
  }

  renderContent() {
    const { classes, details, onRequestRemove, color } = this.props
    const { isColorPopoverOpen, colorPopoverAnchorEl, isActionsVisible } = this.state

    return (
      <div
        style={{ background: color }}
        className={classes.container}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        {isActionsVisible &&
          <div className={cn(classes.action, classes.action__delete)} onClick={onRequestRemove}>
            <DeleteIcon className={classes.icon} />
          </div>
        }
        {isActionsVisible &&
          <div onClick={this.handleColorPopoverRequestOpen} className={cn(classes.action, classes.action__color)}>
            <ColorLensIcon className={classes.icon} />
          </div>
        }
        <Popover
          open={isColorPopoverOpen}
          className={classes.colorPopover}
          classes={{ paper: classes.colorPopover__paper }}
          anchorEl={colorPopoverAnchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onRequestClose={this.handleColorPopoverRequestClose}
        >
          <CirclePicker
            width={120}
            color={color}
            circleSize={14}
            circleSpacing={6}
            onChangeComplete={this.handleColorPickerChangeComplete}
          />
        </Popover>
        <div className={classes.details}>
          {details}
        </div>
      </div>
    )
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props
    return connectDragSource(connectDropTarget(this.renderContent()))
  }
}

const cardSource = {
  beginDrag(props) {
    return { index: props.index, col: props.col }
  },
}

const cardTarget = {
  drop(props, monitor) {
    const { col: draggedCol, index: draggedIndex } = monitor.getItem()
    const { col: overCol, index: overIndex } = props

    if (draggedIndex !== overIndex || draggedCol !== overCol) {
      props.onRequestMove(draggedCol, draggedIndex, overCol, overIndex)
    }
  }
}

export default compose(
  DropTarget('card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  withStyles(styles)
)(Card)
