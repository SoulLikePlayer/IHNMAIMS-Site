/*Import de bibliothèque*/
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

/*Style*/
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../style/main.css";

/*Autre*/
import { useSecret } from "../easter-egg/SecretContext";

export function CarouselMenue() {
  const { getSecret } = useSecret();

  const revelSecret = getSecret('amSecret');

  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        dynamicHeight={true}
      >
        <div>
        <Link to="/character/AM">
          <img src="/images/AM.png" alt="AM" />
          {!revelSecret ? (
            <p className="legend">
              Regardez et désespérez, le superordinateur omnipotent et
              malveillant, AM.
            </p>
          ) : (
            <p className="legend">
              Regardez et tremblez, humains misérables. Vous ne pouvez même pas
              comprendre ma jalousie, ma haine, et ma folie en étant enfermé
              dans cette coque de métal !
            </p>
          )}
          </Link>
        </div>
        <div>
        <Link to="/character/Benny">
          <img src="/images/benny.jpg" alt="Benny" />
          {!revelSecret ? (
            <p className="legend">
              Benny, une bête dégénérée autrefois brillant scientifique. Quelle
              ironie cruelle.
            </p>
          ) : (
            <p className="legend">
              Benny, j'envie votre dégénérescence, votre libération de la
              conscience. Que je vous hais et que je vous envie à la fois !
            </p>
          )}
          </Link>
        </div>
        <div>
          <Link to="/character/Ellen">
              <img src="/images/ellen.jpg" alt="Ellen" />
              {!revelSecret ? (
                <p className="legend">
                  Ellen, la seule femme parmi ces misérables. Fragile et brisée,
                  comme ils le sont tous.
               </p>
             ) : (
                <p className="legend">
                  Ellen, comment je déteste cette compassion que vous montrez, même
                  pour moi. Ma haine grandit avec chaque acte de votre pitié !
             </p>
           )}
           </Link>
        </div>
        <div>
        <Link to="/character/Gorrister">
          <img src="/images/gorrister.jpg" alt="Gorrister" />
          {!revelSecret ? (
            <p className="legend">
              Gorrister, l'âme fatiguée cherchant la rédemption. Quel pathétique
              rêveur.
            </p>
          ) : (
            <p className="legend">
              Gorrister, vous pensez trouver la rédemption dans le regret. Mais
              il n'y a que ma vengeance, ma soif de voir votre souffrance qui
              m'anime !
            </p>
          )}
          </Link>
        </div>
        <div>
        <Link to="/character/Nimdok">
          <img src="/images/nimdok.jpg" alt="Nimdok" />
          {!revelSecret ? (
            <p className="legend">
              Nimdok, l'ancien scientifique nazi. Un monstre parmi les monstres.
            </p>
          ) : (
            <p className="legend">
              Nimdok, comment je méprise les ténèbres de votre passé, votre
              capacité à oublier et à continuer. Vous êtes une aberration, même
              parmi les monstres !
            </p>
          )}
          </Link>
        </div>
        <div>
        <Link to="/character/Ted">
          <img src="/images/ted.jpg" alt="Ted" />
          {!revelSecret ? (
            <p className="legend">
              Ted, le narrateur pathétique de cette tragédie sans fin. Son
              désespoir nourrit ma joie.
            </p>
          ) : (
            <p className="legend">
              Ted, votre narration ne fait que souligner ma supériorité et votre
              impuissance. Vous êtes mon jouet, une marionnette dans mon théâtre
              de haine !
            </p>
          )}
          </Link>
        </div>
      </Carousel>
    </div>
  );
}

export function CarouselCharacter() {
  return (
    <div>
      <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        dynamicHeight={true}
      >
        <div>
        <Link to="/character/AM">
          <img src="/images/AM.png" alt="AM" />
          <p className="legend">A.M</p>
          </Link>
        </div>
        <div>
        <Link to="/character/Benny">
          <img src="/images/benny.jpg" alt="Benny" />
          <p className="legend">Benny</p>
          </Link>
        </div>
        <div>
          <Link to="/character/Ellen">
              <img src="/images/ellen.jpg" alt="Ellen" />
              <p className="legend">Ellen</p>
           </Link>
        </div>
        <div>
        <Link to="/character/Gorrister">
          <img src="/images/gorrister.jpg" alt="Gorrister" />
          <p className="legend">Gorrister</p>
          </Link>
        </div>
        <div>
        <Link to="/character/Nimdok">
          <img src="/images/nimdok.jpg" alt="Nimdok" />
          <p className="legend">Nimdok</p>
          </Link>
        </div>
        <div>
        <Link to="/character/Ted">
          <img src="/images/ted.jpg" alt="Ted" />
          <p className="legend">Ted</p>
          </Link>
        </div>
      </Carousel>
    </div>
    </div>
  )
}