import { Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// ============================================================================
// STUDY NOTE: CRUD Operations using Prisma ORM
// Modern TypeScript controllers perform type-safe asynchronous queries.
// ============================================================================

export const getCustomers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};

export const createCustomer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, phone, company, status } = req.body;
    const customer = await prisma.customer.create({
      data: { name, email, phone, company, status },
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error });
  }
};

export const updateCustomer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, status } = req.body;

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { name, email, phone, company, status },
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error });
  }
};

export const deleteCustomer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.customer.delete({ where: { id } });
    res.status(200).json({ message: 'Customer removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error });
  }
};