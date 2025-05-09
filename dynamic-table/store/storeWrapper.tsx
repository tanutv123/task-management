"use client";
import React, { createContext, ReactNode } from "react";
import { store } from "@/store/store";

export const StoreContext = createContext(store);

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
