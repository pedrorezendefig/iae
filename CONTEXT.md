# IAE

Projeto dos sócios Pedro, Rib e Lucas para o IAE, escola de prática jurídica para advogados in-house. O produto é a plataforma de cursos online do IAE.

## Pessoas e papéis

**Sócio**:
Um dos três donos da empresa que presta o serviço: Pedro, Rib ou Lucas.
_Avoid_: Parceiro, dev

**Cliente**:
O IAE, a instituição que contrata o serviço.
_Avoid_: Usuário

**Ponte técnica**:
A pessoa do lado do Cliente que acompanha a parte técnica do projeto. Hoje é a Helena Lannes.
_Avoid_: Dev do cliente

## Produto

**Aluno**:
Quem assiste às Aulas. Entra na Plataforma de cursos com e-mail e senha e só vê os Cursos em que tem Matrícula.
_Avoid_: Usuário, estudante, membro

**Admin**:
Quem cuida do conteúdo e dos Alunos na Plataforma de cursos: cria Cursos e Aulas, vincula Vídeos e faz Matrículas.
_Avoid_: Gestor, administrador do sistema, Operador

**Curso**:
Um conjunto ordenado de Aulas que o Aluno compra ou recebe de uma vez. Na primeira versão não tem módulos.
_Avoid_: Treinamento, programa, trilha

**Matrícula**:
O vínculo entre um Aluno e um Curso que dá o direito de assistir às Aulas dele.
_Avoid_: Acesso, inscrição, enrollment

**Plataforma de cursos**:
O produto do projeto: o site onde os alunos assistem às aulas do IAE.
_Avoid_: Área de membros (é só uma parte dela), LMS

## Vídeo

**Original**:
O arquivo de vídeo como sai da gravação (câmera, OBS ou Zoom), antes de qualquer conversão.
_Avoid_: Master, arquivo bruto, raw

**Vídeo**:
O pacote convertido para a web (lista e pedaços em vários tamanhos), identificado por um uuid e guardado no armazenamento. Uma Aula aponta para zero ou um Vídeo.
_Avoid_: Asset, mídia, arquivo

**Aula**:
A unidade de um curso que o aluno abre e assiste. Uma gravação de live vira Aula pelo mesmo caminho.
_Avoid_: Lesson, lição, vídeo (quando se fala da unidade do curso)

**Operador**:
A pessoa que converte o Original e sobe o Vídeo. Hoje, Pedro e a Ponte técnica.
_Avoid_: Admin (o Operador não precisa ser admin da plataforma), uploader
