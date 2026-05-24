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
    pushSubscription: any,
    payload?: string,
    options?: any
  ): Promise<{
    statusCode: number;
    headers: any;
    body: string;
  }>;
}
