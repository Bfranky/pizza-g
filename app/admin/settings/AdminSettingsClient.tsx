// app/admin/settings/AdminSettingsClient.tsx
"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiToggleLeft, FiToggleRight, FiSave } from "react-icons/fi";

export default function AdminSettingsClient({ settings: initial }: { settings: any }) {
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);

  const save = async (patch: Partial<typeof settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
      setSettings(settings); // revert
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-charcoal">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your restaurant settings</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Open/Close Toggle */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display text-lg font-bold text-brand-charcoal mb-1">Restaurant Status</h2>
          <p className="text-sm text-gray-400 mb-6">Toggle whether your restaurant is currently accepting orders</p>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <p className="font-semibold text-brand-charcoal">
                {settings.isOpen ? "Open for Business" : "Currently Closed"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {settings.isOpen
                  ? "Customers can place orders right now"
                  : "Customers will see a closed message"}
              </p>
            </div>
            <button
              onClick={() => save({ isOpen: !settings.isOpen })}
              className="transition-colors"
              disabled={saving}
            >
              {settings.isOpen ? (
                <FiToggleRight size={48} className="text-green-500 hover:text-green-600" />
              ) : (
                <FiToggleLeft size={48} className="text-gray-300 hover:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display text-lg font-bold text-brand-charcoal mb-1">Opening Hours</h2>
          <p className="text-sm text-gray-400 mb-6">Set your daily opening and closing times</p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Opens At</label>
              <input
                type="time"
                value={settings.openTime}
                onChange={(e) => setSettings({ ...settings, openTime: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Closes At</label>
              <input
                type="time"
                value={settings.closeTime}
                onChange={(e) => setSettings({ ...settings, closeTime: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
          </div>

          <button
            onClick={() => save({ openTime: settings.openTime, closeTime: settings.closeTime })}
            disabled={saving}
            className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-full transition-colors"
          >
            <FiSave size={16} />
            {saving ? "Saving..." : "Save Hours"}
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display text-lg font-bold text-brand-charcoal mb-1">Restaurant Info</h2>
          <p className="text-sm text-gray-400 mb-4">These are read-only for reference</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><span className="font-semibold text-brand-charcoal">Name:</span> Pizza Garden</li>
            <li><span className="font-semibold text-brand-charcoal">Address:</span> No. 1 Iruka Street, Obosi, Anambra, Nigeria</li>
            <li><span className="font-semibold text-brand-charcoal">Phone:</span> 0806 364 5052</li>
            <li><span className="font-semibold text-brand-charcoal">Coordinates:</span> 6.16667, 6.78333</li>
          </ul>
          <p className="text-xs text-gray-400 mt-4">
            To update restaurant info, edit <code className="bg-gray-100 px-1 rounded">lib/utils.ts</code>
          </p>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
          <h2 className="font-display text-lg font-bold text-red-600 mb-1">Admin Credentials</h2>
          <p className="text-sm text-gray-400 mb-3">
            Default admin login (change after first login):
          </p>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm space-y-1">
            <p><span className="text-gray-400">Email:</span> admin@pizzagarden.ng</p>
            <p><span className="text-gray-400">Password:</span> admin123</p>
          </div>
          <p className="text-xs text-red-400 mt-3">
            ⚠️ Change this password immediately in production
          </p>
        </div>
      </div>
    </div>
  );
}
