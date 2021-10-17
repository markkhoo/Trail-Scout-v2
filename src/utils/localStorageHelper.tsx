class LocalStorageService {
    static setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify({ value }));
    }
    static getItem<T>(key: string): T | null;
    static getItem<T>(key: string, otherwise: T): T;
    static getItem<T>(key: string, otherwise?: T): T | null {
        const data: string | null = localStorage.getItem(key);
        if (data !== null) {
            return JSON.parse(data).value;
        }
        if (otherwise) {
            return otherwise;
        }
        return null;
    }
}

export default LocalStorageService