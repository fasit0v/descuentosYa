import React from "react";
import { router, useForm } from "@inertiajs/react";

const FilterBar = ({ placeCategories }) => {
    const { data, setData } = useForm(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            rubro: params.get("rubro") || "",
            descuento: params.get("descuento") || "",
        };
    });

    const handleFilterChange = () => {
        const params = new URLSearchParams(window.location.search);

        if (data.rubro !== "") {
            params.set("rubro", data.rubro);
        } else {
            params.delete("rubro");
        }

        if (data.descuento !== "") {
            params.set("descuento", data.descuento);
        } else {
            params.delete("descuento");
        }

        const queryString = params.toString();
        const url = `${window.location.pathname}${
            queryString ? `?${queryString}` : ""
        }`;

        router.get(url);
    };

    return (
        <div className="bg-white shadow p-2 flex justify-between items-center h-20">
            <div className="flex space-x-4">
                <div>
                    <label
                        htmlFor="rubro"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Rubro
                    </label>
                    <select
                        id="rubro"
                        value={data.rubro}
                        onChange={(e) => setData("rubro", e.target.value)}
                        className="mt-1 block w-40 p-1 border border-gray-300 rounded-md"
                    >
                        <option value="">Seleccione</option>
                        {placeCategories.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.placeCategoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="descuento"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Descuento
                    </label>
                    <select
                        id="descuento"
                        value={data.descuento}
                        onChange={(e) => setData("descuento", e.target.value)}
                        className="mt-1 block w-40 p-1 border border-gray-300 rounded-md"
                    >
                        <option value="">Seleccione</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>
            <button
                onClick={handleFilterChange}
                className="bg-orange-400 text-white px-2 py-1 rounded-md hover:bg-orange-500"
            >
                Aplicar Filtros
            </button>
        </div>
    );
};

export default FilterBar;
