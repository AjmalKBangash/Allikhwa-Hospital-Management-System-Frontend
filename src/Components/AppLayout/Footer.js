import "./Footer.css";
import FooterSocialMedia from "/home/ajay/Desktop/FYP/allikhwa/src/Media/FooterSocialMedia.webp";
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";

function Footer() {
  return (
    <>
      <div className="containerFootertop">
        <hr />
        <div className="linksEtc">
          <span className="inLinks4 footerParagraphs">
            <img
              src={AllikhwaLogo}
              style={{
                height: "80px",
              }}
            ></img>
            <p>
              {" "}
              All'Ikhwa Medical Hospital aims to deliver a comprehensive range
              of preventive, curative, rehabilitative, emergency and educational
              health services with compassion to the people in KPK, through its
              healthcare facilities and services with a view to raising the
              long-term health status of community.{" "}
            </p>
          </span>
          <span className="inLinks1 footerParagraphs">
            <h4>Patient Care</h4>
            eStore
            <li>Corporate and bulk purchasing</li>
            <li>Returns and Refunds</li>
            <li>Pharma Shop</li>
            <li>Contact Us</li>
            <li>Purchase Protection</li>
          </span>
          <span className="inLinks2">
            <h4>Pharma Store Contract</h4>
            <p className="footerParagraphs">
              Pharma store contracts policy has been announced with the
              following pre-requisities and rules to be followed, Pharma store
              has been taking care of their customers from dawn to dusk and with
              all arrivals and deliveries.
            </p>
          </span>
          <span className="inLinks3">
            <h4>Privacy Policy</h4>
            <p className="footerParagraphs">
              We collect data for a better user experience and our data includes
              your address, sites yo visited for a better product interests. We
              will also be sending you emails base on your interest to entertain
              you with our customer care.
            </p>
          </span>
        </div>
        <div className="copyRight">
          <span> &#169; ParmaStore 2023</span>
          <img
            src={FooterSocialMedia}
            alt="pharma store accounts"
            useMap={"#image_map"}
            style={{
              height: "80px",
              //   width: "auto",
              margin: "0px 10px 0 auto",
            }}
          />
          <map name={"image_map"}>
            <area
              target="_blank"
              alt="instagram account"
              href="https://www.instagram.com"
              coords="476,319,145"
              shape="circle"
            />
            <area
              target="_blank"
              alt="facebook account"
              href="https://www.facebook.com"
              coords="144,320,144"
              shape="circle"
            />
            <area
              target="_blank"
              alt="twitter account"
              href="https://www.twitter.com"
              coords="805,318,145"
              shape="circle"
            />
            <area
              target="_blank"
              alt="youtube account"
              href="https://www.youtube.com"
              coords="1135,319,145"
              shape="circle"
            />
          </map>
        </div>
      </div>
    </>
  );
}

export default Footer;
