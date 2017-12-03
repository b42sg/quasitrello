import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { colors, withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui'

import createStore from './createStore'
import Board from './Board'

const styles = () => {
  const fullSize = {
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
  }

  return {
    '@global': {
      '#app': fullSize,
      '#root': fullSize,
      body: fullSize,
      html: fullSize
    }
  }
}


const theme = createMuiTheme({
  palette: {
    primary: colors.lightGreen,
  }
})

// see https://github.com/mui-org/material-ui/issues/8183#issuecomment-329481035
const originalGetContrastText = theme.palette.getContrastText
theme.palette.getContrastText = color => {
  if (color === theme.palette.primary[500]) {
    return theme.palette.common.white
  }

  return originalGetContrastText(color)
}

const initialState = {
  columns: [
    {
      name: 'Development',
      cards: [
        { details: 'Develop' },
        { details: 'Refactor' }
      ]
    },
    {
      name: 'Manage',
      cards: [
        { details: 'Team 1' },
        { details: 'Team 2', color: 'rgb(255, 87, 34)' },
        { details: 'Company', color: 'rgb(0, 188, 212)' },
      ]
    }
  ]
}

const store = createStore(initialState)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div id='app'>
            <Board />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default withStyles(styles)(App)
