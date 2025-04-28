
import React from 'react';
import { Asset } from '@/lib/mockBlockchain';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  // Get the most recent date from history
  const mostRecentEntry = [...asset.history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  
  const timeAgo = formatDistanceToNow(new Date(mostRecentEntry.date), { addSuffix: true });
  
  return (
    <Card className="card-hover-effect border border-luxury-silver/20 bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-luxury-navy">{asset.brand} {asset.model}</CardTitle>
          <Badge variant="outline" className="bg-luxury-navy/10 text-luxury-navy border-luxury-navy/20">
            {asset.itemId}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Owner:</span>
            <span className="font-medium">{asset.owner}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transfer Count:</span>
            <span className="font-medium">{asset.history.length - 1}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground w-full text-right">
          Last updated {timeAgo}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AssetCard;
