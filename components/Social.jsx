import Link from "next/link";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const socials = [
  {
    name: "Github",
    href: "https://github.com/addynoven",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-sahu-34350b193/",
    icon: <FaLinkedin />,
  },
  // {
  //   name: "Instagram",
  //   href: "https://www.instagram.com/neon_stain/",
  //   icon: <FaInstagram />,
  // },
  // {
  //   name: "YouTube",
  //   href: "https://www.youtube.com/@neon7874",
  //   icon: <FaYoutube />,
  // },
  {
    name: "Twitter",
    href: "https://x.com/addynoven",
    icon: <FaTwitter />,
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link
            href={item.href}
            target="_blank"
            key={item.name}
            className={iconStyles}
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
