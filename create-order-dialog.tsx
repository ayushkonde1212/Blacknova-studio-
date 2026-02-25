
"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, Loader2, Plus, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { createNewOrder } from "@/lib/firebase/orders";
import { useFirestore, useUser } from "@/firebase";
import { aiProjectBriefingAssistant } from "@/ai/flows/ai-project-briefing-assistant";
import { sendOrderEmail } from "@/ai/flows/send-order-email";

const formSchema = z.object({
  projectName: z.string().min(2, "Project name is required"),
  projectDescription: z.string().min(10, "Please describe your vision in more detail"),
  projectType: z.string().min(1, "Select a project type"),
  checklist: z.array(z.string()).default([]),
  deliveryMethod: z.enum(["GitHub", "Google Drive"]),
  extraNotes: z.string().optional(),
});

const PROJECT_TYPES = ["Website", "Web App", "Ecommerce", "Business", "Portfolio", "SaaS"];
const CHECKLIST_OPTIONS = [
  "Login system", "Database", "Admin panel", "Hosting", "Payments", "SEO"
];

export function CreateOrderDialog({ hasActiveOrder }: { hasActiveOrder: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const db = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectType: "Website",
      checklist: [],
      deliveryMethod: "GitHub",
      extraNotes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || isSubmitting || hasActiveOrder) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Save to Firestore
      await createNewOrder(db, user.uid, {
        ...values,
        extraNotes: values.extraNotes || "",
      });

      // 2. Trigger Email Flow (Simulated)
      await sendOrderEmail({
        clientEmail: user.email!,
        clientName: user.displayName || "Client",
        projectName: values.projectName,
        orderId: `BN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        deliveryMethod: values.deliveryMethod,
      });

      toast({
        title: "Order Dispatched",
        description: "Your briefing is now being reviewed by our architects.",
      });
      
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAiAssist = async () => {
    const description = form.getValues("projectDescription");
    if (!description || description.length < 10) {
      toast({ title: "More Info Needed", description: "Provide detail for AI analysis." });
      return;
    }

    setIsAiLoading(true);
    try {
      const suggestions = await aiProjectBriefingAssistant({
        projectDescription: description,
        extraNotes: form.getValues("extraNotes") || "",
      });

      if (suggestions.suggestedProjectTypes.length > 0) {
        form.setValue("projectType", suggestions.suggestedProjectTypes[0]);
      }
      
      const newChecklist = suggestions.suggestedChecklistOptions.filter(opt => 
        CHECKLIST_OPTIONS.includes(opt)
      );
      
      if (newChecklist.length > 0) {
        form.setValue("checklist", Array.from(new Set([...form.getValues("checklist"), ...newChecklist])));
      }

      toast({ title: "AI Sync Complete", description: "Technical requirements updated." });
    } catch (error) {
      // AI silent fail
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!isSubmitting) {
        setIsOpen(open);
        if (!open) form.reset();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-8 h-12 shadow-2xl transition-all hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] bg-card border-white/5 overflow-y-auto max-h-[90vh] p-8 rounded-[2.5rem] shadow-3xl no-scrollbar">
        {hasActiveOrder ? (
          <div className="py-12 text-center space-y-6">
            <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent border border-accent/20">
              <AlertCircle className="h-10 w-10" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold tracking-tight text-white text-center">Active Venture Found</DialogTitle>
              <DialogDescription className="text-secondary-foreground text-center text-lg font-light leading-relaxed">
                Please wait until your previous order is completed before initiating a new architectural briefing.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setIsOpen(false)} className="rounded-full px-10 h-12 font-bold bg-white/5 border border-white/10 hover:bg-white/10">
              Understood
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-bold tracking-tight text-white">Project Briefing</DialogTitle>
              <DialogDescription className="text-secondary-foreground text-sm leading-relaxed mt-2">
                Define your vision. Our AI assists in architecting the requirements.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Project Identity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Nova Cloud" {...field} className="bg-background border-white/10 h-14 rounded-2xl" disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">The Vision</FormLabel>
                        <Button 
                          type="button" variant="ghost" size="sm" onClick={handleAiAssist} disabled={isAiLoading || isSubmitting}
                          className="h-8 text-[9px] uppercase tracking-widest text-accent font-black hover:bg-accent/5 rounded-full px-4"
                        >
                          {isAiLoading ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Sparkles className="mr-2 h-3 w-3" />}
                          AI Sync
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea placeholder="Describe the core functionality..." className="min-h-[140px] bg-background border-white/10 rounded-3xl" disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-white/10 h-12 rounded-2xl">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-white/10">
                            {PROJECT_TYPES.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Delivery Channel</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-white/10 h-12 rounded-2xl">
                              <SelectValue placeholder="Delivery method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-white/10">
                            <SelectItem value="GitHub">GitHub Repository</SelectItem>
                            <SelectItem value="Google Drive">Google Drive Asset</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Technical Stack</FormLabel>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {CHECKLIST_OPTIONS.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="checklist"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2 rounded-xl hover:bg-white/5 transition-colors">
                            <FormControl>
                              <Checkbox
                                disabled={isSubmitting}
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(field.value?.filter((v) => v !== item))
                                }}
                                className="border-white/20 data-[state=checked]:bg-primary"
                              />
                            </FormControl>
                            <FormLabel className="text-xs font-medium cursor-pointer">{item}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>

                <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
                  <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={isSubmitting} className="rounded-full px-8 h-12">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground rounded-full px-12 h-12 font-bold hover:scale-105 transition-all">
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Initiate Briefing"}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
