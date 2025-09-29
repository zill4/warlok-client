import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CardData } from "../types/shared";

export interface CardStore {
  cardData: CardData;
  cardImage: string | null; // Store the actual image data
}

interface CardStoreContextType {
  store: CardStore;
  updateCardData: (cardData: Partial<CardData>) => void;
  updateCardImage: (cardImage: string | null) => void;
  resetCard: () => void;
}

const defaultCardData: CardData = {
  name: "",
  chessPieceType: "",
  pokerCardSymbol: "Clubs",
  pokerCardType: "Ace",
  cardType: "Dragon",
  description: "",
  effect: "",
  image: "",
};

const CardStoreContext = createContext<CardStoreContextType | undefined>(undefined);

export function CardStoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<CardStore>({
    cardData: defaultCardData,
    cardImage: null,
  });

  const updateCardData = (newCardData: Partial<CardData>) => {
    setStore(prev => ({
      ...prev,
      cardData: { ...prev.cardData, ...newCardData }
    }));
  };

  const updateCardImage = (cardImage: string | null) => {
    setStore(prev => ({
      ...prev,
      cardImage
    }));
  };

  const resetCard = () => {
    setStore({
      cardData: defaultCardData,
      cardImage: null,
    });
  };

  return (
    <CardStoreContext.Provider value={{
      store,
      updateCardData,
      updateCardImage,
      resetCard
    }}>
      {children}
    </CardStoreContext.Provider>
  );
}

export function useCardStore() {
  const context = useContext(CardStoreContext);
  if (context === undefined) {
    throw new Error('useCardStore must be used within a CardStoreProvider');
  }
  return context;
}
