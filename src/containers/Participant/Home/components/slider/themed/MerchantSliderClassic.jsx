import PropTypes from 'prop-types';
import Carousel from "react-multi-carousel";
import {RenderSlides} from '../index'

const SliderClassic = ( { data} ) => {
  return <div className="merchant-slider classic mt-5">
          <Carousel
              additionalTransfrom={0}
              arrows={false}
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
              renderDotsOutside
              responsive={{
              desktop: {
                  breakpoint: {
                  max: 3000,
                  min: 1024
                  },
                  items: 2,
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

SliderClassic.propTypes = {
  data: PropTypes.array,
};

SliderClassic.defaultProps = {
  data: []
}

export default SliderClassic