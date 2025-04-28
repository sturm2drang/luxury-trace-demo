
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerAsset } from '@/lib/mockBlockchain';
import { Loader2 } from 'lucide-react';

interface RegisterAssetProps {
  onSuccess: () => void;
}

const RegisterAsset: React.FC<RegisterAssetProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemId: '',
    brand: '',
    model: '',
    owner: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.itemId || !formData.brand || !formData.model || !formData.owner) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await registerAsset(
        formData.itemId,
        formData.brand,
        formData.model,
        formData.owner
      );
      
      if (result.success) {
        toast({
          title: "Asset Registered",
          description: `${formData.brand} ${formData.model} has been registered with ID: ${formData.itemId}`,
        });
        
        // Reset form
        setFormData({
          itemId: '',
          brand: '',
          model: '',
          owner: '',
        });
        
        // Trigger refresh of assets
        onSuccess();
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "An unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register asset",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-luxury-navy">Register New Luxury Asset</h2>
        <p className="text-muted-foreground">
          Add a new luxury item to the blockchain with verified ownership.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="itemId">Item ID</Label>
          <Input
            id="itemId"
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            placeholder="e.g. ITEM006"
            className="border-luxury-navy/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g. Rolex"
            className="border-luxury-navy/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. Submariner"
            className="border-luxury-navy/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="owner">Initial Owner</Label>
          <Input
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="border-luxury-navy/20"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-luxury-navy hover:bg-luxury-navy/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            'Register Asset'
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterAsset;
