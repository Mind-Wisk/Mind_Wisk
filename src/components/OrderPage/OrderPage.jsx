import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function OrderPage() {
  // Define state hooks for each form field
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Dynamically load the reCAPTCHA v3 script
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6LdKDykpAAAAAKGAEaXNmRFYk67YuiQ-GWy8g45b";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Remove the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  // Function to handle form submission
  const submitOrder = (e) => {
    e.preventDefault(); // Prevent default form submission

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("your_reCA6LdKDykpAAAAAKGAEaXNmRFYk67YuiQ-GWy8g45b", { action: "submit" })
        .then((token) => {
          const orderInfo = {
            firstname,
            lastname,
            address,
            address2,
            city,
            email,
            state,
            zipcode,
            country,
            recaptchaToken: token, // Include the reCAPTCHA token
          };

          // Submit this information to your backend
          axios
            .post("/orders", orderInfo)
            .then((response) => {
              console.log("Order submitted:", response.data);
              // Handle successful submission
            })
            .catch((error) => {
              console.error("Error submitting order:", error);
              // Handle errors
            });
        });
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstname} // Bind to state
            onChange={(e) => setFirstName(e.target.value)} // Update state on change
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastname} // Bind to state
            onChange={(e) => setLastName(e.target.value)} // Update state on change
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={address} // Bind to state
            onChange={(e) => setAddress1(e.target.value)} // Update state on change
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={address2} // Bind to state
            onChange={(e) => setAddress2(e.target.value)} // Update state on change
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city} // Bind to state
            onChange={(e) => setCity(e.target.value)} // Update state on change
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={state} // Bind to state
            onChange={(e) => setState(e.target.value)} // Update state on change
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={zipcode} // Bind to state
            onChange={(e) => setZip(e.target.value)} // Update state on change
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country} // Bind to state
            onChange={(e) => setCountry(e.target.value)} // Update state on change
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={email} // Bind to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
          <Grid item xs={12}>
          <button onClick={submitOrder}>Submit</button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default OrderPage;
