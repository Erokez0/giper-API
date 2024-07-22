import { StockCreate } from "app/types/types";
import { stockService } from "../services/stocks";
import { Request, Response } from 'express';

export const stockController = {
    createStock: async (req: Request, res: Response) => {
        try {
            const payload: StockCreate = req.body;
            const result = await stockService.createStock(payload);
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
        
    },
    updateStock: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const result = await stockService.updateStock(id, body)
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
    },
    getStock: async (req: Request, res: Response) => {
        try {
            const payload = req.params.id;
            const result = await stockService.getStock(payload) ;
            res.json(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
    },
    deleteStock: async (req: Request, res: Response) => {
        try {
            const payload = req.params.id;
            const result = await stockService.deleteStock(payload);
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });    
        }
    }
}