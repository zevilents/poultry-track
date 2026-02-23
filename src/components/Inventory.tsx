import React from 'react';
import { Plus, Package, AlertCircle } from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryProps {
  items: InventoryItem[];
  onUpdate: (id: string, newQty: number) => void;
  onAddItem: (item: Omit<InventoryItem, 'id'>) => void;
}

interface InventoryItemCardProps {
  item: InventoryItem;
  onUpdate: (id: string, newQty: number) => void;
}

const InventoryItemCard: React.FC<InventoryItemCardProps> = ({ item, onUpdate }) => {
  const [transactionQty, setTransactionQty] = React.useState<string>('');

  const handleAction = (type: 'use' | 'restock') => {
    const nominal = parseFloat(transactionQty);
    if (isNaN(nominal) || nominal <= 0) {
      alert('Please enter a valid positive quantity');
      return;
    }

    if (type === 'use') {
      onUpdate(item.id, item.quantity - nominal);
    } else {
      onUpdate(item.id, item.quantity + nominal);
    }
    setTransactionQty('');
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${item.type === 'feed' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
            <Package size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{item.name}</h3>
            <p className="text-xs text-slate-400 uppercase font-semibold">{item.type}</p>
          </div>
        </div>
        {item.quantity < 100 && (
          <div className="flex items-center gap-1 text-rose-500 text-[10px] font-bold bg-rose-50 px-2 py-1 rounded-full uppercase">
            <AlertCircle size={10} />
            Low Stock
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs text-slate-500">Current Stock</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">{item.quantity}</span>
          <span className="text-slate-400 font-medium">{item.unit}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <input 
            type="number" 
            placeholder="Quantity"
            className="input-field pr-12"
            value={transactionQty}
            onChange={(e) => setTransactionQty(e.target.value)}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">
            {item.unit}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleAction('use')}
            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-semibold transition-colors"
          >
            Use
          </button>
          <button 
            onClick={() => handleAction('restock')}
            className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-semibold transition-colors"
          >
            Restock
          </button>
        </div>
      </div>
    </div>
  );
};

export const Inventory: React.FC<InventoryProps> = ({ items, onUpdate, onAddItem }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newItem, setNewItem] = React.useState<Omit<InventoryItem, 'id'>>({
    name: '',
    type: 'feed',
    quantity: 0,
    unit: 'kg'
  });

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.quantity >= 0) {
      onAddItem(newItem);
      setIsAdding(false);
      setNewItem({ name: '', type: 'feed', quantity: 0, unit: 'kg' });
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory Tracker</h2>
          <p className="text-slate-500">Manage feed and medicine stocks</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn-primary"
        >
          <Plus size={18} />
          Add Item
        </button>
      </header>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Add New Inventory Item</h3>
            <form onSubmit={handleAddNewItem} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-600">Item Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Starter Feed"
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Type</label>
                  <select 
                    className="input-field"
                    value={newItem.type}
                    onChange={e => setNewItem({...newItem, type: e.target.value as 'feed' | 'ovk'})}
                  >
                    <option value="feed">Feed</option>
                    <option value="ovk">OVK</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Unit</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="kg, bottles, etc."
                    value={newItem.unit}
                    onChange={e => setNewItem({...newItem, unit: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-600">Initial Quantity</label>
                <input 
                  type="number" 
                  className="input-field" 
                  value={newItem.quantity}
                  onChange={e => setNewItem({...newItem, quantity: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <InventoryItemCard key={item.id} item={item} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
};
