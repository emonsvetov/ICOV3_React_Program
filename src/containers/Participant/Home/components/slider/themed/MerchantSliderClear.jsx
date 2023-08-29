import PropTypes from 'prop-types';
import Carousel from "react-multi-carousel";
import {RenderSlides} from '../index'

const MerchantSliderClear = ( {data} ) => {  
  return <div className="merchant-slider clear mt-5">
          <Carousel
              additionalTransfrom={0}
              arrows={true}
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass=""
              dotListClass=""
              draggable
              autoPlay={true}
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              partialVisible
              renderButtonGroupOutside={false}
              responsive={{
              desktop: {
                  breakpoint: {
                  max: 3000,
                  min: 1024
                  },
                  items: 5,
                  partialVisibilityGutter: 100
              },
              mobile: {
                  breakpoint: {
                  max: 464,
                  min: 0
                  },
                  items: 1,
                  partialVisibilityGutter: 30
              },
              tablet: {
                  breakpoint: {
                  max: 1024,
                  min: 464
                  },
                  items: 2,
                  partialVisibilityGutter: 30
              }
              }}
              showDots
              sliderClass=""
              slidesToSlide={1}
              swipeable
          >
            {RenderSlides(data)}
          </Carousel>
  </div>
}

MerchantSliderClear.propTypes = {
  data: PropTypes.array,
};

MerchantSliderClear.defaultProps = {
  data: []
}

export default MerchantSliderClear