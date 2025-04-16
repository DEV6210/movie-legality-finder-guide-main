import HeroSection from "@/components/HeroSection";
import FeaturedGuides from "@/components/FeaturedGuides";
import FeaturedTrailers from "@/components/FeaturedTrailers";
import FreeMovies from "@/components/FreeMovies";
import EditorsPicks from "@/components/EditorsPicks";
import NewsletterSignup from "@/components/NewsletterSignup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BannerAd1 from "@/ads/BannerAd1";
import BannerAd2 from "@/ads/BannerAd2";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <!-- Native Banner --> */}
        <div id="container-3ff0d0485645adb700843fff0ea05f86"></div>
        <FeaturedGuides />
        {/* <!-- Banner 728x90 --> */}
        <BannerAd1 />
        <FeaturedTrailers />
        <FreeMovies />
        <EditorsPicks />
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default Index;
