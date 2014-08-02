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
  }
};