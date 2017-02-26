import React from 'react'

import DiffFile from './diff_file.jsx'
import Result from './diff_result.jsx'
import compare from '../lib/differ'

export default class DiffForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            texts: [],
            result: []
        }
    }

    render() {
        return (
            <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit.bind(this)}>
                {['first', 'second'].map((title, index) =>
                    <DiffFile title={title} key={index} onChange={this.setText.bind(this, index)}/>
                )}
                <button type="submit" className="pure-button pure-button-primary">Compare</button>
                <Result lines={this.state.result}/>
            </form>
        )
    }

    setText(key, text){
        var texts = this.state.texts;
        texts[key] = text.split("\n")
        this.setState({texts})
    }

    onSubmit(e){
        e.preventDefault()
        var result = compare.apply(null, this.state.texts);
        this.setState({result})

    }
}