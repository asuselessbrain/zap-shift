const AdminDashboardHeader = ({heading, subHeading}: {heading: string, subHeading: string}) => {
    return (
        <div>
            <h2 className="uppercase text-3xl">{heading}</h2>
            <p className="mt-2 mb-8 text-[#4A5565]">{subHeading}</p>
        </div>
    );
};

export default AdminDashboardHeader;