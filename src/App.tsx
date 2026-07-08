import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SharedLegal } from './pages/SharedLegal';
import { NotFound } from './pages/NotFound';

// Tools
import { GrainBinCapacity } from './pages/tools/GrainBinCapacity';
import { FeedStorageCapacity } from './pages/tools/FeedStorageCapacity';
import { EquipmentStoragePlanner } from './pages/tools/EquipmentStoragePlanner';
import { TankVolumeAuditor } from './pages/tools/TankVolumeAuditor';
import { InventoryRotationPlanner } from './pages/tools/InventoryRotationPlanner';
import { SpoilageRiskAssessor } from './pages/tools/SpoilageRiskAssessor';
import { StoreOrSellCalculator } from './pages/tools/StoreOrSellCalculator';

// Guides
import { StoreVsSellDecisionFramework } from './pages/guides/StoreVsSellDecisionFramework';
import { HiddenCostOfGrainStorage } from './pages/guides/HiddenCostOfGrainStorage';
import { PostHarvestStorageChecklist } from './pages/guides/PostHarvestStorageChecklist';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            {/* New Primary Top-Level Routes */}
            <Route path="store-or-sell-calculator" element={<StoreOrSellCalculator />} />
            <Route path="grain-bin-estimator" element={<GrainBinCapacity />} />
            <Route path="spoilage-risk-calculator" element={<SpoilageRiskAssessor />} />

            {/* Guides */}
            <Route path="guides/store-vs-sell-decision-framework" element={<StoreVsSellDecisionFramework />} />
            <Route path="guides/hidden-cost-of-grain-storage" element={<HiddenCostOfGrainStorage />} />
            <Route path="guides/post-harvest-storage-checklist" element={<PostHarvestStorageChecklist />} />

            {/* Legacy Tool Routes (kept for backwards compatibility/existing links) */}
            <Route path="tools/grain-bin-capacity" element={<Navigate to="/grain-bin-estimator" replace />} />
            <Route path="tools/feed-storage-capacity" element={<FeedStorageCapacity />} />
            <Route path="tools/equipment-storage-planner" element={<EquipmentStoragePlanner />} />
            <Route path="tools/tank-volume-epa-auditor" element={<TankVolumeAuditor />} />
            <Route path="tools/inventory-rotation-planner" element={<InventoryRotationPlanner />} />
            <Route path="tools/spoilage-risk-assessor" element={<Navigate to="/spoilage-risk-calculator" replace />} />
            <Route path="tools/storage-cost-analysis" element={<Navigate to="/store-or-sell-calculator" replace />} />
            
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
