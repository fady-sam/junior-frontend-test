import React, { Component } from "react";
import { withRouter } from "../withRouter";
import { axiosInstance as axios } from "../axios";

import CategoryBody from "../components/body/CategoryBody";

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {},
      products: [],
    };
  }

  getProducts = async (selectedCategoryName) => {
    try {
      const response = await axios.post("", {
        query: `
          query {
            category(input: {title :"${selectedCategoryName}"}) {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items{
                    id
                    displayValue
                    value
                  }
                }
                prices{
                  currency{
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
          }
        `,
      });
      if (response.data.data.category && response.data.data.category.products) {
        return response.data.data.category.products;
      }
      return [];
    } catch (error) {
      return error;
    }
  };

  componentDidMount = async () => {
    // console.log("this.props", this.props);
    // this.setState({
    //   selectedCategory: this.props.router.outletContext.selectedCategory,
    // });
  };

  async componentDidUpdate(prevProps) {
    if (
      this.props.router.outletContext.selectedCategory.name !==
      prevProps.router.outletContext.selectedCategory.name
    ) {
      this.setState({
        selectedCategory: this.props.router.outletContext.selectedCategory,
      });
      // get products
      let products = await this.getProducts(
        this.props.router.outletContext.selectedCategory.name
      );
      console.log("🚀 ~ componentDidUpdate ~ products", products);

      this.setState({
        products,
      });

      console.log("this.state.products :>> ", this.state.products);
    }
  }

  render() {
    return (
      <div className="category-container">
        <div className="category-title">
          {this.state.selectedCategory.name
            ? this.state.selectedCategory.name
            : ""}
        </div>
        <CategoryBody products={this.state.products} />
      </div>
    );
  }
}

export default withRouter(Category);
