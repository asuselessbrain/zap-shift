const Header = ({ title, description }: { title: string, description: string }) => {
    return (
        <div>
            <h2 className="text-6xl font-extrabold">{title}</h2>
            <p className="mt-4">{description}</p>
            <div className="border border-dashed border-gray-300 my-12"></div>
        </div>
    );
};

export default Header;