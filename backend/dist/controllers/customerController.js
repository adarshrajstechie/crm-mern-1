"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomers = void 0;
const db_1 = require("../config/db");
// ============================================================================
// STUDY NOTE: CRUD Operations using Prisma ORM
// Modern TypeScript controllers perform type-safe asynchronous queries.
// ============================================================================
const getCustomers = async (req, res) => {
    try {
        const customers = await db_1.prisma.customer.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(customers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error });
    }
};
exports.getCustomers = getCustomers;
const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, company, status } = req.body;
        const customer = await db_1.prisma.customer.create({
            data: { name, email, phone, company, status },
        });
        res.status(201).json(customer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating customer', error });
    }
};
exports.createCustomer = createCustomer;
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, company, status } = req.body;
        const updatedCustomer = await db_1.prisma.customer.update({
            where: { id },
            data: { name, email, phone, company, status },
        });
        res.status(200).json(updatedCustomer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating customer', error });
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.prisma.customer.delete({ where: { id } });
        res.status(200).json({ message: 'Customer removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
};
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customerController.js.map