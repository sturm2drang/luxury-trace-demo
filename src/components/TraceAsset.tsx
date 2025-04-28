
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { queryAsset, Asset } from '@/lib/mockBlockchain';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TraceAsset: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [itemId, setItemId] = useState('');
  const [asset, setAsset] = useState<Asset | null>(null);

  const handleTrace = async () => {
    if (!itemId) {
      toast({
        title: "Validation Error",
        description: "Please enter an Item ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await queryAsset(itemId);
      
      if (result.success && result.asset) {
        setAsset(result.asset);
      } else {
        toast({
          title: "Asset Not Found",
          description: result.error || "Could not find asset with this ID",
          variant: "destructive"
        });
        setAsset(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trace asset",
        variant: "destructive"
      });
      setAsset(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-luxury-navy">Trace Asset Provenance</h2>
        <p className="text-muted-foreground">
          Verify the complete ownership history of any luxury asset on the blockchain.
        </p>
      </div>
      
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <Label htmlFor="itemIdInput">Item ID</Label>
          <Input
            id="itemIdInput"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Enter item ID (e.g. ITEM001)"
            className="border-luxury-navy/20"
          />
        </div>
        
        <div className="flex items-end">
          <Button 
            onClick={handleTrace}
            disabled={isLoading || !itemId}
            className="bg-luxury-navy hover:bg-luxury-navy/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tracing...
              </>
            ) : (
              'Trace Asset'
            )}
          </Button>
        </div>
      </div>
      
      {asset && (
        <div className="bg-white border border-luxury-silver/20 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-luxury-navy text-white p-4">
            <h3 className="text-xl font-medium">Asset Details</h3>
            <p className="text-luxury-silver/80 text-sm">Blockchain-verified provenance</p>
          </div>
          
          <div className="p-4 border-b">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Item ID</p>
                <p className="font-medium">{asset.itemId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Owner</p>
                <p className="font-medium">{asset.owner}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Brand</p>
                <p className="font-medium">{asset.brand}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-medium">{asset.model}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Ownership History</h4>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...asset.history].reverse().map((entry, index, arr) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.owner}</TableCell>
                    <TableCell>
                      {format(new Date(entry.date), 'MMM d, yyyy - h:mm a')}
                    </TableCell>
                    <TableCell>
                      {index === arr.length - 1 ? (
                        <span className="text-green-600">Initial Registration</span>
                      ) : (
                        <span className="text-blue-600">Transfer</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {!asset && !isLoading && itemId && (
        <div className="bg-muted/30 border rounded-lg p-6 text-center">
          <p className="text-muted-foreground">No asset found with the provided ID.</p>
          <p className="text-sm">Try a different Item ID or check for typos.</p>
        </div>
      )}
      
      {!asset && !isLoading && !itemId && (
        <div className="bg-muted/30 border rounded-lg p-6 text-center">
          <p className="text-muted-foreground">Enter an Item ID to trace its history on the blockchain.</p>
          <p className="text-sm">Example IDs: ITEM001, ITEM002, ITEM003</p>
        </div>
      )}
    </div>
  );
};

export default TraceAsset;
