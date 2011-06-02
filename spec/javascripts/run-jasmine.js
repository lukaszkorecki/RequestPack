if (phantom.state.length === 0) {
  if (phantom.args.length !== 1) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit();
  } else {
    phantom.state = 'run-jasmine';
    phantom.open(phantom.args[0]);
  }
} else {
  window.setInterval(function () {
    var list, el, desc, i, j;
    if (document.body.querySelector('.finished-at')) {
      list = document.body.querySelectorAll('.suite .failed');
      for (i = 0; i < list.length; ++i) {
        el = list[i];
        desc = el.querySelectorAll('.failed');
        console.log('');
        for (j = 0; j < desc.length; ++j) {
          console.log('Fail: '+ (i+1));
          console.log(desc[j].innerText);
        }
      }
      console.log(document.body.querySelector('.description').innerText);
      phantom.exit();
    }
  }, 100);
}

