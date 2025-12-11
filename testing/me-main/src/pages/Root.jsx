import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { lazy } from "react";
const About = lazy(() => import("./About"));
const Projects = lazy(() => import("./Projects"));
const Contact = lazy(() => import("./Contact"));
const Home = lazy(() => import("./Home"));

export default function Route({ onekoEnabled, setOnekoEnabled }) {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const location = useLocation();


  useEffect(() => {
    if (location.hash === "#about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (location.hash === "#projects") {
      projectsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (location.hash === "#contact") {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      homeRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <section
        id="home"
        ref={homeRef}
      >
       <Home onekoEnabled={onekoEnabled} setOnekoEnabled={setOnekoEnabled} />
      </section>


      <section
        id="about"
        ref={aboutRef}
      >
       <About/>
      </section>


      <section
        id="projects"
        ref={projectsRef}
      >
        <Projects/>
      </section>


      <section
        id="contact"
        ref={contactRef}
      >
        <Contact/>
      </section>
    </div>
  );
}
