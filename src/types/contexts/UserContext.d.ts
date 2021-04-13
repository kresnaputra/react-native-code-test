export interface IUserState {
    uid: string;
}

export type TUserAction = { type: 'LOGOUT' } | { type: 'LOGIN'; payload: { uid: string } };