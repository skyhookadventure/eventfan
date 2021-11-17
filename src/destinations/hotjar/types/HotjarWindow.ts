export interface HotjarWindow {
  (name: "identify", userId: string, traits: any): void;
  q?: Array<any>;
  environment: string;
}

export interface HotjarWindowSettings {
  hjid: number;
  hjsv: number;
}
