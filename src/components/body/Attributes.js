import React, { Component } from "react";
import { withRouter } from "../../withRouter";

import { AttributesSection } from "./AttributesSection";

export class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Attributes">
        {this.props.attributes && this.props.attributes.length > 0 && (
          <>
            <div className="section">
              {this.props.attributes.map((att) => (
                <AttributesSection
                  key={att.id}
                  attribute={att}
                  selectedAttributes={this.props.selectedAttributes}
                  setSelectedAttributes={(id, item) =>
                    this.props.setSelectedAttributes(id, item)
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Attributes);
