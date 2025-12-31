import DashboardInformationCard, { type DashboardData } from "./DashboardInformationCard";

const DashboardCardFormate = ({ dashboardCardData }: {dashboardCardData: DashboardData[]}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                dashboardCardData.map((card, index) => (<DashboardInformationCard key={index} dashboardData={card} />))
            }
        </div>
    );
};

export default DashboardCardFormate;