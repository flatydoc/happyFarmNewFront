import { createContext } from "react";
import { IUserData } from "../types";
import { Socket } from "socket.io-client";

interface IAuthContext {
  isLogin: boolean;
  user?: IUserData;
  socket: Socket;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
