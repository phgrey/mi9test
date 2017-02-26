import React from 'react'


export default class DiffFile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: props.value || ''
        }
    }

    setValue(text){
        this.setState({value: text})
        this.props.onChange && this.props.onChange(text)
    }

    //here we will read the selected file and put it's content to textarea
    setFile(e){
        var file = e.target.files[0]
        if(!file) throw new Error('No file attached');
        var reader = new FileReader();
        reader.onload = (evt) => this.setValue(evt.target.result)
        reader.onerror = (evt) => {throw new Error('Cannot read file')}
        reader.readAsText(file)
    }

    render() {
        var holder = `Put ${this.props.title} file contents here or select below`;
        return (
            <fieldset>
                <label className="first-capitalize">{`${this.props.title} file`}</label>
                <textarea onChange={(e) => this.setValue(e.target.value)}
                          rows = "12"
                          className="pure-input-1"
                          placeholder={ holder }
                          value = {this.state.value} />
                <input className="pure-input-1" type="file" onChange={this.setFile.bind(this)}/>
            </fieldset>
        );
    }

}