import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Slider from "react-slick";

export default function Dashboard(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Acerca" />
            <div className="bg-white p-8">
                <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
                    Acerca de Nosotros
                </h1>
                <div className="mb-8">
                    <Slider {...settings}>
                        <div>
                            <img
                                src="/image/MapsImage.png"
                                alt="Imagen 1"
                                className="w-full h-64 object-fill"
                            />
                        </div>
                        <div>
                            <img
                                src="/image/Formosaimage.jpg.webp"
                                alt="Imagen 2"
                                className="w-full h-64 object-fill"
                            />
                        </div>
                        <div>
                            <img
                                src="/image/Promociones-supermercado.jpg"
                                alt="Imagen 3"
                                className="w-full h-64 object-fill"
                            />
                        </div>
                    </Slider>
                </div>
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg mb-6">
                        ¡Saludos! Somos el equipo de desarrollo Lamba, y nuestra
                        misión es promover y fomentar el ahorro entre los
                        ciudadanos de Formosa Capital a través de una comunidad
                        participativa y comprometida. Nuestra aplicación está
                        diseñada para ser una herramienta poderosa que permita a
                        los usuarios compartir y descubrir información valiosa
                        sobre establecimientos comerciales en la ciudad,
                        incluyendo ofertas, promociones y descuentos.
                    </p>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-orange-600 mb-4">
                            Nuestra Misión
                        </h2>
                        <p className="text-lg mb-4">
                            En Lamba, creemos en el poder de la comunidad para
                            transformar la manera en que gestionamos nuestras
                            finanzas personales. Nuestra misión es hacer que el
                            ahorro sea accesible y conveniente para todos,
                            creando una red de usuarios que comparten
                            activamente las mejores oportunidades para
                            economizar en sus compras diarias.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-right">
                            Nuestra Visión
                        </h2>
                        <p className="text-lg mb-4 text-right">
                            Aspiramos a convertirnos en la aplicación de
                            referencia para el ahorro en Formosa Capital, y más
                            allá. Nuestra visión es crecer y expandir nuestra
                            comunidad, siempre manteniendo nuestro compromiso
                            con la transparencia, la colaboración y la mejora
                            continua. Imaginamos un futuro donde el ahorro
                            inteligente sea una práctica común, y donde cada
                            ciudadano tenga las herramientas necesarias para
                            hacer rendir al máximo su dinero.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-orange-600 mb-4">
                            Únete a Nosotros
                        </h2>
                        <p className="text-lg mb-4">
                            Te invitamos a unirte a la comunidad de Lamba y ser
                            parte de este movimiento hacia un consumo más
                            consciente y responsable. Juntos, podemos hacer de
                            Formosa Capital una ciudad donde cada centavo cuenta
                            y donde las oportunidades de ahorro están al alcance
                            de todos.
                        </p>
                        <p className="text-lg">
                            Gracias por confiar en Lamba. ¡Vamos a ahorrar
                            juntos!
                        </p>
                    </div>
                </div>
            </div>
            );
        </AuthenticatedLayout>
    );
}
