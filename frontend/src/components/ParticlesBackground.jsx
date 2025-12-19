import { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="fixed inset-0 -z-20"
      options={{
        background: { color: "#020617" },
        fpsLimit: 60,
        fullScreen: { enable: false },
        particles: {
          number: {
            value: 110,
            density: { enable: true, area: 900 },
          },
          color: { value: ["#38bdf8", "#a855f7", "#22d3ee"] },
          links: {
            enable: true,
            distance: 150,
            color: "#38bdf8",
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          opacity: {
            value: 0.7,
            random: { enable: true, minimumValue: 0.2 },
          },
          size: {
            value: 2,
            random: { enable: true, minimumValue: 0.6 },
          },
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: { enable: true, mode: ["grab", "repulse"] },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: {
              distance: 170,
              links: { opacity: 0.6 },
            },
            repulse: {
              distance: 120,
              duration: 0.3,
            },
            push: { quantity: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
