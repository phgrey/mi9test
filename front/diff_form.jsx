import React from 'react'

import DiffFile from './diff_file.jsx'


export default class DiffForm extends React.Component{
    render() {
        return (
            <form className="pure-form pure-form-stacked">
                <DiffFile title="first"/>
                <DiffFile title="second"/>
                <button type="submit" className="pure-button pure-button-primary">Compare</button>
            </form>
        )
    }

}