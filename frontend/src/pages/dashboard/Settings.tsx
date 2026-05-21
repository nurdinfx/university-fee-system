import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Globe, Settings as SettingsIcon, Shield, CreditCard, Save } from 'lucide-react';

export default function Settings() {
  const [universityName, setUniversityName] = useState('Global Fee University');
  const [currency, setCurrency] = useState('USD ($)');
  const [taxRate, setTaxRate] = useState('5.0');
  const [gateway, setGateway] = useState('Stripe');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Institutional settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure global configurations, currency standards, and payment gateways.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Institution profile */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Globe className="w-4 h-4" />
              </div>
              <CardTitle className="text-lg">Institutional Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Institution Name</label>
                <Input 
                  value={universityName} 
                  onChange={e => setUniversityName(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Support Contact Email</label>
                <Input type="email" defaultValue="support@university.edu" required />
              </div>
            </CardContent>
          </Card>

          {/* International Fee Standards */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <CreditCard className="w-4 h-4" />
              </div>
              <CardTitle className="text-lg">International Fee Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Standard Currency</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none"
                  value={currency} 
                  onChange={e => setCurrency(e.target.value)}
                >
                  <option value="USD ($)">USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                  <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fee Transaction Tax / Levy (%)</label>
                <Input 
                  type="number" 
                  step="0.1" 
                  value={taxRate} 
                  onChange={e => setTaxRate(e.target.value)} 
                  required 
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Gateways */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                <SettingsIcon className="w-4 h-4" />
              </div>
              <CardTitle className="text-lg">Gateway Configurations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Gateway</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none"
                  value={gateway} 
                  onChange={e => setGateway(e.target.value)}
                >
                  <option value="Stripe">Stripe Gateway (Recommended)</option>
                  <option value="PayPal">PayPal Payments</option>
                  <option value="Razorpay">Razorpay Enterprise</option>
                  <option value="Manual Bank">Manual Bank Wire</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gateway API Mode</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none" defaultValue="sandbox">
                  <option value="sandbox">Sandbox / Test Mode</option>
                  <option value="live">Live / Production Mode</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Security & Access */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Shield className="w-4 h-4" />
              </div>
              <CardTitle className="text-lg">Security & Access Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password Expiry Cycle</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none" defaultValue="90">
                  <option value="30">Every 30 Days</option>
                  <option value="90">Every 90 Days</option>
                  <option value="180">Every 180 Days</option>
                  <option value="never">Never Expire</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-muted/20">
                <div>
                  <p className="text-sm font-semibold">Enforce Multi-Factor Auth (MFA)</p>
                  <p className="text-xs text-muted-foreground">Force administrators to confirm login via authenticator apps.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4 border-t border-border/50">
          <Button type="submit" disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving Configurations...' : 'Save Configuration'}
          </Button>
        </div>
      </form>
    </div>
  );
}
