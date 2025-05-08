
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RegisterAsset from '@/components/RegisterAsset';
import TransferAsset from '@/components/TransferAsset';
import TraceAsset from '@/components/TraceAsset';
import MaterialTraceability from '@/components/MaterialTraceability';
import ZKPProof from '@/components/ZKPProof';
import CAVerify from '@/components/CAVerify';
import AssetsList from '@/components/AssetsList';

const Index = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleAssetUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container px-4 py-8 mx-auto">
        <Hero />
        
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mb-8">
          {activeTab === 'register' && <RegisterAsset onSuccess={handleAssetUpdated} />}
          {activeTab === 'transfer' && <TransferAsset onSuccess={handleAssetUpdated} />}
          {activeTab === 'trace' && <TraceAsset />}
          {activeTab === 'material' && <MaterialTraceability />}
          {activeTab === 'zkp' && <ZKPProof />}
          {activeTab === 'verify' && <CAVerify />}
        </div>
        
        {(activeTab === 'register' || activeTab === 'transfer') && (
          <AssetsList refreshTrigger={refreshTrigger} />
        )}
      </div>
    </div>
  );
};

export default Index;
