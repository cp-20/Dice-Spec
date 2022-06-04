export type CharacterClipboardData = {
  kind: 'character';
  data: Partial<Character>;
};

export type Character = {
  name: string;
  memo: string;
  initiative: number;
  externalUrl: string;
  status: {
    label: string;
    value: number;
    max: number;
  }[];
  params: { label: string; value: string }[];
  iconUrl: string | null; // [!]
  faces: { iconUrl: string | null; label: string }[]; // [!]
  x: number; // [!]
  y: number; // [!]
  angle: number;
  width: number;
  height: number;
  active: boolean; // [!]
  secret: boolean;
  invisible: boolean;
  hideStatus: boolean;
  color: string;
  commands: string;
  owner: string | null;
};
