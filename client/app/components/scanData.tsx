import React from 'react';
import { Cpu, RefreshCw, CheckCircle } from 'lucide-react';

export const detectionStats = [
  { label: "Manufacturing Country", status: "Detecting...", icon: <Cpu className="w-4 h-4 text-cyan-500" /> },
  { label: "Brand Ownership", status: "Verified", icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
  { label: "Indian Alternative", status: "Available", icon: <RefreshCw className="w-4 h-4 text-indigo-500" /> }
];
