import React, { Component } from "react";
import { withRouter } from "../withRouter";
import { axiosInstance as axios } from "../axios";

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {},
    };
  }

  getProducts = async (selectedCategoryName) => {
    try {
      console.log("🚀 ~ getProducts= ~ selectedCategory", selectedCategoryName);

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
      console.log(
        "🚀 ~ getProducts= ~ response",
        response.data.data.category.products
      );
      // if (response.data.data.categories) {
      //   return this.setActiveCategory(response.data.data.categories);
      // }
      // return [];
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
      await this.getProducts(
        this.props.router.outletContext.selectedCategory.name
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.selectedCategory.name
          ? this.state.selectedCategory.name
          : ""}
      </div>
    );
  }
}

export default withRouter(Category);
