import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Welcome(props) {
    console.log(props);

    const defaultProps = {
        center: {
            lat: -26.185381014712792,
            lng: -58.17849591699535,
        },
        zoom: 13,
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
                            <AnyReactComponent
                                lat={59.955413}
                                lng={30.337844}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
