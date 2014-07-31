window.FeedbackForm = {
  embed: function(options) {
    // Load CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'screen,print';
    link.href = options.css;
    document.getElementsByTagName('head')[0].appendChild(link);

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
    addClass(popup, 'feedback-form-popup');
    popup.appendChild(iframe);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);

    // Create button
    var btn = document.createElement('a');
    addClass(btn, 'feedback-form-btn');
    document.body.appendChild(btn);

    addEventListener(btn, 'click', function () {
      toggleClass(popup, 'feedback-form-popup-active');
    });
    addEventListener(closeBtn, 'click', function () {
      removeClass(popup, 'feedback-form-popup-active');
    });
  }
};