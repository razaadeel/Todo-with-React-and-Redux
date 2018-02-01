import React, { Component } from 'react';
import { fb } from '../config/firebase';
import { history } from './Routes'
import Loading from './loading'
import Todo from './todo'
import { connect } from 'react-redux';
import { renderTodo } from '../store/action/action'
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';



class Home extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
        };
    }

    removeTodo(key) {
        this.userRef.child("todos").child(key).remove();
    }

    editTodo(key) {
        this.userRef.child("todos").child(key);
        let value = prompt('Edit todo');
        if (value !== null && value !== '') {
            this.userRef.child("todos").child(key).set(value);
        }

    }
    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    submitTodo = () => {
        if (this.state.value !== '') {
            this.userRef.child("todos").push(this.state.value)
            this.setState({ value: '' })
        }
    }
    removeAllTodo = () => {
        this.userRef.child("todos").remove();
    }

    componentWillMount() {

        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.renderTodo(user);

                let userId = user.uid
                let userRef = fb.database().ref('/users/' + userId);
                this.userRef = userRef
            }
            else {
                history.push('./signin')
            }
        })

    }

    render() {
        return (
            <div>
                {
                    (!this.props.name) ?
                        <Loading />
                        :
                        <div>
                            <h1>{this.props.name}</h1>
                            
                            <Card className='addTodoPaper'>
                                <TextField
                                    hintText="Add Todo"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />

                                <RaisedButton label="Add" primary={true} onClick={this.submitTodo} style={{ margin: 10 }} />
                                <RaisedButton label="delete all" secondary={true} onClick={this.removeAllTodo} style={{ margin: 10 }} />

                            </Card>

                            <Todo todos={this.props.todos} userRef={this.userRef} />
                        </div>
                }

            </div>
        )
    }
}

// export default Home;

function mapStateToProp(state) {
    // console.log(state.todoReducer.todos)
    if (state) {
        return ({
            name: state.todoReducer.name,
            todos: state.todoReducer.todos
        })
    }
}
function mapDispatchToProp(dispatch) {
    return ({
        renderTodo: (user) => { dispatch(renderTodo(user)) }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);