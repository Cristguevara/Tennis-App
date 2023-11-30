import Lottie from "lottie-react";
import loadingAnimation from "./loadingAnimation.json";
export default function LoadingAnimation() {
  return (
    <div className="flex flex-col w-full justify-center items-center h-full">
      <Lottie
        animationData={loadingAnimation}
        className="flex justify-center items-center"
        loop={true}
      />
    </div>
  );
}