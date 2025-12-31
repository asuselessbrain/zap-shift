const DashboardInformationCard = ({ dashboardData }) => {
    console.log(dashboardData)
    return (
        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#F3F4F6] shadow-md">
            <div>
                <p>{dashboardData?.title}</p>
                <h5 className="text-3xl text-black">{dashboardData?.count}</h5>
            </div>
            <div className={`${dashboardData?.bgColor} rounded-xl ${dashboardData?.textColor} p-4`}>
                {dashboardData?.icon}
            </div>
        </div>
    );
};

export default DashboardInformationCard;