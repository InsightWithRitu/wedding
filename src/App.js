import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-container">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {!entered ? (
        <LandingScreen onEnter={handleEnter} />
      ) : (
        <MainWebsite toggleAudio={toggleAudio} isPlaying={isPlaying} />
      )}
    </div>
  );
}

// --- LANDING COMPONENT ---
function LandingScreen({ onEnter }) {
  return (
    <div className="landing-screen d-flex flex-column justify-content-center align-items-center text-center">
      <div className="floral-border p-5">
        <h3 className="fade-in-text text-gold mb-3">You are invited to the wedding of</h3>
        <h1 className="typewriter-text title-font text-cream">Shivam & Jagriti</h1>
        <button className="btn btn-gold mt-5 enter-btn fade-in-delayed" onClick={onEnter}>
          Open Invitation ✨
        </button>
      </div>
    </div>
  );
}

// --- MAIN WEBSITE COMPONENT ---
function MainWebsite({ toggleAudio, isPlaying }) {
  return (
    <div className="main-site">
      <NavBar toggleAudio={toggleAudio} isPlaying={isPlaying} />
      <HeroSection />
      <CoupleSection />
      <EventsSection />
      <GallerySection />
      <BlessingsSection />
      <Footer />
    </div>
  );
}

// --- NAVBAR COMPONENT ---
function NavBar({ toggleAudio, isPlaying }) {
  // Mobile menu ko open/close karne ke liye state
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container">
        <a className="navbar-brand title-font text-gold" href="#home">S & J</a>
        
        {/* Toggle Button: onClick par 'isOpen' state change hogi */}
        <button 
          className="navbar-toggler custom-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 'show' class tab add hogi jab isOpen true hoga */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {/* Nav-link click karne par menu apne aap band ho jaye, isliye setIsOpen(false) lagaya hai */}
            <li className="nav-item"><a className="nav-link" href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#couple" onClick={() => setIsOpen(false)}>Couple</a></li>
            <li className="nav-item"><a className="nav-link" href="#events" onClick={() => setIsOpen(false)}>Events</a></li>
            <li className="nav-item"><a className="nav-link" href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a></li>
          </ul>
          <div className="text-center pb-3 pb-lg-0">
            <button className="btn btn-outline-gold" onClick={toggleAudio}>
              {isPlaying ? '🎵 Pause Music' : '🎵 Play Music'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// --- HERO & COUNTDOWN COMPONENT ---
function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date('2027-02-19T00:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section text-center py-5">
      <div className="container">
        <h1 className="title-font text-maroon display-2">Shivam & Jagriti</h1>
        <p className="lead text-dark mt-3">Are getting married on February 19, 2027</p>
        
        <div className="countdown d-flex justify-content-center gap-4 mt-4">
          <div className="time-box"><h2>{timeLeft.days}</h2><span>Days</span></div>
          <div className="time-box"><h2>{timeLeft.hours}</h2><span>Hours</span></div>
          <div className="time-box"><h2>{timeLeft.minutes}</h2><span>Mins</span></div>
          <div className="time-box"><h2>{timeLeft.seconds}</h2><span>Secs</span></div>
        </div>
      </div>
    </section>
  );
}

// --- COUPLE COMPONENT ---
function CoupleSection() {
  return (
    <section id="couple" className="couple-section py-5 bg-cream">
      <div className="container text-center">
        <h2 className="section-title text-maroon mb-5">Meet the Couple</h2>
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4">
            <div className="couple-card p-4">
              {/* Added couple-img class here */}
              <img src="/image/shivam.jpg" alt="Groom" className="couple-img rounded-circle mb-3 border-gold" />
              <h3 className="title-font text-maroon">Shivam Saxena</h3>
              <p className="text-muted">Born: 09 August 1997</p>
              <p>The perfect mix of logic and love. Ready to start this beautiful new chapter.</p>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="couple-card p-4">
              {/* Added couple-img class here */}
              <img src="/image/jagriti.jpg" alt="Bride" className="couple-img rounded-circle mb-3 border-gold" />
              <h3 className="title-font text-maroon">Jagriti Shrivastava</h3>
              <p className="text-muted">Born: 09 October 2000</p>
              <p>Bringing light, joy, and grace into every moment. Waiting for the big day!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- EVENTS COMPONENT ---
function EventsSection() {
  const events = [
    { title: "Engagement", date: "15 March 2026", status: "Completed 💍" },
    { title: "Haldi, Mehndi", date: "17 February 2027", status: "Upcoming 💛" },
    { title: "Silmayan", date: "18 February 2027", status: "Upcoming 🌿" },
    { title: "Wedding", date: "19 February 2027", status: "The Big Day ❤️" }
  ];

  return (
    <section id="events" className="events-section py-5">
      <div className="container text-center">
        <h2 className="section-title text-gold mb-5">Wedding Events</h2>
        <div className="row justify-content-center">
          {events.map((event, index) => (
            <div className="col-md-3 col-sm-6 mb-4" key={index}>
              <div className="event-card p-4">
                <h4 className="title-font text-maroon">{event.title}</h4>
                <p className="fw-bold">{event.date}</p>
                <span className="badge bg-gold text-maroon">{event.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- GALLERY COMPONENT ---
function GallerySection() {
  const [activeTab, setActiveTab] = useState('engagement');

  // Yahan apna Google Drive Folder ka Link paste karein
  const googleDriveLink = "https://drive.google.com/drive/folders/1QedVkFlB_FG612KAvc_NKcMYsvj_HNOi?usp=sharing";

  const engagementHighlights = [
    { id: 1, url: "/image/eng.jpg" }, // Pehli Highlight Photo
    { id: 2, url: "/image/eng2.jpg" }  // Dusri Highlight Photo
  ];

  return (
    <section id="gallery" className="gallery-section py-5 bg-cream">
      <div className="container text-center">
        <h2 className="section-title text-maroon mb-4">Engagement Gallery</h2>
        
        <div className="mb-4">
          <button className={`btn mx-2 ${activeTab === 'engagement' ? 'btn-maroon' : 'btn-outline-maroon'}`} onClick={() => setActiveTab('engagement')}>
            Engagement Highlights
          </button>
          <button className={`btn mx-2 ${activeTab === 'upcoming' ? 'btn-maroon' : 'btn-outline-maroon'}`} onClick={() => setActiveTab('upcoming')}>
            Upcoming Functions
          </button>
        </div>

        {activeTab === 'engagement' ? (
          <div className="engagement-container">
            {/* Highlights Grid: Sirf 2 Photos */}
            <div className="row justify-content-center">
              {engagementHighlights.map((photo) => (
                <div className="col-md-4 col-sm-6 mb-4" key={photo.id}>
                  <div className="gallery-img-wrapper shadow">
                    <img src={photo.url} alt="Engagement Highlight" className="img-fluid rounded border-gold gallery-thumb" />
                  </div>
                </div>
              ))}
            </div>

            {/* Main Download & View Button */}
            <div className="mt-4 p-4 border-gold bg-white rounded shadow-sm mx-auto" style={{maxWidth: '600px'}}>
               <h4 className="text-maroon title-font">Cherish the Memories (650+ Photos)</h4>
               <p className="text-muted">Please click the button below to view and download the rest of our engagement memories.</p>
               
               <div className="d-grid gap-2 d-md-block">
                 <a href={googleDriveLink} target="_blank" rel="noreferrer" className="btn btn-maroon btn-lg px-4 me-md-2">
                   View All Photos 📸
                 </a>
                 <a href={googleDriveLink} target="_blank" rel="noreferrer" className="btn btn-gold btn-lg px-4">
                   Download All ⬇️
                 </a>
               </div>
            </div>
          </div>
        ) : (
          <div className="funny-messages p-5 border-gold rounded bg-white shadow-sm">
            <h3 className="text-maroon">Shaadi hone me abhi time hai 😄</h3>
            <p className="lead">Photos coming soon...</p>
            <p>Abhi thoda intezar karein, best photos aane wali hain! ✨</p>
          </div>
        )}
      </div>
    </section>
  );
}

// --- BLESSINGS COMPONENT ---
function BlessingsSection() {
  return (
    <section className="blessings-section py-5 text-center text-cream">
      <div className="container">
        <h2 className="section-title text-gold mb-4">Bless the Couple</h2>
        <form className="w-50 mx-auto blessings-form">
          <input type="text" className="form-control mb-3" placeholder="Your Name" required />
          <textarea className="form-control mb-3" rows="3" placeholder="Write a beautiful message for Shivam & Jagriti..." required></textarea>
          <button type="submit" className="btn btn-gold w-100">Send Blessings ✨</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer bg-maroon text-gold text-center py-3">
      <p className="mb-0">Made with ❤️ for Shivam & Jagriti</p>
    </footer>
  );
}