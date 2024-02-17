interface UserModel {
    id?: string;
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
    telephone: string;
    password: string;
}

export interface PacientModel extends UserModel {
    sus: string;
}
