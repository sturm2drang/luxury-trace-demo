
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyIdentity } from '@/lib/mockBlockchain';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CAVerify: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [identity, setIdentity] = useState('');
  const [verifiedBy, setVerifiedBy] = useState<string[]>([]);
  const [animateNodes, setAnimateNodes] = useState<boolean[]>([false, false]);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const handleVerify = async () => {
    if (!identity) {
      toast({
        title: "Validation Error",
        description: "Please enter an identity to verify",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setVerifiedBy([]);
    setVerificationComplete(false);
    setAnimateNodes([false, false]);
    
    try {
      const result = await verifyIdentity(identity);
      
      if (result.success && result.verifiedBy) {
        // First node verification
        setTimeout(() => {
          setAnimateNodes([true, false]);
        }, 500);
        
        // Second node verification
        setTimeout(() => {
          setAnimateNodes([true, true]);
        }, 1500);
        
        // Complete verification
        setTimeout(() => {
          setVerifiedBy(result.verifiedBy);
          setVerificationComplete(true);
        }, 2000);
      } else {
        toast({
          title: "Verification Failed",
          description: result.error || "Could not verify identity",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify identity",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-luxury-navy">Decentralized CA Verification</h2>
        <p className="text-muted-foreground">
          Verify your identity using a decentralized Certificate Authority network.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="identity">User Identity</Label>
          <Input
            id="identity"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            placeholder="Enter identity to verify"
            className="border-luxury-navy/20"
          />
        </div>
        
        <Button 
          onClick={handleVerify}
          disabled={isLoading || !identity}
          className="w-full bg-luxury-navy hover:bg-luxury-navy/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Identity'
          )}
        </Button>
        
        {(isLoading || verifiedBy.length > 0) && (
          <Card className="border-luxury-navy/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-luxury-navy">CA Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around my-4">
                {[0, 1].map((index) => (
                  <div 
                    key={index}
                    className={`
                      flex flex-col items-center transition-all duration-300
                      ${animateNodes[index] ? 'opacity-100' : 'opacity-50'}
                    `}
                  >
                    <div 
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-2
                        ${animateNodes[index] 
                          ? 'bg-green-100 border-green-300 text-green-600' 
                          : 'bg-gray-100 border-gray-200 text-gray-400'
                        }
                        border-2 transition-all duration-300
                      `}
                    >
                      {animateNodes[index] ? (
                        <span className="text-2xl">✓</span>
                      ) : (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {verifiedBy[index] || `CA-Node-${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Multi-sig Status:</span>
                  <div 
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${verificationComplete 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-500'
                      }
                      transition-all duration-300
                    `}
                  >
                    {verificationComplete ? 'Verified ✅' : 'Pending...'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CAVerify;
