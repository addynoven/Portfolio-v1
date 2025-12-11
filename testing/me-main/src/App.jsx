import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Nav from "./components/Nav.jsx";
import LandingPage from "./components/LandingPage.jsx";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollPosition from "./components/ScrollPosition.jsx";
import Oneko from "./components/Oneko.jsx";
import TerminalIcon from "./components/ui/TerminalIcon.jsx";
import Ter from "./modals/Ter.jsx";

const App = () => {
  const scrollRef = useRef(null);
  const [locomotiveInstance, setLocomotiveInstance] = useState(null);
  const [onekoEnabled, setOnekoEnabled] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: "is-reveal",
    });

    setLocomotiveInstance(locomotiveScroll);

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      {" "}
      <Nav />
      <TerminalIcon onClick={() => setIsTerminalOpen(true)} />
      <Ter isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      {onekoEnabled && <Oneko />}
      <ScrollPosition locomotiveScroll={locomotiveInstance}/>
      <div ref={scrollRef} data-scroll-container className="text-white ">
        <Routes>
          <Route path="/" element={<Root onekoEnabled={onekoEnabled} setOnekoEnabled={setOnekoEnabled} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
