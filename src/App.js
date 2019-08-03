import React, { Component } from 'react'
import marked from 'marked'

import { sampleText } from './sampleText'

class App extends Component {
  state = {
    text: sampleText
  }

  componentDidMount() {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }

  componentDidUpdate() {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  handleChange = e => {
    const text = e.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  render() {
    return (
      <div className='App'>
        <div className='container mt-4'>
          <div className='row'>
            <div className='col'>
              <textarea
                onChange={this.handleChange}
                value={this.state.text}
                className='form-control'
                rows='35'
              />
            </div>
            <div className='col'>
              <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
