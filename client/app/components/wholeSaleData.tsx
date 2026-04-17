import React from 'react';
import { Factory, Truck, PackageCheck } from 'lucide-react';

export const b2bHighlights = [
  { title: "Bulk Manufacturing", desc: "Direct-from-factory Indian sourcing", icon: <Factory /> },
  { title: "Inventory Sourcing", desc: "Reliable made-in-India stock for retailers", icon: <PackageCheck /> },
  { title: "Supply Chain Power", desc: "Reducing imports, strengthening local ties", icon: <Truck /> }
];

export const wholesaleOrders = [
  { item: "Khadi Cotton Rolls", qty: "500m", time: "Just now", status: "PROCESSING" },
  { item: "Terracotta Pots", qty: "1000 pcs", time: "2m ago", status: "DISPATCHED" },
  { item: "Organic Spices", qty: "50 kg", time: "15m ago", status: "DELIVERED" },
];
