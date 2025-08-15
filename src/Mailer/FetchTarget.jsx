import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { TextFieldStyle } from "../MUIStyles";

// Take user's postcode and set adminDivisions using postcodes.io
const FetchTarget = ({
  postcode,
  setPostcode,
  adminDivisions,
  setAdminDivisions,
}) => {
  const [invalidPC, setInvalidPC] = useState(false);
  const [searching, setSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Keep track of the last postcode we successfully fetched to avoid duplicate calls
  const lastFetchedRef = useRef("");

  // Utility function to validate UK postcode format (loose client-side check)
  const isValidPostcode = (pc) => /^[A-Z0-9]{2,4}\s?[A-Z0-9]{3}$/i.test(pc);

  const fetchUKData = async (trimmedPostcode) => {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(
        trimmedPostcode
      )}`
    );
    return response.json();
  };

  const fetchScotlandData = async (trimmedPostcode) => {
    const response = await fetch(
      `https://api.postcodes.io/scotland/postcodes/${encodeURIComponent(
        trimmedPostcode
      )}`
    );
    return response.json();
  };

  const fetchPostcodeData = async (raw) => {
    const trimmedPostcode = raw.trim();

    if (!isValidPostcode(trimmedPostcode)) {
      setInvalidPC(true);
      setAdminDivisions({ ward: "", constituency: "", scotConstituency: "" });
      setErrorMessage(
        "Invalid postcode format. Please enter a valid UK postcode."
      );
      return;
    }

    // Avoid re-fetching the exact same value
    if (
      lastFetchedRef.current.toUpperCase() === trimmedPostcode.toUpperCase()
    ) {
      return;
    }

    setSearching(true);
    setInvalidPC(false);
    setErrorMessage("");

    try {
      const uk_data = await fetchUKData(trimmedPostcode);

      if (uk_data.status !== 200 || !uk_data.result) {
        throw new Error("Postcode not found");
      }

      if (uk_data.result.country === "Scotland") {
        const scotland_data = await fetchScotlandData(trimmedPostcode);

        if (
          scotland_data.status === 200 &&
          scotland_data.result &&
          scotland_data.result.scottish_parliamentary_constituency !== null
        ) {
          setAdminDivisions({
            constituency: uk_data.result.parliamentary_constituency || "",
            ward: uk_data.result.admin_ward || "",
            scotConstituency:
              scotland_data.result.scottish_parliamentary_constituency || "",
          });
        } else {
          setAdminDivisions({
            constituency: uk_data.result.parliamentary_constituency || "",
            ward: uk_data.result.admin_ward || "",
            scotConstituency: "",
          });
        }
      } else {
        setAdminDivisions({
          constituency: uk_data.result.parliamentary_constituency || "",
          ward: uk_data.result.admin_ward || "",
          scotConstituency: "",
        });
      }

      // mark as fetched
      lastFetchedRef.current = trimmedPostcode;
    } catch (err) {
      setInvalidPC(true);
      setErrorMessage(
        "Looks like there's something wrong with your postcode. Please check or try again later."
      );
      setAdminDivisions({ ward: "", constituency: "", scotConstituency: "" });
    } finally {
      setSearching(false);
    }
  };

  // ---- Key change: react to value changes (typing, paste, or autofill) ----
  useEffect(() => {
    if (!postcode) return;

    // Debounce to avoid fetching on every keystroke
    const t = setTimeout(() => {
      const val = String(postcode);
      const trimmed = val.trim();

      // Only fetch when it looks like a real UK postcode
      if (isValidPostcode(trimmed)) {
        fetchPostcodeData(trimmed);
      }
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postcode]);

  return (
    <>
      <TextField
        id="postcode"
        name="postal-code"
        label="Postcode"
        placeholder="Your postcode..."
        sx={TextFieldStyle}
        fullWidth
        autoComplete="postal-code"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        onInput={(e) => setPostcode(e.target.value)} // catches most autofill paths
        onFocus={(e) => {
          // Some autofill fills on focus; if there's already a value, kick the effect
          const val = e.currentTarget.value;
          if (val && val !== postcode) setPostcode(val);
        }}
        inputProps={{
          autoCapitalize: "off",
          autoCorrect: "off",
          spellCheck: "false",
          "aria-label": "Postcode",
        }}
        disabled={searching}
        error={invalidPC}
        helperText={invalidPC ? errorMessage : ""}
      />
    </>
  );
};

export default FetchTarget;
