import { Suspense } from "react"
import dynamic from "next/dynamic";

const CoffeeShopMap = dynamic(() => import("../map"), { ssr: false });

const About = () => {
    return (
        <section>
        <h1>О нас</h1>
        <p>
          Добро пожаловать в Coffee! Мы — уютная кофейня, где аромат свежесваренного кофе и теплый прием создают идеальную атмосферу для приятного отдыха. В нашем меню вы найдете широкий выбор кофе, чая, свежей выпечки и других вкусностей, которые поднимут вам настроение и подарят заряд энергии. Приходите к нам, чтобы насладиться вкусным кофе и приятной атмосферой!
        </p>
        <div>
          <h2>Наше местоположение</h2>
          <div className="map-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <CoffeeShopMap/>
          </Suspense>
          </div>
        </div>
      </section>
    )
}

export default About;