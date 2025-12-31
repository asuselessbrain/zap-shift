import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";

const Pagination = ({ page, setPage, pageNumbers, totalPages }: { page: number, setPage: Dispatch<SetStateAction<number>>, pageNumbers: number[], totalPages: number }) => {
    return (
        <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
                <Button
                    disabled={page <= 1}
                    onClick={() => setPage((prev: number) => prev - 1)}
                    variant="outline"
                >
                    Previous
                </Button>

                {pageNumbers.map((num: number) => (
                    <Button
                        key={num}
                        onClick={() => setPage(num)}
                        variant={num === page ? "default" : "outline"}
                        className={num === page ? "bg-primary text-white" : ""}
                    >
                        {num}
                    </Button>
                ))}

                <Button
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev: number) => prev + 1)}
                    variant="outline"
                >
                    Next
                </Button>
            </div>

            <span>
                Page {page} of {totalPages}
            </span>
        </div>
    );
};

export default Pagination;