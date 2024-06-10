import React, { useState } from "react";
import FilterBar from "@/Components/filterMap";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import GoogleMapReact from "google-map-react";

export default function Welcome(props) {
    const { data } = props;
    const [selectedPlace, setSelectedPlace] = useState(null);

    console.log(selectedPlace);

    const handleMarkerClick = (place) => {
        setSelectedPlace(place);
    };

    const handleClosePopup = () => {
        setSelectedPlace(null);
    };

    const defaultProps = {
        center: {
            lat: -26.185381014712792,
            lng: -58.17849591699535,
        },
        zoom: 12,
    };

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head />
            <div className="relative bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div
                    className="mx-auto w-full"
                    style={{ height: "calc(100vh - 9rem)" }}
                >
                    <FilterBar placeCategories={data.placeCategories} />
                    <div className="w-full mx-auto h-full">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            minZoom={12}
                            maxZoom={20}
                        >
                            {data.places.map((place) => (
                                <MarkerPlace
                                    key={place.id}
                                    lat={place.placeLatitude}
                                    lng={place.placeLongitude}
                                    id={place.id}
                                    placeQuantityDiscount={
                                        place.discountQuantity
                                    }
                                    onClick={() => handleMarkerClick(place)}
                                />
                            ))}
                        </GoogleMapReact>
                        {selectedPlace && (
                            <Popup
                                place={selectedPlace}
                                onClose={handleClosePopup}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function MarkerPlace({ placeQuantityDiscount, onClick }) {
    return (
        <div onClick={onClick} className=" cursor-pointer">
            {placeQuantityDiscount > 0 ? (
                <img
                    src="/image/markerConDescuento.png"
                    className="h-16 w-16"
                    style={{
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ) : (
                <img
                    src="/image/markerSinDescuento.png"
                    className="h-10 w-10"
                    style={{
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    );
}

function Popup({ place, onClose }) {
    const imageUrl = place.placeImage
        ? `data:image/jpeg;base64,${place.placeImage}`
        : null;
    return (
        <div className=" absolute left-0 top-20 ">
            <div className=" bg-white p-4  capitalize">
                <h3 className="text-xl text-orange-400 pb-[1.2rem] font-bold">
                    {place.placeName}
                </h3>
                <img
                    src={imageUrl}
                    className=" h-72 aspect-square rounded-lg"
                />
                <p>{place.placeAddress}</p>
                <p>Categoría: {place.placeCategoryName}</p>
                <p>Descuentos disponibles: {place.discountQuantity}</p>
                <div className=" flex justify-between">
                    <Link
                        href={`/places/${place.id}`}
                        className="text-orange-500 underline"
                    >
                        Ver Descuentos
                    </Link>
                    <button onClick={onClose} className="">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
