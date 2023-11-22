# SCRB-TECH-CHALLENGE
API em NodeJS / NestJs

Sobre: API Desenvolvida em NodeJs utilizando o framework Nestjs com a linguagem de programação TypeScrpit, aplicação esta hospedada na clound Render no endereço https://scrb-tech-challenge.onrender.com/swagger

Formas de rodar: 
npm run start:dev para rodar na porta http://localhost:3000

Documentação da API em: http://localhost:3000/swagger

Regras de Negócio

Cadastro:

http://localhost:3000/users/signin

{
  "username": "Fulano",
  "email": "seuemail@gmail.com",
  "senha": "A12345678",
  "telefone": "11923485678"	
}

Um Username válido e senha devem ser informados, com alguns requisitos, username deve ter mais de 3 dígitos e senha ao menos 1 número e 1 letra maiúscula com mais de 8 dígitos
A senha é colocada no banco hasheada

Token JWT e Login:

No endpoint http://localhost:3000/auth/login a partir do username e senha informado corretamente, um token jwt com validade de 30 minutos é gerado:
{
	"username": "Fulano",
	"senha": "A12345678"
}

{
	"acess_token": "kmOlbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhaXNzYSBBIiwic2VuaGEiOiIkMmIkMTEkSFFQWm54Q0dKd0pGdnJaLlJHTjcyLjlUTTRGV3lUTjNYbGRpcDB0Rnl2U2E5WXo1SnBScS4iLCJpYXQiOjE2Njg3OTE1OTMsImV4cCI6MTY2ODc5MTY1M30.eSH4qGKirgszZ2vcYV4jSybPL50wz_NTe67C60TIlzJ"
}

No endpoint http://localhost:3000/users/login as informações da conta são obtidas caso seja informado um Bearer token - jwt válido

Me coloco à disposição para batermos um papo, 

Antensiosamente,

Enzo Carvalho