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

import { GrainBinCapacity } from './pages/tools/GrainBinCapacity';
import { FeedStorageCapacity } from './pages/tools/FeedStorageCapacity';
import { EquipmentStoragePlanner } from './pages/tools/EquipmentStoragePlanner';
import { TankVolumeAuditor } from './pages/tools/TankVolumeAuditor';
import { InventoryRotationPlanner } from './pages/tools/InventoryRotationPlanner';
import { SpoilageRiskAssessor } from './pages/tools/SpoilageRiskAssessor';
import { StorageCostAnalysis } from './pages/tools/StorageCostAnalysis';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tools/grain-bin-capacity" element={<GrainBinCapacity />} />
            <Route path="tools/feed-storage-capacity" element={<FeedStorageCapacity />} />
            <Route path="tools/equipment-storage-planner" element={<EquipmentStoragePlanner />} />
            <Route path="tools/tank-volume-epa-auditor" element={<TankVolumeAuditor />} />
            <Route path="tools/inventory-rotation-planner" element={<InventoryRotationPlanner />} />
            <Route path="tools/spoilage-risk-assessor" element={<SpoilageRiskAssessor />} />
            <Route path="tools/storage-cost-analysis" element={<StorageCostAnalysis />} />
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
