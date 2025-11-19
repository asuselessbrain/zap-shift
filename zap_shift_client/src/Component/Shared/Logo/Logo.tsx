import logo from "../../../assets/logo.png"

const Logo = () => {
    return (
        <div className="flex items-end">
            <img src={logo} alt="Logo" />
            <h2 className="text-3xl font-extrabold -ms-2">ZapShift</h2>
        </div>
    );
};

export default Logo;