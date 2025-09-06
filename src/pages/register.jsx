import SignupForm from "../components/signup/signupform";
import SecHeader from "../components/secondaryheader/secheader";

export default function Register() {
    return (
        <>
            <SecHeader heading={"Sign Up Page"} icon_nav="fa fa-user-plus" />
            <SignupForm />
        </>
    )

}
