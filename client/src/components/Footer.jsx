import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { IconButton } from "@mui/material";
import styles from "../css/Footer.module.css";
const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-content"]}>
        <div className={styles["copyright"]}>
          <span>@2022 All Rights Reserved.</span>
        </div>
        <div className={styles["social"]}>
          {[
            {
              icon: <YouTubeIcon />,
              link: "https://www.youtube.com",
              class: "youtube",
            },
            {
              icon: <TwitterIcon />,
              link: "https://www.twitter.com",
              class: "twitter",
            },
            {
              icon: <FacebookIcon />,
              link: "https://www.facebook.com",
              class: "facebook",
            },
          ].map((comp, index) => (
            <a href={comp.link} key={index}>
              <IconButton className={styles[comp.class]} color="inherit">
                {comp.icon}
              </IconButton>
            </a>
          ))}
        </div>
        <div className={styles["footer-contact"]}>
          {[
            { link: "/contact", desp: "Contact us", class: "contact" },
            { link: "/policy", desp: "Privacy Policies", class: "policy" },
            { link: "/help", desp: "Help", class: "help" },
          ].map((comp, index) => (
            <a className={styles[comp.class]} href={comp.link} key={index}>
              {comp.desp}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
