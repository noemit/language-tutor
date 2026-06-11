declare module "web-push" {
  export function setVapidDetails(
    subject: string,
    publicKey: string,
    privateKey: string
  ): void;
  export function generateVAPIDKeys(): {
    publicKey: string;
    privateKey: string;
  };
  export function sendNotification(
    pushSubscription: Record<string, unknown>,
    payload?: string,
    options?: Record<string, unknown>
  ): Promise<{
    statusCode: number;
    headers: Record<string, unknown>;
    body: string;
  }>;
}
