(function () {

  var
    audio = document.getElementById('audio-process'),
    oscEl = document.getElementById('data-oscillator'),
    mediaEl = document.getElementById('data-mediaelement'),
    oscControl = document.getElementById('oscillator-control'),

    ctx = new webkitAudioContext(),

    oscSrc = ctx.createOscillator(),
    oscProc = ctx.createJavaScriptNode(2048),
  
    mediaProc = ctx.createJavaScriptNode(2048),
    mediaSrc;


  audio.readyState < 3 ?
    audio.addEventListener('canplay', connect) :
    connect();

  oscEl.style.fontWeight = mediaEl.style.fontWeight = 'bold';

  function connect () {
    mediaSrc = ctx.createMediaElementSource(audio);

    oscProc.onaudioprocess = function (e) {
      var d = e.inputBuffer.getChannelData(0)[0];
      if (d) {
        oscEl.style.color = '#aaee22';
        oscEl.innerHTML = 'Data found: ' + d;
      }
    };

    mediaProc.onaudioprocess = function (e) {
      var d = e.inputBuffer.getChannelData(0)[0];
      if (d) {
        mediaEl.style.color = '#aaee22';
        mediaEl.innerHTML = 'Data found: ' + d;
      }
    }

    mediaSrc.connect( mediaProc );
    mediaSrc.connect( ctx.destination );
    mediaProc.connect( ctx.destination );

    oscSrc.connect( oscProc );
    oscProc.connect( ctx.destination );
  }

  if ( oscControl.addEventListener ) {
    oscControl.addEventListener( 'click', oscToggle );
  } else if ( oscControl.attachEvent ) {
    oscControl.attachEvent( 'onclick', oscToggle );
  }

  function oscToggle (e) {
      e.preventDefault();
      var isPlaying = !!this.getAttribute('data-playing');
      if ( isPlaying ) {
        oscSrc.disconnect();
        this.removeAttribute('data-playing');
        this.innerHTML = 'Play oscillator';
      } else {
        oscSrc.connect( oscProc );
        oscSrc.connect( ctx.destination );
        oscSrc.noteOn(0);
        this.setAttribute('data-playing', true);
        this.innerHTML = 'Pause oscillator';
      }
  }

  /****/

  var
    audioGain = document.getElementById('audio-gain'),
    audioSrc, gainNode;

  audio.readyState < 3 ? audio.addEventListener('canplay', connectGain) : connectGain();

  function connectGain () {
    audioSrc = ctx.createMediaElementSource(audioGain);
    gainNode = ctx.createGainNode();
    gainNode.gain.value = 100;

    audioSrc.connect( gainNode );
    gainNode.connect( ctx.destination );
  }

})();
