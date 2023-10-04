import {
  Box,
  Button,
  Container,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import resetPwd from "../services/resetPwd";
import { useSelector } from "react-redux";

// forget password page with email success page
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const navigate = useNavigate();
  const username = useSelector((state) => state.userReducer.updatePwdName);
  const [pwdShow, setPwdShow] = useState(true);
  const submit = async (e) => {
    e.preventDefault();
    if (password === "") {
      setFirstLoad(false);
      return;
    }
    const formData = { username: username, password: password };
    const status = await resetPwd(formData, navigate);
    if (status === "ok") {
      navigate("/success", {
        state: { message: "Reset password successfully !!!" },
      });
    } else {
      navigate("/error");
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
              Reset password
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
                  Password
                </Typography>
                <OutlinedInput
                  error={!firstLoad && password === "" ? true : false}
                  id="password"
                  name="password"
                  type={pwdShow ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  sx={{
                    height: "56px",
                  }}
                  inputProps={{
                    style: { WebkitBoxShadow: "0 0 0 1000px white inset" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        sx={{
                          backgroundColor: "transparent",
                          textDecoration: "underline",
                          color: "#6B7280",
                          textTransform: "none",
                        }}
                        onClick={() => setPwdShow(!pwdShow)}
                      >
                        {pwdShow ? "Show" : "Hide"}
                      </Button>
                    </InputAdornment>
                  }
                />
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
                Reset password
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetPassword;
