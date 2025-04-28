
import React, { useEffect, useState } from 'react';
import { Asset, getAllAssets } from '@/lib/mockBlockchain';
import { useToast } from '@/components/ui/use-toast';
import AssetCard from './AssetCard';
import { Loader2 } from 'lucide-react';

interface AssetsListProps {
  refreshTrigger: number;
}

const AssetsList: React.FC<AssetsListProps> = ({ refreshTrigger }) => {
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      setIsLoading(true);
      try {
        const assetsList = await getAllAssets();
        setAssets(assetsList);
      } catch (error) {
        console.error("Failed to load assets:", error);
        toast({
          title: "Error",
          description: "Failed to load asset list",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAssets();
  }, [refreshTrigger, toast]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-luxury-navy">Registered Assets</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map(asset => (
            <AssetCard key={asset.itemId} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsList;
