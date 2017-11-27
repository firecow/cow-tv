/**
 * @constructor
 */
StyleSheetManipulator = function() {
    window.addEventListener('resize', function() {
        this.setMinResolutionRules(document.body.offsetWidth, document.body.offsetHeight);
    }.bind(this));
};

/**
 * @param {number} width Document width
 * @param {number} height Document height
 */
StyleSheetManipulator.prototype.setMinResolutionRules = function(width, height) {
    var minDimension = Math.min(width, height);
    var m = 1 / (minDimension / 320);

    this.setCssProperty('#home #logo', 'width', 30 * m);

    this.setCssProperty('#spinner', 'width', 40 * m);
    this.setCssProperty('#debug-info', 'font-size', 5 * m);

    this.setCssProperty('.padding', 'padding', 0.9 * m);

    this.setCssProperty('.header', 'font-size', 4.2 * m);
    this.setCssProperty('.header', 'margin-top', 4.0 * m);

    this.setCssProperty('.item .title', 'font-size', 3.8 * m);

    this.setCssProperty('.item', 'width', 46.5 * m);
    this.setCssProperty('.item', 'margin-left', 0.8 * m);
    this.setCssProperty('.item', 'margin-right', 0.8 * m);

    this.setCssProperty('::-webkit-scrollbar', 'width', 0.8 * m);
    this.setCssProperty('::-webkit-scrollbar', 'height', 0.8 * m);
};

StyleSheetManipulator.prototype.setCssProperty = function(selector, propertyKey, vMin) {
    var rule = this.getCssRule(this.getStyleSheet('main-style'), selector);
    rule.style.setProperty(propertyKey, vMin + 'vmin', '');
};

/**
 * @param {Stylesheet} styleSheet
 * @param {string} selectorText
 * @return {CssRule}
 */
StyleSheetManipulator.prototype.getCssRule = function(styleSheet, selectorText) {
    var rules = styleSheet.rules;
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (rule.selectorText == selectorText) {
            return rule;
        }
    }
    return null;
};

/**
 * @param {string} styleSheetTitle
 * @return {Stylesheet}
 */
StyleSheetManipulator.prototype.getStyleSheet = function(styleSheetTitle) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (sheet.title == styleSheetTitle) {
            return sheet;
        }
    }


    return null;
};