
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Hero = () => {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-2 luxury-gradient">
          Luxury Goods Traceability
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A blockchain-powered solution for verifying authenticity and ownership 
          of high-value luxury goods from registration to verification.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
        {[
          {
            title: "Register & Secure",
            description: "Register luxury assets on the blockchain with immutable records"
          },
          {
            title: "Transfer & Track",
            description: "Securely transfer ownership with complete provenance tracking"
          },
          {
            title: "Verify & Trust",
            description: "Multi-authority verification and zero-knowledge proofs"
          }
        ].map((feature, i) => (
          <Card key={i} className="bg-white border-luxury-silver/20">
            <CardContent className="pt-6">
              <h3 className="text-luxury-navy font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hero;
