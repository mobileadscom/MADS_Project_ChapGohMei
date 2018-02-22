/* eslint-disable */
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
      <div class="header"></div>
      <div class="img-start"><img class="img-fluid" src="${this.resolve('img/scene1/big-lantern.png')}" /></div>
      <div class="cta-fill"><img class="img-fluid" src="${this.resolve('img/scene1/cta-fill2.png')}" /></div>
      <div class="btn-start"><button @click="next()">START NOW</button></div>
      <div class="or-explore"><button class="btn btn-link text-light">or explore the sky or wishes</button></div>
    `);

    const sliders = [1, 2, 3, 4, 5];

    // Scene 2
    scenes.push(`
      <div class="header"></div>
      <div class="cta-choose"><img class="img-fluid" src="${this.resolve('img/scene2/cta-choose.png')}" /></div>
      <div class="lang-select">
        <img @click="changeLang('ch')" src="${this.resolve('img/scene2/mandarin.png')}" />
        <img @click="changeLang('eng')" src="${this.resolve('img/scene2/english.png')}" />
      </div>
      <div class="lantern-wrapper" ref="lantern-selector">
        <div class="lantern-select">
          ${sliders.map(i => `<div><img src="${this.resolve(`img/scene2/lantern-eng-${i}.png`)}" /></div>`).join('')}
        </div>
      </div>
      <div class="cta-swipe"><img class="img-fluid" src="${this.resolve('img/scene2/cta-swipe.png')}" /></div>
      <div class="btn-done" @click="next(3, 1)">DONE</div>
    `);

    // Scene 3
    scenes.push(`
      <div class="header"></div>
      <div class="cta-send-off" v-if="subScene === 1"><img class="img-fluid" src="${this.resolve('img/scene3/cta-send-off.png')}" /></div>
      <div class="cta-send-off" v-if="subScene === 2"><img class="img-fluid" src="${this.resolve('img/scene4/cta-lantern.png')}" /></div>
      <div class="img-selected" @click="subTwoClick()"><img class="img-fluid" ref="img-selected" :src='selectedImg' /></div>
      <div v-if="subScene === 3" class="cta-share-on" @click="next()"><img class="img-fluid" src="${this.resolve('img/scene5/cta-share-on.png')}" /></div>
      <div v-if="subScene === 3" class="cta-shares">
        <img class="img-fluid" src="${this.resolve('img/shares/btn-share-fb.png')}" />
        <img class="img-fluid" src="${this.resolve('img/shares/btn-share-twitter.png')}" />
        <a :href="selectedImg" download="wish-lantern"><img class="img-fluid" src="${this.resolve('img/shares/btn-share-download.png')}" /></a>
      </div>
      <div class="cta-flickup" v-if="subScene === 1"><img class="img-fluid" src="${this.resolve('img/scene3/cta-flickup.png')}" /></div>
      `);

    // // Scene 4
    // scenes.push(`
    //   <div class="cta-lantern"><img class="img-fluid"
    // src="${this.resolve('img/scene4/cta-lantern.png')}" /></div>
    //   <div class="img-selected" @click="next()">
    // <img class="img-fluid" ref="img-selected" :src='selectedImg' /></div>
    //   `);
    //
    // // Scene 5
    // scenes.push(`
    //   <div class="img-selected"><img class="img-fluid"
    // ref="img-selected" :src='selectedImg' /></div>
    //   <div class="cta-share-on" @click="next()">
    // <img class="img-fluid" src="${this.resolve('img/scene5/cta-share-on.png')}" /></div>
    //   `);

    // Scene 4

    //<div class="bg-lantern"><img class="img-fluid" src="${this.resolve('img/scene4/img-lanterns.png')}" /></div>
    scenes.push(`
      <div class="header"></div>
      <div class="bg-lantern"><img class="img-fluid" src="${this.resolve('img/scene4/img-lanterns.png')}" /></div>
      <div class="cta-wish"><img class="img-fluid" src="${this.resolve('img/scene6/cta-catch.png')}" /></div>
      <div class="cta-swipe"><img class="img-fluid" src="${this.resolve('img/scene6/cta-swipe.png')}" /></div>
      <div class="actions">
      <div><a href="https://www.youtube.com/watch?v=jpqT1dNOAp8"><img class="img-fluid" src="${this.resolve('img/scene6/btn-watch2.png')}" /></a></div>
      <div><img class="img-fluid" @click="next(2, 1)" src="${this.resolve('img/scene6/btn-wish2.png')}" /></div>
      </div>
      `);

    // Scene 5
    scenes.push(`
        <div class="header"></div>
        <div class="bg-lantern"><img class="img-fluid" src="${this.resolve('img/scene4/img-lanterns.png')}" /></div>
        <div class="wish"><img class="img-fluid" src="${this.resolve('img/scene7/cta-another.png')}" /></div>
        <div class="actions">
          <div><a href="https://www.youtube.com/watch?v=jpqT1dNOAp8"><img class="img-fluid" src="${this.resolve('img/scene6/btn-watch2.png')}" /></a></div>
          <div><img class="img-fluid" @click="next(2, 1)" src="${this.resolve('img/scene6/btn-wish2.png')}" /></div>
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
        scene: 1,
        subScene: 1,
        selectedImg: root.resolve('img/scene2/lantern-eng-1.png'),
        sceneTransition: 'scene-default',
        lang: 'eng',
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
                        slidesToScroll: 1,
                        centerPadding: '100px',
                      },
                    },
                  ],
                });

                $('.lantern-select').on('beforeChange', (slick, currentSlide, nextSlide) => {
                  root.vue.$data.selectedImg = root.resolve(`img/scene2/lantern-${root.vue.$data.lang}-${nextSlide + 2}.png`);
                });
              });
            }

            // If Scene 3 Load Orientation/HammerJS for panup/phoneup
            if (val === 3) {
              console.log('load orientation changes');
              window.addEventListener('deviceorientation', (e) => {
                if (e.gamma > 10) {
                  if (root.vue.$data.subScene === 1) {
                    root.vue.next(3, 2);
                  }
                }
              });
              root.loadJS(root.resolve('js/hammer.min.js')).then(() => {
                const hammertime = new window.Hammer(root.vue.$refs['img-selected']);
                hammertime.on('pan', (ev) => {
                  if (ev.additionalEvent === 'panup') {
                    if (root.vue.$data.subScene === 1) {
                      root.vue.next(3, 2);
                    }
                  }
                });
              });
            }

            // If Scene 6 Load HammerJS for panleft or panright
            if (val === 4) {
              root.loadJS(root.resolve('js/hammer.min.js'))
                .then(root.loadJS(root.resolve('js/TweenLite.min.js')))
                .then(() => {
                  const hammertime = new window.Hammer(root.vue.$refs.scene4);
                  hammertime.on('pan', (ev) => {
                    if (ev.additionalEvent === 'panleft' || ev.additionalEvent === 'panright') {
                      root.vue.$data.sceneTransition = 'scene-side-translate';
                      root.vue.next(5);
                    }
                  });
                });
            }
          },
        },
      },
      methods: {
        changeLang(lang) {
          this.selectedLang = lang;
          $(this.$refs['lantern-selector']).find('.slick-slide').each((index, slide) => {
            $(slide).find('img').attr('src',
              $(slide).find('img').attr('src').replace(lang === 'eng' ? 'ch' : 'eng', lang),
            );
          });
        },
        subTwoClick() {
          if (this.subScene === 2) {
            this.next(3, 3);
          }
        },
        next(to, subTo) {
          this.scene = typeof to !== 'undefined'
            ? to
            : this.scene + 1;

          if (typeof subTo !== 'undefined') {
            this.subScene = subTo;
          }

          if (to === 3) {
            const currentSlide = $('.lantern-select').slick('slickCurrentSlide');
            if (typeof currentSlide === 'number') {
              this.selectedImg = root.resolve(`img/scene2/lantern-${root.vue.$data.lang}-${currentSlide + 1}.png`);
            }
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

      #scene1 .img-start {
        background-image: url(${this.resolve('img/scene1/sky-lanterns.png')});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center top;
      }

      .scenes .header {
        background-image: url(${this.resolve('img/logo.png')});
        background-repeat: no-repeat;
        background-size: contain;
      }
      `];
  }

  events() {
    // console.log('load events');
  }
}

window.ad = new AdUnit();
