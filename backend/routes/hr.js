
const express = require('express');
const User = require('../models/User');
const Employee = require('../models/Employee');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/hr/pending-approvals
// @desc    Get users pending approval for HR to complete employment info
// @access  Private (HR only)
router.get('/pending-approvals', auth, authorize('hr'), async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' }).select('-password');
    res.json(pendingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/hr/pending-approvals/:id
// @desc    Get a specific pending user by ID
// @access  Private (HR only)
router.get('/pending-approvals/:id', auth, authorize('hr'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.status !== 'pending') {
      return res.status(400).json({ message: 'User is not pending approval' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/hr/complete-employee-info/:id
// @desc    Complete employee info and approve user
// @access  Private (HR only)
router.put('/complete-employee-info/:id', auth, authorize('hr'), async (req, res) => {
  try {
    const { 
      employeeId, 
      department, 
      position, 
      joinDate, 
      workLocation, 
      manager 
    } = req.body;
    
    // Validate required fields
    if (!employeeId || !department || !position || !joinDate) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }
    
    // Find the user
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.status !== 'pending') {
      return res.status(400).json({ message: 'User is not pending approval' });
    }
    
    // Update user with employment information
    user.department = department;
    user.position = position;
    user.joinDate = joinDate;
    user.status = 'approved'; // Approve the user
    
    await user.save();
    
    // Create employee record
    const newEmployee = new Employee({
      userId: user._id,
      employeeId,
      department,
      position,
      salary: 0, // Default value, can be updated later
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    });
    
    if (workLocation) {
      newEmployee.workLocation = workLocation;
    }
    
    if (manager) {
      newEmployee.manager = manager;
    }
    
    await newEmployee.save();
    
    res.json({
      message: 'User approved and employee information completed',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position,
        status: user.status
      },
      employee: newEmployee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
