import React from 'react';

import { Header } from './Header';
import { ToDoList } from './ToDoList';
import { ToDoForm } from './ToDoForm';
import '../sass/style.scss';
import uuid from 'uuid/v4';
import { getRandomTagline } from '../helpers.js';
import Storage from '../modules/Storage';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.storageKey = 'react-todo';
    const old = Storage.get(this.storageKey);

    if (old) {
      this.state = JSON.parse(old);
    } else {
      this.state = {
        toDoItems: {}
      };
      //Storage.set(this.storageKey, JSON.stringify(this.state));
    }
  }

  componentDidUpdate() {
    Storage.set(this.storageKey, JSON.stringify(this.state));
  }

  addToDo = text => {
    const todo = {
      uuid: uuid(),
      text: text,
      done: false
    };

    this.setState(state => {
      state.toDoItems[todo.uuid] = todo;
      return state;
    });
  };

  updateTodoText = (uuid, text) => {
    this.setState(state => {
      state.toDoItems[uuid].text = text;
      return state;
    });
  };

  toggleToDoDone = e => {
    const checkbox = e.target;
    this.setState(state => {
      state.toDoItems[checkbox.value].done = checkbox.checked;
      return state;
    });
  };

  removeToDo = uuid => {
    this.setState(state => {
      delete state.toDoItems[uuid];
      return state;
    });
  };

  render() {
    return (
      <div className="container">
        <Header tagline={getRandomTagline()} />
        <ToDoForm addToDo={this.addToDo} />
        <ToDoList
          items={this.state.toDoItems}
          updateTodoText={this.updateTodoText}
          toggleToDoDone={this.toggleToDoDone}
          removeToDo={this.removeToDo}
        />
      </div>
    );
  }
}