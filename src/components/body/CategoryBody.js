import React, { Component } from "react";
import { withRouter } from "../../withRouter";

export class CategoryBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {};

  async componentDidUpdate(prevProps) {}

  render() {
    return (
      <div className="category-body">
        {this.props.products && this.props.products.length > 0
          ? this.props.products[0].name
          : ""}
      </div>
    );
  }
}

export default withRouter(CategoryBody);
