import "./Gallary.css";

import React, { useRef, useState } from "react";
import { Fade } from "react-reveal";

const photos = [
  {
    id: 1,
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 40,
    height: 30,
  },
  {
    id: 2,
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 20,
    height: 20,
  },
  {
    id: 3,
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 30,
    height: 40,
  },
  {
    id: 4,
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 30,
    height: 40,
  },
  {
    id: 5,

    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 30,
    height: 40,
  },
  {
    id: 6,
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 40,
    height: 30,
  },
  {
    id: 7,
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 30,
    height: 40,
  },
  {
    id: 8,
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 40,
    height: 30,
  },
  {
    id: 9,
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 40,
    height: 30,
  },
];

function Gallary() {
  let [carousel, setCarousel] = useState(false);
  let [imgSrc, setImgSrc] = useState("");
  let [imgID, setImgID] = useState();
  function ViewImage(e) {
    setCarousel(true);
    setImgSrc(e.src);
    setImgID(e.id);
  }
  function closeCarouselFun() {
    setCarousel(!carousel);
  }

  function preFunCarousel() {
    const isFirstSlide = imgID === 0;
    if (isFirstSlide) {
      setImgID(8);
    } else {
      setImgID(imgID - 1);
    }

    setImgSrc(photos[imgID].src);
  }
  function nxtFunCarousel() {
    const isLastSlide = imgID === photos.length - 1;
    if (isLastSlide) {
      setImgID(0);
    } else {
      setImgID(imgID + 1);
    }
    setImgSrc(photos[imgID].src);
  }

  return (
    <div style={{ margin: "40px 0 20px 0" }}>
      <h1
        style={{
          margin: "50px 0 20px 0",
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        Doctors, Technology and eStore
      </h1>
      <div className="Gallary">
        {photos.map((photo, id) => {
          return (
            <Fade top distance="100%" duration="3000">
              <div
                //   key={id}
                className="pics"
                onClick={() => {
                  ViewImage(photo);
                }}
              >
                <img
                  // ref={ref}
                  key={photo.id}
                  src={photo.src}
                  style={{
                    width: "100%",
                    height: "fit-content",
                  }}
                ></img>
              </div>
            </Fade>
          );
        })}
      </div>
      <div className={carousel ? "carousel open" : ""}>
        <span
          onClick={preFunCarousel}
          className={carousel ? "slidingCarousel" : "slidingCarouselClose"}
          style={{ marginRight: "80%" }}
        >
          &#x2B05;
        </span>
        <span
          onClick={closeCarouselFun}
          className={carousel ? "closeCarousel" : "slidingCarouselClose"}
        >
          &#x2A2F;
        </span>

        <img className={carousel ? "" : "slidingCarouselClose"} src={imgSrc} />
        <span
          onClick={nxtFunCarousel}
          className={carousel ? "slidingCarousel" : "slidingCarouselClose"}
          style={{ marginLeft: "80%" }}
        >
          &#x27A1;
        </span>
      </div>
    </div>
  );
}

// class Gallary extends React.Component {
//   constructor() {
//     super();
//     this.state = { currentImage: 0 };
//     this.closeLightbox = this.closeLightbox.bind(this);
//     this.openLightbox = this.openLightbox.bind(this);
//     this.gotoNext = this.gotoNext.bind(this);
//     this.gotoPrevious = this.gotoPrevious.bind(this);
//   }
//   openLightbox(event, obj) {
//     console.log("open");
//     this.setState({
//       currentImage: obj.index,
//       lightboxIsOpen: true,
//     });
//   }
//   closeLightbox() {
//     this.setState({
//       currentImage: 0,
//       lightboxIsOpen: false,
//     });
//   }
//   gotoPrevious() {
//     this.setState({
//       currentImage: this.state.currentImage - 1,
//     });
//   }
//   gotoNext() {
//     this.setState({
//       currentImage: this.state.currentImage + 1,
//     });
//   }
//   render() {
//     return (
//       <div>
//         <div photos={photos} onClick={this.openLightbox} />
//         <div
//           images={photos}
//           onClose={this.closeLightbox}
//           onClickPrev={this.gotoPrevious}
//           onClickNext={this.gotoNext}
//           currentImage={this.state.currentImage}
//           isOpen={this.state.lightboxIsOpen}
//         />
//       </div>
//     );
//   }
// }
// // ReactDOM.render(<App />, document.getElementById("app"));
export default Gallary;
