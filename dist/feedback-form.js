/**
 * feedback-form - v0.0.7 - 2014-12-21
 *
 * Copyright (c) 2014 Bound State Software
 */

(function (window, undefined) {
window.FeedbackForm = {
  embed: function(options) {
    // Load CSS
    var link = document.createElement('link');
    link.id = 'feedback-form-stylesheet';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'screen,print';
    link.href = options.css;
    document.getElementsByTagName('head')[0].appendChild(link);

    // Create wrapper
    var wrapper = document.createElement('div');
    wrapper.id = 'feedback-form';
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

    var origin = options.url.match(/^(https?\:\/\/[^\/?#]+)/i)[1];
    var self = this;
    addEventListener(window, 'message', function(event) {
      if (event.origin !== origin) {
        return;
      }

      if (event.data.request = 'getClientInfo') {
        var response = self.getClientInfo();
        if (typeof event.data.screenshot !== 'undefined' && event.data.screenshot) {
          response.documentHTML = self.getDocumentHTML();
        }
        iframe.contentWindow.postMessage(response, origin);
      }
    });
  },

  getClientInfo: function() {
    return {
      url: window.location.href,
      userAgent: navigator.userAgent,
      window: {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight,
        xOffset: window.pageXOffset || document.documentElement.scrollLeft,
        yOffset: window.pageYOffset || document.documentElement.scrollTop
      }
    };
  },

  getDocumentHTML: function () {
    var el = document.cloneNode(true);

    captureInputValues(document, el);

    // Remove feedback form from HTML
    removeElement(el.getElementById('feedback-form-stylesheet'));
    removeElement(el.getElementById('feedback-form'));

    return getDoctype() + "\n" + outerHTML(el.documentElement);
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
}

function captureInputValues(source, dest){
  // Capture <input> values
  var sourceInputs = source.getElementsByTagName('input');
  var destInputs = dest.getElementsByTagName('input');
  for (i=0; i<sourceInputs.length; i++) {
    if (sourceInputs[i].type == 'checkbox') {
      // Checkbox values
      destInputs[i].setAttribute('checked', sourceInputs[i].checked);
    } else if (sourceInputs[i].type != 'password') {
      // Other values (ignore passwords)
      destInputs[i].setAttribute('value', sourceInputs[i].value);
    }
  }
  // Capture <textarea> values
  var sourceTextareas = source.getElementsByTagName('textarea');
  var destTextareas = dest.getElementsByTagName('textarea');
  for (i=0; i<sourceTextareas.length; i++) {
    destTextareas[i].innerHTML = sourceTextareas[i].value;
  }
  // Capture <select> values
  var sourceSelects = source.getElementsByTagName('select');
  var destSelects = dest.getElementsByTagName('select');
  for (i=0; i<sourceSelects.length; i++) {
    destSelects[i].options[sourceSelects[i].selectedIndex].setAttribute('selected', 'selected');
  }
}

function getDoctype(){
  var node = document.doctype;
  return "<!DOCTYPE " +
    node.name +
    (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') +
    (!node.publicId && node.systemId ? ' SYSTEM' : '') +
    (node.systemId ? ' "' + node.systemId + '"' : '') +
    '>';
}

function removeElement(el){
  el.parentNode.removeChild(el);
}})(window);