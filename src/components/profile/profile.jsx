import '../profile/profile.css'

function ProfileIcon({ user1 }) {
    if (!user1 || !user1.Image) {
        return <img className="user-img" src="/images/default-user.jpg" alt="user" />;
    }
    return (
        <>
            <img className="user-img" src={user1.Image} alt="user" />
        </>
    );
}

export default ProfileIcon;