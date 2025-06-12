import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Check, ArrowLeft } from 'lucide-react';

import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const checkoutSchema = z.object({
  streetAddress: z.string().min(5, "Street address is required (min 5 chars)"),
  city: z.string().min(2, "City is required (min 2 chars)"),
  state: z.string().min(2, "State/Province is required (min 2 chars)"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code format (e.g., 12345 or 12345-6789)"),
  country: z.string().min(2, "Country is required"),
  deliveryTimeOption: z.enum(["asap", "scheduled"], { required_error: "Please select a delivery time." }),
  scheduledTime: z.string().optional(),
  paymentMethod: z.enum(["creditCard", "paypal", "gpay"], { required_error: "Please select a payment method." }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  cardHolderName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.deliveryTimeOption === "scheduled" && !data.scheduledTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify a time for scheduled delivery.",
      path: ["scheduledTime"],
    });
  }
  if (data.paymentMethod === "creditCard") {
    if (!data.cardHolderName || data.cardHolderName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Card holder name is required.", path: ["cardHolderName"] });
    }
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid 16-digit card number is required.", path: ["cardNumber"] });
    }
    if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid expiry date (MM/YY) is required.", path: ["cardExpiry"] });
    }
    if (!data.cardCvc || !/^\d{3,4}$/.test(data.cardCvc)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid CVC (3 or 4 digits) is required.", path: ["cardCvc"] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const STEPS = [
  { id: 1, name: "Delivery Address", fields: ["streetAddress", "city", "state", "zipCode", "country"] as (keyof CheckoutFormValues)[] },
  { id: 2, name: "Delivery Options", fields: ["deliveryTimeOption", "scheduledTime"] as (keyof CheckoutFormValues)[] },
  { id: 3, name: "Payment", fields: ["paymentMethod", "cardHolderName", "cardNumber", "cardExpiry", "cardCvc"] as (keyof CheckoutFormValues)[] },
  { id: 4, name: "Review & Confirm", fields: [] as (keyof CheckoutFormValues)[] }
];

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
      deliveryTimeOption: "asap",
      scheduledTime: "",
      paymentMethod: "creditCard",
      cardHolderName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
    mode: "onTouched",
  });

  const watchedPaymentMethod = form.watch("paymentMethod");
  const watchedDeliveryOption = form.watch("deliveryTimeOption");

  const handleNextStep = async () => {
    const fieldsToValidate = STEPS[currentStep - 1].fields;
    // For payment step, conditionally validate card fields only if 'creditCard' is selected
    let isValid = true;
    if (currentStep === 3 && watchedPaymentMethod !== 'creditCard') {
        isValid = await form.trigger(["paymentMethod"]);
    } else if (fieldsToValidate.length > 0) {
        isValid = await form.trigger(fieldsToValidate);
    }

    if (isValid) {
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo(0, 0); // Scroll to top on step change
      } else {
        // This case should be handled by onSubmit for the last step
        form.handleSubmit(onSubmit)();
      }
    } else {
      toast.error("Please correct the errors before proceeding.", { position: "top-center" });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0); // Scroll to top on step change
    }
  };

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout data submitted:", data);
    toast.success("Order Placed Successfully!", {
      description: "Your delicious meal is on its way. Thank you for your order!",
      duration: 5000,
      position: "top-center",
    });
    form.reset();
    // Potentially navigate to an order confirmation page or back to homepage
    setTimeout(() => navigate('/'), 3000); // Redirect to homepage after a delay
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate('/cart')} className="text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8 text-center">
          Secure Checkout
        </h1>

        {/* Stepper Indicator */}
        <div className="mb-10 flex items-center justify-center max-w-xl mx-auto">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex flex-col items-center text-center ${currentStep >= step.id ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold
                    ${currentStep > step.id ? 'bg-primary border-primary text-primary-foreground' : 
                      currentStep === step.id ? 'border-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-950' : 'border-slate-300 dark:border-slate-700'}`}
                >
                  {currentStep > step.id ? <Check className="w-6 h-6" /> : step.id}
                </div>
                <p className="text-xs sm:text-sm mt-2 w-20 sm:w-auto">{step.name}</p>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`flex-1 h-1.5 mx-2 sm:mx-4 rounded-full ${currentStep > index + 1 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{STEPS[currentStep - 1].name}</CardTitle>
                {currentStep === 1 && <CardDescription>Enter your delivery address.</CardDescription>}
                {currentStep === 2 && <CardDescription>Choose when you'd like your order.</CardDescription>}
                {currentStep === 3 && <CardDescription>Select your preferred payment method.</CardDescription>}
                {currentStep === 4 && <CardDescription>Please review your order details before placing it.</CardDescription>}
              </CardHeader>
              
              <CardContent className="space-y-6 py-6">
                {/* Step 1: Delivery Address */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="streetAddress" render={({ field }) => ( <FormItem> <FormLabel>Street Address</FormLabel> <FormControl> <Input placeholder="e.g., 123 Main St" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="city" render={({ field }) => ( <FormItem> <FormLabel>City</FormLabel> <FormControl> <Input placeholder="e.g., Anytown" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                      <FormField control={form.control} name="state" render={({ field }) => ( <FormItem> <FormLabel>State / Province</FormLabel> <FormControl> <Input placeholder="e.g., CA" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="zipCode" render={({ field }) => ( <FormItem> <FormLabel>Zip / Postal Code</FormLabel> <FormControl> <Input placeholder="e.g., 90210" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                      <FormField control={form.control} name="country" render={({ field }) => ( <FormItem> <FormLabel>Country</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger> </FormControl> <SelectContent> <SelectItem value="USA">United States</SelectItem> <SelectItem value="CAN">Canada</SelectItem> <SelectItem value="GBR">United Kingdom</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Options */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="deliveryTimeOption" render={({ field }) => (
                      <FormItem className="space-y-3"> <FormLabel>Delivery Time</FormLabel> <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                          <FormItem className="flex items-center space-x-3 space-y-0"> <FormControl><RadioGroupItem value="asap" /></FormControl> <FormLabel className="font-normal">As Soon As Possible</FormLabel> </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"> <FormControl><RadioGroupItem value="scheduled" /></FormControl> <FormLabel className="font-normal">Schedule for Later</FormLabel> </FormItem>
                        </RadioGroup>
                      </FormControl> <FormMessage /> </FormItem>
                    )} />
                    {watchedDeliveryOption === 'scheduled' && (
                      <FormField control={form.control} name="scheduledTime" render={({ field }) => ( <FormItem> <FormLabel>Scheduled Time</FormLabel> <FormControl> <Input type="datetime-local" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    )}
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                      <FormItem className="space-y-3"> <FormLabel>Payment Method</FormLabel> <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {["creditCard", "paypal", "gpay"].map(method => (
                            <FormItem key={method} className="flex-1">
                              <FormControl>
                                <RadioGroupItem value={method} id={`payment-${method}`} className="sr-only peer" />
                              </FormControl>
                              <Label htmlFor={`payment-${method}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                {method === "creditCard" && "Credit Card"}
                                {method === "paypal" && "PayPal"}
                                {method === "gpay" && "Google Pay"}
                              </Label>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl> <FormMessage /> </FormItem>
                    )} />
                    {watchedPaymentMethod === 'creditCard' && (
                      <div className="space-y-4 p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50">
                        <FormField control={form.control} name="cardHolderName" render={({ field }) => ( <FormItem> <FormLabel>Card Holder Name</FormLabel> <FormControl> <Input placeholder="Name on card" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="cardNumber" render={({ field }) => ( <FormItem> <FormLabel>Card Number</FormLabel> <FormControl> <Input placeholder="0000 0000 0000 0000" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={form.control} name="cardExpiry" render={({ field }) => ( <FormItem> <FormLabel>Expiry Date</FormLabel> <FormControl> <Input placeholder="MM/YY" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                          <FormField control={form.control} name="cardCvc" render={({ field }) => ( <FormItem> <FormLabel>CVC</FormLabel> <FormControl> <Input placeholder="123" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                        </div>
                      </div>
                    )}
                    {watchedPaymentMethod === 'paypal' && <p className="text-sm text-muted-foreground p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50">You will be redirected to PayPal to complete your payment.</p>}
                    {watchedPaymentMethod === 'gpay' && <p className="text-sm text-muted-foreground p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50">Follow instructions from Google Pay to complete your payment.</p>}
                  </div>
                )}

                {/* Step 4: Review & Confirm */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Order Summary</h3>
                    {/* Placeholder for actual cart items summary */}
                    <div className="p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50 space-y-2">
                        <p><strong>Items:</strong> [Dynamic list of cart items would go here]</p>
                        <p><strong>Total Amount:</strong> [Dynamic total amount would go here]</p>
                    </div>
                    
                    <h4 className="text-md font-medium pt-2">Delivery Address:</h4>
                    <p className="text-sm text-muted-foreground">{form.getValues("streetAddress")}, {form.getValues("city")}, {form.getValues("state")} {form.getValues("zipCode")}, {form.getValues("country")}</p>
                    
                    <h4 className="text-md font-medium pt-2">Delivery Time:</h4>
                    <p className="text-sm text-muted-foreground">
                      {form.getValues("deliveryTimeOption") === "asap" ? "As Soon As Possible" : `Scheduled for: ${new Date(form.getValues("scheduledTime") || Date.now()).toLocaleString()}`}
                    </p>

                    <h4 className="text-md font-medium pt-2">Payment Method:</h4>
                    <p className="text-sm text-muted-foreground">
                      {form.getValues("paymentMethod") === "creditCard" && "Credit Card"}
                      {form.getValues("paymentMethod") === "paypal" && "PayPal"}
                      {form.getValues("paymentMethod") === "gpay" && "Google Pay"}
                      {form.getValues("paymentMethod") === "creditCard" && ` (ending in **** ${form.getValues("cardNumber")?.slice(-4)})`}
                    </p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-8 border-t border-slate-200 dark:border-slate-700 mt-4">
                <Button type="button" variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1}>
                  Previous
                </Button>
                {currentStep < STEPS.length ? (
                  <Button type="button" onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    Place Order
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;