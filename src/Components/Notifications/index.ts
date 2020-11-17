export const Notification = {
  NO_WALLET: "Connect a wallet before start.",
  CONNECTED: "Logged in.",
  DISCONNECT: "Disconnected.",
  CLAIM_SUCCESSFUL: "Your claim has been processed.",
  CLAIM_FAILED: "Your claim has failed.",
  STAKE_SUCCESSFUL: "Your stake has been processed.",
  STAKE_FAILED: "Your stake has failed.",
  INVALID_AMOUNT:
    "Typed amount is invalid - Is not a number or is greater than your balances.",
};

export type NotificationType = keyof typeof Notification;
