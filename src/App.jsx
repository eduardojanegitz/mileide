import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaHeart, FaMusic } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import Typewriter from "react-typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";

const images = [
  "/images/love1.JPEG",
  "/images/love2.JPEG",
  "/images/love3.JPEG",
  "/images/love4.JPEG",
  // "/images/love5.JPEG",
  "/images/love6.JPEG",
  "/images/love7.JPEG",
];

const startDate = new Date(2017, 5, 21);

function App() {
  const [hearts, setHearts] = useState([]);
  const [duration, setDuration] = useState({});
  const [showLetter, setShowLetter] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audio = new Audio("/music/love.mp3");

  const createHeart = (x, y) => {
    const id = Date.now();
    setHearts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== id));
    }, 3000);
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    createHeart(e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let delta = Math.floor((now - startDate) / 1000);

      const years = Math.floor(delta / (365 * 24 * 3600));
      delta %= 365 * 24 * 3600;

      const months = Math.floor(delta / (30 * 24 * 3600));
      delta %= 30 * 24 * 3600;

      const days = Math.floor(delta / (24 * 3600));
      delta %= 24 * 3600;

      const hours = Math.floor(delta / 3600);
      delta %= 3600;

      const minutes = Math.floor(delta / 60);
      const seconds = delta % 60;

      setDuration({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleMusic = () => {
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.loop = true;
      audio.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative overflow-hidden font-sans flex flex-col items-center justify-between p-6"
      style={{
        backgroundImage: 'url("/images/romantic-bg.jpg")',
        backgroundAttachment: "fixed",
      }}
    >
      {/* Estrelas animadas no fundo */}
      <div className="absolute top-0 left-0 w-full h-full stars-bg pointer-events-none z-0"></div>

      {/* Título */}
      <h3 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-xl fade-in z-10">
        Você é meu universo.
      </h3>

      {/* Botão de música */}
      <button
        onClick={toggleMusic}
        className="absolute top-5 right-5 bg-purple-300 hover:bg-purple-400 p-3 rounded-full text-white shadow-lg z-10"
      >
        <FaMusic />
      </button>

      {/* Corações animados */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-500 text-3xl animate-heart-fall pointer-events-none"
          style={{ left: heart.x, top: heart.y }}
        >
          ❤️
        </div>
      ))}

      {/* Carrossel */}
      <div
        className="w-full max-w-xl cursor-pointer z-10 fade-in"
        onClick={handleClick}
      >
        <Slider {...sliderSettings}>
          {images.map((img, idx) => (
            <div key={idx} className="px-4">
              <img
                src={img}
                alt={`Foto ${idx + 1}`}
                className="w-full h-96 object-cover rounded-2xl shadow-xl border-4 border-white transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Temporizador */}
      <div className="mt-10 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 text-center max-w-lg fade-in z-10">
        <h2 className="text-2xl font-semibold text-indigo-100 mb-2">
          Estamos juntos há:
        </h2>
        <p className="text-lg text-indigo-200">
          {duration.years} anos, {duration.months} meses, {duration.days} dias,{" "}
          {duration.hours} horas, {duration.minutes} minutos e{" "}
          {duration.seconds} segundos 💕
        </p>
      </div>

      <div className="mt-20 max-w-2xl mx-auto z-10 relative px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          📜 Nossa Jornada
        </h2>

        <div className="border-l-4 border-pink-400 pl-10 relative space-y-12">
          {/* Evento 1 */}
          <div data-aos="fade-up">
            <div className="absolute -left-[28px] top-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-white"></div>

            <h3 className="text-xl font-semibold text-white">
              14 de março 2017
            </h3>
            <p className="text-pink-100">
              O dia que tudo começou. Nosso primeiro "oi", e o início da melhor
              história da minha vida 💫
            </p>
          </div>

          {/* Evento 2 */}
          <div data-aos="fade-up" data-aos-delay="300">
            <div className="absolute -left-[28px] top-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-white"></div>

            <h3 className="text-xl font-semibold text-white">13 Abril 2017</h3>
            <p className="text-pink-100">Nosso primeiro beijo ❤️</p>
          </div>

          {/* Evento 3 */}
          <div data-aos="fade-up" data-aos-delay="150">
            <div className="absolute -left-[28px] top-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-white"></div>

            <h3 className="text-xl font-semibold text-white">12 Maio 2018</h3>
            <p className="text-pink-100">
              Nosso primeiro Dia dos Namorados juntos 💐
            </p>
          </div>

          {/* Evento 4 */}
          <div data-aos="fade-up" data-aos-delay="450">
            <div className="absolute -left-[28px] top-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-white"></div>

            <h3 className="text-xl font-semibold text-white">
              06 Novembro 2023
            </h3>
            <p className="text-pink-100">A compra da nossa casa 💍✨</p>
          </div>
        </div>
      </div>

      {/* Botão da carta */}
      <button
        onClick={() => setShowLetter(true)}
        className="mt-6 bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 z-10 fade-in cursor-pointer"
      >
        <FaHeart />
        Abrir Cartinha 💌
      </button>

      {/* Modal da cartinha */}
      {showLetter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md shadow-xl text-center">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Minha declaração 💖
            </h2>
            <p className="text-gray-800 leading-relaxed">
              Desde que você entrou na minha vida, tudo ficou mais bonito. Te
              amo com todas as minhas forças e não quero viver nenhum dia sem
              você. Obrigado por existir e me fazer tão feliz 💞
            </p>
            <button
              onClick={() => setShowLetter(false)}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Fechar 💘
            </button>
          </div>
        </div>
      )}

      <div className="mt-16 bg-black/60 backdrop-blur-md rounded-xl shadow-lg p-6 text-center max-w-2xl text-white z-10 fade-in">
        <h2 className="text-3xl font-bold mb-4">🌟 Nossa Estrela</h2>

        <p className="text-indigo-200 italic mb-4">
          No meio do universo, uma estrela brilha com o nosso nome.
        </p>

        <img
          src="/images/our-star-map.png"
          alt="Mapa da nossa estrela"
          className="mx-auto rounded-lg shadow-lg border-2 border-indigo-300 mb-4"
        />

        <p className="text-indigo-100">
          <strong>Nome da Estrela:</strong> Alves Nogueira
          <br />
          <strong>Coordenadas:</strong> RA 05h 53m 50.971s | Dec -07° 01′ 35.05″
        </p>

        <a
          href="https://osr.org/pt-br/osr/PRK000760"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition"
        >
          Ver no Mapa Estelar 🔭
        </a>
      </div>

      <Typewriter
        textStyle={{
          fontFamily: "Georgia, serif",
          color: "#dcdcff", // tom lavanda claro
          fontWeight: 500,
          fontSize: "1.5rem",
          textShadow: "1px 1px 2px #000",
        }}
        startDelay={500}
        cursorColor="#fff"
        text="Nosso amor é como o universo: infinito e cheio de estrelas ✨"
        typeSpeed={60}
        hideCursorAfterText={true}
      />

      {/* Rodapé */}
      <p
        className="mt-8 text-indigo-300 text-lg italic fade-in z-10"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Cada segundo contigo é meu pedaço de céu ✨
      </p>
    </div>
  );
}

export default App;
