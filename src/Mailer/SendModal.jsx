import React, { useState } from "react";
import { Modal, Button, Box, Tooltip, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BtnStyle, BtnStylePrimary, BtnStyleSmall, BtnStyleTiny } from "../MUIStyles";
import { webmailProviders } from "./ClientHandling/webmailProviders";
import { Stack } from "@mui/material";
import { submitter } from "../submitter";


const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "auto",
  maxWidth: "90vw",
  margin: "0 auto",
  padding: "2rem",
  backgroundColor: "#F6F3F6",
  borderRadius: "0",
  border: "1px solid black",
  backdropFilter: "blur(5px)",
  boxSizing: "border-box",
};

export const SendModal = ({
  title,
  body,
  messaging,
  bcc,
  SL,
  Mobile,
  noClient,
  setNoClient,
  setSent,
  sent,
  copyIn,
  handleSendClicked,
  optIn,
  emailClient,
  contactDetails,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setSent(false);
    setNoClient(false);
  };

  const generateLink = (forceMailto) => {
    // 1) Build the to-list
    const toList = messaging.map((t) => t.email).join(",");

    // 2) Only include bcc if copyIn is true
    const effectiveBcc = copyIn ? bcc : "";

    // 3) Pick a provider (or undefined)
    const providerConfig = webmailProviders.find((p) => p.name === emailClient);

    let sendLink;

    if (!forceMailto && providerConfig) {
      // 4a) Web-mail URL builder handles encoding + optional bcc
      sendLink = providerConfig.composeUrl(toList, SL, body, effectiveBcc);
    } else {
      // 4b) mailto: fallback
      const params = new URLSearchParams();
      if (SL) params.set("subject", encodeURIComponent(SL));
      if (body) params.set("body", encodeURIComponent(body));
      if (effectiveBcc) params.set("bcc", effectiveBcc);

      sendLink = `mailto:${toList}?${params.toString()}`;
    }

    // 5) return link
    return sendLink;
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Copy the current page URL to the clipboard
      await navigator.clipboard.writeText(window.location.href);
      // Show the tooltip with "Copied" message
      setCopied(true);
      // Hide the tooltip after 3 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSendButton = () => {

    if (optIn == undefined) {
      handleSendClicked();
      return;
    }


    setIsOpen(true);

    optIn &&
      submitter({
        type: "submission",
        site: "portal",
        campaignId: "Tenant Complaints Portal",
        contactDeets: contactDetails,
        testimonial: body,
      });
  };

  return (
    <>
      <Button
        sx={{ ...BtnStyle, float: "right" }}
        onClick={() => handleSendButton()}
      >
        Send
      </Button>

      <Modal open={isOpen} onClose={onClose}>
        <Box style={ModalStyle}>
          <span style={{ float: "right", cursor: "pointer" }} onClick={onClose}>
            <CloseIcon />
          </span>

          <h1 style={{ fontSize: "1.5rem", lineHeight: "1", margin: "0 1rem 1.5rem 0" }}>
            {sent ? "What now?" : "Send your message"}
          </h1>

          {noClient ? (
            <>
              <p>
                If you don't use an email app, or the buttons on the last page
                didn't work, you can use these buttons to copy and paste the
                recipients, subject, and body of your email to whatever client
                you use:
              </p>
              <Stack
                direction="row"
                justifyContent="center"
                flexWrap="wrap" // so buttons drop to the next line on small screens
                gap="0.5rem"
              >
                <Button
                  sx={BtnStyleSmall}
                  fullWidth={true}
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${messaging.map((targ) => targ.email + `,`)}  ${bcc}`
                    )
                  }
                >
                  Copy recipients
                </Button>
                <Button
                  sx={BtnStyleSmall}
                  fullWidth={true}
                  onClick={() => navigator.clipboard.writeText(SL)}
                >
                  Copy subject
                </Button>
                <Button
                  sx={BtnStyleSmall}
                  fullWidth={true}
                  onClick={() => navigator.clipboard.writeText(body)}
                >
                  Copy email body
                </Button>
              </Stack>
            </>
          ) : !sent ? (
            <>
              <p>
                You're almost there. Press the button below to open your email
                client, and the message will be pre-filled in there for you.
                Then just hit send in there to fire it off.
              </p>
              <Button
                href={generateLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setSent(true);
                }}
                sx={BtnStylePrimary}
                style={{marginTop: "0.5rem"}}
                fullWidth={true}
              >
                Send{" "}
                {`email${
                  emailClient && emailClient !== "mobile"
                    ? ` with ${emailClient}`
                    : ""
                }`}
              </Button>
              {!Mobile && emailClient && (
                <Button
                  href={generateLink(true)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSent(true)}
                  fullWidth={true}
                  sx={{ ...BtnStyleTiny, marginTop: "1rem" }}
                >
                  Send with your email app
                </Button>
              )}
              <div
                style={{
                  fontSize: "0.875rem",
                  textAlign: "center",
                  marginTop: "1.5rem",
                }}
              >
                Not working?{" "}
                <span onClick={() => setNoClient(true)}>
                  <u>Copy & paste instead.</u>
                </span>
              </div>
            </>
          ) : (
            <>
              <p>
                Nice one! Will you now{" "}
                <b>take a moment to share the campaign with a few friends?</b>{" "}
                You can use the buttons below:
              </p>
                <Stack
                  direction="row"
                  justifyContent="center"
                  flexWrap="wrap" // so buttons drop to the next line on small screens
                  gap="0.5rem"
                >
                  <Button
                    sx={BtnStyle}
                    target="_blank"
                    href={`http://wa.me/?text=${encodeURI(
                      "Hey! I've just taken part in this campaign - check it out here: " +
                        title +
                        " " +
                        window.location.href
                    )}`}
                    fullWidth={true}
                  >
                    Share on WhatsApp
                  </Button>
                  <Button
                    sx={BtnStyle}
                    target="_blank"
                    href={`https://bsky.app/intent/compose?text=${encodeURI(
                      title + " " + window.location.href
                    )}`}
                    fullWidth={true}
                  >
                    Share on BlueSky
                  </Button>
                </Stack>

              <p>
                You can also just{" "}
                <Tooltip
                  open={copied}
                  title="Copied"
                  disableHoverListener
                  disableFocusListener
                  disableTouchListener
                  placement="top"
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14], // Adjust the second value to move tooltip closer/further
                        },
                      },
                    ],
                  }}
                >
                  <span
                    onClick={handleCopy}
                    style={{
                      cursor: "pointer",
                      color: "inherit",
                      textDecoration: "underline",
                    }}
                  >
                    click here
                  </span>
                </Tooltip>{" "}
                to copy the link and share it with your friends!
              </p>

              <span
                style={{
                  fontSize: "12px",
                }}
              >
                <em>
                  Didn't work? If your email client didn't open, you can use{" "}
                  <span onClick={() => setNoClient(true)}>
                    <u>copy & paste instead.</u>
                  </span>
                </em>
              </span>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
