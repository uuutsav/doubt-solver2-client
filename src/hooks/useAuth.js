import { useRecoilState } from "recoil"
import { authAtom } from "../recoil/atoms/authAtom"
import { login, register } from "../services/authService";

export const useAuth = () => {
    const [authState, setAuthState] = useRecoilState(authAtom);

    const loginUser = async (credentials) => {
        try {
            const { token, user } = await login(credentials);
            // for now save in localStorage // TODO: Migrate to cookies (tip to future self: use tokenUtils for getting/setting/removing tokens )
            localStorage.setItem('token', token);
            setAuthState({ isAuthenticated: true, user, token });
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('token');
        setAuthState({isAuthenticated, user: null, token: null});
    };

    const registerUser = async (credentials) => {
        try {
            const {token, user} = await register(credentials);
            localStorage.setItem('token', token);
            setAuthState({isAuthenticated: true, user, token});
        } catch (error){
            console.log("Signup Failed: ", error);
        }
    }

    return { authState, loginUser, logoutUser, registerUser};
};

