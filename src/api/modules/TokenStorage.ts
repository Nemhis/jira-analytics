export default class TokenStorage {
  static remove(): void {
    localStorage.removeItem('token');
  }

  static set(token: string): void {
    localStorage.setItem('token', token);
  }

  static get(): string | null {
    return localStorage.getItem('token');
  }
}
