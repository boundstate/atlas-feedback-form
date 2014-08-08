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
}