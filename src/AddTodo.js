import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


class AddTodo extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    submitTodo = () => {
        if (this.state.value !== '') {
            this.props.userRef.child("todos").push(this.state.value)
            this.setState({ value: '' })
        }
    }
    removeAllTodo = () =>{
        this.props.userRef.child("todos").remove();
    }


    render() {
        return (
            <div>
                <Card className='addTodoPaper'>
                    <TextField
                         hintText="Add Todo"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />

                    <RaisedButton label="Add" primary={true} onClick={this.submitTodo} style={{ margin: 10 }} />
                    <RaisedButton label="delete all" secondary={true} onClick={this.removeAllTodo} style={{ margin: 10 }} />

                </Card>
            </div>
        );
    }
}

export default AddTodo;