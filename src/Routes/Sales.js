import { Router } from "express";
import { Sales } from "../Models/Sales";
import { SalesController } from "../Controllers/SalesController";

const salesController = new SalesController();

const route = Router();

route.get("/listarsales", (req, res) => {
  res.status(200).json({ message: "Lista de vendas." });
});

route.post("/cadastrarsales", async (req, res) => {
  const sales = new Sales(
    req.body.data,
    req.body.id_usuario,
    req.body.total,
  );
  const result = await salesController.adicionarSales(sales);
    if (result.length > 0) {
    result.status(201).json({ message: "Venda criada com sucesso!" });
  } else {    res.status(404).json({ message: "Erro ao criar venda!" });
  }});

  