import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, router } from "@inertiajs/react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
    <div onClick={() => router.get("/roles")}>{text}</div>
);

export default function Welcome(props) {
    const { data } = props;

    const defaultProps = {
        center: {
            lat: -26.185381014712792,
            lng: -58.17849591699535,
        },
        zoom: 12,
    };

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Home" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div
                        className="mt-10 mx-auto"
                        style={{ height: "80vh", width: "80vw" }}
                    >
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            {data.places.map((i) => (
                                <AnyReactComponent
                                    lat={i.placeLatitude}
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
