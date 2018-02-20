/* eslint-disable no-console */
/* global window */
import Vue from 'vue';
import Mads from 'mads-custom';
import $ from 'jquery';
import './main.scss';

class AdUnit extends Mads {
  render() {
    window.jQuery = $;
    const scenes = [];

    // Scene 1
    scenes.push(`
      <div class="img-start"><img class="img-fluid" src="${this.resolve('img/scene1/img-start.png')}" /></div>
      <div class="cta-fill"><img class="img-fluid" src="${this.resolve('img/scene1/cta-fill.png')}" /></div>
      <div class="btn-start"><img class="img-fluid" @click="next()" src="${this.resolve('img/scene1/btn-start.png')}" /></div>
      <div class="or-explore"><button class="btn btn-link text-light">or explore the sky or wishes</button></div>
    `);

    const sliders = [1, 2, 3, 4, 5];

    // Scene 2
    scenes.push(`
      <div class="cta-choose"><img class="img-fluid" src="${this.resolve('img/scene2/cta-choose.png')}" /></div>
      <div class="lang-select">
        <img src="${this.resolve('img/scene2/mandarin.png')}" />
        <img src="${this.resolve('img/scene2/english.png')}" />
      </div>
      <div class="lantern-wrapper">
        <div class="lantern-select">
          ${sliders.map(i => `<div><img src="${this.resolve(`img/scene2/lantern-eng-${i}.png`)}" /></div>`).join('')}
        </div>
      </div>
      <div class="cta-swipe"><img class="img-fluid" src="${this.resolve('img/scene2/cta-swipe.png')}" /></div>
      <div class="btn-done"><img class="img-fluid" @click="next()" src="${this.resolve('img/scene2/btn-done.png')}" /></div>
    `);

    // Scene 3
    scenes.push(`
      <div class="cta-send-off"><img class="img-fluid" src="${this.resolve('img/scene3/cta-send-off.png')}" /></div>
      <div class="img-selected"><img class="img-fluid" ref="img-selected" :src='selectedImg' /></div>
      <div class="cta-flickup"><img class="img-fluid" src="${this.resolve('img/scene3/cta-flickup.png')}" /></div>
      `);

    // Scene 4
    scenes.push(`
      <div class="cta-lantern"><img class="img-fluid" src="${this.resolve('img/scene4/cta-lantern.png')}" /></div>
      <div class="img-selected" @click="next()"><img class="img-fluid" ref="img-selected" :src='selectedImg' /></div>
      `);

    // Scene 5
    scenes.push(`
      <div class="img-selected"><img class="img-fluid" ref="img-selected" :src='selectedImg' /></div>
      <div class="cta-share-on" @click="next()"><img class="img-fluid" src="${this.resolve('img/scene5/cta-share-on.png')}" /></div>
      `);

    // Scene 6
    scenes.push(`
      <div class="cta-wish"><img class="img-fluid" src="${this.resolve('img/scene6/cta-catch.png')}" /></div>
      <div class="cta-swipe"><img class="img-fluid" src="${this.resolve('img/scene6/cta-swipe.png')}" /></div>
      <div class="actions">
        <img class="img-fluid" src="${this.resolve('img/scene6/btn-wish.png')}" />
        <img class="img-fluid" src="${this.resolve('img/scene6/btn-watch.png')}" />
      </div>
      `);

    // Scene 7
    scenes.push(`
        <div class="actions">
          <img class="img-fluid" src="${this.resolve('img/scene6/btn-wish.png')}" />
          <img class="img-fluid" src="${this.resolve('img/scene6/btn-watch.png')}" />
        </div>
        `);

    return `
      <div id="ad-container" class="block">
        <transition :name="sceneTransition">
          ${scenes.map((s, i) => `<div id="scene${i + 1}" ref="scene${i + 1}" class="scenes" key="${i}" v-if="scene === ${i + 1}">
              <div class="content">${s}</div>
            </div>`).join('')}
        </transition>
      </div>
    `;
  }

  postRender() {
    const root = this;
    this.vue = new Vue({
      el: '#ad-container',
      data: {
        scene: 4,
        selectedImg: root.resolve('img/scene2/lantern-eng-1.png'),
        sceneTransition: 'scene-default',
      },
      watch: {
        scene: {
          immediate: true,
          handler: (val) => {
            // If Scene 2 Load slider
            if (val === 2) {
              root.loadURLCSS(root.resolve('css/vendors/slick.css'));
              root.loadURLCSS(root.resolve('css/vendors/slick-theme.css'));
              root.loadJS(root.resolve('js/slick.min.js')).then(() => {
                $('.lantern-select').slick({
                  centerMode: true,
                  adaptiveHeight: true,
                  centerPadding: '60px',
                  slidesToShow: 3,
                  infinite: true,
                  respondTo: 'slider',
                  responsive: [
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                        centerPadding: '100px',
                      },
                    },
                  ],
                });
              });
            }

            // If Scene 3 Load Orientation/HammerJS for panup/phoneup
            if (val === 3) {
              console.log('load orientation changes');
              window.addEventListener('deviceorientation', (e) => {
                if (e.gamma > 10) {
                  root.vue.next(4);
                }
              });
              root.loadJS(root.resolve('js/hammer.min.js')).then(() => {
                const hammertime = new window.Hammer(root.vue.$refs['img-selected']);
                hammertime.on('pan', (ev) => {
                  if (ev.additionalEvent === 'panup') {
                    root.vue.next(4);
                  }
                });
              });
            }

            // If Scene 6 Load HammerJS for panleft or panright
            if (val === 6) {
              root.loadJS(root.resolve('js/hammer.min.js'))
                .then(root.loadJS(root.resolve('js/TweenLite.min.js')))
                .then(() => {
                  const hammertime = new window.Hammer(root.vue.$refs.scene6);
                  hammertime.on('pan', (ev) => {
                    if (ev.additionalEvent === 'panleft' || ev.additionalEvent === 'panright') {
                      root.vue.$data.sceneTransition = 'scene-side-translate';
                      root.vue.next(7);
                    }
                  });
                });
            }
          },
        },
      },
      methods: {
        next(to) {
          this.scene = typeof to !== 'undefined'
            ? to
            : this.scene + 1;

          if (this.scene === 3) {
            const currentSlide = $('.lantern-select').slick('slickCurrentSlide');
            this.selectedImg = root.resolve(`img/scene2/lantern-eng-${currentSlide + 1}.png`);
          }
        },
      },
    });
  }

  loadURLCSS(url) {
    const link = document.createElement('link');
    link.href = url;
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    this.head.appendChild(link);
  }

  style() {
    this.loadURLCSS(this.resolve('css/vendors/bootstrap.css'));
    this.body.className = 'text-center';
    return [`
      body {
        background-image: url(${this.resolve('img/bg-mobile.png')});
      }

      @media screen and (min-width: 1024px) {
        body {
          background-image: url(${this.resolve('img/bg-desktop.png')});
        }
      }
      `];
  }

  events() {
    // console.log('load events');
  }
}

window.ad = new AdUnit();
