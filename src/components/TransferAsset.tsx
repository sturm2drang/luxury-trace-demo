
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transferAsset, getAllAssets, Asset } from '@/lib/mockBlockchain';
import { Loader2 } from 'lucide-react';

interface TransferAssetProps {
  onSuccess: () => void;
}

const TransferAsset: React.FC<TransferAssetProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoadingAssets(true);
      try {
        const assetsList = await getAllAssets();
        setAssets(assetsList);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
        toast({
          title: "Error",
          description: "Failed to load assets",
          variant: "destructive"
        });
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchAssets();
  }, [toast]);

  useEffect(() => {
    if (selectedItemId) {
      const asset = assets.find(a => a.itemId === selectedItemId);
      setSelectedAsset(asset || null);
    } else {
      setSelectedAsset(null);
    }
  }, [selectedItemId, assets]);

  const handleTransfer = async () => {
    if (!selectedItemId || !newOwner) {
      toast({
        title: "Validation Error",
        description: "Please select an asset and enter new owner name",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await transferAsset(selectedItemId, newOwner);
      
      if (result.success) {
        toast({
          title: "Ownership Transferred",
          description: `${result.asset?.brand} ${result.asset?.model} ownership transferred to ${newOwner}`,
        });
        
        // Reset form
        setNewOwner('');
        
        // Trigger refresh of assets
        onSuccess();
      } else {
        toast({
          title: "Transfer Failed",
          description: result.error || "An unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transfer ownership",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-luxury-navy">Transfer Asset Ownership</h2>
        <p className="text-muted-foreground">
          Transfer ownership of a luxury item to a new owner.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="itemSelect">Select Asset</Label>
          <Select
            disabled={loadingAssets}
            value={selectedItemId}
            onValueChange={setSelectedItemId}
          >
            <SelectTrigger id="itemSelect" className="border-luxury-navy/20">
              <SelectValue placeholder="Select an asset" />
            </SelectTrigger>
            <SelectContent>
              {assets.map(asset => (
                <SelectItem key={asset.itemId} value={asset.itemId}>
                  {asset.brand} {asset.model} ({asset.itemId})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAsset && (
          <div className="p-4 bg-luxury-navy/5 rounded-lg border border-luxury-navy/20">
            <h3 className="font-medium text-luxury-navy mb-2">Current Ownership</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Item ID:</span>
              <span>{selectedAsset.itemId}</span>
              <span className="text-muted-foreground">Brand & Model:</span>
              <span>{selectedAsset.brand} {selectedAsset.model}</span>
              <span className="text-muted-foreground">Current Owner:</span>
              <span className="font-medium">{selectedAsset.owner}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="newOwner">New Owner</Label>
          <Input
            id="newOwner"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            placeholder="Enter new owner name"
            disabled={!selectedAsset || isLoading}
            className="border-luxury-navy/20"
          />
        </div>

        <Button 
          onClick={handleTransfer}
          disabled={!selectedAsset || !newOwner || isLoading}
          className="w-full bg-luxury-navy hover:bg-luxury-navy/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Transfer...
            </>
          ) : (
            'Transfer Ownership'
          )}
        </Button>
      </div>
    </div>
  );
};

export default TransferAsset;
