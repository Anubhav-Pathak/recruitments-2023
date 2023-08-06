"use client";
import Lottie from "react-lottie";
import animationData from "public/lotties/registration_lottie.json";

export const TasksLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default TasksLottie;
