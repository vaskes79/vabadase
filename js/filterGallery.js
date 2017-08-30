/**
 * Created by Vasily Guzov on 17.06.2014.
 *
 * Name script:
 * Description:
 * Source:
 */

function FilterGallery (options) {
    var filter = this._filter = document.querySelector(options.selector);
    var imgCont = this._imgCont = document.querySelector(options.imgCont);
    var aImg = this._aImg = imgCont.querySelectorAll('a');

    filter.addEventListener('click', this.filterImg.bind(this), false);
}

FilterGallery.prototype.filterImg = function (event) {
    var target = event.target;
    var valueFilter = target.getAttribute('value');
    for (var i=0; i<this._aImg.length; i++) {
        var filter = this._aImg[i].getAttribute('data-filter');
        if (filter.indexOf(valueFilter) == -1) {
            this._aImg[i].classList.add('filterHide');
            this._aImg[i].setAttribute('rel', '');
        } else if (filter.indexOf(valueFilter) >= 0) {
            this._aImg[i].classList.remove('filterHide');
            this._aImg[i].setAttribute('rel', 'iLoad');
        }
    }
};


// var filter = new FilterGallery({
//     selector: '#filterGallery',
//     imgCont: '.imgCont'
// });
