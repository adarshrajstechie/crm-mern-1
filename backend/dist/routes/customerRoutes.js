"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../controllers/customerController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Protect all CRM routes with the authenticateToken middleware
router.use(authMiddleware_1.authenticateToken);
router.get('/', customerController_1.getCustomers);
router.post('/', customerController_1.createCustomer);
router.put('/:id', customerController_1.updateCustomer);
router.delete('/:id', customerController_1.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customerRoutes.js.map