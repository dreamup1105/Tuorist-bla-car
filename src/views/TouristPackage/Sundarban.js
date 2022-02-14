import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { selectThemeColors } from "@utils";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputNumber from "react-input-number";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { placeHttpRequest } from "../../http-common";

import {
  createTutorial,
  updateTutorialsByTitle,
  deleteAllTutorials,
} from "../../redux/actions/offer";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const Sundarban = (props) => {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const history = useHistory();
  const [number, setNumber] = useState(null);
  const [journey, setJourney] = useState(null);
  const [initialized, setInitialize] = useState(false);
  const [startJourney, setStartJourney] = useState({});
  const [placeList, setPlaceList] = useState([]);
  const [startLabel, setStartLabel] = useState("");

  const onStartJourneyChanged = (event, newPlace) => {
    setStartJourney(newPlace);
  };
  const btnDateHandler = () => {
    props.history.push("/findpickuptime", { from: "tourist" });
  };
  const offer = useSelector((state) => {
    return state.offer;
  });
  const dispatch = useDispatch();

  const classes = useStyles();

  const setNumberTourist = (e) => {
    if (e.target.value > 4) {
      alert("less than package's max passenger");
      setNumber(4);
    } else if (e.target.value <= 0) {
      setNumber("");
    } else {
      setNumber(e.target.value);
    }
  };
  useEffect(() => {
    if (initialized) return;
    if (offer && offer.length > 0) {
      offer.map((each) => {
        if (each.title === "journey_date") {
          const date = new Date(each.description);
          setJourney(date.toLocaleDateString());
        }
      });
    }
    dispatch(createTutorial("journey_date", journey ? journey : new Date()));
    setInitialize(true);
  });

  const onStartLabelChanged = (event, newLabel) => {
    placeHttpRequest.get(`/?query=${newLabel}`).then((response) => {
      const data = [];
      for (const place of response.data.result) {
        data.push({ label: place.description, value: place.place_id });
      }
      setPlaceList(data);
    });
    setStartLabel(newLabel);
  };
  console.log(history.location.state);

  return (
    <div className="sundarban-package">
      <h2 className="mt-2">Sundarban Package</h2>
      <div className="p-2 d-flex flex-column justify-content-between align-items-center">
        <div className="card-img">
          <img
            src={require("@src/assets/images/card-background.png").default}
          />
        </div>
        <div className="d-flex flex-row m-5 p-2 pr-4 card-details">
          <div className="d-flex flex-column card-plan">
            <div className="d-flex flex-row card-date align-items-center">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M14.2951 21.5634C14.4612 21.7294 14.6865 21.8227 14.9215 21.8227C15.1564 21.8227 15.3816 21.7296 15.5477 21.5634L18.7102 18.401C19.0563 18.0549 19.0563 17.4941 18.7102 17.1481C18.3644 16.8022 17.8034 16.8022 17.4575 17.1481L14.9215 19.6841L13.7652 18.5278C13.4191 18.1819 12.8584 18.1819 12.5123 18.5278C12.1665 18.8736 12.1665 19.4346 12.5123 19.7807L14.2951 21.5634Z"
                    fill="#00AEEF"
                  />
                  <path
                    d="M15.6118 26.3883C19.4892 26.3883 22.6437 23.2336 22.6437 19.3562C22.6437 15.4787 19.4892 12.3242 15.6118 12.3242C11.734 12.3242 8.57959 15.4787 8.57959 19.3562C8.57959 23.2336 11.7343 26.3883 15.6118 26.3883ZM15.6118 14.0958C18.5124 14.0958 20.8721 16.4555 20.8721 19.3562C20.8721 22.2568 18.5124 24.6168 15.6118 24.6168C12.7111 24.6168 10.3511 22.2568 10.3511 19.3562C10.3511 16.4555 12.7111 14.0958 15.6118 14.0958Z"
                    fill="#00AEEF"
                  />
                  <path
                    d="M27.402 2.50243H25.7863V1.50198C25.7863 1.01286 25.3896 0.616211 24.9005 0.616211C24.4114 0.616211 24.0148 1.01286 24.0148 1.50198V2.50243H22.2741V1.50198C22.2741 1.01286 21.8775 0.616211 21.3881 0.616211C20.899 0.616211 20.5023 1.01286 20.5023 1.50198V2.50243H10.7208V1.50198C10.7208 1.01286 10.3242 0.616211 9.83484 0.616211C9.34572 0.616211 8.94907 1.01286 8.94907 1.50198V2.50243H7.20842V1.50198C7.20842 1.01286 6.81177 0.616211 6.32242 0.616211C5.8333 0.616211 5.43665 1.01286 5.43665 1.50198V2.50243H3.82074C2.24123 2.50243 0.956055 3.7876 0.956055 5.36734V27.7515C0.956055 29.331 2.24123 30.6162 3.82074 30.6162H27.402C28.9817 30.6162 30.2667 29.331 30.2667 27.7515V5.36734C30.2667 3.7876 28.9815 2.50243 27.402 2.50243ZM28.4949 27.7515C28.4949 28.3542 28.0046 28.8447 27.402 28.8447H3.82074C3.21809 28.8447 2.7276 28.3542 2.7276 27.7515V9.86807H28.4949V27.7515ZM2.7276 5.36734C2.7276 4.76447 3.21809 4.2742 3.82074 4.2742H5.43665V5.27464C5.43665 5.76376 5.8333 6.16042 6.32265 6.16042C6.81177 6.16042 7.20842 5.76376 7.20842 5.27464V4.2742H8.94907V5.27464C8.94907 5.76376 9.34572 6.16042 9.83507 6.16042C10.3242 6.16042 10.7208 5.76376 10.7208 5.27464V4.2742H20.5023V5.27464C20.5023 5.76376 20.899 6.16042 21.3883 6.16042C21.8775 6.16042 22.2741 5.76376 22.2741 5.27464V4.2742H24.0148V5.27464C24.0148 5.76376 24.4114 6.16042 24.9005 6.16042C25.3899 6.16042 25.7865 5.76376 25.7865 5.27464V4.2742H27.402C28.0046 4.2742 28.4951 4.76447 28.4951 5.36734V8.0963H2.7276V5.36734Z"
                    fill="#00AEEF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="30"
                      height="30"
                      fill="white"
                      transform="translate(0.604492 0.616211)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <p className="m-1">2 Days</p>
            </div>
            <div className="d-flex flex-row card-people align-items-center">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0272 30.7937C13.692 30.7641 13.3573 30.7339 13.0221 30.7042C11.4753 30.5656 9.95775 30.2787 8.46842 29.8459C8.23968 29.7792 8.00548 29.7277 7.78318 29.645C7.71485 29.6197 7.63365 29.5132 7.63365 29.4437C7.63068 27.9691 7.57621 26.4911 7.66137 25.021C7.74901 23.5119 8.50209 22.3063 9.74683 21.4061C10.6262 20.7704 11.6189 20.4665 12.7017 20.4587C13.9469 20.4494 15.1966 20.4067 16.4374 20.4835C18.4719 20.6099 19.9176 21.6478 20.791 23.4506C21.1227 24.1358 21.2302 24.8717 21.2327 25.623C21.2371 26.8467 21.2302 28.0698 21.2376 29.2934C21.2386 29.4621 21.194 29.5721 21.0301 29.628C20.3627 29.8546 19.7037 30.1104 19.0259 30.3011C18.0084 30.5875 16.9568 30.6921 15.9027 30.7611C15.8546 30.7641 15.8076 30.7825 15.7601 30.7942C15.1828 30.7937 14.605 30.7937 14.0272 30.7937Z"
                  fill="#00AEEF"
                />
                <path
                  d="M14.7201 0.350586C14.9498 0.407973 15.1801 0.463414 15.4088 0.523233C17.1299 0.973088 18.4256 2.55074 18.5449 4.2991C18.7227 6.90534 16.5332 9.03936 13.8794 8.85163C11.7875 8.70379 10.0481 6.97391 9.90555 4.93181C9.75156 2.72679 11.3018 0.760562 13.5694 0.401651C13.6244 0.392897 13.6764 0.368094 13.7294 0.351072C14.0596 0.350586 14.3899 0.350586 14.7201 0.350586Z"
                  fill="#00AEEF"
                />
                <path
                  d="M6.66699 26.6952C5.01675 26.6004 3.469 26.3344 1.94502 25.9307C1.56328 25.8296 1.18451 25.7177 0.803762 25.6146C0.669584 25.5782 0.604723 25.5203 0.605713 25.3632C0.61413 24.0097 0.59185 22.6558 0.616606 21.3028C0.665128 18.6659 2.84713 16.492 5.53069 16.4142C6.74274 16.3792 7.95628 16.4123 9.16933 16.3977C9.41788 16.3948 9.49661 16.4823 9.51443 16.7085C9.59712 17.7424 10.0036 18.6465 10.6854 19.4339C10.775 19.5374 10.873 19.6333 10.9775 19.7436C7.70328 20.9741 6.4219 23.3887 6.66699 26.6952Z"
                  fill="#00AEEF"
                />
                <path
                  d="M17.8955 19.7655C19.064 18.2954 19.116 18.1363 19.3972 16.4006C19.4819 16.4006 19.571 16.4006 19.6596 16.4006C20.633 16.4006 21.6064 16.4001 22.5794 16.4006C24.4054 16.4016 25.8699 17.1184 26.9329 18.5755C27.4855 19.3332 27.8029 20.2003 27.8242 21.1355C27.8559 22.5362 27.8395 23.9383 27.8336 25.3399C27.8331 25.4109 27.7563 25.5125 27.687 25.5475C26.927 25.9303 26.1185 26.1929 25.2822 26.3364C24.343 26.4973 23.3913 26.5878 22.4462 26.7172C22.2278 26.7468 22.1917 26.6608 22.1828 26.4667C22.1486 25.708 22.1892 24.9299 22.0268 24.1965C21.604 22.2862 20.4439 20.9089 18.6387 20.069C18.4025 19.9581 18.155 19.8706 17.8955 19.7655Z"
                  fill="#00AEEF"
                />
                <path
                  d="M14.4317 12.3487C16.6598 12.3618 18.4244 14.1044 18.41 16.2773C18.3957 18.4439 16.6182 20.182 14.4184 20.1733C12.2116 20.1645 10.4396 18.4595 10.4312 16.2408C10.4228 14.0834 12.2438 12.3356 14.4317 12.3487Z"
                  fill="#00AEEF"
                />
                <path
                  d="M7.53159 16.1172C5.47139 16.1493 3.7454 14.6942 3.47902 12.7877C3.17948 10.643 4.58859 8.72591 6.74286 8.34803C8.6882 8.00662 10.6583 9.17965 11.2227 11.0399C11.3341 11.4075 11.348 11.8034 11.4059 12.1866C11.4317 12.3564 11.3559 12.4731 11.2242 12.5815C10.4434 13.2245 9.93442 14.04 9.65517 14.9981C9.64824 15.0215 9.63091 15.0448 9.63289 15.0672C9.66507 15.5185 9.33383 15.679 8.99369 15.8059C8.49114 15.9927 7.97968 16.1556 7.53159 16.1172Z"
                  fill="#00AEEF"
                />
                <path
                  d="M21.0566 8.29264C22.8163 8.32523 24.367 9.44233 24.8329 11.0224C25.2682 12.4975 24.9646 13.8203 23.8942 14.933C23.1188 15.7393 22.134 16.1279 20.9913 16.1211C20.4788 16.1182 19.9931 16.0141 19.5262 15.823C19.4411 15.788 19.345 15.678 19.3307 15.591C19.1242 14.3197 18.5088 13.2838 17.5012 12.4673C17.4947 12.4619 17.4903 12.4532 17.4834 12.4508C16.9867 12.2596 17.0397 11.8905 17.1175 11.4742C17.4616 9.64221 19.1633 8.25763 21.0566 8.29264Z"
                  fill="#00AEEF"
                />
                <path
                  d="M17.1875 9.29999C16.6562 10.0402 16.376 10.849 16.3126 11.7613C14.8852 11.203 13.5226 11.2687 12.2031 11.9267C12.1046 11.4462 12.0526 10.9778 11.9055 10.5401C11.761 10.1092 11.5203 9.70997 11.3218 9.29708C11.8115 9.10011 16.4686 9.08893 17.1875 9.29999Z"
                  fill="#00AEEF"
                />
              </svg>
              <p className="m-1">4 Tourist (Max)</p>
            </div>
            <div className="d-flex flex-row card-time align-items-center">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M20.4545 18.0524L16.2569 14.9042V8.49122C16.2569 7.84641 15.7356 7.3252 15.0908 7.3252C14.446 7.3252 13.9248 7.84641 13.9248 8.49122V15.4873C13.9248 15.8545 14.0974 16.2009 14.3912 16.4201L19.0552 19.9181C19.2651 20.0755 19.51 20.1513 19.7537 20.1513C20.1093 20.1513 20.4591 19.9916 20.6877 19.6837C21.0749 19.1695 20.9699 18.4384 20.4545 18.0524Z"
                    fill="#00AEEF"
                  />
                  <path
                    d="M15.0912 0.34082C6.7904 0.34082 0.0380859 7.09313 0.0380859 15.3939C0.0380859 23.6947 6.7904 30.447 15.0912 30.447C23.392 30.447 30.1443 23.6947 30.1443 15.3939C30.1443 7.09313 23.392 0.34082 15.0912 0.34082ZM15.0912 28.115C8.07767 28.115 2.37008 22.4074 2.37008 15.3939C2.37008 8.38041 8.07767 2.67282 15.0912 2.67282C22.1059 2.67282 27.8123 8.38041 27.8123 15.3939C27.8123 22.4074 22.1047 28.115 15.0912 28.115Z"
                    fill="#00AEEF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="30.1062"
                      height="30.1062"
                      fill="white"
                      transform="translate(0.0380859 0.34082)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="m-1">09:00am - 05:00pm</p>
            </div>
            <h3 className="mt-1">4500TK Only</h3>
          </div>
          <div className="card-text">
            <p className="pl-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmodtempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmodtempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="card-info">
          <h4>Tourist information</h4>
          <div className="information d-flex flex-column p-5 mt-2">
            <Form>
              <FormGroup>
                {/* <Input
                  type="text"
                  className="read-only"
                  placeholder="Start Journey from"
                ></Input> */}
                <Autocomplete
                  id="start"
                  value={startJourney}
                  onChange={onStartJourneyChanged}
                  inputValue={startLabel}
                  onInputChange={onStartLabelChanged}
                  options={placeList}
                  getOptionLabel={(option) => option.label}
                  style={styles.inputSearch(matches)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      variant="outlined"
                      placeholder="Start Journey from"
                    />
                  )}
                />
              </FormGroup>
              <FormGroup>
                {/* <Input
                  type="text"
                  placeholder="Journey Date"
                  className="mt-2"
                /> */}
                <button
                  className="btn btn-sm mt-2"
                  style={{
                    ...styles.btnContinue(matches),
                    ...styles.btnDate(matches),
                  }}
                  onClick={btnDateHandler}
                >
                  {journey ? journey : "Journey Date"}
                </button>
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  placeholder="Number of Tourists"
                  pattern="[1~9]"
                  maxLength="12"
                  className="mt-3"
                  value={number}
                  onChange={setNumberTourist}
                  max={12}
                />
              </FormGroup>
              <Button
                onClick={() => history.push("payment")}
                color="#00AEEF"
                size="lg"
                block
                className="mt-3"
              >
                Continue
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  btnContinue: (isRowBased) => ({
    width: "100%",
    borderRadius: "2em",
    color: "#FFFFFF",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: isRowBased ? "1rem" : "1rem",
  }),
  btnDate: (isRowBased) => ({
    color: "#2E2E2E",
    backgroundColor: "#FFF",
    border: "1px solid #707070",
    borderRadius: isRowBased ? "3vw" : "6vw",
    textAlign: "left",
    padding: "13px 20px 13px 20px",
    border: "2px solid #00AEEF",
  }),
  inputSearch: (isRowBased) => ({
    backgroundColor: "#F2F2F2",
    width: "100%",
    border: "none",
    fontSize: isRowBased ? "1vw" : "2vw",
    padding: 0,
    borderRadius: "2em",
    paddingLeft: "3em",
  }),
};

const useStyles = makeStyles((theme) => ({}));

export default Sundarban;
