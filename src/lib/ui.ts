import { createContext, useContext } from "react";

/** Shared overlay controls: inquiry modal + product quick preview. */
export type UIContextValue = {
  openInquiry: (subject?: string) => void;
  openQuickView: (productId: string) => void;
};

export const UIContext = createContext<UIContextValue>({
  openInquiry: () => {},
  openQuickView: () => {},
});

export const useUI = () => useContext(UIContext);
