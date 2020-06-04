import React from "react";
import { Lottie } from "@crello/react-lottie";
import { useStyles } from "./styles";
import animationData from "../../assets/animations/cargando.json";

function Index() {
  const classes = useStyles();

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerLottie}>
        <Lottie config={animationOptions} />
      </div>
    </div>
  );
}

export default Index;
