const STORAGE_KEY = 'token';

export default class TokenStorage {
  static remove(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static set(token: string): void {
    localStorage.setItem(STORAGE_KEY, token);
  }

  static hasToken(): boolean {
    return !!localStorage.getItem(STORAGE_KEY);
  }

  static get(): string {
    return localStorage.getItem(STORAGE_KEY) || '';
  }
}
