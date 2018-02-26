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
      <div class="or-explore" @click="next(4)"><button class="text-light">or explore the sky for wishes</button></div>
    `);

    const sliders = [1, 2, 3, 4, 5];

    // Scene 2
    scenes.push(`
      <div class="header"></div>
      <div class="cta-choose"><img class="img-fluid" src="${this.resolve('img/scene2/cta-choose.png')}" /></div>
      <div class="lang-select">
        <img @click="changeLang('ch')" src="${this.resolve('img/scene2/mandarin.png')}" />
        <img @click="changeLang('eng')" class="eng" src="${this.resolve('img/scene2/english.png')}" />
      </div>
      <div class="lantern-wrapper" ref="lantern-selector">
        <div class="lantern-select" style="opacity:0;">
          ${sliders.map(i => `<div><img src="${this.resolve(`img/scene2/lantern-eng-${i}.png`)}" /></div>`).join('')}
        </div>
      </div>
      <div class="cta-swipe"><img class="img-fluid" src="${this.resolve('img/scene2/cta-swipe.png')}" /></div>
      <div class="btn-done" @click="next(3, 1)">DONE</div>
    `);

    // <img class="img-fluid" src="${this.resolve('img/scene4/cta-lantern.png')}" />

    // Scene 3
    scenes.push(`
      <div class="header"></div>
      <div class="cta-send-off" ref="cta-send-off"><img class="img-fluid" src="${this.resolve('img/scene3/cta-send-off.png')}" /></div>
      <div class="cta-lantern" ref="cta-lantern"><span class="look">Look at it go!</span><span class="your_wish">Your Wish<br/>has flown off</span><span class="to_join">to join the other</span><div><span class="counts">{{animatedCount}}</span><span class="label">Lanterns</span></div></div>
      <div class="img-selected" ref="mainLantern"><img ref="img-selected" :src='selectedImg' /></div>
      <div v-show="subScene === 3" class="cta-share-on" ref="ctaShareOn" @click="next()"><img class="img-fluid" src="${this.resolve('img/scene5/cta-share-on.png')}" /></div>
      <div v-show="subScene === 3" class="cta-shares" ref="ctaShares">
        <a @click="facebookClick()" :href="'https://www.facebook.com/sharer/sharer.php?u=https://thecomingtogether.com.my/lanterns/'+selectedImg.split('/').pop()" target="_blank"><img class="img-fluid" src="${this.resolve('img/shares/btn-share-fb.png')}" /></a>
        <a @click="twitterClick()" :href="twitter_share" target="_blank"><img class="img-fluid" src="${this.resolve('img/shares/btn-share-twitter.png')}" /></a>
        <a @click="downloadClick()" :href="selectedImg" download="wish-lantern"><img class="img-fluid" src="${this.resolve('img/shares/btn-share-download.png')}" /></a>
      </div>
      <div class="cta-flickup" v-show="subScene === 1" ref="cta-flickup"><img class="img-fluid" src="${ (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ? this.resolve('img/scene3/cta-flickup-2.png') : this.resolve('img/scene3/cta-flickup.png')}" /></div>
      `);

    //  Scene 4
    // scenes.push(`
    //   <div class="cta-lantern"><img class="img-fluid"
    // src="${this.resolve('img/scene4/cta-lantern.png')}" /></div>
    //   <div class="img-selected" @click="next()">
    // <img class="img-fluid" ref="img-selected" :src='selectedImg' /></div>
    //   `);
    //
    //  Scene 5
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
      <div class="cta-wish"><img class="img-fluid" src="${this.resolve('img/scene6/cta-catch.png')}" /></div>
      <div class="cta-swipe"><img class="img-fluid" src="${this.resolve('img/scene6/cta-swipe.png')}" /></div>
      <div ref="wishes" class="wishes"><div class="wish">Another wish has been released!<div ref="location" class="location"> {{wishes[wishNo]}} </div></div></div>
      <div class="actions">
      <div><a @click="youtubeClick()" href="https://www.youtube.com/watch?v=jpqT1dNOAp8" target="_blank"><img class="img-fluid" src="${this.resolve('img/scene6/btn-watch2.png')}" /></a></div>
      <div><img class="img-fluid" @click="next(2, 1, 'choose_again')" src="${this.resolve('img/scene6/btn-wish2.png')}" /></div>
      </div>
      `);

    // Scene 5
    // <div class="bg-lantern"><img class="img-fluid" src="${this.resolve('img/scene4/img-lanterns.png')}" /></div>
    scenes.push(`
        <div class="header"></div>
        <div class="wish"><img class="img-fluid" src="${this.resolve('img/scene7/cta-another.png')}" /></div>
        <div class="actions">
          <div><a @click="youtubeClick()" href="https://www.youtube.com/watch?v=jpqT1dNOAp8" target="_blank"><img class="img-fluid" src="${this.resolve('img/scene6/btn-watch2.png')}" /></a></div>
          <div><img class="img-fluid" @click="next(2, 1, 'choose_again')" src="${this.resolve('img/scene6/btn-wish2.png')}" /></div>
        </div>
        `);

    // <div class="pjs" @click="next(5)"><div id="particles-js" :class="{hideParticle: scene === 2 || (scene === 3 && subScene === 1) || (scene === 3 && subScene === 2) }"></div></div>

    return `
      <div id="ad-container" class="block" :class="{'hideCtaWish': hideCtaWish}">
        <div class="pjs" @click="next(5)"><div id="particles-js" :class="{hideParticle: scene === 2 && subScene === 1 }"></div></div>
        <div id="particles-js1" :class="{hideParticle: true }"></div>
        <transition :name="sceneTransition">
          ${scenes.map((s, i) => `<div id="scene${i + 1}" ref="scene${i + 1}" class="scenes" key="${i}" v-if="scene === ${i + 1}">
              <div class="content" :class="{ subScene3: subScene === 3 }">${s}</div>
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
        hideCtaWish: false,
        count: 14543,
        animatedCount: '14,543',
        wishes: [
          'Seberang Perai, Penang',
          'Georgetown, Penang',
          'Petaling Jaya, Selangor',
          'Kajang, Selangor',
          'Klang, Selangor',
          'Subang Jaya, Selangor',
          'Ipoh, Perak',
          'Selayang, Selangor',
          'Shah Alam, Selangor',
          'Iskandar Puteri, Johor',
          'Johor Bahru, Johor',
          'Malacca City, Malacca',
          'Ampang Jaya, Selangor',
          'Kota Kinabalu, Sabah',
          'Sungai Petani, Kedah',
          'Kuantan, Pahang',
          'Alor Setar, Kedah',
          'Tawau, Sabah',
          'Sandakan, Sabah',
          'Kuala Terengganu, Terengganu',
          'Kuching, Sarawak',
          'Kota Bahru, Kelantan',
          'Seremban, Negeri Sembilan',
          'Kulim, Kedah',
          'Padawan, Sarawak',
          'Taiping, Perak',
          'Miri, Sarawak',
          'Kulai, Johor',
          'Kangsar, Perlis',
          'Kuala Langat, Selangor',
          'Kubang Pasu, Kedah',
          'Bintulu, Sarawak',
          'Manjung, Perak',
          'Batu Pahat, Johor',
          'Sepang, Selangor',
          'Kuala Selangor, Selangor',
          'Muar, Johor',
          'Nilai, Negeri Sembilan',
          'Alor Gajah, Malacca',
          'Sibu, Sarawak'
        ],
        wishNo: 0
      },
      computed: {
        twitter_share() {
          return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('Our family is the light of our life. Tenaga National Berhad wishes Gong Xi Fa Cai to those celebrating.') + '&hashtags=TheComingTogether&url=https://thecomingtogether.com.my/lanterns/' + this.selectedImg.split('/').pop() + '&tw_p=tweetbutton&via=Tenaga_Nasional'
        }
      },
      watch: {
        subScene: {
          immediate: true,
          handler: (val) => {
            // root.loadJS(root.resolve('js/particles.js')).then(() => {
            //   particlesJS.load('particles-js1', root.resolve('js/particlesjs-config.json'), () => {
            //     console.log('loaded particle')
            //   })
            // })
            if (val === 2) {
              root.loadJS(root.resolve('js/Tween.min.js')).then(() => {
                console.log('loaded tween')
                root.vue.$data.count += 20;
              })
            }
          }
        },
        count(val, old) {
          const vm = this
          const animate = () => {
            if (TWEEN.update()) {
              requestAnimationFrame(animate)
            }
          }

          const numberWithCommas = (x) => {
            return x.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
          }

          const tweeningN = new TWEEN.Tween({tweeningNumber: old}).easing(TWEEN.Easing.Quadratic.Out).to({
            tweeningNumber: val
          }, 10000).onUpdate(() => {
            vm.animatedCount = numberWithCommas(tweeningN._object.tweeningNumber.toFixed(0))
          }).start();

          animate()
        },
        scene: {
          immediate: true,
          handler: (val) => {
            // If Scene 2 Load slider
            root.tracker('E', `enter_scene${val}`)

            if (val === 2) {
              root.loadURLCSS(root.resolve('css/vendors/slick.css'));
              root.loadURLCSS(root.resolve('css/vendors/slick-theme.css'));
              root.loadJS(root.resolve('js/slick.min.js')).then(() => {
                $('.lantern-select').on('init', () => {
                  console.log('lantern loaded')
                  $('.lantern-select').css('opacity', 1)
                })

                $('.lantern-select').slick({
                  centerMode: true, adaptiveHeight: true,
                  // centerPadding: '60px',
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  respondTo: 'slider',
                  responsive: [
                    {
                      breakpoint: 1025,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        // centerPadding: '100px'
                      }
                    }
                  ]
                })

                $('.lantern-select').on('beforeChange', (slick, currentSlide, nextSlide) => {
                  root.vue.$data.selectedImg = root.resolve(`img/scene2/lantern-${root.vue.$data.lang}-${nextSlide + 2}.png`);
                });
              });
            }

            const scene3Interaction = () => {
              if (root.vue.$data.subScene === 1) {
                root.loadJS(root.resolve('js/TweenMax.min.js')).then(root.loadJS(root.resolve('js/CSSPlugin.min.js'))).then(() => {
                  TweenMax.to(root.vue.$refs['cta-send-off'], 1, {
                    opacity: 0,
                    ease: Linear.easeNone
                  })
                  TweenMax.to(root.vue.$refs['cta-flickup'], 1, {
                    opacity: 0,
                    ease: Linear.easeNone,
                    onComplete() {
                      root.vue.$data.subScene = 2
                      TweenLite.set(root.vue.$refs['cta-lantern'], {display: 'block'});
                      TweenMax.to(root.vue.$refs['cta-lantern'], 1, {
                        opacity: 1,
                        ease: Linear.easeNone
                      })
                      TweenMax.to(root.vue.$refs.mainLantern, 4, {
                        top: "-500px",
                        scale: 0.3,
                        opacity: 0.5,
                        ease: Back.easeIn.config(2),
                        onComplete() {
                          root.vue.subTwoClick()
                          TweenLite.set(root.vue.$refs['cta-send-off'], {display: 'none'});
                          TweenLite.set(root.vue.$refs['cta-lantern'], {display: 'none'});
                        }
                      });
                    }
                  })
                });
              }
            }

            // If Scene 3 Load Orientation/HammerJS for panup/phoneup
            if (val === 3) {
              console.log('load orientation changes');
              window.addEventListener('deviceorientation', (e) => {
                if (e.gamma > 10) {
                  scene3Interaction();
                  root.tracker('E', 'gyro_up')
                }
              });
              root.loadJS(root.resolve('js/hammer.min.js')).then(() => {
                const hammertime = new window.Hammer(root.vue.$refs.scene3);
                hammertime.on('swipe pan', (ev) => {
                  console.log(ev)
                  // if (ev.additionalEvent === 'panup') {
                  if (root.vue.$data.subScene === 1) {
                    root.tracker('E', 'swipe_up')
                    scene3Interaction();
                  }
                  // }
                });
              });
            }

            // If Scene 6 Load HammerJS for panleft or panright
            if (val === 4) {
              root.loadJS(root.resolve('js/hammer.min.js')).then(() => {
                const hammertime = new window.Hammer(root.vue.$refs.scene4);
                // .on('pan', (ev) => {
                //   if (ev.additionalEvent === 'panleft' || ev.additionalEvent === 'panright') {
                //     root.vue.$data.hideCtaWish = true
                //   }
                // })
                hammertime.on('swipe', (ev) => {
                  root.vue.$data.hideCtaWish = true
                  console.log(ev);
                  var direction = ev.direction == 2
                    ? 'Left'
                    : 'Right';
                  root.tracker('E', `swipe_${direction.toLowerCase()}`)
                  root.vue.$refs['wishes'].style.display = 'block';
                  var wish = root.vue.$refs['location'];
                  wish.classList.add('leave' + direction);
                  setTimeout(function() {
                    wish.classList.remove('leave' + direction);
                    wish.classList.add('enter' + direction);
                    if (direction == 'Left') {
                      var nextWish = root.vue.$data.wishNo + 1;
                      if (nextWish == root.vue.$data.wishes.length) {
                        root.vue.$data.wishNo = 0;
                      } else {
                        root.vue.$data.wishNo = nextWish;
                      }
                    } else {
                      var prevWish = root.vue.$data.wishNo - 1;
                      if (prevWish < 0) {
                        root.vue.$data.wishNo = root.vue.$data.wishes.length - 1;
                      } else {
                        root.vue.$data.wishNo = prevWish;
                      }
                    }

                    setTimeout(function() {
                      wish.classList.remove('enter' + direction);
                    }, 300);
                  }, 300);

                  /*if (root.vue.$data.hideCtaWish) {
                    root.vue.$data.sceneTransition = 'scene-side-translate'
                    root.vue.next(5)
                  }*/
                })
              });
            }
          }
        }
      },
      methods: {
        changeLang(lang) {
          this.selectedLang = lang;
          $(this.$refs['lantern-selector']).find('.slick-slide').each((index, slide) => {
            if (lang === 'eng') {
              root.tracker('E', 'changeto_ch')
            } else {
              root.tracker('E', 'changeto_eng')
            }
            $(slide).find('img').attr('src', $(slide).find('img').attr('src').replace(
              lang === 'eng'
              ? 'ch'
              : 'eng',
            lang),);
          });
        },
        subTwoClick() {
          if (this.subScene === 2) {
            this.next(3, 3);
            TweenMax.to(root.vue.$refs.mainLantern, 1, {
              top: "0",
              scale: 1,
              opacity: 1,
              ease: Linear.easeNone
            })
            TweenMax.fromTo(root.vue.$refs.ctaShareOn, 1, {
              bottom: "-300px",
              scale: 0.1,
              opacity: 0,
              ease: Linear.easeNone
            }, {
              bottom: "0",
              scale: 1,
              opacity: 1,
              ease: Linear.easeNone
            })
            TweenMax.fromTo(root.vue.$refs.ctaShares, 1, {
              bottom: "-300px",
              scale: 0.1,
              opacity: 0,
              ease: Linear.easeNone
            }, {
              bottom: "0",
              delay: 0.5,
              scale: 1,
              opacity: 1,
              ease: Linear.easeNone
            })
          }
        },
        next(to, subTo, again) {
          if (again === 'choose_again') {
            root.tracker('E', 'choose_again')
          }
          this.scene = typeof to !== 'undefined'
            ? to
            : this.scene + 1;

          if (typeof subTo !== 'undefined') {
            this.subScene = subTo;
          }

          if (to === 2 && subTo === 1) {
            this.hideCtaWish = false
          }

          if (to === 3) {
            try {
              const currentSlide = $('.lantern-select').slick('slickCurrentSlide');
              if (typeof currentSlide === 'number') {
                this.selectedImg = root.resolve(`img/scene2/lantern-${root.vue.$data.lang}-${currentSlide + 1}.png`);
              }
            } catch (err) {
              console.log('no slick around');
            }
          }
        }
      }
    });

    this.loadJS(this.resolve('js/particles.js')).then(() => {
      particlesJS.load('particles-js', this.resolve('js/particlesjs-config.json'), () => {
        console.log('loaded particle')
      })
    })
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
      @font-face {
        font-family: SummerLove;
        src: url(${this.resolve('css/Summer%20Love.otf')});
      }

      body {
        background-image: url(${this.resolve('img/bg-mobile.png')});
      }

      @media screen and (min-width: 1024px) {
        body {
          background-image: url(${this.resolve('img/bg-desktop.png')});
        }
      }

      /*#scene1 .img-start {
        background-image: url(${this.resolve('img/scene1/sky-lanterns.png')});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center top;
      }*/

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
