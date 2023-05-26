import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { useState, useEffect, useRef } from "react";
import useTypewriter from "react-typewriter-hook";

const MagicOcean = [
  "Unleash Your Style",
  "Fashion Redefined",
  "Design Beyond Boundaries",
  "Your Style, Your Way",
  "Revolutionize Your Wardrobe",
];
let index = 0;

const Home = () => {
  const snap = useSnapshot(state);
  const [magicName, setMagicName] = useState("Hi I'm a T-Shirt");
  const intervalRef = useRef({});
  const name = useTypewriter(magicName);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // index = index + 1 > 2 ? 0 : ++index + 1;
      index = index > 5 ? 0 : ++index;
      setMagicName(MagicOcean[index]);
    }, 5000);
    return function clear() {
      clearInterval(intervalRef.current);
    };
  }, [magicName]);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./tees.png"
              alt="logo"
              className="w-16 h-16 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div
              {...headTextAnimation}
              className="text-4xl font-bold text-white transform -translate-x-1/2 -translate-y-1/2"
            >
              <h1 className="head-text">
                <span className="text-[#9357cc]">{name}</span>
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Step into the world of limitless creativity.{" "}
                <strong>Design your personalized T-shirt </strong> with our
                immersive 3D customization experience.
              </p>

              <CustomButton
                type="filled"
                title="Customize T-shirt"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
