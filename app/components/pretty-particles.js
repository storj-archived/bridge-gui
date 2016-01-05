import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 40,
          density: {
            enable: true,
            value_area: 900
          }
        },
        limit: 10,
        color: {
          value: '#ddd'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#ddd'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: true
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 10,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 80,
          color: "#ddd",
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
            mode: 'bubble'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 100,
            size: 4,
            duration: 40,
            opacity: 2,
            speed: 2
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
});
