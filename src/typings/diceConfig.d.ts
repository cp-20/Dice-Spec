export type diceConfig = {
  system: {
    id: string;
    name: string;
    command_pattern: RegExp;
    help_message: string;
  };
  sound: boolean;
  volume: number;
  help: boolean;
  apiServer: string;
  loaded: boolean;
};
