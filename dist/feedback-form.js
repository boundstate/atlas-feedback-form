/**
 * feedback-form - v0.0.4 - 2014-08-03
 *
 * Copyright (c) 2014 Bound State Software
 */

(function (window, undefined) {
window.FeedbackForm = {
  embed: function(options) {
    // Load CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'screen,print';
    link.href = options.css;
    document.getElementsByTagName('head')[0].appendChild(link);

    // Create wrapper
    var wrapper = document.createElement('div');
    addClass(wrapper, 'feedback-form');
    document.body.appendChild(wrapper);

    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = options.url;
    iframe.style.height = options.height || '300px';

    // Create popup close button
    var closeBtn = document.createElement('a');
    closeBtn.innerHTML = '×';
    addClass(closeBtn, 'feedback-form-popup-close-btn');

    // Create popup
    var popup = document.createElement('div');
    popup.style.display = 'none';
    addClass(popup, 'feedback-form-popup');
    popup.appendChild(iframe);
    popup.appendChild(closeBtn);
    wrapper.appendChild(popup);

    // Create button
    var btn = document.createElement('a');
    addClass(btn, 'feedback-form-btn');
    wrapper.appendChild(btn);

    // Create tooltip
    var tooltip = document.createElement('div');
    tooltip.style.display = 'none';
    tooltip.innerHTML = 'Send us a message!';
    addClass(tooltip, 'feedback-form-tooltip');
    wrapper.appendChild(tooltip);

    function showTooltip () {
      tooltip.style.display = 'block';
      setTimeout(function () {
        addClass(tooltip, 'feedback-form-tooltip-active');
      }, 0);
    }

    function hideTooltip () {
      removeClass(tooltip, 'feedback-form-tooltip-active');
      setTimeout(function () {
        tooltip.style.display = 'none';
      }, 200);
    }

    function showPopup () {
      popup.style.display = 'block';
      setTimeout(function () {
        addClass(popup, 'feedback-form-popup-active');
      }, 0);
    }

    function hidePopup () {
      removeClass(popup, 'feedback-form-popup-active');
      setTimeout(function () {
        popup.style.display = 'none';
      }, 200);
    }

    setTimeout(showTooltip, 200);
    setTimeout(hideTooltip, 8000);

    addEventListener(btn, 'click', function () {
      if (hasClass(popup, 'feedback-form-popup-active')) {
        hidePopup();
      } else {
        showPopup();
      }
      hideTooltip();
    });
    addEventListener(closeBtn, 'click', function () {
      hidePopup();
    });
  },

  getClientInfo: function() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      window: {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
      }
    };
  },

  getDocumentHTML: function () {
    return outerHTML(document.documentElement);
  }
};
function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

function toggleClass(el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
}

function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent('on' + eventName, function(){
      handler.call(el);
    });
  }
}

function outerHTML(el){
  return el.outerHTML || new XMLSerializer().serializeToString(el);
}})(window);