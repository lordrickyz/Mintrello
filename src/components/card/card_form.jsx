import React from "react";
import { connect } from "react-redux";
import { updateCounter } from "../actions/counterActions";
import { receiveTask } from "../actions/tasksActions";
import { updateColumn } from "../actions/columnActions";

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: `task-${this.props.counter}`,
      content: this.state.content,
      description: "",
    };
    this.props.receiveTask(newTask);
    this.setState({
      content: "",
    });
    this.props.updateCounter();
    const newTaskIds = this.props.column.taskIds.concat(newTask.id);
    const newColumn = { ...this.props.column, taskIds: newTaskIds };
    this.props.updateColumn(newColumn);
  }

  render() {
    return (
      <div className="card-form-container">
        <form onSubmit={this.handleSubmit} className="card-form">
          <input
            type="text"
            value={this.state.title}
            onChange={this.update("title")}
            className="card-input-title"
            placeholder="Enter Card Title"
          />

          <input
            type="submit"
            value="+Add Card"
            disabled={!this.state.title}
            className="card-input-submit"
          />
        </form>
      </div>
    );
  }
}
const mSTP = (state) => {
  return {
    counter: state.counter,
  };
};

const mDTP = (dispatch) => {
  return {
    updateCounter: () => dispatch(updateCounter()),
    receiveTask: (card) => dispatch(receiveTask(card)),
    updateColumn: (column) => dispatch(updateColumn(column)),
  };
};

export default connect(mSTP, mDTP)(CardForm);
