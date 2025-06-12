import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MapPin, CreditCard, Settings, UserCircle, ShieldCheck } from 'lucide-react';

// Placeholder data types
interface Order {
  id: string;
  date: string;
  restaurantName: string;
  total: number;
  status: string;
  items: string[];
}

interface Address {
  id: string;
  type: string; // e.g., Home, Work
  street: string;
  city: string;
  zipCode: string;
  isDefault?: boolean;
}

interface PaymentMethod {
  id: string;
  type: string; // e.g., Visa, MasterCard
  last4: string;
  expiryDate: string;
  isDefault?: boolean;
}

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  // Placeholder user data
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('john.doe@example.com');
  const [userPhone, setUserPhone] = useState('555-123-4567');

  const orders: Order[] = [
    { id: 'ORD001', date: '2024-07-15', restaurantName: 'Pizza Heaven', total: 25.99, status: 'Delivered', items: ['Pepperoni Pizza', 'Coke'] },
    { id: 'ORD002', date: '2024-07-10', restaurantName: 'Sushi Express', total: 42.50, status: 'Delivered', items: ['Salmon Roll', 'Tuna Nigiri', 'Miso Soup'] },
    { id: 'ORD003', date: '2024-07-01', restaurantName: 'Burger Joint', total: 18.75, status: 'Cancelled', items: ['Cheeseburger', 'Fries'] },
  ];

  const addresses: Address[] = [
    { id: 'ADDR001', type: 'Home', street: '123 Main St', city: 'Anytown', zipCode: '12345', isDefault: true },
    { id: 'ADDR002', type: 'Work', street: '456 Business Rd', city: 'Busytown', zipCode: '67890' },
  ];

  const paymentMethods: PaymentMethod[] = [
    { id: 'PAY001', type: 'Visa', last4: '1234', expiryDate: '12/25', isDefault: true },
    { id: 'PAY002', type: 'MasterCard', last4: '5678', expiryDate: '06/26' },
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to a backend
    console.log('Profile saved:', { userName, userEmail, userPhone });
    alert('Profile information saved!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-primary">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=random&size=128`} alt={userName} />
            <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{userName}</h1>
            <p className="text-slate-600 dark:text-slate-400">{userEmail}</p>
            <Button variant="outline" size="sm" className="mt-2">Change Avatar</Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="profile"><UserCircle className="mr-2 h-4 w-4 inline-block" />Profile</TabsTrigger>
            <TabsTrigger value="orders"><Package className="mr-2 h-4 w-4 inline-block" />Orders</TabsTrigger>
            <TabsTrigger value="addresses"><MapPin className="mr-2 h-4 w-4 inline-block" />Addresses</TabsTrigger>
            <TabsTrigger value="payment"><CreditCard className="mr-2 h-4 w-4 inline-block" />Payment</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4 inline-block" />Settings</TabsTrigger>
          </TabsList>

          {/* Profile Information Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal details and contact information.</CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileSave}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="Your phone number" />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Review your past orders.</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <ul className="space-y-4">
                    {orders.map(order => (
                      <li key={order.id} className="p-4 border rounded-lg shadow-sm bg-slate-100 dark:bg-slate-800/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-slate-700 dark:text-slate-200">{order.restaurantName} - Order #{order.id}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Date: {order.date}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Items: {order.items.join(', ')}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg text-primary">${order.total.toFixed(2)}</p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                           <Button variant="outline" size="sm">View Details</Button>
                           <Button variant="ghost" size="sm" className="ml-2">Reorder</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">You have no past orders.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  {addresses.map(addr => (
                    <li key={addr.id} className="p-4 border rounded-lg flex justify-between items-center bg-slate-100 dark:bg-slate-800/50">
                      <div>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200">{addr.type} {addr.isDefault && <span className="text-xs text-primary">(Default)</span>}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{addr.street}, {addr.city}, {addr.zipCode}</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 ml-2">Remove</Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Separator className="my-6" />
                <h4 className="text-lg font-medium mb-3 text-slate-800 dark:text-slate-100">Add New Address</h4>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="addr-type">Address Type</Label>
                      <Input id="addr-type" placeholder="e.g., Home, Work" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="addr-street">Street Address</Label>
                      <Input id="addr-street" placeholder="123 Main St" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="addr-city">City</Label>
                      <Input id="addr-city" placeholder="Anytown" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="addr-zip">ZIP Code</Label>
                      <Input id="addr-zip" placeholder="12345" />
                    </div>
                  </div>
                  <Button>Add Address</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment options.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  {paymentMethods.map(pm => (
                    <li key={pm.id} className="p-4 border rounded-lg flex justify-between items-center bg-slate-100 dark:bg-slate-800/50">
                      <div>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200">{pm.type} ending in {pm.last4} {pm.isDefault && <span className="text-xs text-primary">(Default)</span>}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Expires: {pm.expiryDate}</p>
                      </div>
                       <div>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 ml-2">Remove</Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button><CreditCard className="mr-2 h-4 w-4 inline-block" /> Add New Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings & Preferences</CardTitle>
                <CardDescription>Manage your application preferences and account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                    <h4 className="text-md font-medium mb-2 text-slate-700 dark:text-slate-200">Notification Preferences</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-md bg-slate-100 dark:bg-slate-800/50">
                            <Label htmlFor="email-notifications" className="flex-grow">Email Notifications for Promotions</Label>
                            {/* <Switch id="email-notifications" checked /> requires shadcn switch, not in layout. Use Button */}
                            <Button variant="outline" size="sm">Toggle</Button>
                        </div>
                         <div className="flex items-center justify-between p-3 border rounded-md bg-slate-100 dark:bg-slate-800/50">
                            <Label htmlFor="sms-notifications" className="flex-grow">SMS Notifications for Order Updates</Label>
                            <Button variant="outline" size="sm">Toggle</Button>
                        </div>
                    </div>
                </div>
                <Separator />
                 <div>
                    <h4 className="text-md font-medium mb-2 text-slate-700 dark:text-slate-200">Account Security</h4>
                     <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                            <ShieldCheck className="mr-2 h-4 w-4" /> Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <UserCircle className="mr-2 h-4 w-4" /> Two-Factor Authentication
                        </Button>
                    </div>
                </div>
                <Separator />
                 <div>
                    <h4 className="text-md font-medium mb-2 text-slate-700 dark:text-slate-200">Support</h4>
                    <div className="space-y-3">
                        <Link to="/faq" className="block">
                            <Button variant="link" className="p-0 h-auto text-primary">Frequently Asked Questions</Button>
                        </Link>
                        <Link to="/contact" className="block">
                             <Button variant="link" className="p-0 h-auto text-primary">Contact Support</Button>
                        </Link>
                    </div>
                </div>
              </CardContent>
               <CardFooter className="border-t px-6 py-4">
                  <Button variant="destructive">Delete Account</Button>
                </CardFooter>
            </Card>
          </TabsContent>

        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfilePage;