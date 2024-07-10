import Slider from "@ant-design/react-slick";
import Player from "../Video";

export default function SlickSlider(props: any) {
  const { activeIndex = 0, items } = props;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Slider
      {...settings}
      ref={(slider) => {
        slider?.slickGoTo(activeIndex);
      }}
    >
      {items?.map((item: any, index: number) => (
        <Player item={item} key={index} />
      ))}
    </Slider>
  );
}
