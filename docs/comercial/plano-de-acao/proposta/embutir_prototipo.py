"""Embute o protótipo, as fontes e a marca dentro de proposta-iae-apresentacao.html.

Assim a apresentação abre sozinha, com duplo clique e sem servidor, e pode ser
enviada como um arquivo só. O botão "Tela cheia" continua apontando para
../../prototipos/fase-N.html.

Rode de novo sempre que o protótipo mudar:
    python embutir_prototipo.py
"""
import json
import re
from pathlib import Path

AQUI = Path(__file__).resolve().parent
PROTO = AQUI.parent.parent / "prototipos"
ASSETS = PROTO / "assets"
APRES = AQUI / "proposta-iae-apresentacao.html"

# Ponte entre o protótipo (num blob, sem os outros arquivos ao lado) e a apresentação:
# troca de fase pela barra do protótipo e Page Down/Page Up viram mensagens para a página.
PONTE = """<script>
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
  var h = a.getAttribute('href'), m = h.match(/^fase-(\\d)\\.html(#.*)?$/);
  if (m){ e.preventDefault(); parent.postMessage({ proto:'fase', f:m[1], hash:m[2] || '' }, '*'); }
  else if (h === 'index.html'){ e.preventDefault(); }
}, true);
document.addEventListener('keydown', function(e){
  if (e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'Escape'){
    if (e.key !== 'Escape') e.preventDefault();
    parent.postMessage({ proto:'tecla', key:e.key }, '*');
  }
});
</script>"""


def ler(p):
    return p.read_text(encoding="utf-8")


def modelo_prototipo():
    html = ler(PROTO / "fase-3.html")
    for css in ("fontes.css", "app.css"):
        html = html.replace(
            f'<link rel="stylesheet" href="assets/{css}">',
            "<style>\n" + ler(ASSETS / css) + "\n</style>",
        )
    html = html.replace("<script>window.FASE = 3;</script>", "<script>window.FASE = __FASE__;</script>\n" + PONTE)
    for js in ("marca.js", "dados.js", "app.js"):
        html = html.replace(
            f'<script src="assets/{js}"></script>',
            "<script>\n" + ler(ASSETS / js).replace("</script", "<\\/script") + "\n</script>",
        )
    if "assets/" in html or "__FASE__" not in html:
        raise SystemExit("fase-3.html mudou de formato; ajuste embutir_prototipo.py")
    return html


def bloco(nome, conteudo):
    return f"<!-- embutido:{nome} (gerado por embutir_prototipo.py) -->\n{conteudo}\n<!-- /embutido:{nome} -->"


def troca(html, nome, original, conteudo):
    novo = bloco(nome, conteudo)
    padrao = re.compile(rf"<!-- embutido:{nome} .*?<!-- /embutido:{nome} -->", re.S)
    if padrao.search(html):
        return padrao.sub(lambda _: novo, html)
    if original not in html:
        raise SystemExit(f"não achei onde embutir {nome}")
    return html.replace(original, novo, 1)


def main():
    html = ler(APRES)
    html = troca(html, "fontes", '<link rel="stylesheet" href="../../prototipos/assets/fontes.css">',
                 "<style>\n" + ler(ASSETS / "fontes.css") + "\n</style>")
    dados = json.dumps(modelo_prototipo(), ensure_ascii=False).replace("</", "<\\/").replace("<!--", "<\\u0021--")
    html = troca(html, "marca", '<script src="../../prototipos/assets/marca.js"></script>',
                 "<script>\n" + ler(ASSETS / "marca.js") + "\n</script>\n<script>var PROTO_HTML = " + dados + ";</script>")
    APRES.write_text(html, encoding="utf-8", newline="\n")
    print(f"ok: {APRES.name} com {len(html) // 1024} KB")


if __name__ == "__main__":
    main()
