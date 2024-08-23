
import CoffeeShopMap from "@/app/components/map";
import { Suspense } from "react";

const AboutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
 <section>
      <h1>О нас</h1>
      <p>
        Добро пожаловать в Мока Лайт! Мы — уютная кофейня, где аромат свежесваренного кофе и теплый прием создают идеальную атмосферу для приятного отдыха. В нашем меню вы найдете широкий выбор кофе, чая, свежей выпечки и других вкусностей, которые поднимут вам настроение и подарят заряд энергии. Приходите к нам, чтобы насладиться вкусным кофе и приятной атмосферой!
      </p>
      <div>
        <h2>Наше местоположение</h2>
        <div className="map-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <CoffeeShopMap />
          </Suspense>
        </div>
      </div>
    </section>
    </Suspense>
  );
};

export default AboutPage;