import React from "react";

import Discount from "./Discount";
import { router } from "@inertiajs/react";

const DiscountPaginate = ({ discounts, currentPage, lastPage, links }) => {
    const handlePageChange = (url) => {
        if (url) {
            router.get(
                url,
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }
    };

    return (
        <div>
            <div>
                {discounts.map((discount) => (
                    <Discount key={discount.discount_id} discount={discount} />
                ))}
            </div>
            <div className="flex justify-center my-4">
                {discounts.length > 0 &&
                    links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link.url)}
                            disabled={!link.url}
                            className={`px-4 py-2 rounded ${
                                link.active
                                    ? "bg-orange-500 text-white"
                                    : "bg-gray-300 text-gray-700"
                            } disabled:opacity-50`}
                        >
                            {link.label}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default DiscountPaginate;
