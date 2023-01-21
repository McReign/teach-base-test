export type RouterServicePort = {
  goToHomePage: () => void;
  goToFlightOrderPage: (id: string) => void;
  goToHotelOrderPage: (id: string) => void;
  getHomePagePath: () => string;
  getFlightOrderPath: () => string;
  getHotelOrderPath: () => string;
  getHomePageUrl: () => string;
  getFlightOrderUrl: (id: string) => string;
  getHotelOrderUrl: (id: string) => string;
  getFlightOrderPageId: () => string | null;
  getHotelOrderPageId: () => string | null;
};
