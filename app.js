(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reais = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const NOME_CAT = { solo: 'Solo', duplo: 'Dois lugares' };

  /* ---------- desenho dos bancos ---------- */
  // Cada banco é desenhado em duas vistas: de cima (com a costura) e de lado.
  // de/ate = começo e fim no comprimento; planta = [x, meia largura]; perfil = [x, altura]
  const ARTES = {
    solo:      { de: 78, ate: 330, planta: [[100, 20], [160, 32], [230, 48], [290, 50], [322, 30]], perfil: [[92, 14], [160, 16], [240, 22], [300, 32], [324, 22]] },
    bobber:    { de: 118, ate: 304, planta: [[136, 22], [180, 38], [235, 54], [282, 50], [300, 28]], perfil: [[130, 12], [190, 14], [250, 18], [296, 16]], molas: [246, 284] },
    soloapoio: { de: 70, ate: 322, planta: [[92, 22], [150, 36], [220, 50], [280, 52], [314, 32]], perfil: [[84, 16], [150, 18], [220, 22], [262, 40], [296, 58], [316, 44]] },
    duplo:     { de: 40, ate: 362, planta: [[62, 22], [120, 42], [175, 52], [225, 40], [268, 38], [315, 42], [352, 26]], perfil: [[56, 16], [130, 20], [195, 26], [228, 36], [300, 38], [352, 28]] },
    stepup:    { de: 40, ate: 362, planta: [[62, 22], [120, 44], [175, 54], [222, 42], [262, 40], [312, 42], [352, 26]], perfil: [[56, 16], [130, 18], [190, 24], [220, 52], [250, 58], [315, 52], [354, 36]] },
    cobra:     { de: 36, ate: 366, planta: [[58, 20], [120, 40], [180, 46], [235, 30], [300, 21], [354, 12]], perfil: [[52, 14], [130, 16], [190, 24], [222, 30], [290, 18], [356, 8]] },
    kingqueen: { de: 50, ate: 350, planta: [[72, 24], [130, 40], [185, 44], [232, 36], [290, 38], [340, 28]], perfil: [[66, 18], [140, 20], [184, 30], [208, 60], [240, 60], [292, 58], [322, 80], [342, 84]] },
    touring:   { de: 40, ate: 362, planta: [[62, 28], [122, 52], [180, 58], [226, 44], [270, 48], [318, 52], [352, 32]], perfil: [[56, 20], [140, 24], [196, 30], [224, 46], [300, 46], [354, 34]], encosto: [216, 40] },
    pillion:   { de: 130, ate: 280, planta: [[142, 30], [175, 40], [235, 40], [268, 30]], perfil: [[140, 16], [180, 20], [240, 20], [272, 14]] },
    encosto:   { de: 140, ate: 268, planta: [[150, 30], [176, 44], [232, 44], [258, 30]], perfil: [[150, 22], [180, 28], [228, 28], [258, 22]] },
  };
  const TIPO_COSTURA = { 'Capitonê': 'capitone', 'Diamante': 'diamante', 'Gomos transversais': 'transversal', 'Gomos longitudinais': 'longitudinal', 'Ondas': 'ondas', 'Chevron': 'chevron' };

  const r = (n) => Math.round(n * 100) / 100;
  // Curva suave que passa por todos os pontos (Catmull-Rom em Bézier)
  function curva(pts, fechada) {
    const n = pts.length;
    const P = (i) => (fechada ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0, fim = fechada ? n : n - 1; i < fim; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += `C${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)} ${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
    }
    return d + (fechada ? 'Z' : '');
  }

  let nArte = 0;
  // o = { costura, couro, fio, botao }: sem cores, sai o desenho técnico em linha
  function arte(tipo, o = {}) {
    const a = ARTES[tipo];
    if (!a) return '';
    const cy = 104, by = a.molas ? 244 : 262, id = 'recorte' + (++nArte);
    const x0 = a.de, xN = a.ate, L = xN - x0, cx = (x0 + xN) / 2;
    const w = Math.max(...a.planta.map((p) => p[1]));

    // vista de cima
    const planta = curva([[x0, cy], ...a.planta.map(([x, m]) => [x, cy - m]), [xN, cy], ...a.planta.map(([x, m]) => [x, cy + m]).reverse()], true);
    const recuo = `translate(${cx} ${cy}) scale(${r((L - 20) / L)} ${r((2 * w - 20) / (2 * w))}) translate(${-cx} ${-cy})`;
    let fios = '', botoes = '';
    const c = TIPO_COSTURA[o.costura];
    if (c === 'diamante') for (let x = x0 - 2 * w; x < xN; x += 20) {
      fios += `M${x} ${cy - w}l${2 * w} ${2 * w}M${x + 2 * w} ${cy - w}l${-2 * w} ${2 * w}`;
      if (o.botao) botoes += `<circle class="botao" cx="${x + w}" cy="${cy}" r="2.4"/>`;
    }
    if (c === 'capitone') {
      fios += `M${x0} ${cy}h${L}`;
      for (let x = x0 + 30; x < xN - 12; x += 28) {
        fios += `M${x} ${cy - w}v${2 * w}`;
        botoes += `<circle class="botao" cx="${x}" cy="${cy}" r="3"/>`;
      }
    }
    if (c === 'ondas') for (let y = cy - 39; y <= cy + 39; y += 13) {
      fios += `M${x0} ${y}q11 -9 22 0`;
      for (let x = x0 + 22; x < xN; x += 22) fios += 't22 0';
    }
    if (c === 'chevron') for (let x = x0 - w; x < xN; x += 14) fios += `M${x} ${cy - w}L${r(x + w * 0.6)} ${cy}L${x} ${cy + w}`;
    if (c === 'transversal') for (let x = x0 + 22; x < xN - 10; x += 15) fios += `M${x} ${cy - w}v${2 * w}`;
    if (c === 'longitudinal') for (let y = cy - 39; y <= cy + 39; y += 13) fios += `M${x0} ${y}h${L}`;

    let s = `<defs><clipPath id="${id}"><path d="${planta}" transform="${recuo}"/></clipPath></defs>`;
    s += `<line class="eixo" x1="14" y1="${cy}" x2="372" y2="${cy}"/>`;
    s += `<path class="couro" d="${planta}"/>`;
    if (fios) s += `<path class="costura" d="${fios}" clip-path="url(#${id})"/>`;
    s += `<path class="costura" d="${planta}" transform="${recuo}" vector-effect="non-scaling-stroke"/>`;
    if (botoes) s += `<g clip-path="url(#${id})">${botoes}</g>`;

    // vista de lado
    if (a.encosto) {
      const [x, h] = a.encosto;
      s += `<rect class="couro" x="${x - 7}" y="${cy - 30}" width="14" height="60" rx="7"/>`;
      s += `<rect class="couro" x="${x - 7}" y="${by - h - 46}" width="14" height="56" rx="7"/>`;
    }
    s += `<path class="couro" d="${curva([[x0, by], ...a.perfil.map(([x, h]) => [x, by - h]), [xN, by]], false)}Z"/>`;
    s += `<path class="costura" d="${curva(a.perfil.map(([x, h]) => [x, by - h + 7]), false)}"/>`;
    s += `<path class="base" d="M${x0 + 8} ${by + 4}H${xN - 8}"/>`;
    if (a.molas) {
      for (const x of a.molas) s += `<path class="ferro" d="M${x} ${by + 6}h7l-14 4l14 4l-14 4l14 4l-14 4h7"/>`;
      s += `<path class="base" d="M${a.molas[0] - 14} ${by + 28}H${a.molas[a.molas.length - 1] + 14}"/>`;
    }

    // cotas
    s += `<path class="cota" d="M381 ${cy - w}H391M381 ${cy + w}H391M386 ${cy - w}V${cy + w}"/>`;
    s += `<text class="cota-txt" transform="translate(380 ${cy}) rotate(-90)" text-anchor="middle">LARG.</text>`;
    s += `<path class="cota" d="M${x0} 285V295M${xN} 285V295M${x0} 290H${xN}"/>`;
    s += `<text class="cota-txt" x="${x0 + 8}" y="284">COMP.</text>`;

    const cores = o.couro ? ` style="--couro:${esc(o.couro)};--fio:${esc(o.fio || '#f1ece0')};--botao:${esc(o.botao || '#dcdcdc')}"` : '';
    return `<svg class="arte" viewBox="0 0 400 300" role="img" aria-label="Desenho do banco: vista de cima e de lado"${cores}>${s}</svg>`;
  }

  const fotosDe = (p) => p.fotos || [];
  const visual = (p) => fotosDe(p).length
    ? `<img src="${esc(p.fotos[0])}" alt="Banco ${esc(p.nome)}" loading="lazy">`
    : arte(p.arte, { costura: p.costura });
  const precoTxt = (p) => (p.preco ? reais(p.preco) : 'Sob consulta');

  /* ---------- catálogo ---------- */
  const grade = $('#grade');
  function desenharGrade(filtro = 'todos') {
    grade.innerHTML = PRODUTOS.filter((p) => filtro === 'todos' || p.cat === filtro).map((p) => `
      <button class="cartao" data-id="${p.id}" aria-label="Configurar ${esc(p.nome)}">
        <div class="cartao-arte"><small>${NOME_CAT[p.cat]}</small>${visual(p)}</div>
        <div class="cartao-info">
          <h3>${esc(p.nome)}</h3>
          <p>${esc(p.resumo)}</p>
          <div class="cartao-pe"><span class="preco">${precoTxt(p)}</span><i>Configurar →</i></div>
        </div>
      </button>`).join('');
    $$('.filtros button').forEach((b) => b.setAttribute('aria-selected', b.dataset.filtro === filtro));
  }
  $$('[data-filtro]').forEach((el) => el.addEventListener('click', () => desenharGrade(el.dataset.filtro)));
  grade.addEventListener('click', (e) => {
    const c = e.target.closest('.cartao');
    if (c) abrirProduto(c.dataset.id);
  });

  /* ---------- produto ---------- */
  const modal = $('#modalProduto');
  let atual = null, qtd = 1;
  // A foto mostra o modelo; o desenho acompanha as cores escolhidas
  function pintarArte() {
    if (!atual) return;
    const o = Object.fromEntries(new FormData($('#mpForm')));
    $('#mpPrevia').innerHTML = arte(atual.arte, {
      costura: o['Costura'] || atual.costura,
      couro: CORES_COURO[o['Cor do couro']],
      fio: CORES_LINHA[o['Cor da linha']],
      botao: BOTOES[o['Botões']],
    });
  }
  function montarArte() {
    const fotos = fotosDe(atual);
    $('#mpArte').innerHTML = (fotos.length ? `<div class="foto"><img id="mpFoto" src="${esc(fotos[0])}" alt="Banco ${esc(atual.nome)}"></div>` : '')
      + (fotos.length > 1 ? `<div class="miniaturas">${fotos.map((f, i) => `<button type="button" data-foto="${esc(f)}" aria-label="Foto ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}><img src="${esc(f)}" alt="" loading="lazy"></button>`).join('')}</div>` : '')
      + '<div class="previa"><small>Sua combinação · desenho ilustrativo</small><div id="mpPrevia"></div></div>';
  }
  $('#mpArte').addEventListener('click', (e) => {
    const m = e.target.closest('[data-foto]');
    if (!m) return;
    $('#mpFoto').src = m.dataset.foto;
    $$('#mpArte [data-foto]').forEach((x) => x.toggleAttribute('aria-current', x === m));
  });
  function abrirProduto(id) {
    atual = PRODUTOS.find((p) => p.id === id);
    if (!atual) return;
    qtd = 1;
    $('#mpCat').textContent = NOME_CAT[atual.cat];
    $('#mpNome').textContent = atual.nome;
    $('#mpResumo').textContent = atual.resumo;
    $('#mpPreco').textContent = precoTxt(atual);
    $('#mpQtd').textContent = qtd;
    const grupos = { ...atual.opcoes, 'Moto': MODELOS };
    $('#mpOpcoes').innerHTML = Object.entries(grupos).map(([nome, vals]) => `
      <fieldset><legend>${esc(nome)}</legend><div class="chips">
        ${vals.map((v, i) => {
          const cor = nome === 'Cor do couro' ? CORES_COURO[v] : nome === 'Cor da linha' ? CORES_LINHA[v] : nome === 'Botões' ? BOTOES[v] : '';
          const marcado = nome === 'Costura' ? v === atual.costura : i === 0;
          return `<label><input type="radio" name="${esc(nome)}" value="${esc(v)}"${marcado ? ' checked' : ''}><span>${cor ? `<i style="background:${esc(cor)}"></i>` : ''}${esc(v)}</span></label>`;
        }).join('')}
      </div></fieldset>`).join('');
    montarArte();
    pintarArte();
    modal.showModal();
  }
  $('#mpForm').addEventListener('change', pintarArte);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-fechar]')) modal.close();
    const b = e.target.closest('[data-qtd]');
    if (b) { qtd = Math.min(20, Math.max(1, qtd + +b.dataset.qtd)); $('#mpQtd').textContent = qtd; }
  });
  $('#mpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const opcoes = Object.fromEntries(new FormData(e.target));
    const chave = atual.id + '|' + Object.values(opcoes).join('|');
    const existente = carrinho.find((i) => i.chave === chave);
    if (existente) existente.qtd += qtd;
    else carrinho.push({ chave, id: atual.id, opcoes, qtd });
    salvar();
    modal.close();
    abrirCarrinho();
  });

  /* ---------- carrinho ---------- */
  let carrinho = [];
  try { carrinho = JSON.parse(localStorage.getItem('digo_carrinho')) || []; } catch { /* sem armazenamento */ }
  carrinho = carrinho.filter((i) => PRODUTOS.some((p) => p.id === i.id));

  function salvar() {
    try { localStorage.setItem('digo_carrinho', JSON.stringify(carrinho)); } catch { /* segue sem salvar */ }
    desenharCarrinho();
  }
  const prod = (i) => PRODUTOS.find((p) => p.id === i.id);

  function desenharCarrinho() {
    const n = carrinho.reduce((s, i) => s + i.qtd, 0);
    $('#contador').textContent = n;
    $('#carrinhoItens').innerHTML = carrinho.length ? carrinho.map((i, k) => {
      const p = prod(i);
      return `<div class="item">
        <h4>${esc(p.nome)}</h4>
        <span class="preco">${p.preco ? reais(p.preco * i.qtd) : 'Sob consulta'}</span>
        <small>${Object.entries(i.opcoes).map(([a, b]) => `${esc(a)}: ${esc(b)}`).join(' · ')}</small>
        <div class="item-acoes">
          <div class="qtd"><button type="button" data-k="${k}" data-d="-1" aria-label="Diminuir">−</button><output>${i.qtd}</output><button type="button" data-k="${k}" data-d="1" aria-label="Aumentar">+</button></div>
          <button type="button" class="remover" data-k="${k}" data-d="0">Remover</button>
        </div>
      </div>`;
    }).join('') : '<p class="vazio">Seu carrinho está vazio.<br>Escolha um banco no catálogo.</p>';

    const semPreco = carrinho.some((i) => !prod(i).preco);
    const soma = carrinho.reduce((s, i) => s + (prod(i).preco || 0) * i.qtd, 0);
    $('#total').textContent = !carrinho.length ? '—' : semPreco ? (soma ? reais(soma) + ' + consulta' : 'Sob consulta') : reais(soma);
    $('#btnFinalizar').disabled = !carrinho.length;
  }
  $('#carrinhoItens').addEventListener('click', (e) => {
    const b = e.target.closest('[data-k]');
    if (!b) return;
    const k = +b.dataset.k, d = +b.dataset.d;
    if (d === 0 || carrinho[k].qtd + d < 1) carrinho.splice(k, 1);
    else carrinho[k].qtd = Math.min(20, carrinho[k].qtd + d);
    salvar();
  });

  const gaveta = $('#carrinho'), veu = $('#veu');
  function abrirCarrinho() {
    gaveta.classList.add('aberto'); gaveta.setAttribute('aria-hidden', 'false');
    veu.hidden = false; document.body.classList.add('travado');
  }
  function fecharCarrinho() {
    gaveta.classList.remove('aberto'); gaveta.setAttribute('aria-hidden', 'true');
    veu.hidden = true; document.body.classList.remove('travado');
  }
  $('#abrirCarrinho').addEventListener('click', abrirCarrinho);
  $('#fecharCarrinho').addEventListener('click', fecharCarrinho);
  veu.addEventListener('click', fecharCarrinho);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharCarrinho(); });

  /* ---------- envio (WhatsApp ou direct do Instagram) ---------- */
  const zap = (LOJA.whatsapp || '').replace(/\D/g, '');
  const urlInsta = `https://www.instagram.com/${LOJA.instagram}/`;
  let tAviso;
  function avisar(txt) {
    const a = $('#aviso');
    a.textContent = txt; a.classList.add('ativo');
    clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove('ativo'), 5000);
  }
  // Navegadores bloqueiam abas abertas por script fora do clique; por isso o Instagram
  // abre por um link de verdade, dentro de um passo de confirmação.
  const modalEnvio = $('#modalEnvio'), meTexto = $('#meTexto');
  function copiar() {
    let ok = false;
    try { meTexto.focus(); meTexto.select(); meTexto.setSelectionRange(0, 99999); ok = document.execCommand('copy'); } catch { /* tenta a API nova */ }
    if (navigator.clipboard) navigator.clipboard.writeText(meTexto.value).catch(() => {});
    return ok || !!navigator.clipboard;
  }
  function enviar(msg) {
    if (zap) {
      const url = `https://wa.me/${zap}?text=${encodeURIComponent(msg)}`;
      if (!window.open(url, '_blank')) location.href = url;
      return;
    }
    fecharCarrinho();
    meTexto.value = msg;
    modalEnvio.showModal();
    meTexto.scrollTop = 0;
  }
  $('#meAbrir').href = `https://ig.me/m/${LOJA.instagram}`;
  $('#mePerfil').href = urlInsta;
  $('#meAbrir').addEventListener('click', () => {
    avisar(copiar() ? 'Pedido copiado. Cole na conversa e envie.' : 'Selecione o texto, copie e cole na conversa.');
  });
  $('#mePerfil').addEventListener('click', copiar);
  modalEnvio.addEventListener('click', (e) => {
    if (e.target === modalEnvio || e.target.closest('[data-fechar]')) modalEnvio.close();
  });

  $('#formPedido').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!carrinho.length) return;
    const f = new FormData(e.target);
    const linhas = carrinho.map((i) => {
      const p = prod(i);
      const ops = Object.entries(i.opcoes).map(([a, b]) => `${a}: ${b}`).join(', ');
      return `• ${i.qtd}x ${p.nome} (${ops})${p.preco ? ' — ' + reais(p.preco * i.qtd) : ''}`;
    });
    enviar(`Olá! Quero fazer este pedido pelo site:\n\n${linhas.join('\n')}\n\nNome: ${f.get('nome')}\nMoto: ${f.get('moto')}`);
  });

  $('#formMedida').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    enviar(`Olá! Quero um orçamento sob medida.\n\nServiço: ${f.get('peca')}\nMoto: ${f.get('moto')}${f.get('ano') ? ' ' + f.get('ano') : ''}\nNome: ${f.get('nome')}\n\n${f.get('ideia')}`);
  });

  /* ---------- textos que dependem do canal ---------- */
  const canal = zap ? 'WhatsApp' : 'direct do Instagram';
  $('#btnFinalizar').textContent = `Enviar pedido pelo ${zap ? 'WhatsApp' : 'Instagram'}`;
  $('#notaPedido').textContent = `O pedido segue para o nosso ${canal}. Lá confirmamos a moto, o valor e o prazo antes de fabricar.`;
  $('#notaCanal').textContent = `O orçamento é enviado pelo ${canal}.`;
  $('#linkInsta').href = urlInsta;
  $('#linkInsta').textContent = '@' + LOJA.instagram;
  if (zap) {
    const lz = $('#linkZap');
    lz.hidden = false; lz.href = `https://wa.me/${zap}`; lz.textContent = 'Chamar no WhatsApp';
    lz.classList.add('btn-cheio'); $('#linkInsta').classList.remove('btn-cheio');
    lz.parentNode.prepend(lz);
  }
  $('#ano').textContent = new Date().getFullYear();

  desenharGrade();
  desenharCarrinho();
})();
