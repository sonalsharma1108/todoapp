import React, { Component } from "react";
import TodoItems from "./TodoItems";


class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.todoCompleted = this.todoCompleted.bind(this);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now(),
                checked: false,
                textDecor: null
            };
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            },(e) => {
                // this.dragTable(e);
            });
        }
        
        this._inputElement.value = "";
        e.preventDefault();
    }
    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        });
        this.setState({
            items: filteredItems
        });
    }
    todoCompleted(i) {
        var todo = this.state.items;
        if (!todo[i].checked) {
            todo[i].checked = true;
            todo[i].textDecor = 'done'
            this.setState({
                todo
            });
        }
        else {
            todo[i].checked = false;
            todo[i].textDecor = null
            this.setState({
                todo
            });
        }
    };
       render() {
        return (
            <div className="todoListMain" >
                <form class="card p-2" onSubmit={this.addItem}>
                    <div class="input-group">

                        <input className="form-control" ref={(a) => this._inputElement = a}
                            placeholder="Enter here">
                        </input>
                        <div className="input-group-append">
                            <button className="btn" type="submit">ADD</button>
                        </div>

                    </div>
                </form>
                <div>
                    <table id="todoTable" > 
                        <TodoItems entries={this.state.items} 
                            delete={this.deleteItem} todoCompleted={this.todoCompleted} />
                    </table>
                </div>
            </div>
        );
    }
 
    }
  

export default TodoList;