import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection, BookingSearchState } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { RoomsSection } from './components/RoomsSection';
import { DiningSection } from './components/DiningSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { OffersSection } from './components/OffersSection';
import { TestimonialSection } from './components/TestimonialSection';
import { Footer } from './components/Footer';
import { CheckAvailabilityPage } from './components/CheckAvailabilityPage';
import {
  RoomDetailModal,
  DiningModal,
  OfferDetailModal,
  ExperienceOrInfoModal,
  SubmittedInquiry,
} from './components/InteractiveModals';
import { RoomItem, ExperienceItem, SeasonalOffer } from './data/resortData';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'availability'>('home');
  const [searchState, setSearchState] = useState<BookingSearchState>({
    arrive: '2026-11-20',
    depart: '2026-11-23',
    adults: 2,
    children: 0,
    roomId: 'all',
  });

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [activeRoomDetail, setActiveRoomDetail] = useState<RoomItem | null>(null);
  const [diningModalMode, setDiningModalMode] = useState<'reserve' | 'menu' | null>(null);
  const [activeOfferDetail, setActiveOfferDetail] = useState<SeasonalOffer | null>(null);
  const [activeExperience, setActiveExperience] = useState<ExperienceItem | null>(null);
  const [activeInfoTopic, setActiveInfoTopic] = useState<string | null>(null);
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);

  const handleUpdateSearch = (partial: Partial<BookingSearchState>) => {
    setSearchState((prev) => ({ ...prev, ...partial }));
  };

  const openAvailabilitySubpage = () => {
    setActivePage('availability');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHomeSection = (sectionHash?: string) => {
    setActivePage('home');
    setTimeout(() => {
      if (!sectionHash || sectionHash === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.querySelector(sectionHash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 30);
  };

  const handleBookThisRoom = (room: RoomItem) => {
    setActiveRoomDetail(null);
    setSearchState((prev) => ({ ...prev, roomId: room.id }));
    openAvailabilitySubpage();
  };

  const handleApplyOfferToStay = (offer: SeasonalOffer) => {
    setActiveOfferDetail(null);
    setSelectedOfferId(offer.id);
    setSearchState((prev) => ({
      ...prev,
      roomId: offer.recommendedRoomId,
    }));
    openAvailabilitySubpage();
  };

  const handleConfirmInquiry = (inquiry: SubmittedInquiry) => {
    setSubmittedInquiries((prev) => [inquiry, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F3] text-[#252B2D]">
      {/* Fixed Header with Check Availability Subpage Navigation */}
      <Header
        activePage={activePage}
        onNavigateHomeSection={handleNavigateHomeSection}
        onOpenCheckAvailabilityPage={openAvailabilitySubpage}
        activeReservationCount={submittedInquiries.length}
      />

      {activePage === 'availability' ? (
        <main className="flex-1">
          <CheckAvailabilityPage
            searchState={searchState}
            onUpdateSearch={handleUpdateSearch}
            selectedOfferId={selectedOfferId}
            onSelectOfferId={setSelectedOfferId}
            onConfirmInquiry={handleConfirmInquiry}
            onBackToHome={() => handleNavigateHomeSection('#top')}
            onInspectRoomDetails={(room) => setActiveRoomDetail(room)}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Section 3: Full-Screen Hero Section (Minimal Reference Layout) */}
          <HeroSection
            searchState={searchState}
            onOpenCheckAvailabilityPage={openAvailabilitySubpage}
            onInspectRoom={(room) => setActiveRoomDetail(room)}
            onInspectExperience={(exp) => setActiveExperience(exp)}
            onOpenLocationInfo={() => setActiveInfoTopic('Getting here')}
          />

          {/* Section 4: Welcome — Resort Introduction */}
          <WelcomeSection />

          {/* Section 5: Rooms & Suites — Accommodation Showcase */}
          <RoomsSection
            onSelectRoomDetails={(room) => setActiveRoomDetail(room)}
            onViewAllRooms={() => {
              setSearchState((prev) => ({ ...prev, roomId: 'all' }));
              openAvailabilitySubpage();
            }}
          />

          {/* Section 6: Dining Experience — Spice Garden to Shore */}
          <DiningSection
            onReserveTableClick={() => setDiningModalMode('reserve')}
            onSampleMenuClick={() => setDiningModalMode('menu')}
          />

          {/* Section 7: Experiences — Coastal Wellness & Rituals */}
          <ExperiencesSection
            onSelectExperience={(exp) => setActiveExperience(exp)}
          />

          {/* Section 8: Seasonal Offers */}
          <OffersSection
            onSelectOffer={(offer) => setActiveOfferDetail(offer)}
          />

          {/* Section 9: Guest Chronicles */}
          <TestimonialSection />
        </main>
      )}

      {/* Section 10: Premium Footer */}
      <Footer
        onOpenInfoModal={(topic) => setActiveInfoTopic(topic)}
        onViewAllRooms={openAvailabilitySubpage}
        onReserveTableClick={() => setDiningModalMode('reserve')}
      />

      {/* Interactive Modals */}
      <RoomDetailModal
        room={activeRoomDetail}
        onClose={() => setActiveRoomDetail(null)}
        onBookThisRoom={handleBookThisRoom}
      />

      <DiningModal
        mode={diningModalMode}
        onClose={() => setDiningModalMode(null)}
        onSwitchMode={(m) => setDiningModalMode(m)}
        onConfirmInquiry={handleConfirmInquiry}
      />

      <OfferDetailModal
        offer={activeOfferDetail}
        onClose={() => setActiveOfferDetail(null)}
        onApplyOfferToStay={handleApplyOfferToStay}
      />

      <ExperienceOrInfoModal
        experience={activeExperience}
        infoTopic={activeInfoTopic}
        onClose={() => {
          setActiveExperience(null);
          setActiveInfoTopic(null);
        }}
        onBookStay={openAvailabilitySubpage}
      />
    </div>
  );
}
