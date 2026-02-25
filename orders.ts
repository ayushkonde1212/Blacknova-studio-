
'use client';

import { 
  collection, 
  doc, 
  addDoc, 
  serverTimestamp, 
  CollectionReference,
  DocumentReference,
  query,
  orderBy
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed';
export type DeliveryMethod = 'GitHub' | 'Google Drive';

export interface Order {
  id: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  checklist: string[];
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  createdAt: any;
  clientId: string;
}

/**
 * Creates a new order for a specific client.
 */
export function createNewOrder(
  db: Firestore, 
  clientId: string, 
  orderData: Omit<Order, 'id' | 'createdAt' | 'clientId' | 'status'>
) {
  const colRef = collection(db, 'clients', clientId, 'orders');
  
  const payload = {
    ...orderData,
    clientId,
    status: 'Pending',
    createdAt: serverTimestamp(),
  };

  addDoc(colRef, payload).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: colRef.path,
      operation: 'create',
      requestResourceData: payload,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

/**
 * Returns a query for a client's orders.
 */
export function getOrdersQuery(db: Firestore, clientId: string) {
  return query(
    collection(db, 'clients', clientId, 'orders'),
    orderBy('createdAt', 'desc')
  );
}
