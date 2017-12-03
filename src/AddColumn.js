import React from 'react'
import { withStyles, TextField, Button } from 'material-ui'

const styles = {
  container: {
    borderRadius: 5,
    background: '#e2e4e6',
    padding: '6px',
    position: 'relative',
    boxSizing: 'border-box',
  },
  inputSection: {
    marginBottom: '0.6rem'
  },
  input: {
    padding: '6px 6px 6px 8px'
  },
  label: {
    padding: '6px 6px 6px 8px'
  },
  textfield: {
    boxSizing: 'border-box',
    backgroundClip: 'content-box',
  },
  bg: {
    height: '40px',
    width: 'calc(100% - 12px)',
    position: 'absolute',
    background: '#fff',
    bottom: '50px',
    borderRadius: '5px',
  }
}

const AddColumn = ({ classes, multiline, value, onChange, onAddClick }) => (
  <div className={classes.container}>
    <div className={classes.bg} />
    <div className={classes.inputSection}>
      <TextField
        fullWidth
        rows={2}
        label='Add a list...'
        value={value}
        rowsMax={8}
        onChange={onChange}
        multiline={multiline}
        className={classes.textfield}
        InputClassName={classes.input}
        labelClassName={classes.label}
      />
    </div>
    <Button dense raised color='primary' onClick={onAddClick}>
      Add
    </Button>
  </div>
)

export default withStyles(styles)(AddColumn)
