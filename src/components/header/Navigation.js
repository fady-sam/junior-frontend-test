import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink
            to={cat.name === "all" ? "/" : cat.name}
            key={cat.name}
            onClick={() => this.props.setSelectedCategory(cat.name)}
            style={{ textDecoration: "none" }}
          >
            {cat.name}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default withRouter(Navigation);
