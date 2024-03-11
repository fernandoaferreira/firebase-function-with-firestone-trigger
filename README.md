**Aplicação Firebase com Firestone**

Aplicação consiste em persistir usuarios em uma rota POST e utilizar a trigger OnCreate do firestone para incrementando o seu numero cadastral sequencial.

Foi utilizado um design de pastas modular com conceitos de DDD para separar as responsabilidades de cada modulo como constrollers, services e repositoris. A ideia é facilitar a escala da aplicação para novos contextos e seus testes.

**Para rodar a aplicação:**

Utilizamos o ecossistema firebase, para rodar a aplicação no modo emulador sem precisar realizar deploy na firebase execute os passos a seguir:

Realize o `Git clone` do projeto

Entre na raiz do projeto e execute `npm install` o firebase cli sera instalado.

Entre na Pasta Functions e execute novamente `npm install` para instalar as dependencias do projeto, a partir de agora tudo sera feito dentro da pasta functions.

Certifique-se de ter o JAVA 11 ou superior instalado para que o emulador do firebase funcione corretamente.

Inicie o emulador do firebase functions e firestone com o comando: `npx firebase init emulators`

Obs: Nas opções habilite com space as opções functions e firestone

Após preparar o emulador para iniciar a execução dos recursos e iniciar a aplicação para teste execute: `npm run serve`

Sera executado os testes unitarios, build do typeScript e a execução dos modulos no emulador

Obs: Observe as rotas disponibilizadas e confirme a porta de acesso local no proximo passo.

Segue a curl de teste a ser utilizado em algum programa de REST (postman / insomnia):

curl --request POST
--url http://127.0.0.1:5001/crud-increment/us-central1/users/create-user
--header 'Content-Type: application/json'
--header 'User-Agent: insomnia/2023.5.8'
--data '{ "name": "João Pedro" }'

Realize alguns registros e observe os dados gravados no link disponibilizado na execução do emulador, geralmente http://127.0.0.1:4000/firestore