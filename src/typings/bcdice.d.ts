// Reference:
// https://github.com/bcdice/bcdice-api/blob/master/docs/api_v2.md

export namespace BCDice {
  /**
   * URL: /v2/version
   */
  export type versionResponse = {
    api: string;
    version: string;
  };

  /**
   * URL: /v2/admin
   */
  export type adminResponse = {
    name: string;
    url: string;
    email: string;
  };

  /**
   * URL: /v2/game_system
   */
  export type gameSystemResponse = {
    game_system: {
      id: string;
      name: string;
      sort_key: string;
    }[];
  };

  /**
   * URL: /v2/game_system/{id}
   */
  export type gameSystemInfoResponse =
    | {
        ok: true;
        id: string;
        name: string;
        sort_key: string;
        command_pattern: string;
        help_message: string;
      }
    | ErrorResponse;

  /**
   * URL: /v2/game_system/{id}/roll
   * @param command command string (e.g. "1D100<=40")
   */
  export type DiceRollResponse =
    | {
        ok: true;
        text: string;
        secret: boolean;
        success: boolean;
        failure: boolean;
        critiacl: boolean;
        fumble: boolean;
        rands: {
          kinds: 'nomal' | 'tens_d10' | 'd9';
          sides: number;
          value: number;
        }[];
      }
    | ErrorResponse;

  export type ErrorResponse = {
    ok: false;
    reason: string;
  };
}
