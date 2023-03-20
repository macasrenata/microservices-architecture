const jsonwebtoken = require("jsonwebtoken");

async function Logado(req, res, next){
    //PEGA OS DADOS DO NAVEGADOR
    Auth = req.cookie.Toke || null;

    //VERIFICA SE O COOKIE EXISTE
    if (typeof(Auth) == "undefined" || Auth == "" || Auth == null) {
        return res.send({erro: {login: "Não autorizado"}});
    } else {

        //TENTA TRADUZIR O TOKEN
        try{
            //SE CONSEGUIR, AUTORIZA O ACESSO
            Token = await jsonwebtoken.verify(Auth, "SenhaParaProtegerOToken");
            next();
        }catch(err){
            //SE NÃO CONSEGUIR, BLOQUEIA ACESSO
            return res.send({erro: {login: "Não autorizado"}});
        }

    }
}

module.exports = Logado;


// verificar se, nos cookies do nosso navegador, existe um cookie chamado Token
// criamos para o usuário no exato momento em que fazemos o login