/**
 * @constructor
 */
Animator = function() {

};

/**
 * @param {Array<Element>} elements
 */
Animator.prototype.fadeIn = function(elements) {
    elements.forEach(function(ele) {
        ele.classList.add('visible');
        ele.classList.remove('hidden');
    });
};

/**
 * @param {Array<Element>} elements
 */
Animator.prototype.fadeOut = function(elements) {
    elements.forEach(function(ele) {
        ele.classList.add('hidden');
        ele.classList.remove('visible');
    });
};