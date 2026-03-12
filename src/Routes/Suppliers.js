import { Router } from "express";
import { Supplier } from "../Models/Suppliers.js";
import { SupplierController } from "../Controllers/SupplierController";

const supplierController = new SupplierController();

const route = Router();

route.get("/listarfornecedores", (req, res) => {
    res.status(200).json({ message: "Lista de fornecedores." });
});

route.post("/cadastrarfornecedor", async (req, res) => {
    const supplier = new Supplier(
        req.body.nome_fantasia,
        req.body.cnpj,
        req.body.contato
    );
    const result = await supplierController.adicionarSupplier(supplier);

    if(result.length > 0){
        res.status(201).json({ message: "Fornecedor criado com sucesso!" });
    } else {
        res.status(404).json({ message: "Erro ao criar fornecedor!" });
    }
});

route.delete("/deletarfornecedor/:id", async (req, res) => {
    const result = await supplierController.deletarSupplier(req, res);
    if(result.length > 0){
        res.status(200).json({ message: "Fornecedor deletado com sucesso!" });
    } else {
        res.status(404).json({ message: "Erro ao deletar fornecedor!" });
    }
});

route.put("/atualizarfornecedor", async (req, res) => {
    const result = await supplierController.atualizarSupplier(req, res);
    if(result.length > 0){
        res.status(200).json({ message: "Fornecedor atualizado com sucesso!" });
    } else {
        res.status(404).json({ message: "Erro ao atualizar fornecedor!" });
    }
});

route.get("/findsupplier", async (req, res) => {
    const result = await supplierController.findSupplier(req, res);
    if(result.length > 0){
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: "Fornecedor não encontrado!" });
    }
});

export default route;
