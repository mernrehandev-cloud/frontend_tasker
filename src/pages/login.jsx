import LoginForm from "../components/login/loginform";
import SecHeader from "../components/secondaryheader/secheader";

export default function Login({ BEurl }) {
    return (
        <>
            <SecHeader heading={"Login Page"} icon_nav="fa fa-right-to-bracket" />
            <LoginForm BEurl={BEurl} />
        </>
    )

}
