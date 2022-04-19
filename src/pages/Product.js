import React, { Component } from "react";
import { withRouter } from "../withRouter";
import { axiosInstance as axios } from "../axios";
import ImageSlideShow from "../components/body/ImageSlideShow";
import ProductDetails from "../components/body/ProductDetails";

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: null,
    };
  }

  getProductDetails = async (product_id) => {
    try {
      const response = await axios.post("", {
        query: `
          query {
            product(id: "${product_id}") {
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
        `,
      });
      if (response.data.data.product) {
        return response.data.data.product;
      }
      return [];
    } catch (error) {
      return error;
    }
  };

  componentDidMount = async () => {
    console.log("componentDidMount this.props", this.props);
    let productDetails = await this.getProductDetails(
      this.props.router.params.productID
    );
    if (productDetails.category === this.props.router.params.categoryName) {
      console.log("🚀 ~ componentDidMount= ~ productDetails", productDetails);
      this.setState({
        productDetails,
      });
    } else {
      this.props.router.navigate(`/${productDetails.category}`);
    }
  };

  async componentDidUpdate(prevProps) {
    if (
      this.props.router.params.productID !== prevProps.router.params.productID
      //   ||
      // this.props.router.outletContext.selectedCategory.name !==
      //   prevProps.router.outletContext.selectedCategory.name
    ) {
      console.log("componentDidUpdate this.props", this.props);
      // this.setState({
      //   selectedCategory: this.props.router.outletContext.selectedCategory,
      // });
      // // get products
      // let products = await this.getProducts(
      //   this.props.router.outletContext.selectedCategory.name
      // );
      // console.log("🚀 ~ componentDidUpdate ~ products", products);

      // this.setState({
      //   products,
      // });

      // console.log("this.state.products :>> ", this.state.products);
    }
  }

  render() {
    return (
      <div className="product-container">
        {this.state.productDetails && (
          <>
            <div className="category-product-card">
              <ImageSlideShow
                gallery={this.state.productDetails.gallery}
                productIndex={1}
                showThumbnail={true}
                outStock={!this.state.productDetails.inStock}
                category={this.state.productDetails.category}
                productID={this.state.productDetails.id}
              />
            </div>
            <ProductDetails details={this.state.productDetails} />
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Product);
