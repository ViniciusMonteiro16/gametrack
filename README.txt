
              OBJETIVO

O objetivo do GameTrack é permitir que o usuário organize seus
jogos de acordo com seu status, podendo visualizar quais jogos
está jogando, quais pretende jogar e quais já finalizou.

A aplicação utiliza uma API local criada com JSON Server.
O JavaScript utiliza fetch() para consumir essa API e atualizar
a interface sem a necessidade de recarregar a página.


          TECNOLOGIAS UTILIZADAS

- HTML5
- CSS3
- JavaScript
- JSON Server
- Insomnia
- API REST
- Fetch API


          ESTRUTURA DO PROJETO

gametrack-api/

|-- index.html
|-- style.css
|-- script.js
|-- db.json
`-- README.txt


              BANCO DE DADOS

Os dados dos jogos são armazenados no arquivo db.json.

A coleção utilizada pela API é:

    jogos

Cada jogo possui os seguintes campos:

- id
- titulo
- genero
- plataforma
- nota
- status

Os status disponíveis são:

- Quero jogar
- Jogando
- Finalizado
- Abandonado

A nota dos jogos deve estar entre 0 e 10.


          COMO EXECUTAR O PROJETO

1. Abra a pasta do projeto no VS Code ou em um terminal.

2. Inicie o JSON Server utilizando:

    npx json-server --watch db.json

3. O servidor será iniciado na porta 3000.

4. A API pode ser acessada através de:

    http://localhost:3000/jogos

5. Abra o arquivo index.html no navegador.

O JavaScript irá buscar os jogos da API através de fetch().


             ROTAS DA API

GET

    GET /jogos

Utilizado para buscar todos os jogos cadastrados.

    GET /jogos/1

Utilizado para buscar um jogo específico através do seu ID.


POST

    POST /jogos

Utilizado para cadastrar um novo jogo.

Exemplo:

{
    "titulo": "Hollow Knight",
    "genero": "Metroidvania",
    "plataforma": "PC",
    "nota": 10,
    "status": "Finalizado"
}


PUT

    PUT /jogos/ID

Utilizado para editar um jogo existente.


DELETE

    DELETE /jogos/ID

Utilizado para excluir um jogo da API.


          FUNCIONALIDADES

O sistema possui as seguintes funcionalidades:

- Listagem dos jogos cadastrados
- Cadastro de novos jogos
- Edição de jogos existentes
- Exclusão de jogos
- Pesquisa por título
- Filtro por status
- Dashboard com quantidade de jogos
- Contagem de jogos jogando
- Contagem de jogos finalizados
- Validação dos campos do formulário
- Validação da nota entre 0 e 10
- Confirmação antes da exclusão
- Mensagens de sucesso e erro
- Tratamento de falhas na API
- Atualização da interface sem necessidade de F5


        PESQUISA E FILTROS TESTADOS

Foi testada a pesquisa pelo título dos jogos.

Exemplo:

Pesquisar:

    Rocket

Resultado:

    Rocket League

Também foi testado o filtro por status.

Status disponíveis:

    Todos
    Quero jogar
    Jogando
    Finalizado
    Abandonado


A pesquisa e o filtro podem ser utilizados juntos.

Exemplo:

Status:

    Finalizado

Pesquisa:

    God

Resultado:

    São exibidos apenas os jogos finalizados
    cujo título contém "God".


          FILTROS TESTADOS NA API

Foram testados filtros diretamente na API.

Filtro por status:

    /jogos?status=Finalizado

Filtro por plataforma:

    /jogos?plataforma=PC


             DASHBOARD

O dashboard apresenta informações calculadas a partir
dos jogos recebidos pela API.

Indicadores:

- Total de jogos
- Jogos que estão sendo jogados
- Jogos finalizados

Os valores são atualizados automaticamente após
cadastros, edições e exclusões.

              VALIDAÇÕES

O formulário impede o cadastro quando:

- O título está vazio
- O gênero está vazio
- A plataforma está vazia
- A nota é menor que 0
- A nota é maior que 10
- O status não foi selecionado


        TRATAMENTO DE ERROS

O sistema possui tratamento de erros para situações
em que a API não esteja disponível ou uma operação
não seja concluída corretamente.

Quando o JSON Server está desligado, a interface
informa ao usuário que não foi possível conectar
com a API.

As operações de cadastro, edição e exclusão também
possuem tratamento de erros.


        TESTES REALIZADOS NO INSOMNIA

Foram utilizados testes no Insomnia para verificar
as principais operações da API.

GET

Verificação da listagem de jogos.

POST

Cadastro de um novo jogo e verificação da sua
persistência na API.

PUT

Alteração dos dados de um jogo existente.

DELETE

Exclusão de um jogo através do seu ID.


          CRUD NO NAVEGADOR

A interface permite realizar o CRUD completo:

CREATE
Cadastro de novos jogos através do formulário.

READ
Listagem dos jogos recebidos da API.

UPDATE
Edição dos dados de um jogo existente.

DELETE
Exclusão de jogos através do botão Excluir.


Após as operações, a lista é atualizada automaticamente
sem necessidade de recarregar a página.


       PERGUNTAS DA ETAPA 5

1. Em qual momento você deve limpar os campos do formulário?

Os campos devem ser limpos depois que o cadastro ou a edição
for concluído com sucesso. Assim, os dados não são apagados
caso ocorra algum erro no envio para a API.


2. O que acontece se o servidor estiver desligado?

Se o JSON Server estiver desligado, o JavaScript não consegue
acessar a API. Nesse caso, a requisição falha e o sistema deve
informar ao usuário que não foi possível conectar com a API.


3. Por que é melhor ter uma função separada apenas para
carregar os jogos?

Porque isso organiza melhor o código e permite reutilizar a
mesma função sempre que for necessário atualizar a lista.

Por exemplo, depois de cadastrar, editar ou excluir um jogo,
a função pode ser chamada novamente para buscar os dados
atualizados da API e atualizar a tela.


4. Qual a diferença entre o objeto criado no formulário e a
resposta devolvida pela API?

O objeto criado no formulário contém os dados que o usuário
preencheu, como título, gênero, plataforma, nota e status.

A resposta da API contém os dados que foram recebidos e
processados pelo servidor. No cadastro, a API também pode
acrescentar informações como o ID do registro.

Por isso, o objeto enviado e a resposta recebida podem ter
informações diferentes.