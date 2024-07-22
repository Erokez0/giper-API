import { Request, Response } from "express";
import "typeorm";
import { User } from "../../entity/users"
import { UserBody } from "app/types/types";
import { myDataSource } from "../data_source/data_source";

export const userService = {

    createUser: async (userBody: UserBody) => {
        try {
            const user = myDataSource.getRepository(User).create({
                login: userBody.login,
                password: userBody.password
            });
            await myDataSource.getRepository(User).save(user);
            return { message: "Пользователь создан успешно" }
        }
        catch (e) {
            return { message: "Не удалось создать пользователя" };
        }
        
    },

    deleteUser: async (user_id: string) => {
        try {
            const user = myDataSource.getRepository(User).findOneBy({
                id: user_id});
            if (!user) {
                return { message: "Пользователя с таким ID не существует"};
            }
        }
        catch (e) {
            return { message: "Пользователя с таким ID не существует"};    
        }
        try {
            await myDataSource.getRepository(User).delete(
                {id: user_id});
            return { message: "Пользователь удалён успешно" };
        }
        catch (e) {
            return { message: "Не удалось удалить пользователя" };
        }
    },

    updateUser: async (user_id: string, updated_user: UserBody) => {
        try {
            const user = myDataSource.getRepository(User).findOneBy({
                id: user_id});
            if (!user) {
                return { message: "Пользователя с таким ID не существует"};
            }
        }
        catch (e) {
            return { message: "Пользователя с таким ID не существует"};    
        }
        try {
            const user =  myDataSource.getRepository(User).create({
                login: updated_user.login,
                password: updated_user.password  
            })
            await myDataSource.getRepository(User).update(
                {id: user_id},
                user);
            return { message: "Пользователь обновлён успешно" };
        }
        catch (e) {
            return { message: "Не удалось обновить пользователя" };
        }
    },
    
    getAllUsers: async () => {
        try {
            return await myDataSource.getRepository(User).find({
                select: 
                {id: true,
                login: true}});
        }
        catch (e) {
            return { message : "Не удалось прочесть пользователей"};
        }
    },

    singIn: async (userBody: UserBody) => {
        try {
            const user = await myDataSource.getRepository(User).findOneBy({
                login: userBody.login});
            if ( user.password === userBody.password) {
                const plainCredential = `${user.login}:${user.password}:${process.env.secret}`;
                const bearerToken = Buffer.from(plainCredential).toString('base64');
                user.token = bearerToken;
                return { message: "Вход выполнен успешно"};
            }
            else {
                return { messsage: "Пользователя с таким логином и паролем не существует"};
            }
        }
        catch (e) {

        }
    }
}
