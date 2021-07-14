/*!
 * OakLazyLoader 1.0.1
 * https://oakdigital.dk
 * 
 * @license Copyright 2021, Oak Digital. All rights reserved.
 * @author: Jakob Plenge, jakob.plenge@oakdigital.dk
 */

function OakLazyLoader() {

    /*------------------------------------------------
    # Options and variabels
    ------------------------------------------------*/
    const _this = this;

    this.options = {
        threshold : [0, 0.25, 0.5, 0.75],
        rootMargin: '0px 0px 300px 0px',
    };

    this.assets = [];
    this.observer = {};


    /*------------------------------------------------
    # Lazyloader
    ------------------------------------------------*/

    this.init = () => { 
        _this.setObserver();
        _this.observeAssets();
    };

    this.setObserver = () => {
        _this.observer = new IntersectionObserver( (e) => {
            e.forEach( (e) => {
                if( e.intersectionRatio > 0 ) {
                    _this.observer.unobserve(e.target);
                    _this.loadAsset(e.target);
                }
            });
        }, _this.options);
    };

    this.observeAssets = () => {
        _this.assets = document.querySelectorAll('[data-loading="lazy"]');
        if(_this.assets.length) {
            _this.assets.forEach( (e) => {
                _this.observer.observe(e);
            });
        }
    };

    this.loadAsset = (el) => {
        el.src = el.dataset.src;
        el.srcset = el.dataset.srcset;
        el.removeAttribute("data-src");
        el.removeAttribute("data-srcset");
    };

}

module.exports = OakLazyLoader;