# back-end

# endpoint

# Users

----Listar todos Usuarios

url: http://localhost:3000/users
metodo: GET

----Buscar Usuario

url: http://localhost:3000/users/{id_usuario}
metodo: GET

----Cadastrar Usuario

url: http://localhost:3000/users
metodo: POST

exemplo: 

{
	"email": "candidato@yahoo.com.br",
	"password": "123",
	"status": "Active",
	"profile": "Candidato"
}


----Alterar Usuario

url: http://localhost:3000/users/{id_usuario}
metodo: PUT

exemplo:

{
	"password": "123"
}

----Deletar Usuario

url: http://localhost:3000/users/{id_usuario}
metodo: DELETE