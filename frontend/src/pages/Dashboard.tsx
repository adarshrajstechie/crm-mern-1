import React, { useEffect, useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { UserPlus, Trash2, Edit3, Building, Mail, Phone, Search, X } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
}

export const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'Lead',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get('/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error('Failed to fetch customers', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/customers/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axiosInstance.post('/customers', formData);
      }
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Lead' });
      setIsMobileFormOpen(false);
      fetchCustomers();
    } catch (err) {
      console.error('Error saving customer', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await axiosInstance.delete(`/customers/${id}`);
      fetchCustomers();
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      status: customer.status,
    });
    setIsMobileFormOpen(true);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Header & Search Control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Customer Pipeline</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and update customer interactions effortlessly across devices.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search customer or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 shadow-inner transition-all"
            />
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', email: '', phone: '', company: '', status: 'Lead' });
              setIsMobileFormOpen(true);
            }}
            className="lg:hidden flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <UserPlus size={16} /> Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section: Sticky Sidebar on Desktop / Modal Drawer on Mobile */}
        <div
          className={`lg:col-span-4 bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-2xl transition-all ${
            isMobileFormOpen
              ? 'fixed inset-x-4 top-20 z-50 max-h-[85vh] overflow-y-auto block'
              : 'hidden lg:block sticky top-24'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <UserPlus size={18} className="text-blue-400" />
              {editingId ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            {isMobileFormOpen && (
              <button
                onClick={() => setIsMobileFormOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white p-1"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                placeholder="+1 (555) 019-2834"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="Lead">Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Customer">Customer</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20 active:scale-95"
              >
                {editingId ? 'Update Customer' : 'Save Customer'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: '', email: '', phone: '', company: '', status: 'Lead' });
                    setIsMobileFormOpen(false);
                  }}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-sm border border-slate-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Customer Cards List Section */}
        <div className="lg:col-span-8 space-y-4">
          {filteredCustomers.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500">
              <p className="text-base font-medium">No customers found.</p>
              <p className="text-xs mt-1 text-slate-600">Add your first lead using the form or check your search criteria.</p>
            </div>
          ) : (
            filteredCustomers.map((cust) => (
              <div
                key={cust.id}
                className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md hover:shadow-xl group"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight truncate">{cust.name}</h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        cust.status === 'Customer'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : cust.status === 'Lead'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Building size={14} className="text-blue-400 shrink-0" /> {cust.company}
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <Mail size={14} className="text-indigo-400 shrink-0" /> {cust.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} className="text-emerald-400 shrink-0" /> {cust.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleEdit(cust)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700/60 transition active:scale-95 shadow-sm"
                    title="Edit Customer"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cust.id)}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition active:scale-95 shadow-sm"
                    title="Delete Customer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};