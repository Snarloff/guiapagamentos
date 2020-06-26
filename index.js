const express = require("express");
const MercadoPago = require("mercadopago"); 
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-3260321011293596-061906-6cdf2c22206e79007f91b8f5642b3cf2-267336909"
});


app.get("/", (req, res) => {
    res.send("Olá mundo!");
});

app.get("/pagar",async (req, res) => {

    // Pagamentos

    // id // codigo // pagador // status
    // 1 // 1593163315787 // victordevtb@gmail.com  // Não foi pago
    // 2 //  1593163315782 // victordevtb2@gmail.com // Pago

    var id = "" + Date.now();
    var emailDoPagador = "victordevtb@outlook.com";

    var dados = {
        items: [
            item = {
                id: id,
                title: "2x video games;3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        //Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }
});

app.post("/not",(req, res) => {
    console.log(req.query);
    res.send("OK");
});


app.listen(80,(req, res) => {

    console.log("Servidor rodando!");

});