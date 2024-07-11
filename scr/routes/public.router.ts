import * as express from "express";
import { Request, Response } from "express";
import { SecurityClass } from "../security/security";
import protectedRoute from "../security/guard";

const publicRouter = express.Router();

publicRouter.post("/login",
     async (req: Request, res: Response) => {
    const {
        body: { email, password },
    } = req;

    try {
        const tokenJWT = await SecurityClass.authenticateUser(email, password);
        console.log(tokenJWT);


        if (tokenJWT) return res.status(200).send({ token: tokenJWT });

        return res.status(401).send("Não autorizado");
    } catch (error) {
        return res.status(401).send("Erro ao logar "+error);
    }
});

export default publicRouter;