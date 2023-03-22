async function Deslogar(res) {
    // LIMPA OS COOKIES DO NAVEGADOR
    res.clearCookie("Token");
    res.redirect("./");
}

module.exports = Deslogar;

// controller simplesmente limpa os cookies do nosso navegador, mais especificamente os cookies de Token do navegador