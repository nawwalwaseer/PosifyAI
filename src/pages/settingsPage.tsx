import React from 'react';
import { DashboardNavbar } from "@/components/layout/navbar";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const SettingsPage: React.FC = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <DashboardSidebar />
                <div className="flex-1">
                    <DashboardNavbar />
                    <main className="bg-gray-100 p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

                        {/* General Settings Section */}
                        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">General Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Business Name</label>
                                    <input type="text" placeholder="Enter business name" className="border rounded-lg p-2 focus:ring focus:ring-blue-300" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Upload Logo</label>
                                    <input type="file" className="border rounded-lg p-2 focus:ring focus:ring-blue-300" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Contact Email</label>
                                    <input type="email" placeholder="Enter contact email" className="border rounded-lg p-2 focus:ring focus:ring-blue-300" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Time Zone</label>
                                    <select className="border rounded-lg p-2 focus:ring focus:ring-blue-300">
                                        <option value="UTC">UTC</option>
                                        <option value="PST">PST</option>
                                        <option value="EST">EST</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Currency</label>
                                    <select className="border rounded-lg p-2 focus:ring focus:ring-blue-300">
                                        <option value="USD">USD</option>
                                        <option value="PKR">PKR</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* User Management Section */}
                        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">User Management</h2>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add New User</button>
                                <div className="flex flex-col w-full md:w-auto">
                                    <label className="text-gray-600 mb-2">Manage Roles</label>
                                    <select className="border rounded-lg p-2 focus:ring focus:ring-blue-300">
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="cashier">Cashier</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Application Preferences Section */}
                        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Application Preferences</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Theme</label>
                                    <select className="border rounded-lg p-2 focus:ring focus:ring-blue-300">
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Language</label>
                                    <select className="border rounded-lg p-2 focus:ring focus:ring-blue-300">
                                        <option value="en">English</option>
                                        <option value="ur">Urdu</option>
                                        <option value="es">Spanish</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Notification Preferences</label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="email-notifications" className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
                                            <label htmlFor="email-notifications" className="ml-2 text-gray-600">Email Notifications</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="sms-notifications" className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
                                            <label htmlFor="sms-notifications" className="ml-2 text-gray-600">SMS Notifications</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Security Settings Section */}
                        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Security Settings</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-600">Enable Two-Factor Authentication</label>
                                    <input type="checkbox" className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300" />
                                </div>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Backup Now</button>
                            </div>
                        </section>

                        {/* Integration Settings Section */}
                        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Integration Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Payment Gateway</label>
                                    <select className="border rounded-lg p-2 focus:ring focus:ring-blue-300">
                                        <option value="paypal">PayPal</option>
                                        <option value="stripe">Stripe</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-2">Analytics Tools</label>
                                    <input type="text" placeholder="e.g., Google Analytics ID" className="border rounded-lg p-2 focus:ring focus:ring-blue-300" />
                                </div>
                            </div>
                        </section>

                        {/* Support Section */}
                        <section className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Support</h2>
                            <div className="flex gap-4">
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Help Center</button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Contact Support</button>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default SettingsPage;
