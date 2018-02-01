//TODO LIST
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Todo extends Component {


  removeTodo(key) {
    this.props.userRef.child("todos").child(key).remove();
  }

  editTodo(key) {
    this.props.userRef.child("todos").child(key);
    let value = prompt('Edit todo');
    if (value !== null && value !== '') {
      this.props.userRef.child("todos").child(key).set(value);
    }
    
  }


  render() {
    let that = this;
    return (

      <div>
        {
          (this.props.todos) ?
            Object.keys(this.props.todos).map(function (key) {
              return (
                <Paper className='todoPaper' key={key}> {that.props.todos[key]}
                  <div >
                    <RaisedButton label="edit" secondary={true} onClick={that.editTodo.bind(that, key)} style={{ margin: 10 }} />
                    <RaisedButton label="delete" secondary={true} onClick={that.removeTodo.bind(that, key)} style={{ margin: 10 }} />
                  </div>
                </Paper>
              )
            })
            :
            <div></div>
        }

      </div>
    );
  }
}

export default Todo;
