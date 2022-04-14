import React, { Component } from "react";
import { withRouter } from "../../withRouter";

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="navigation-container">
        {this.props.categories.map((cat) => (
          <span
            to={cat.name}
            key={cat.name}
            className={cat.active && "active"}
            onClick={() => this.props.setSelectedCategory(cat.name)}
          >
            {cat.name}
          </span>
        ))}
      </div>
    );
  }
}

export default withRouter(Navigation);
