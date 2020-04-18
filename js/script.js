;(function (window, document) {
  function randomHex() {
    var hex = '#' + Math.floor(Math.random() * 16777215).toString(16)
    if (hex.length != 4 && hex.length != 7) {
      return randomHex()
    }

    return hex
  }

  window.onload = function () {
    var inputs = document.querySelectorAll('#generator input[type="text"]')
    inputs.forEach(function (item) {
      item.value = randomHex()
    })

    generateBackground()
  }

  function downloadPng(uri, window) {
    window.open(uri, '_blank')
  }

  function convertSvgToPng(svg) {
    return new Promise(function (resolve, reject) {
      try {
        svgAsPngUri(convertStringToNode(window.xablau.svg), {}, resolve)
      } catch (e) {
        reject(e)
      }
    })
  }

  function convertStringToNode(html) {
    var el = document.createElement('div')
    el.innerHTML = html

    if (!el.childNodes.length) {
      return null
    }

    return el.childNodes.item(0)
  }

  function handleExport(event) {
    var filetype = this.dataset.export

    if (filetype === 'svg') {
      window.open(window.xablau.uri, '_blank')
      return
    }

    if (filetype === 'png') {
      var w = window.open('', '_blank')
      convertSvgToPng(window.xablau.svg).then(function (uri) {
        w.location.href = uri
      })
      return
    }

    alert('Unkown export format')
  }

  var exportBg = document.querySelectorAll('#generator [data-export]')
  exportBg.forEach(function (exportBtn) {
    exportBtn.addEventListener('click', handleExport)
  })

  function generateBackground(event) {
    if (event) {
      event.preventDefault()
    }

    var opts = {}
    var inputs = document.querySelectorAll('#generator input')
    inputs.forEach(function (item) {
      if (item.type === 'text') {
        opts[item.name] = item.value
      }
    })

    var generators = document.querySelector(
      '#generator select[name="generator"]'
    )
    var generator = generators.options[generators.selectedIndex]
    opts.generator = generator.value

    var bg = GeoPattern.generate(new Date().getTime(), opts)
    var background = document.getElementById('background')
    window.xablau = {
      uri: bg.toDataUri(),
      svg: bg.toSvg(),
    }
    background.style['background-image'] = bg.toDataUrl()
  }

  var form = document.getElementById('generator')
  form.addEventListener('submit', generateBackground)
})(window, document)

function changeColor(color){
  inputColor = document.getElementById('inputColor');
  inputColor.value = color;

  generate();
}

function generate(){
  // por Gambiarra e Cia
  document.getElementById('submitColor').click();
}