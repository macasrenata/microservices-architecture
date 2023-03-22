const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../Users/UserSchema");
const { response } = require("express");

async function Logar(body){
    //RECEBE DADOS DO USUARIO
    const email = body.email;
    const senha = body.senha;

    //VERIFICA DADOS
    if(!email || !senha) {
        return {erro: "error data"}
    }

    //BUSCA USUARIO
    Find = await User.find({email, senha})
        .then(response => {
            return response;
        }).catch(erro => {
            return {erro: erro}
        });

    //VERIFICA SE ENCONTROU O USER
    if(Find == "" || Find.erro ){
        return {erro: "incorrect email"}
    }

    //SE ENCONTROU USER GERA O TOKEN
    Token = await jsonwebtoken.sign({
        id: Find[0]._id,
        nome: Find[0].nome,
        emal: Find[0].email,
    }, "SenhaParaProtegerOToken");

    //SALVA O TOKEN NOS COOKIES DO NAVEGADOR
    res.cookie("Token", Token);
    res.sendStatus(200);
    }

module.exports = Logar;



// receber o e-mail e senha do usuário, através do body (passado no nosso servidor pelo req.body como parâmetro dessa função); 
// buscamos o nosso usuário no banco de dados com esses dois dados;
// criamos o nosso token JWT e retornamos. E, caso não, retornamos um erro de e-mail ou senha incorretos para o nosso usuário.