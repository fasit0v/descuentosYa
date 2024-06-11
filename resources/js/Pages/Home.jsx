import React, { useState } from "react";
import FilterBar from "@/Components/filterMap";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import GoogleMapReact from "google-map-react";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Welcome(props) {
    const { data } = props;
    const [selectedPlace, setSelectedPlace] = useState(null);

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
                                    onDoubleClick={() => {
                                        handleMarkerClick(place);
                                        router.get(`/places/${place.id}`);
                                    }}
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

function MarkerPlace({ placeQuantityDiscount, onClick, onDoubleClick }) {
    return (
        <button
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className=" cursor-pointer"
        >
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
        </button>
    );
}

function Popup({ place, onClose }) {
    const imageUrl = place.placeImage
        ? `data:image/jpeg;base64,${place.placeImage}`
        : null;
    return (
        <aside
            className=" absolute top-20 w-64 "
            style={{ Height: "calc(100vh-9rem)" }}
        >
            <div className=" border border-orange-200 bg-white p-4 rounded-b-md  capitalize flex justify-center flex-col">
                <img
                    src={imageUrl}
                    className=" h-40 aspect-square rounded-lg"
                />
                <h3 className="text-xl text-orange-400 pb-[1.2rem] font-bold">
                    {place.placeName}
                </h3>
                <p>{place.placeAddress}</p>

                <div className=" flex justify-between">
                    <Link
                        href={`/places/${place.id}`}
                        className="bg-orange-400 p-2 rounded text-white hover:bg-orange-500 focus:bg-orange-500"
                    >
                        Ver
                    </Link>
                    <DangerButton onClick={onClose} className=" p-2">
                        Cerrar
                    </DangerButton>
                </div>
            </div>
        </aside>
    );
}
