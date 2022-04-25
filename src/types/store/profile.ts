import { User } from '../api';

export type ProfileState = User & { posted: number };
