import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authToken = request.headers.authorization
  if (!authToken)
    return response.status(401).end();

  const [, token] = authToken.split(" ")

  try {

    const { sub } = verify(token, "89ce789251b81dc500ac4b269a788217") as IPayload;
    request.user_id = sub;

    return next();

  } catch (error) {
    return response.status(401).end();
  }





  // Recuperar informações do usuário pelo token




}