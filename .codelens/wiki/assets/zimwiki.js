/* ZimWiki client — search, invariant filter, interactive Mermaid (pan/zoom/fullscreen).
   Dependency-free pan/zoom so the offline posture holds. Works on file://. */
(function () {
  'use strict';
  var INDEX = window.__ZIMWIKI_INDEX__ || [];
  var BASE = window.__ZIMWIKI_BASE__ || '';

  /* ---------------------------------------------------------------- search */
  var box = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function tlc(t) { return (t || 'doc').toLowerCase(); }
  function render(items, q) {
    if (!results) return;
    if (!q) { results.classList.remove('open'); results.innerHTML = ''; return; }
    if (!items.length) { results.innerHTML = '<div class="sr-empty">No matches for “' + esc(q) + '”</div>'; results.classList.add('open'); return; }
    results.innerHTML = items.slice(0, 24).map(function (it) {
      return '<a class="sr-item" href="' + BASE + it.url + '">' +
        '<span class="badge t-' + tlc(it.type) + '">' + esc(it.type || 'doc') + '</span>' +
        '<span class="nm">' + esc(it.title) + '</span><span class="pth">' + esc(it.scope || '') + '</span></a>';
    }).join('');
    results.classList.add('open');
  }
  function search(q) {
    q = q.trim().toLowerCase(); if (!q) return [];
    return INDEX.map(function (it) {
      var hay = (it.title + ' ' + (it.id || '') + ' ' + (it.scope || '') + ' ' + (it.type || '')).toLowerCase();
      var idx = hay.indexOf(q), score = idx === 0 ? 3 : idx > 0 ? 2 : (q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; }) ? 1 : 0);
      return { it: it, score: score };
    }).filter(function (x) { return x.score > 0; }).sort(function (a, b) { return b.score - a.score; }).map(function (x) { return x.it; });
  }
  if (box) {
    box.addEventListener('input', function () { render(search(box.value), box.value); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { box.value = ''; render([], ''); box.blur(); }
      if (e.key === 'Enter') { var f = results && results.querySelector('.sr-item'); if (f) window.location.href = f.getAttribute('href'); }
    });
    document.addEventListener('keydown', function (e) {
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && document.activeElement !== box) { e.preventDefault(); box.focus(); box.select(); }
    });
    document.addEventListener('click', function (e) { if (results && !results.contains(e.target) && e.target !== box) results.classList.remove('open'); });
  }

  /* ------------------------------------------------ invariant registry filter */
  var fbar = document.getElementById('filterbar');
  if (fbar) {
    fbar.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip-btn'); if (!btn) return;
      fbar.querySelectorAll('.chip-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var band = btn.getAttribute('data-band');
      document.querySelectorAll('.inv-card').forEach(function (c) { c.style.display = (band === 'all' || c.getAttribute('data-band') === band) ? '' : 'none'; });
    });
  }

  /* ------------------------------------------------------- pan/zoom viewport */
  function prepSvg(svg) {
    var vb = svg.viewBox && svg.viewBox.baseVal;
    var w = vb && vb.width ? vb.width : (svg.getBBox ? svg.getBBox().width : 600);
    var h = vb && vb.height ? vb.height : (svg.getBBox ? svg.getBBox().height : 400);
    svg.style.maxWidth = 'none'; svg.style.width = w + 'px'; svg.style.height = h + 'px';
    svg.style.transformOrigin = '0 0'; svg.style.display = 'block';
    return { w: w, h: h };
  }
  function makeViewport(stage, svg, dims) {
    var scale = 1, tx = 0, ty = 0, drag = false, ox = 0, oy = 0;
    function apply() { svg.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')'; }
    function fit() {
      var r = stage.getBoundingClientRect();
      scale = Math.min((r.width - 48) / dims.w, (r.height - 48) / dims.h, 1.6);
      if (!isFinite(scale) || scale <= 0) scale = 1;
      tx = (r.width - dims.w * scale) / 2; ty = (r.height - dims.h * scale) / 2; apply();
    }
    function zoomAt(mx, my, factor) {
      var ns = Math.min(Math.max(scale * factor, 0.1), 10);
      tx = mx - (mx - tx) * (ns / scale); ty = my - (my - ty) * (ns / scale); scale = ns; apply();
    }
    stage.addEventListener('wheel', function (e) {
      e.preventDefault(); var r = stage.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
    }, { passive: false });
    stage.addEventListener('mousedown', function (e) { drag = true; ox = e.clientX - tx; oy = e.clientY - ty; stage.classList.add('grabbing'); e.preventDefault(); });
    window.addEventListener('mousemove', function (e) { if (!drag) return; tx = e.clientX - ox; ty = e.clientY - oy; apply(); });
    window.addEventListener('mouseup', function () { drag = false; stage.classList.remove('grabbing'); });
    stage.addEventListener('dblclick', function (e) { var r = stage.getBoundingClientRect(); zoomAt(e.clientX - r.left, e.clientY - r.top, 1.5); });
    return {
      fit: fit,
      zoomCenter: function (f) { var r = stage.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, f); }
    };
  }
  function btn(label, title, cls) { return '<button class="' + (cls || 'zw-btn') + '" title="' + title + '" data-act="' + label + '">' + ICONS[label] + '</button>'; }
  var ICONS = { 'in': '+', 'out': '−', 'reset': '⟳', 'full': '⤢', 'close': '✕' };

  function openLightbox(srcSvg, title) {
    var lb = document.createElement('div'); lb.className = 'zw-lightbox';
    lb.innerHTML = '<div class="zw-lightbox-bar"><span class="title">' + esc(title || 'Diagram') + '</span>' +
      '<div class="zw-lb-tools">' + btn('out', 'Zoom out', 'zw-btn dark') + btn('in', 'Zoom in', 'zw-btn dark') +
      btn('reset', 'Reset', 'zw-btn dark') + btn('close', 'Close (Esc)', 'zw-btn dark') + '</div></div>' +
      '<div class="zw-lightbox-stage"></div>';
    document.body.appendChild(lb); document.body.style.overflow = 'hidden';
    var stage = lb.querySelector('.zw-lightbox-stage');
    var svg = srcSvg.cloneNode(true);
    stage.appendChild(svg);
    var dims = prepSvg(svg);
    var vp = makeViewport(stage, svg, dims);
    requestAnimationFrame(vp.fit);
    function close() { lb.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    lb.querySelector('.zw-lightbox-bar').addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return; var a = b.getAttribute('data-act');
      if (a === 'in') vp.zoomCenter(1.25); else if (a === 'out') vp.zoomCenter(1 / 1.25); else if (a === 'reset') vp.fit(); else if (a === 'close') close();
    });
  }

  function enhanceDiagram(mer) {
    var svg = mer.querySelector('svg'); if (!svg) return;
    var title = (document.querySelector('h1.doc-title') || {}).textContent || 'Diagram';
    var wrap = document.createElement('div'); wrap.className = 'zw-diagram';
    mer.parentNode.insertBefore(wrap, mer);
    var stage = document.createElement('div'); stage.className = 'zw-stage';
    wrap.appendChild(stage); stage.appendChild(mer);
    mer.classList.add('zw-bare');
    var dims = prepSvg(svg);
    var vp = makeViewport(stage, svg, dims);
    var tb = document.createElement('div'); tb.className = 'zw-toolbar';
    tb.innerHTML = btn('out', 'Zoom out') + btn('in', 'Zoom in') + btn('reset', 'Reset view') + btn('full', 'Fullscreen');
    wrap.appendChild(tb);
    var hint = document.createElement('div'); hint.className = 'zw-hint'; hint.textContent = 'scroll to zoom · drag to pan · ⤢ fullscreen';
    wrap.appendChild(hint);
    tb.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return; var a = b.getAttribute('data-act');
      if (a === 'in') vp.zoomCenter(1.25); else if (a === 'out') vp.zoomCenter(1 / 1.25); else if (a === 'reset') vp.fit(); else if (a === 'full') openLightbox(svg, title);
    });
    requestAnimationFrame(vp.fit);
  }

  /* ----------------------------------------------------------------- mermaid */
  function enhanceAll() {
    document.querySelectorAll('.mermaid').forEach(function (m) {
      if (m.closest('.zw-diagram')) return;          // already enhanced
      if (m.querySelector('svg')) { try { enhanceDiagram(m); } catch (e) { console.error('zimwiki diagram', e); } }
    });
  }
  if (document.querySelector('.mermaid')) {
    var s = document.createElement('script');
    // Mermaid is vendored locally (assets/mermaid.min.js) — NO CDN, so the report
    // renders fully offline / on egress-restricted partner machines [INV-026].
    s.src = BASE + 'assets/mermaid.min.js';
    s.onload = function () {
      try {
        window.mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'base',
          themeVariables: { fontFamily: 'Space Grotesk, sans-serif', primaryColor: '#eef2fb', primaryBorderColor: '#3c6bc0', lineColor: '#6a7693', primaryTextColor: '#0c1426', fontSize: '14px' } });
        var p = window.mermaid.run({ querySelector: '.mermaid' });
        if (p && p.then) p.then(enhanceAll, enhanceAll);
      } catch (err) { console.error('zimwiki mermaid', err); }
      // Robust fallback: poll for rendered SVGs and enhance whenever they appear,
      // regardless of how mermaid resolved its run() promise.
      var n = 0, iv = setInterval(function () { enhanceAll(); if (++n > 24 || document.querySelector('.zw-diagram')) clearInterval(iv); }, 140);
    };
    s.onerror = function () {
      document.querySelectorAll('.mermaid').forEach(function (m) {
        m.innerHTML = '<div style="font-family:Space Mono,monospace;font-size:11px;color:#6a7693">diagram unavailable offline</div>';
      });
    };
    document.head.appendChild(s);
  }
})();
