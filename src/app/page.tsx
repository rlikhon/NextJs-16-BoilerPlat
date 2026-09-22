import Nav from "@/components/Nav";
import PublicHome from "@/components/PublicHome";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'DriveFlow - Instant Vehicle Booking & Live Tracking',
  description: 'Book rides, cars, or logistics vehicles instantly. Track your driver in real-time with live map updates.',
};
function Home() {
  return (
    <div className="w-full min-h-screen bg-w  bg-slate-50 text-slate-900">
      <Nav />
      <PublicHome />
      <Footer />
    </div>
  );
}

export default Home;