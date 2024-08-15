import { createContext } from "react";

import { INITIAL_STATE } from "@/constants";
import { State } from "@/types";

export const StateContext = createContext<State>(INITIAL_STATE);
