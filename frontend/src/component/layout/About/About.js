import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const About = () => {
    const visitInstagram = () => {
        window.location =
            "https://www.linkedin.com/in/fardin-omor-afnan-a3ab96218/";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{
                                width: "10vmax",
                                height: "10vmax",
                                margin: "2vmax 0",
                            }}
                            src="https://scontent.fdac68-1.fna.fbcdn.net/v/t1.6435-9/195545812_4189823634401728_183698332545206478_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=ad2b24&_nc_eui2=AeG0dvhoScoItv3AcIhUX0ArXTSEYy5GdPRdNIRjLkZ09I0B8ODorYGoIOfPgkmqOnx-uNLCu4i2WKYBW1E99l_o&_nc_ohc=mpsR-9OfQf4AX9F7Xre&_nc_ht=scontent.fdac68-1.fna&oh=00_AT_SRxU2GqbOrLHQtkTQ-nJiivfkd3CNxMPRpVXtGnL4Qw&oe=621F9A24"
                            alt="Founder"
                        />
                        <Typography>Fardin Omor Afnan</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit LinkedIn
                        </Button>
                        <span>
                            This is a sample wesbite made by @fardinOmorAfnan.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Contact Me</Typography>
                        <a
                            href="https://web.facebook.com/profile.php?id=100008956712069"
                            target="blank"
                        >
                            <FacebookIcon className="facebookSvgIcon" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/fardin-omor-afnan-a3ab96218/"
                            target="blank"
                        >
                            <LinkedInIcon className="linkedInSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
