
export interface HistoryEntry {
  owner: string;
  date: string;
}

export interface Asset {
  itemId: string;
  brand: string;
  model: string;
  owner: string;
  history: HistoryEntry[];
}

// Sample assets data
export const SAMPLE_ASSETS: Asset[] = [
  {
    itemId: 'ITEM001',
    brand: 'Rolex',
    model: 'Submariner',
    owner: 'Bob',
    history: [
      { owner: 'Alice', date: '2025-03-01T10:00:00Z' },
      { owner: 'Bob', date: '2025-04-10T11:30:00Z' },
    ]
  },
  {
    itemId: 'ITEM002',
    brand: 'Hermès',
    model: 'Birkin 30',
    owner: 'Dave',
    history: [
      { owner: 'Carol', date: '2025-02-15T09:20:00Z' },
      { owner: 'Dave', date: '2025-03-22T14:45:00Z' },
    ]
  },
  {
    itemId: 'ITEM003',
    brand: 'Louis Vuitton',
    model: 'Neverfull MM',
    owner: 'Emma',
    history: [
      { owner: 'Emma', date: '2025-01-05T15:30:00Z' },
    ]
  },
  {
    itemId: 'ITEM004',
    brand: 'Patek Philippe',
    model: 'Nautilus',
    owner: 'Frank',
    history: [
      { owner: 'Frank', date: '2025-02-18T13:15:00Z' },
    ]
  },
  {
    itemId: 'ITEM005',
    brand: 'Chanel',
    model: 'Classic Flap Bag',
    owner: 'Grace',
    history: [
      { owner: 'Grace', date: '2025-03-10T11:45:00Z' },
    ]
  }
];

// In-memory assets storage
export let assets: Asset[] = [...SAMPLE_ASSETS];

// Register a new asset
export async function registerAsset(
  itemId: string, 
  brand: string, 
  model: string, 
  owner: string
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
  // Check if asset with this ID already exists
  if (assets.some(a => a.itemId === itemId)) {
    return { success: false, error: 'Asset with this ID already exists' };
  }
  
  const newAsset: Asset = { 
    itemId, 
    brand, 
    model, 
    owner, 
    history: [{ owner, date: new Date().toISOString() }] 
  };
  
  assets.push(newAsset);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true, asset: newAsset };
}

// Transfer asset ownership
export async function transferAsset(
  itemId: string, 
  newOwner: string
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
  const assetIndex = assets.findIndex(a => a.itemId === itemId);
  
  if (assetIndex === -1) {
    return { success: false, error: 'Asset not found' };
  }
  
  // Create a copy of the asset
  const asset = { ...assets[assetIndex] };
  
  // Update the asset
  asset.history.push({ owner: newOwner, date: new Date().toISOString() });
  asset.owner = newOwner;
  
  // Update the assets array
  assets[assetIndex] = asset;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true, asset };
}

// Query asset details
export async function queryAsset(
  itemId: string
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
  const asset = assets.find(a => a.itemId === itemId);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return asset
    ? { success: true, asset }
    : { success: false, error: 'Asset not found' };
}

// Generate ZKP proof (simulated)
export async function generateZKP(
  itemId: string, 
  salt: string
): Promise<{ success: boolean; proofHash?: string; error?: string }> {
  const asset = assets.find(a => a.itemId === itemId);
  
  if (!asset) {
    return { success: false, error: 'Asset not found' };
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: true, proofHash: 'SampleProof123ABC' };
}

// Verify identity (simulated)
export async function verifyIdentity(
  identity: string
): Promise<{ success: boolean; verifiedBy?: string[]; error?: string }> {
  if (!identity.trim()) {
    return { success: false, error: 'Identity cannot be empty' };
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: true, verifiedBy: ['CA-Node-1', 'CA-Node-2'] };
}

// Reset data to initial state (for testing)
export function resetData(): void {
  assets = [...SAMPLE_ASSETS];
}

// Get all assets
export async function getAllAssets(): Promise<Asset[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return assets;
}
