import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SharedLegal } from './pages/SharedLegal';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="legal" element={<SharedLegal type="legal" />} />
            <Route path="license" element={<SharedLegal type="license" />} />
            <Route path="privacy" element={<SharedLegal type="privacy" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
