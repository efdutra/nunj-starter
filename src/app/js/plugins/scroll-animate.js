function init(){
    /*************** Dependencies ***************/
    var _ = require('dom-manipulator');
    /********************************************/

    var hash = window.location.hash;
    _.bindElm(_.getElm('.animated-scroll', true), 'click', linkClicked);

    function linkClicked(e){
        e && e.preventDefault();
        hash = this.href.match(/#.*/);
        if(!hash || !hash[0]) return location.href = this.href;
        scrollTo(_.getElm(hash[0]));
        return location.hash = hash;
    }
}

function scrollTo(elm, options){
    if(!elm) return;
    options      = options || {};
    options.step = options.step || (!window.isIe ? 10 : 100);
    options.time = options.time || 1;

    var limit  = elm.offsetTop
    ,   toDown = window.scrollY < limit
    ,   i      = window.scrollY
    ,   scrollInterval = setInterval(function(){

        i += toDown ? options.step : -options.step;

        window.scrollTo(0, i);

        if((toDown && i >= limit) ||
           (!toDown && i <= 0)) {
            clearInterval(scrollInterval)
        }

    }, options.time);

    window.scrollTo2 = scrollTo;
}

module.exports = {
    init     : init,
    scrollTo : scrollTo
}