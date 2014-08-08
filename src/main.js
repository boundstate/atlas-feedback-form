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