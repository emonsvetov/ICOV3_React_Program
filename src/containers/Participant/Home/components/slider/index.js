import { useNavigate } from "react-router-dom";

import './style.scss';

export {default as SliderClassic} from "./themed/MerchantSliderClassic";
export {default as SliderClear} from "./themed/MerchantSliderClear";
export {default as MerchantSlider} from "./MerchantSlider";

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

export const RenderSlides = (data) => {
    const navigate = useNavigate(); 
    const LOGO_PUBLIC_URL = `${process.env.REACT_APP_API_STORAGE_URL}`;
    let items = []
    {data.map( (item, key )=> {
      items.push(<div key={key} className={`merchant-wrapper clear`} onClick={() => navigate(`/participant/redeem/${item.id}`)} >
            <div>
              <img alt={key} src={`${LOGO_PUBLIC_URL}/${item.logo}`} />
            </div>
          </div>)
      }
    )}
    return items;
}
