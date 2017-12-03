import React from 'react'
import { withStyles, TextField, Button } from 'material-ui'

const styles = {
  textfield: {
    background: '#fff'
  },
  input: {
    padding: '6px 6px 6px 8px'
  }
}

const AddCard = ({ classes, value, onChange, onAddClick, multiline, label }) => (
  <div>
    <TextField
      fullWidth
      rows={2}
      label={label}
      value={value}
      margin='normal'
      rowsMax={8}
      onChange={onChange}
      multiline={multiline}
      className={classes.textfield}
      InputClassName={classes.input}
    />
    <Button dense raised color='primary' onClick={onAddClick}>
      Add
    </Button>
  </div>
)

export default withStyles(styles)(AddCard)
