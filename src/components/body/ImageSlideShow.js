import React, { Component } from "react";
import { withRouter } from "../../withRouter";

import cartWhite from "../../images/cart-white.png";

export class ImageSlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 1,
    };
  }

  componentDidMount = async () => {
    // console.log("componentDidMount this.props :>> ", this.props);
    if (this.props.gallery && this.props.gallery.length > 0) {
      this.showSlides(this.state.slideIndex);
    }
  };

  async componentDidUpdate(prevProps) {
    // console.log("componentDidUpdate this.props :>> ", this.props);
  }

  plusSlides = (n) => {
    this.setState({
      slideIndex: this.state.slideIndex + n,
    });
    this.showSlides(this.state.slideIndex + n);
  };

  currentSlide = (n) => {
    this.setState({
      slideIndex: n,
    });
    this.showSlides(n);
  };

  showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName(
      `product-slides-${this.props.productIndex}`
    );
    let dots = document.getElementsByClassName(
      `demo-${this.props.productIndex}`
    );

    let slideNum = n;
    if (n > slides.length) {
      this.setState({
        slideIndex: 1,
      });
      slideNum = 1;
    }
    if (n < 1) {
      this.setState({
        slideIndex: slides.length,
      });
      slideNum = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideNum - 1].style.display = "block";
    if (dots && dots.length > 0) dots[slideNum - 1].className += " active";
  };

  render() {
    return (
      <>
        <div className="slideshow-container">
          <div className="image-container">
            {this.props.gallery.map((img) => (
              <div
                className={`product-slides-${this.props.productIndex}`}
                key={img}
              >
                <img
                  className={this.props.outStock ? "out-stock" : ""}
                  src={img}
                  alt="img"
                />

                {this.props.outStock && (
                  <span className="out-stock-label">OUT OF STOCK</span>
                )}

                {!this.props.outStock && (
                  <div className="cart">
                    <img src={cartWhite} alt="cart" />
                    {/* className="cart-icon"
          onClick={() => this.toggleCart()} */}
                  </div>
                )}
              </div>
            ))}

            {this.props.gallery.length > 1 && (
              <>
                <span className="prev" onClick={() => this.plusSlides(-1)}>
                  ❮
                </span>
                <span className="next" onClick={() => this.plusSlides(1)}>
                  ❯
                </span>
              </>
            )}
          </div>

          {this.props.showThumbnail && (
            <div className="thumbnail-column">
              {this.props.gallery.map((img, index) => (
                <img
                  className={`dots demo-${this.props.productIndex}`}
                  key={img}
                  src={img}
                  onClick={() => this.currentSlide(index + 1)}
                  alt="img"
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(ImageSlideShow);
