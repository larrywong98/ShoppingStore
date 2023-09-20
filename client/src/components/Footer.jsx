import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="copyright">
          <span>@2022 All Rights Reserved.</span>
        </div>
        <div className="social">
          {[
            { icon: <YouTubeIcon />, link: "#youtube", class: "youtube" },
            { icon: <TwitterIcon />, link: "#twitter", class: "twitter" },
            { icon: <FacebookIcon />, link: "#facebook", class: "facebook" },
          ].map((comp, index) => (
            <a href={comp.link} key={index}>
              <IconButton className={comp.class} color="inherit">
                {comp.icon}
              </IconButton>
            </a>
          ))}
        </div>
        <div className="footer-contact">
          {[
            { link: "/contact", desp: "Contact us", class: "contact" },
            { link: "/policy", desp: "Privacy Policies", class: "policy" },
            { link: "/help", desp: "Help", class: "help" },
          ].map((comp, index) => (
            <a className={comp.class} href={comp.link} key={index}>
              {comp.desp}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
