import React from "react";
import ReactTimeago from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(spanishStrings);

const Discount = ({ discount }) => {
    return (
        <div className="bg-white shadow-2xl border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold">{discount.discountName}</h3>
            <p className="text-gray-700">{discount.discountDescription}</p>
            <div>
                {discount.discountImage && (
                    <img
                        src={discount.discountImage}
                        alt={discount.discountName}
                        className="w-60 h-60 object-contain"
                    />
                )}
            </div>
            <div className="flex items-center my-2">
                {discount.image ? (
                    <img
                        src={discount.image}
                        alt={discount.name}
                        className="w-10 h-10 border border-orange-400 rounded-full mr-3 object-contain"
                    />
                ) : (
                    <img
                        src="/image/user.png"
                        className="w-10 h-10 border border-orange-400 rounded-full mr-3 object-contain"
                    />
                )}

                <p className="text-gray-600">{discount.name}</p>
            </div>
            <div className="text-sm">
                <p className="text-gray-600">
                    Publicado{" "}
                    <ReactTimeago
                        date={discount.discountCreatedAt}
                        formatter={formatter}
                    />
                </p>
                {discount.discountUpdatedAt && (
                    <p className="text-gray-600">
                        Actualizado
                        <ReactTimeago
                            date={discount.discountUpdatedAt}
                            formatter={formatter}
                        />
                    </p>
                )}
                <p className="text-red-600">
                    Termina{" "}
                    <ReactTimeago
                        date={discount.discountEndsAt}
                        formatter={formatter}
                    />
                </p>
            </div>
        </div>
    );
};

export default Discount;
