import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onDismiss = () => {
    history.push("/");
  };

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        {/*  
      - react fragment is essentially a GSX looking element 
      - that is going to allow us to return multiple elements or assigned multiple elements to a single variable.
      - when it gets rendered onto the screen it doesn't actually produce any HTML.
      - React fragment is an invisible element
      -Don't have any impact on the DOM
      */}
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={"/"} className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={this.onDismiss}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
