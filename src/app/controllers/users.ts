import { Request, Response } from "express";
import { userService } from "../services/users";
import { UserBody } from "../types/types";

export const userController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const payload: UserBody = req.body;
            const result = await userService.createUser(payload);
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id
            const payload: UserBody = req.body;
            const result = await userService.updateUser(id, payload);
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const payload: string= req.params.id;
            const result = await userService.deleteUser(payload);
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
    },

    getAllUsers: async (req: Request, res: Response) => {
        try {
            const result = await userService.getAllUsers();
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
    },

    signIn: async (req: Request, res: Response) => {
        try {
            const payload: UserBody = req.body;
            const result = await userService.singIn(payload);
            res.send(result);
        }
        catch (e) {
            res.status(500).send({ message: 'Something went wrong' });
        }
    },
}