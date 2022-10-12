
import { createContext } from "react";

interface ModalContextProps {
open:boolean;
setOpen():any;
}

export const ModalContext = createContext<ModalContextProps|null>({ open:false, setOpen() {},});