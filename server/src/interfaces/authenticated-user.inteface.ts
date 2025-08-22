export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
    name: string;
    expiration: Date | null;
  }
}