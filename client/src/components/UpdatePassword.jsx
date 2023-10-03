import {
  Box,
  Button,
  Container,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import updatePwd from "../services/updatePwd";

const UpdatePassword = () => {
  const [username, setUsername] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setFirstLoad(false);
      return;
    }
    const status = await updatePwd(navigate);
    if (status === "ok") {
      setConfirmation(true);
    }
  };
  return (
    <div>
      <Container
        maxWidth="sm"
        sx={{
          width: { xs: "98%", md: "600px" },
          height: { xs: "500px", md: "500px" },
          padding: "16px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            position: "relative",
            height: { xs: "80%", md: "400px" },
          }}
        >
          {confirmation ? (
            <>
              <Box sx={{ position: "absolute", top: "3%", right: "4%" }}>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1_34)">
                      <path
                        d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z"
                        fill="#373A3C"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_34">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </Box>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="57"
                  viewBox="0 0 60 57"
                  fill="none"
                >
                  <path
                    d="M32.9168 38.5833H44.5835V29.8333L59.1668 42.9583L44.5835 56.0833V47.3333H32.9168V38.5833ZM53.3335 0.666626H6.66683C5.11973 0.666626 3.636 1.28121 2.54204 2.37517C1.44808 3.46913 0.833496 4.95286 0.833496 6.49996V41.5C0.833496 43.047 1.44808 44.5308 2.54204 45.6247C3.636 46.7187 5.11973 47.3333 6.66683 47.3333H27.0835V41.5H6.66683V12.3333L30.0002 26.9166L53.3335 12.3333V29.8333H59.1668V6.49996C59.1668 4.95286 58.5522 3.46913 57.4583 2.37517C56.3643 1.28121 54.8806 0.666626 53.3335 0.666626ZM30.0002 21.0833L6.66683 6.49996H53.3335L30.0002 21.0833Z"
                    fill="#5048E5"
                  />
                </svg>
                <Typography
                  variant="p"
                  sx={{
                    width: "70%",
                    fontSize: "16px",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  We have sent the update password link to your email, Please
                  check that !
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ position: "absolute", top: "3%", right: "4%" }}>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1_34)">
                      <path
                        d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z"
                        fill="#373A3C"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_34">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </Box>
              <Box
                component="form"
                onSubmit={(e) => submit(e)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: { xs: "0px 16px", md: "0px 48px" },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "24px", md: "30px" },
                    fontWeight: "600",
                    marginTop: "44px",
                  }}
                >
                  Update your password
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    marginTop: "10px",
                    fontSize: { xs: "10px", md: "14px" },
                  }}
                >
                  Enter your email link, we will send you the recovery link
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "30px",
                    color: "#6B7280",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginTop: "42px",
                    }}
                  >
                    <Typography variant="p" sx={{ fontSize: "16px" }}>
                      Email
                    </Typography>
                    <OutlinedInput
                      id="email"
                      name="email"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      sx={{ height: "56px" }}
                      inputProps={{
                        style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        color: "#FC5A44",
                      }}
                    >
                      <Typography variant="p" sx={{ fontSize: "14px" }}>
                        {!firstLoad && username === ""
                          ? "Invalid Email Input"
                          : ""}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "100%",
                      height: "47px",
                      textTransform: "none",
                      backgroundColor: "#5048e5",
                      "&:hover": {
                        backgroundColor: "#8648e5",
                      },
                    }}
                  >
                    Update password
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default UpdatePassword;
