import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Slider from "react-slick";
import { TextToSpeech } from "tts-react";

export default function Dashboard(props) {
    const [speech, setSpeech] = useState(1);

    const handleChangeSpeech = (num) => {
        setSpeech(num);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const texts = [
        {
            title: "DescuentosYa.",
            content:
                "Somos Lambda, un equipo dedicado a promover el ahorro en Formosa Capital. Nuestra comunidad participativa está diseñada para ayudar a los ciudadanos a maximizar sus ahorros y gestionar mejor sus finanzas.",
        },
        {
            title: "Nuestra Misión.",
            content:
                "En Lambda, creemos en el poder de la comunidad para transformar la gestión de las finanzas personales. Nuestra misión es hacer que el ahorro sea accesible y conveniente para todos.",
        },
        {
            title: "Nuestra Visión.",
            content:
                "Aspiramos a convertirnos en la referencia para el ahorro en Formosa Capital y más allá. Nuestra visión es expandir nuestra comunidad, con compromiso en la transparencia, colaboración y mejora continua.",
        },
        {
            title: "Únete a Nosotros.",
            content:
                "Únete a Descuentos Ya y fomenta un consumo más consciente y responsable. Juntos, podemos hacer de Formosa Capital una ciudad donde el ahorro están al alcance de todos.",
        },
    ];

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Acerca" />
            <div className="my-8 lg:px-40 overflow-hidden">
                <Slider {...settings}>
                    <div>
                        <img
                            src="/image/MapsImage.png"
                            alt="Imagen 1"
                            className=" w-full h-80 object-fill aspect-video"
                        />
                    </div>
                    <div>
                        <img
                            src="/image/Formosaimage.webp"
                            alt="Imagen 2"
                            className="w-full h-80 object-fill"
                        />
                    </div>
                    <div>
                        <img
                            src="/image/Promociones-supermercado.jpg"
                            alt="Imagen 3"
                            className="w-full h-80 object-fill"
                        />
                    </div>
                </Slider>
            </div>

            <div className="bg-white p-8">
                <div className="max-w-4xl mx-auto">
                    <TextToSpeech
                        align="horizontal"
                        position="topCenter"
                        autoPlay={speech == 1}
                        onEnd={() => handleChangeSpeech(2)}
                        lang="es-ES"
                        volume={1}
                    >
                        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
                            {texts[0].title}
                        </h1>
                        <p className="text-lg mb-6">{texts[0].content}</p>
                    </TextToSpeech>
                    <div className="mb-8">
                        <TextToSpeech
                            align="vertical"
                            position="leftCenter"
                            autoPlay={speech == 2}
                            onEnd={() => handleChangeSpeech(3)}
                            lang="es-ES"
                            volume={1}
                        >
                            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
                                {texts[1].title}
                            </h2>
                            <p className="text-lg mb-4">{texts[1].content}</p>
                        </TextToSpeech>
                    </div>

                    <div className="mb-8">
                        <TextToSpeech
                            align="vertical"
                            position="rightCenter"
                            autoPlay={speech == 3}
                            onEnd={() => handleChangeSpeech(4)}
                            lang="es-ES"
                            volume={1}
                        >
                            <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-right">
                                {texts[2].title}
                            </h2>
                            <p className="text-lg mb-4 text-right">
                                {texts[2].content}
                            </p>
                        </TextToSpeech>
                    </div>

                    <div className="mb-8">
                        <TextToSpeech
                            align="vertical"
                            position="leftCenter"
                            autoPlay={speech == 4}
                            onEnd={() => handleChangeSpeech(null)}
                            lang="es-ES"
                            volume={1}
                        >
                            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
                                {texts[3].title}
                            </h2>
                            <p className="text-lg mb-4">{texts[3].content}</p>
                        </TextToSpeech>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
