import FilterBar from "@/Components/filterMap";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, router } from "@inertiajs/react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text, id }) => (
    <div>
        <Link href={`places/${id}`} data={{ place: id }}>
            {text}
        </Link>
    </div>
);

export default function Welcome(props) {
    const { data } = props;

    console.log(props);

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
            <div className="relative   bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div
                    className=" mx-auto w-full "
                    style={{ height: "calc(100vh - 9rem)" }}
                >
                    <FilterBar placeCategories={data.placeCategories} />
                    <div className="w-full mx-auto h-full">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            {data.places.map((i) => (
                                <AnyReactComponent
                                    key={i.id}
                                    lat={i.placeLatitude}
                                    id={i.id}
                                    lng={i.placeLongitude}
                                    text={i.placeName}
                                />
                            ))}
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
