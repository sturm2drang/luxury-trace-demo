
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateZKP } from '@/lib/mockBlockchain';
import { Loader2, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ZKPProof: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [itemId, setItemId] = useState('');
  const [salt, setSalt] = useState('');
  const [proofHash, setProofHash] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateProof = async () => {
    if (!itemId || !salt) {
      toast({
        title: "Validation Error",
        description: "Please enter both Item ID and Secret Salt",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setProofHash('');
    
    try {
      const result = await generateZKP(itemId, salt);
      
      if (result.success && result.proofHash) {
        setProofHash(result.proofHash);
      } else {
        toast({
          title: "Proof Generation Failed",
          description: result.error || "Could not generate proof",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate ZKP proof",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proofHash);
    setCopied(true);
    toast({
      title: "Copied",
      description: "Proof hash copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-luxury-navy">Zero-Knowledge Proof</h2>
        <p className="text-muted-foreground">
          Generate a ZKP to prove ownership without revealing sensitive details.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="itemId">Item ID</Label>
          <Input
            id="itemId"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Enter item ID (e.g. ITEM001)"
            className="border-luxury-navy/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="salt">Secret Salt</Label>
          <Input
            id="salt"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            placeholder="Enter a secure random string"
            className="border-luxury-navy/20"
          />
          <p className="text-xs text-muted-foreground">
            The salt helps secure your ZKP. Never share this value.
          </p>
        </div>
        
        <Button 
          onClick={handleGenerateProof}
          disabled={isLoading || !itemId || !salt}
          className="w-full bg-luxury-navy hover:bg-luxury-navy/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Proof...
            </>
          ) : (
            'Generate ZKP Proof'
          )}
        </Button>
        
        {proofHash && (
          <Card className="mt-4 border-luxury-navy/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-luxury-navy">Proof Generated</CardTitle>
              <CardDescription>Zero-knowledge proof for asset verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-luxury-navy/5 p-3 rounded-md flex items-center justify-between">
                <code className="text-sm font-mono text-luxury-navy break-all">
                  {proofHash}
                </code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={copyToClipboard} 
                  className="flex-shrink-0 ml-2"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full bg-green-50 border border-green-200 rounded-md p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-700 font-medium">Verified</span>
                </div>
                <span className="text-sm text-green-700">✓</span>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ZKPProof;
