import { Button } from "@/components/ui/button";
import { FiUsers } from "react-icons/fi";

const NoParcelFound = ({ clearFilters }: { clearFilters: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 space-y-4 text-gray-600">
            <div className="text-gray-400 text-6xl">
                <FiUsers />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">No Parcels Found</h2>
            <p className="text-gray-500 max-w-xs">
                We couldn't find any parcels matching your search criteria. <br /> Try adjusting your filters.
            </p>
            <div className="flex gap-4 mt-4">
                <Button variant="outline" onClick={clearFilters} className="px-4">
                    Clear Filters
                </Button>
                <Button variant="default" className="px-4 bg-lime-500 hover:bg-lime-600 text-white">
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default NoParcelFound;