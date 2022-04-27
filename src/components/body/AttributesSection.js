import React, { Component } from "react";
import { withRouter } from "../../withRouter";

import { connect } from "react-redux";

export class AttributesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setSelectedAttribute = (id) => {
    if (this.props.attribute.items && this.props.attribute.items.length > 0) {
      let item = this.props.attribute.items.find((item) => {
        return id && item.id === id;
      });
      item = item ? item : this.props.attribute.items[0];

      this.props.setSelectedAttributes(this.props.attribute.id, item);
    }
  };

  componentDidMount = async () => {
    this.setSelectedAttribute();
  };

  render() {
    return (
      <div>
        {this.props.attribute && (
          <div>
            <div className="label">{this.props.attribute.name}</div>
            <div className={this.props.attribute.type}>
              {this.props.attribute.items.map((item) => (
                <div
                  key={item.id}
                  className={
                    this.props.selectedAttributes[this.props.attribute.id] &&
                    item.id ===
                      this.props.selectedAttributes[this.props.attribute.id].id
                      ? "selected"
                      : ""
                  }
                  onClick={() => this.setSelectedAttribute(item.id)}
                >
                  <span
                    style={
                      this.props.attribute.type === "swatch"
                        ? {
                            backgroundColor: `${item.value}`,
                          }
                        : {}
                    }
                  >
                    {this.props.attribute.type === "text" && item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { currency } = store;
  return { currency };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AttributesSection));
