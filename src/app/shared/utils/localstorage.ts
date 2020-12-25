export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('api.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('api.token');
        localStorage.removeItem('api.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('api.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('api.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('api.user', JSON.stringify(user));
    }

}