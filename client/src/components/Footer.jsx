import react from "react";
import "../css/Footer.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <p>@2022 All Rights Reserved.</p>
      </div>
      <div className="social">
        <a href="youtube">
          <IconButton size="small" color="inherit">
            <YouTubeIcon />
          </IconButton>
        </a>
        <a href="twitter">
          <IconButton size="small" color="inherit">
            <TwitterIcon />
          </IconButton>
        </a>
        <a href="facebook">
          <IconButton size="small" color="inherit">
            <FacebookIcon />
          </IconButton>
        </a>
      </div>
      <div className="contact">
        <a href="/contact">Contact us</a>
        <a href="/policy">Privacy Policies</a>
        <a href="/help">Help</a>
      </div>
    </div>
  );
};

export default Footer;
