"use strict";
var OPENER_CLASSNAME = ".nav-opener"
window.cacheStorage = {}
function cache (key, value) {
	if (typeof value == 'undefined') {
		return cacheStorage[key];
	}
	return cacheStorage[key] = value;
}
function _get_ (selector) {
	return !cache(selector) ?
		cache(selector, document.querySelector(selector))
		: cache(selector);
}
function _get_all_ (selector) {
	return !cache(selector) ?
		cache(selector, document.querySelectorAll(selector))
		: cache(selector);
}
function Menu (mobileButtonOpener, mobileButtonCloser, ifResizeAbleToChange) {
	this._arrows = _get_all_(OPENER_CLASSNAME)
	this._styles = this.addStyles.bind(this)
	this.closeAll = this.closeAll.bind(this)
	this.addEvents(this._arrows, this.open.bind(this));
	if (ifResizeAbleToChange === true) window.onresize = this._onresize.bind(this);
	if (typeof mobileButtonOpener != 'undefined' && mobileButtonOpener != null) _get_(mobileButtonOpener)
			.addEventListener('click', this.openMobileNav.bind(this));
	if (typeof mobileButtonCloser != 'undefined' && mobileButtonCloser != null) _get_(mobileButtonCloser)
			.addEventListener('click', this.closeMobileNav.bind(this))
}

Menu.prototype.addEvents = function (elements, event) {
	for (var key = 0; key < elements.length ; key++) {
		elements[key].addEventListener("click",function (mv) {
			event(mv.target, mv.target.getAttribute('data-open'))
		})
	}
}

Menu.prototype.open = function (element, listId) {
	var item = element.parentNode.parentNode
	if (this.hasClass(item, 'nav-item--opened')) {
		this.removeClass(item, 'nav-item--opened');
	}
	else  {
		this.closeAll();
		this.addClass(item, 'nav-item--opened')
	}
}

Menu.prototype.closeAll = function () {
	if (this._arrows.length > 0) {
		for (var key = 0, item=null ; key < this._arrows.length; key++) {
			item = this._arrows[key].parentNode.parentNode;
			this.removeClass(item, 'nav-item--opened')
		}
	}
	return null;
}

Menu.prototype.addStyles = function (element, styles) {
	for (var key in styles) {
		element.style[key] = styles[key];
	}
	return this;
}

Menu.prototype._onresize = function () {
	if (window.innerWidth < 1000) {
		this.makeMobile()
	}
	else {
		this.makeDesktop()
	}
}

Menu.prototype.openMobileNav = function () {
	this.addClass(_get_("#nav-list"), 'nav-list--opened')
	this.createBackground()
}

Menu.prototype.closeMobileNav = function () {
	this.removeClass(_get_("#nav-list"), 'nav-list--opened')
	this.removeBackground.bind(this).call()
}

Menu.prototype.makeMobile = function () {

}
Menu.prototype.makeDesktop = function () {

}

Menu.prototype.toggleClass = function (element, className) {
	var testRegular = new RegExp('('+className+')', "g");
	if (testRegular.test(element.className)) {
		element.className = element.className.replace(className,"").trim()
	}
	else {
		element.className = element.className + " " + className;
	}
	return this;
}

Menu.prototype.createBackground = function () {
	var background = document.createElement('div')
	background.setAttribute('class', "nav-background")
	background.addEventListener('click', this.closeMobileNav.bind(this))
	document.body.appendChild(background);
	this.background = background;
}

Menu.prototype.removeBackground = function () {
	this.background.parentNode.removeChild(this.background);
	delete this.background
}

Menu.prototype.hasClass = function (element, className) {
	return (new RegExp(className, "g")).test(element.className)? true: false;
}

Menu.prototype.addClass = function (element, className) {
	if (!(new RegExp(className, "g")).test(element.className)) 
		element.className = element.className + " " + className;
	return this;
}

Menu.prototype.removeClass = function (element, className) {
	element.className = element.className.replace(className, "").trim()
	return this;
}

window.menu = new Menu("#nav-list--opener", "#nav-list-closer", true);

