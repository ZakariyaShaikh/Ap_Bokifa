import { HeroSection } from '../components/HeroSection';
import { TickerBanner } from '../components/TickerBannerComponent';

import { PromotionalBannerSection } from '../components/PromotionalBannerSection';
import { WeekHighlights } from '../components/WeekHighlights';
import { TopCategories } from '../components/TopCategories';
import { BestsellingBooks } from '../components/BestsellingBooks';
import { BooksHalfPriceSection } from '../components/BooksHalfPriceSection';
import { BannerSection } from '../components/BannerSection';
import { PicksForYou } from '../components/PicksForYou';
import { FeaturedAuthors } from '../components/FeaturedAuthors';
import { Testimonials } from '../components/Testimonials';
import { FeaturesSection } from '../components/FeaturesSection';
import { NewsEventsSection } from '../components/NewsEventsSection';


export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TickerBanner />

      <WeekHighlights />
      <TopCategories />
      <BestsellingBooks />
      <BannerSection />
      <BooksHalfPriceSection />
      <PromotionalBannerSection />
      <PicksForYou />
      <FeaturedAuthors />
      <Testimonials />
      <FeaturesSection />
      <NewsEventsSection />
    </div>
  )
}

