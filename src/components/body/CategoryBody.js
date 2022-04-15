import React, { Component } from "react";
import { withRouter } from "../../withRouter";

import CategoryProductCard from "./CategoryProductCard";
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
        {this.props.products.map((product, index) => (
          <CategoryProductCard
            key={product.id}
            product={product}
            productIndex={index}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(CategoryBody);
