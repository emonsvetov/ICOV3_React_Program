import React from 'react';
import PropTypes from 'prop-types';
import Carousel from "react-multi-carousel";
import './style.scss'; 

export function SliderClassic(props ) {   
    const { data} = props;
    return <div className="merchant-slider mt-5">
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
                {data.map((item, key )=> {
                    return <div key={key} className={`merchant-wrapper item-${key % 2}`}>
                            <img  src={item}/>
                        </div>
                    }
                )}
                
            </Carousel>
    </div>
}

SliderClassic.propTypes = {
    data: PropTypes.array,
};

SliderClassic.defaultProps = {
    data: []
}

export function SliderClear(props ) {   
    const { data} = props;
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
                {data.map((item, key )=> {
                    return <div key={key} className={`merchant-wrapper clear`}>
                            <img alt={key} src={item}/>
                        </div>
                    }
                )}
                
            </Carousel>
    </div>
}

SliderClear.propTypes = {
    data: PropTypes.array,
};

SliderClear.defaultProps = {
    data: []
}

export const hasSlides = (t, returnCount=false) => {
    let count = 0 
    count += (t.slider_01 ? 1 : 0)
    count += (t.slider_02 ? 1 : 0)
    count += (t.slider_03 ? 1 : 0)
    if( returnCount ) return count;
    return count > 0
}

export const getSliderImgs = (template) => {
    // console.log(template)
    let imgs = [];
    const maxSlides = 4
    let count = hasSlides(template, true); //get count
    console.log(count)
    if( count > 0)  {
        for (let i = 1; i <= count; i++) {
            let img_src = template[`slider_0${i}`] ? `${process.env.REACT_APP_API_STORAGE_URL}/`+template[`slider_0${i}`] : null;
            if( img_src ) {
                imgs.push({
                    src: img_src,
                    altText: `Slide ${i}`,
                });
            }
        }
    }   else {
        for (let i = 1; i <= maxSlides; i++) {
            let img_src = getThemedSliderImage(template, i);
            imgs.push({
              src: img_src,
              altText: `Slide ${i}`,
            });
          }
    }
    
    return imgs;
}

export const getThemedSliderImage = (template, i) => {
    return `${process.env.PUBLIC_URL}/theme/${template.name}/img/slider/slider-0${i}.jpg`;
}

export const getMerchantLogos = (n = 9) => {
    let icons = [];
    for (let i = 1; i < n; i++) {
      icons.push(`${process.env.PUBLIC_URL}/img/merchants/${i}.png`);
    }
    return icons;
  }
