import LoginForm from "../components/login/loginform";

export default function Login({ BEurl }) {
    return (
        <>
            <LoginForm BEurl={BEurl} />
        </>
    )
}