# Gera saida/plano-de-acao-iae.html a partir de saida/template-plano.html e dos .md de saida/pesquisa
import json, os
D=os.path.dirname(os.path.abspath(__file__))
P=os.path.join(D,"pesquisa")
files=[("E. Consolidado","e-consolidado.md"),("A. Infraestrutura de vídeo","a-infraestrutura.md"),("B. Referências e funcionalidades","b-referencias-funcionalidades.md"),("C. Precificação e serviço","c-precificacao-modelo-de-servico.md"),("D. Mercado e regulatório","d-mercado-captacao-regulatorio.md"),("Verificação A","verificacao-a.md"),("Verificação B","verificacao-b.md"),("Verificação C","verificacao-c.md"),("Verificação D","verificacao-d.md")]
data=[{"titulo":t,"conteudo":open(os.path.join(P,f),encoding="utf-8").read()} for t,f in files]
js=json.dumps(data,ensure_ascii=False).replace("</","<\\/")
tpl=open(os.path.join(D,"template-plano.html"),encoding="utf-8").read()
out=tpl.replace("__MD_JSON__",js)
open(os.path.join(D,"plano-de-acao-iae.html"),"w",encoding="utf-8").write(out)
print("gerado:",len(out)//1024,"KB")
