import React, { Component } from "react";
import Dragula from 'react-dragula';


class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'ReactInline demo',
            startid:""
        }
        this.createTasks = this.createTasks.bind(this);
        this.dataChanged = this.dataChanged.bind(this);
        
    }
    createTasks(item, i) {
        var inputClass = "read-only-input width-100 " + item.textDecor;
        return <tr>
            <td><input type="checkbox" onChange={this.todoCompleted.bind(this, i)} /></td>
            <td className="width-100"><input className={inputClass} type="text" readOnly={item.checked} defaultValue={item.text} /></td>
            <td><button src="../src/trash.svg" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.delete(item.key) }}>
                <i class="fas fa-trash-alt"></i>
            </button></td>
        </tr>
    }

    delete(key) {
        this.props.delete(key);
    }

    todoCompleted(item, i) {
        this.props.todoCompleted(item, i);
    }

    dataChanged(data) {
        console.log(data)
        this.setState({ ...data })
    }
    customValidateText(text) {
        return (text.length > 0 && text.length < 64);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);
        return (
            <tbody ref={this.dragulaDecorator}>
                {listItems}
            </tbody>
        )
    }
    dragulaDecorator=(componentBackingInstance)=>{
        if(componentBackingInstance){
            let options={ };
            Dragula([componentBackingInstance],options);

        }
    }
}
export default TodoItems;